/**
 * Dev-only probe: determines which value forms the CSS `scale` property
 * accepts in this engine, and what .hero-title currently computes to.
 *
 * Usage:  node scripts/probe-scale.mjs <cdp-http-endpoint>
 */
const endpoint = process.argv[2] || 'http://localhost:9366';

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
  const out = { styles: {}, matched: [] };
  document.documentElement.style.setProperty('--t-num', '0.8');
  const cases = [
    ['plain', '0.8'],
    ['var-number', 'var(--t-num)'],
    ['var-fallback', 'var(--missing-x, 0.9)'],
    ['calc-number', 'calc(0.5 + 0.3)'],
    ['clamp-vh', 'clamp(0.55, 0.085vh, 1)'],
    ['percent', '80%'],
    ['two-values', '0.8 1.1'],
  ];
  for (const pair of cases) {
    const name = pair[0];
    const value = pair[1];
    const d = document.createElement('div');
    d.style.scale = value;
    document.body.appendChild(d);
    out.styles[name] = {
      value: value,
      accepted: d.style.scale,
      computed: getComputedStyle(d).scale,
    };
    d.remove();
  }

  const el = document.querySelector('.hero-title');
  out.heroTitleComputedScale = getComputedStyle(el).scale;
  out.heroTitleRectHeight = el.getBoundingClientRect().height;
  out.viewportH = window.innerHeight;

  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch (e) { continue; }
    const walk = function (list2, mediaText) {
      for (const r of list2) {
        if (r.media) {
          walk(r.cssRules, r.media.mediaText);
        } else if (r.selectorText && r.style && r.style.scale
          && r.selectorText.indexOf('hero-title') !== -1) {
          out.matched.push({ selector: r.selectorText, scale: r.style.scale, media: mediaText });
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
