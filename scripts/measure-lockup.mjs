/**
 * Dev-only probe: measures the RESTING geometry of the hero startup lockup
 * over the Chrome DevTools Protocol, after the entrance timeline has
 * finished. Used to verify the lockup is huge, centred and fully on screen.
 *
 * Usage:  node scripts/measure-lockup.mjs <cdp-http-endpoint>
 */
const endpoint = process.argv[2] || 'http://localhost:9333';
const delayMs = Number(process.argv[3] || 4000);

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

/* Force a genuinely cache-free reload. Without this the measurement can
   reflect a previously-cached bundle and report stale geometry. The reload
   destroys the JS execution context, so the evaluate below is retried until
   the post-reload page is ready instead of reusing the old context. */
await send('Network.enable', {});
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.enable', {});
await send('Page.reload', { ignoreCache: true });
await new Promise((r) => setTimeout(r, 1500));

const expression = `(async () => {
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  await wait(${delayMs});
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width), h: Math.round(r.height) },
      fontSize: cs.fontSize,
      transform: cs.transform,
      clippedAbove: r.top < 0,
      clippedBelow: r.bottom > innerHeight,
      clippedLeft: r.left < 0,
      clippedRight: r.right > innerWidth,
    };
  };
  const nav = document.querySelector('.nav');
  return JSON.stringify({
    viewport: { w: innerWidth, h: innerHeight },
    navHeight: nav ? Math.round(nav.getBoundingClientRect().height) : null,
    wrapper: box('.hero-type'),
    animWrapper: box('.hero-type-anim'),
    title: box('.hero-title'),
    main: box('.hero-title-main'),
    year: box('.hero-year'),
    comingSoon: box('.hero-coming-soon'),
    wrapMx: getComputedStyle(document.querySelector('.hero-type')).getPropertyValue('--mx'),
  }, null, 2);
})()`;

const out = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
console.log(out.result.value ?? JSON.stringify(out, null, 2));
ws.close();
