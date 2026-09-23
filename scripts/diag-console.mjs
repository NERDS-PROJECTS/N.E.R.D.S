/**
 * Dev-only diagnostic: captures console output from a fresh load so the
 * Hero sizing effect's own log lines can be read verbatim.
 *
 * Usage:  node scripts/diag-console.mjs <cdp-http-endpoint> [waitMs]
 */
const endpoint = process.argv[2] || 'http://127.0.0.1:9401';
const waitMs = Number(process.argv[3] || 7000);

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

const logs = [];
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.method === 'Runtime.consoleAPICalled') {
    const text = (msg.params.args || [])
      .map((a) => (a.value !== undefined ? a.value : a.description || a.type))
      .join(' ');
    if (text.indexOf('[hero-fit]') !== -1 || text.indexOf('hero-fit') !== -1) {
      logs.push(text);
    }
  }
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
  }
});

await new Promise((r) => ws.addEventListener('open', r));
await send('Runtime.enable', {});
await send('Page.enable', {});
await send('Page.reload', { ignoreCache: true });
await new Promise((r) => setTimeout(r, waitMs));

console.log('--- [hero-fit] log lines (' + logs.length + ') ---');
logs.forEach((l) => console.log(l));

const state = await send('Runtime.evaluate', {
  expression: `(() => {
    const t = document.querySelector('.hero-title');
    const m = document.querySelector('.hero-title-main');
    return JSON.stringify({
      inline: t ? (t.getAttribute('style') || '(none)') : 'no-el',
      fontSize: m ? getComputedStyle(m).fontSize : null,
      docW: document.documentElement.clientWidth,
    });
  })()`,
  returnByValue: true,
});
console.log('--- final state ---');
console.log(state.result?.value);
ws.close();
