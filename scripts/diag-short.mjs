/**
 * Dev-only diagnostic: checks the SHORT-viewport case, where the lockup can
 * overflow the hero's height and (because `.hero` is `overflow: hidden`)
 * crop the top line off screen. Also reports whether any clipping occurs.
 *
 * Usage:  node scripts/diag-short.mjs <cdp-http-endpoint>
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

const sizes = [
  [1920, 700],
  [1920, 620],
  [1600, 700],
  [1366, 620],
  [1024, 600],
];

const results = [];
for (const [w, h] of sizes) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: h, deviceScaleFactor: 1, mobile: false,
  });
  await new Promise((r) => setTimeout(r, 700));

  const expression = `(() => {
    const main = document.querySelector('.hero-title-main');
    const title = document.querySelector('.hero-title');
    const lockup = document.querySelector('.hero-type-anim');
    if (!main || !title || !lockup) return JSON.stringify({ error: 'missing' });
    const r = main.getBoundingClientRect();
    const lr = lockup.getBoundingClientRect();
    return JSON.stringify({
      fontSize: getComputedStyle(main).fontSize,
      // horizontal fit of the wordmark itself
      wordW: Math.round(r.width),
      wordClippedLeft: r.left < 0,
      wordClippedRight: r.right > innerWidth,
      // vertical fit of the WHOLE lockup (ROBOTRON + 2026 + COMING SOON)
      lockupTop: Math.round(lr.top),
      lockupBottom: Math.round(lr.bottom),
      lockupClippedTop: lr.top < 0,
      lockupClippedBottom: lr.bottom > innerHeight,
    });
  })()`;

  const out = await send('Runtime.evaluate', { expression, returnByValue: true });
  results.push({ viewport: `${w}x${h}`, ...JSON.parse(out.result.value) });
}

console.log(JSON.stringify(results, null, 2));
ws.close();
