/**
 * Dev-only: captures a screenshot of the hero so the wordmark can be
 * confirmed visually. Uses Chrome CDP against an already-running instance.
 *
 * Usage:  node scripts/shot-hero.mjs <cdp-http-endpoint> <out.png> [width] [height]
 */
import fs from 'node:fs';

const endpoint = process.argv[2] || 'http://127.0.0.1:9377';
const outFile = process.argv[3] || 'hero-shot.png';
const W = Number(process.argv[4] || 1920);
const H = Number(process.argv[5] || 1080);

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

await send('Emulation.setDeviceMetricsOverride', {
  width: W, height: H, deviceScaleFactor: 1, mobile: false,
});
/* Let the entrance timeline finish so the lockup is at its resting pose. */
await new Promise((r) => setTimeout(r, 5000));

const res = await send('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: false,
});
fs.writeFileSync(outFile, Buffer.from(res.data, 'base64'));
console.log(`saved ${outFile} at ${W}x${H}`);
ws.close();
