/**
 * Dev-only diagnostic: prints how the browser RESOLVED the title sizing
 * custom properties, so a fallback/typo/gutter problem can be told apart
 * from a JS problem.
 *
 * Usage:  node scripts/diag-vars.mjs <cdp-http-endpoint>
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

function readVars() {
  const out = {};
  const title = document.querySelector('.hero-title');
  const main = document.querySelector('.hero-title-main');
  const root = document.documentElement;

  const grab = (el, name) =>
    el ? getComputedStyle(el).getPropertyValue(name).trim() || '(empty)' : '(no el)';

  out.rootGutter = grab(root, '--gutter');
  out.titleGutter = grab(title, '--gutter');
  out.titleFallbackAdvance = grab(title, '--title-fallback-advance');
  out.titleFitOnTitle = grab(title, '--title-fit');
  out.titleFitOnMain = grab(main, '--title-fit');
  out.rootTitleFit = grab(root, '--title-fit');
  out.titleFontSize = grab(main, 'font-size');
  out.titleInlineStyle = title ? title.getAttribute('style') : null;

  // Evaluate the intended fallback calc by hand for comparison.
  const g = parseFloat(getComputedStyle(title).getPropertyValue('--gutter')) || 0;
  out.manualFallback = ((document.documentElement.clientWidth - 2 * g) / 5.83).toFixed(2);
  out.innerWidth = innerWidth;
  out.docClientWidth = document.documentElement.clientWidth;
  return JSON.stringify(out, null, 2);
}

const out = await send('Runtime.evaluate', {
  expression: `(${readVars.toString()})()`,
  returnByValue: true,
});
console.log(out.result?.value ?? JSON.stringify(out, null, 2));
ws.close();
