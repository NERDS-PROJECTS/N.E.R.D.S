/**
 * Dev-only diagnostic: waits, then reports the FINAL settled state of the
 * wordmark plus every variable that feeds its size, so a stale/cached value
 * can be distinguished from a live miscalculation.
 *
 * Usage:  node scripts/diag-final.mjs <cdp-http-endpoint> [waitMs]
 */
const endpoint = process.argv[2] || 'http://127.0.0.1:9401';
const waitMs = Number(process.argv[3] || 6000);

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

function report() {
  const title = document.querySelector('.hero-title');
  const hero = document.querySelector('.hero');
  const main = document.querySelector('.hero-title-main');
  if (!title || !hero || !main) return JSON.stringify({ error: 'lockup missing' });

  const tcs = getComputedStyle(title);
  const mcs = getComputedStyle(main);
  const hr = hero.getBoundingClientRect();
  const mr = main.getBoundingClientRect();

  return JSON.stringify({
    inlineTitleFit: title.style.getPropertyValue('--title-fit') || '(unset)',
    titleHasInlineStyle: title.getAttribute('style') || '(none)',
    // cascade-resolved values, which is what actually sizes the type
    resolvedTitleFit: tcs.getPropertyValue('--title-fit').trim() || '(unset)',
    resolvedGutter: tcs.getPropertyValue('--gutter').trim() || '(unset)',
    resolvedFallbackAdvance: tcs.getPropertyValue('--title-fallback-advance').trim() || '(unset)',
    titleClasses: title.className,
    mainFontSize: mcs.fontSize,
    mainFontSizePx: +parseFloat(mcs.fontSize).toFixed(1),
    heroRectW: Math.round(hr.width),
    mainRectW: Math.round(mr.width),
    mainLeft: Math.round(mr.left),
    mainRight: Math.round(mr.right),
    viewportW: innerWidth,
    docClientW: document.documentElement.clientWidth,
    fitsViewport: mr.left >= -1 && mr.right <= innerWidth + 1,
  }, null, 2);
}

await new Promise((r) => setTimeout(r, waitMs));
const out = await send('Runtime.evaluate', {
  expression: `(${report.toString()})()`,
  returnByValue: true,
});
console.log(out.result?.value ?? JSON.stringify(out, null, 2));
ws.close();
