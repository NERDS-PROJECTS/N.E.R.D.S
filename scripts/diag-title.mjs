/**
 * Dev-only diagnostic: explains why the hero wordmark paints (or fails to
 * paint) by reading the live computed style of every element in the
 * .hero-type → .title-mask chain, plus the resolved font and the actual
 * painted pixel coverage of the .hero-title-main box.
 *
 * Usage:  node scripts/diag-title.mjs <cdp-http-endpoint>
 */
const endpoint = process.argv[2] || 'http://127.0.0.1:9377';
const delayMs = Number(process.argv[3] || 4500);

const list = await (await fetch(`${endpoint}/json/list`)).json();
const page = list.find((t) => t.type === 'page');
if (!page) throw new Error('no page target');

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (method, params) =>
  new Promise((res, rej) => {
    const n = ++id;
    pending.set(n, { res, rej });
    ws.send(JSON.stringify({ id: n, method, params }));
  });

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
  }
});

await new Promise((r) => ws.addEventListener('open', r));

const expression = `(async () => {
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  await wait(${delayMs});

  const describe = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, missing: true };
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      sel,
      className: el.className,
      inlineStyle: el.getAttribute('style'),
      rect: { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) },
      // the properties that decide whether gradient-clipped text paints
      color: cs.color,
      backgroundImage: cs.backgroundImage.slice(0, 60),
      backgroundClip: cs.backgroundClip,
      webkitBackgroundClip: cs.webkitBackgroundClip || '(n/a)',
      // an ancestor filter/opacity creates a stacking context that can break
      // background-clip:text painting
      filter: cs.filter,
      opacity: cs.opacity,
      // the reveal mask: inset(0 105% 0 0) === fully hidden
      clipPath: cs.clipPath,
      transform: cs.transform,
      visibility: cs.visibility,
      display: cs.display,
      overflow: cs.overflow,
      fontFamily: cs.fontFamily.slice(0, 40),
      fontWeight: cs.fontWeight,
      fontSize: cs.fontSize,
      letterSpacing: cs.letterSpacing,
    };
  };

  // Does the Orbitron webfont actually resolve, or is the fallback used?
  const fonts = [];
  try {
    document.fonts.forEach(f => {
      if (f.family.indexOf('Orbitron') !== -1) fonts.push(f.family + ' ' + f.weight + ' ' + f.status);
    });
  } catch (e) { fonts.push('err:' + e.message); }

  const main = document.querySelector('.hero-title-main');
  // Scroll the hero into view so painting is not skipped, then sample the
  // canvas to count how many pixels the wordmark actually contributes.
  let painted = null;
  if (main) {
    const r = main.getBoundingClientRect();
    painted = { rect: { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) } };
  }

  return JSON.stringify({
    viewport: { w: innerWidth, h: innerHeight },
    orbitronFonts: fonts,
    chain: [
      describe('.hero-fade'),
      describe('.hero-content'),
      describe('.pl.hero-type'),
      describe('.hero-type-anim'),
      describe('.hero-title'),
      describe('.hero-title-main'),
      describe('.hero-title-main .title-mask'),
      describe('.hero-year'),
    ],
    mainRect: painted,
    titleText: main ? JSON.stringify(main.textContent) : null,
    maskText: document.querySelector('.title-mask') ? JSON.stringify(document.querySelector('.title-mask').textContent) : null,
  }, null, 2);
})()`;

const out = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
console.log(out.result?.value ?? JSON.stringify(out, null, 2));
ws.close();
