/**
 * Dev-only probe: reads the live computed style of the lockup elements and
 * the fontSize actually resolved by the browser, so CSS-vs-measurement
 * mismatches can be told apart.
 *
 * Usage:  node scripts/probe-live.mjs <cdp-http-endpoint>
 */
const endpoint = process.argv[2] || 'http://localhost:9377';

const list = await (await fetch(`${endpoint}/json/list`)).json();
const page = list.find((t) => t.type === 'page');
if (!page) throw new Error('no page target');

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (method, params) =>
  new Promise((res) => {
    const n = ++id;
    pending.set(n, res);
    ws.send(JSON.stringify({ id: n, method, params }));
  });

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
});

await new Promise((r) => ws.addEventListener('open', r));

function probeFn() {
  const out = { topRules: [] };
  const t = document.querySelector('.hero-type');
  out.inlineStyle = t.getAttribute('style');
  out.classes = t.className;

  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch (e) { continue; }
    const walk = function (list2, mediaText) {
      for (const r of list2) {
        if (r.media) {
          walk(r.cssRules, r.media.mediaText);
        } else if (r.selectorText && r.style) {
          const sel = r.selectorText;
          if (sel.indexOf('hero-type') !== -1 || sel === '.pl' || sel === '.pl-inset-piece') {
            if (r.style.top || r.style.inset || r.style.translate || r.style.position) {
              out.topRules.push({
                selector: sel,
                media: mediaText,
                position: r.style.position,
                top: r.style.top,
                inset: r.style.inset,
                translate: r.style.translate,
              });
            }
          }
        }
      }
    };
    walk(rules, null);
  }
  return JSON.stringify(out, null, 2);
}

const expression = `(${probeFn.toString()})()`;
const out = await send('Runtime.evaluate', { expression, returnByValue: true });
console.log(out.result.value ?? JSON.stringify(out, null, 2));
ws.close();
