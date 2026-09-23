/**
 * Dev-only: capture a PNG of the hero at a given viewport so the wordmark
 * can be eyeballed rather than only measured.
 *
 * Usage:  node scripts/shot.mjs <cdp-http-endpoint> <w> <h> <outfile>
 */
import fs from 'node:fs';

const endpoint = process.argv[2] || 'http://127.0.0.1:9388';
const W = Number(process.argv[3] || 1440);
const H = Number(process.argv[4] || 900);
const outFile = process.argv[5] || `shot-${W}x${H}.png`;

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
await send('Emulation.setDeviceMetricsOverride', {
  width: W, height: H, deviceScaleFactor: 1, mobile: false,
});
await send('Page.reload', { ignoreCache: true });
/* Long enough for the entrance timeline (≈3s) to finish, so the captured
   frame is the RESTING composition, not a mid-animation pose. */
await new Promise((r) => setTimeout(r, 6000));

const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));
console.log(`wrote ${outFile} (${W}x${H})`);
ws.close();
