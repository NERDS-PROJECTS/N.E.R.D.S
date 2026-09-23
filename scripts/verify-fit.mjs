/**
 * Dev-only verification: checks the hero wordmark is BIG and FITS at every
 * breakpoint, by measuring the rendered box against the viewport.
 *
 * A clean reload is forced per size so the Hero.jsx sizing effect re-measures
 * against the real layout instead of inheriting a value from a previous size.
 *
 * Usage:  node scripts/verify-fit.mjs <cdp-http-endpoint>
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

await send('Network.enable', {});
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.enable', {});

const sizes = [
  [2560, 1440],
  [1920, 1080],
  [1440, 900],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [834, 1112],
  [768, 1024],
  [430, 932],
  [390, 844],
  [360, 640],
];

const rows = [];
for (const [w, h] of sizes) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: h, deviceScaleFactor: 1, mobile: false,
  });
  /* Reload per size: the effect measures on mount/fonts.ready/resize, and a
     fresh load guarantees it sees THIS viewport's layout. */
  await send('Page.reload', { ignoreCache: true });
  await new Promise((r) => setTimeout(r, 2600));

  const expression = `(() => {
    const main = document.querySelector('.hero-title-main');
    const hero = document.querySelector('.hero');
    if (!main) return JSON.stringify({ error: 'missing .hero-title-main' });
    const r = main.getBoundingClientRect();
    const cs = getComputedStyle(main);
    const heroRect = hero.getBoundingClientRect();
    return JSON.stringify({
      fit: main.parentElement.style.getPropertyValue('--title-fit') || '(unset)',
      fontSize: Math.round(parseFloat(cs.fontSize)),
      wordW: Math.round(r.width),
      // how much of the viewport width the wordmark occupies
      fill: +(r.width / innerWidth).toFixed(3),
      clippedLeft: r.left < -1,
      clippedRight: r.right > innerWidth + 1,
      // must stay inside the hero's own overflow box vertically too
      insideHeroV: r.top >= heroRect.top - 1 && r.bottom <= heroRect.bottom + 1,
    });
  })()`;

  const out = await send('Runtime.evaluate', { expression, returnByValue: true });
  const data = JSON.parse(out.result.value);
  const ok = !data.clippedLeft && !data.clippedRight && data.insideHeroV !== false;
  rows.push({ size: `${w}x${h}`, ...data, ok });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad('SIZE', 11), pad('FONT', 7), pad('WORD', 7), pad('FILL', 7), pad('CLIP', 8), pad('INHERO', 7), 'OK');
for (const r of rows) {
  const clip = `${r.clippedLeft ? 'L' : '-'}${r.clippedRight ? 'R' : '-'}`;
  console.log(
    pad(r.size, 11), pad(r.fontSize, 7), pad(r.wordW, 7), pad(r.fill, 7),
    pad(clip, 8), pad(r.insideHeroV, 7), r.ok ? 'PASS' : 'FAIL'
  );
}
const failures = rows.filter((r) => !r.ok);
console.log(`\n${rows.length - failures.length}/${rows.length} pass`);
if (failures.length) process.exitCode = 1;
ws.close();
