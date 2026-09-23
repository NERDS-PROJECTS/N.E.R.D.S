/**
 * Dev-only diagnostic: measures the SHORT-viewport case on the scaled
 * element itself (`.hero-title`), not on its unscaled parent. `scale` does
 * not change a parent's layout box, so measuring `.hero-type-anim` reports
 * the pre-scale geometry and cannot tell us whether the visible lockup fits.
 *
 * Usage:  node scripts/diag-short2.mjs <cdp-http-endpoint>
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

const sizes = [[1920, 700], [1920, 620], [1024, 600], [1440, 900]];

const rows = [];
for (const [w, h] of sizes) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: h, deviceScaleFactor: 1, mobile: false,
  });
  await new Promise((r) => setTimeout(r, 1200));

  const expr = `(() => {
    const title = document.querySelector('.hero-title');
    const main = document.querySelector('.hero-title-main');
    if (!title || !main) return JSON.stringify({ error: 'missing' });
    const tcs = getComputedStyle(title);
    // .hero-title is the SCALED element, so its rect is the VISIBLE box.
    const tr = title.getBoundingClientRect();
    const hero = document.querySelector('.hero').getBoundingClientRect();
    return JSON.stringify({
      lockupScale: tcs.scale,
      titleFontSize: getComputedStyle(main).fontSize,
      visibleTop: Math.round(tr.top),
      visibleBottom: Math.round(tr.bottom),
      visibleH: Math.round(tr.height),
      heroH: Math.round(hero.height),
      fitsY: tr.top >= -1 && tr.bottom <= innerHeight + 1,
    });
  })()`;

  const out = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  rows.push({ viewport: `${w}x${h}`, ...JSON.parse(out.result.value) });
}

console.log(JSON.stringify(rows, null, 2));
ws.close();
