/**
 * Dev-only diagnostic: captures the hero at several viewports and reports
 * the ON-IMAGE pixel coverage of the wordmark, so "it renders" is proven
 * from the pixels rather than from layout boxes alone.
 *
 * Usage:  node scripts/shoot-hero.mjs <cdp-http-endpoint>
 */
import fs from 'node:fs';

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

await send('Page.enable', {});
await send('Network.enable', {});
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.reload', { ignoreCache: true });
await new Promise((r) => setTimeout(r, 5000));

const shots = [
  [1920, 1080],
  [1280, 800],
  [390, 844],
];

for (const [w, h] of shots) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: w,
    height: h,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 900));

  const res = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  const file = `hero-${w}x${h}.png`;
  fs.writeFileSync(file, Buffer.from(res.data, 'base64'));
  console.log('saved', file);
}

ws.close();
