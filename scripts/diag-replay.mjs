/**
 * Dev-only diagnostic: replays Hero.jsx's width-aware sizing logic
 * step-by-step in the live page and prints every intermediate value, so a
 * wrong ratio can be told apart from a wrong available width.
 *
 * Usage:  node scripts/diag-replay.mjs <cdp-http-endpoint>
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

function replay() {
  const title = document.querySelector('.hero-title');
  const main = title && title.querySelector('.hero-title-main');
  const hero = title && title.closest('.hero');
  if (!title || !main || !hero) return JSON.stringify({ error: 'missing elements' });

  const SAMPLE = 100;
  const out = { before: { fitVar: title.style.getPropertyValue('--title-fit') || '(unset)' } };

  // Step 1: pin the sample size, exactly as the component does.
  title.style.setProperty('--title-fit', `${SAMPLE}px`);

  // Step 2: read the shrink-wrapped advance.
  const measureEl = main.querySelector('.title-mask') || main;
  const naturalW = measureEl.getBoundingClientRect().width;
  const emPerWord = naturalW / SAMPLE;

  out.measure = {
    measureEl: measureEl.className,
    measureElDisplay: getComputedStyle(measureEl).display,
    naturalW: +naturalW.toFixed(2),
    emPerWord: +emPerWord.toFixed(4),
    mainDisplay: getComputedStyle(main).display,
    mainRectW: +main.getBoundingClientRect().width.toFixed(2),
  };

  // Step 3: available width.
  const tcs = getComputedStyle(title);
  const titlePad = parseFloat(tcs.paddingLeft || '0') + parseFloat(tcs.paddingRight || '0');
  const parentW = hero.parentElement ? hero.parentElement.clientWidth : null;
  const available = (parentW != null ? parentW : document.documentElement.clientWidth) - titlePad;

  out.available = {
    heroParentTag: hero.parentElement ? hero.parentElement.tagName + '.' + hero.parentElement.className : null,
    parentClientWidth: parentW,
    docClientWidth: document.documentElement.clientWidth,
    titlePad,
    available,
  };

  // Step 4: the fit the component would write.
  out.result = {
    fit: available >= 200 ? +(available / (emPerWord * 1.02)).toFixed(2) : 'BAILED (available < 200)',
    // sanity: what the word width WOULD be at that fit
  };

  // Restore so the page is left as found.
  title.style.removeProperty('--title-fit');
  return JSON.stringify(out, null, 2);
}

const out = await send('Runtime.evaluate', {
  expression: `(${replay.toString()})()`,
  returnByValue: true,
});
console.log(out.result?.value ?? JSON.stringify(out, null, 2));
ws.close();
