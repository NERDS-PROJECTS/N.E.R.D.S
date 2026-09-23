/**
 * Dev-only diagnostic: verifies the hero wordmark FITS the viewport at each
 * breakpoint. `font-size` sizes glyph height and cannot know how wide
 * `ROBOTRON` will lay out, so this measures the painted word against the
 * screen and reports whether either edge is clipped.
 *
 * Usage:  node scripts/diag-width.mjs <cdp-http-endpoint>
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
  [1920, 1080],
  [1600, 900],
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [834, 1112],
  [430, 932],
  [390, 844],
  [360, 740],
];

const results = [];
for (const [w, h] of sizes) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: w,
    height: h,
    deviceScaleFactor: 1,
    mobile: false,
  });
  /* Reload per size so the sizing effect runs against THIS viewport, which
     is what a real visitor gets — resizing alone would only fire the
     resize handler and could mask a broken mount measurement. */
  await send('Page.reload', { ignoreCache: true });
  await new Promise((r) => setTimeout(r, 2600));

  const expression = `(() => {
    const main = document.querySelector('.hero-title-main');
    const title = document.querySelector('.hero-title');
    const mask = document.querySelector('.title-mask');
    if (!main) return JSON.stringify({ error: 'no .hero-title-main' });
    const cs = getComputedStyle(main);
    const r = (mask || main).getBoundingClientRect();
    return JSON.stringify({
      fontSize: cs.fontSize,
      wordW: Math.round(r.width),
      wordLeft: Math.round(r.left),
      wordRight: Math.round(r.right),
      fitVar: title.style.getPropertyValue('--title-fit') || '(unset)',
      widthRatio: +(r.width / innerWidth).toFixed(3),
      clippedLeft: r.left < -1,
      clippedRight: r.right > innerWidth + 1,
      fits: r.left >= -1 && r.right <= innerWidth + 1,
    });
  })()`;

  const out = await send('Runtime.evaluate', { expression, returnByValue: true });
  results.push({ viewport: `${w}x${h}`, ...JSON.parse(out.result.value) });
}

console.log(JSON.stringify(results, null, 2));

const bad = results.filter((r) => !r.fits);
console.log(
  '\n' +
    (bad.length === 0
      ? 'PASS: wordmark fits the viewport at every size.'
      : 'FAIL at: ' + bad.map((r) => r.viewport).join(', '))
);
ws.close();
process.exit(bad.length === 0 ? 0 : 1);
