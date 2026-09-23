/**
 * Dev-only diagnostic: measures the wordmark's true advance at the size the
 * page actually applied, to explain why the fit stops short of the width.
 *
 * Usage:  node scripts/diag-advance.mjs <cdp-http-endpoint>
 */
const endpoint = process.argv[2] || 'http://127.0.0.1:9401';

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

function measure() {
  const hero = document.querySelector('.hero');
  const title = document.querySelector('.hero-title');
  const main = document.querySelector('.hero-title-main');
  if (!hero || !title || !main) return JSON.stringify({ error: 'missing' });

  const mcs = getComputedStyle(main);
  const applied = parseFloat(mcs.fontSize);
  const realRect = main.getBoundingClientRect();

  // Mirror the component: sample the REAL element at 100px.
  const prev = title.style.getPropertyValue('--title-fit');
  title.style.setProperty('--title-fit', '100px');
  const naturalW = main.getBoundingClientRect().width;
  const emPerWord = naturalW / 100;
  if (prev) title.style.setProperty('--title-fit', prev);
  else title.style.removeProperty('--title-fit');

  const titlePad =
    parseFloat(getComputedStyle(title).paddingLeft) +
    parseFloat(getComputedStyle(title).paddingRight);
  const available = document.documentElement.clientWidth - titlePad;

  return JSON.stringify({
    appliedFontSize: +applied.toFixed(2),
    realElementWidth: +realRect.width.toFixed(2),
    realEmPerWord: +(realRect.width / applied).toFixed(4),
    sampledNaturalWidthAt100: +naturalW.toFixed(2),
    sampledEmPerWord: +emPerWord.toFixed(4),
    available,
    fillRatio: +(realRect.width / available).toFixed(3),
    titleFitInline: title.style.getPropertyValue('--title-fit') || '(unset)',
  }, null, 2);
}

const out = await send('Runtime.evaluate', {
  expression: `(${measure.toString()})()`,
  returnByValue: true,
});
console.log(out.result?.value ?? JSON.stringify(out, null, 2));
ws.close();
