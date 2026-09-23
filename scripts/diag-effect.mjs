/**
 * Dev-only diagnostic: proves whether the Hero.jsx width-aware sizing
 * effect is running, by re-running the exact probe calculation in-page and
 * comparing it against the `--title-fit` the page actually applied.
 *
 * Usage:  node scripts/diag-effect.mjs <cdp-http-endpoint>
 */
const endpoint = process.argv[2] || 'http://127.0.0.1:9377';

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

function probePage() {
  const title = document.querySelector('.hero-title');
  const hero = document.querySelector('.hero');
  const main = document.querySelector('.hero-title-main');
  if (!title || !hero) return JSON.stringify({ error: 'lockup missing' });

  const probe = document.createElement('span');
  probe.textContent = 'ROBOTRON';
  probe.setAttribute('aria-hidden', 'true');
  Object.assign(probe.style, {
    position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap',
    pointerEvents: 'none', left: '-9999px', top: '0', fontSize: '100px',
    fontFamily: 'var(--font-display)', fontWeight: '900',
    letterSpacing: '-0.01em', textTransform: 'uppercase',
  });
  hero.appendChild(probe);
  const probeW = probe.getBoundingClientRect().width;
  probe.remove();

  const em = probeW / 100;
  const titlePad =
    parseFloat(getComputedStyle(title).paddingLeft || '0') +
    parseFloat(getComputedStyle(title).paddingRight || '0');
  const available = document.documentElement.clientWidth - titlePad;
  const expected = available / (em * 1.02);

  return JSON.stringify({
    // what the page stored
    appliedFitVar: title.style.getPropertyValue('--title-fit') || '(unset)',
    // what the effect WOULD compute right now
    expected: expected.toFixed(2) + 'px',
    inputs: {
      probeW: +probeW.toFixed(2),
      emPerWord: +em.toFixed(4),
      docClientWidth: document.documentElement.clientWidth,
      heroClientWidth: hero.clientWidth,
      titlePad,
      available,
    },
    computedFontSize: getComputedStyle(main).fontSize,
    // resolved --title-fit as the cascade sees it on the h1
    resolvedFitOnMain: getComputedStyle(main).getPropertyValue('--title-fit').trim() || '(unset)',
  }, null, 2);
}

const out = await send('Runtime.evaluate', {
  expression: `(${probePage.toString()})()`,
  returnByValue: true,
});
console.log(out.result?.value ?? JSON.stringify(out, null, 2));
ws.close();
