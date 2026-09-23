/**
 * Dev-only verification: launches its OWN fresh Chrome for each viewport so
 * no HMR module-swap or stale inline style can contaminate the reading, then
 * reports whether the wordmark fits BOTH axes.
 *
 * Usage:  node scripts/diag-verify.mjs [url]
 */
import { spawn } from 'node:child_process';
import http from 'node:http';

const url = process.argv[2] || 'http://localhost:5215/';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const sizes = [
  [1920, 1080],
  [1920, 700],
  [1440, 900],
  [1024, 600],
  [390, 844],
];

const waitFor = (port, attempts = 60) =>
  new Promise((resolve, reject) => {
    const tick = (n) => {
      const req = http.get(`http://127.0.0.1:${port}/json/version`, (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(JSON.parse(d)));
      });
      req.on('error', () => (n < attempts ? setTimeout(() => tick(n + 1), 400) : reject(new Error('cdp timeout'))));
      req.setTimeout(2000, () => req.destroy());
    };
    tick(0);
  });

async function measure(port, w, h) {
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const pg = tabs.find((t) => t.type === 'page');
  const ws = new WebSocket(pg.webSocketDebuggerUrl);
  let id = 0;
  const pend = new Map();
  const send = (m, p) =>
    new Promise((res) => {
      const n = ++id;
      pend.set(n, res);
      ws.send(JSON.stringify({ id: n, method: m, params: p }));
    });
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) {
      pend.get(m.id)(m.result);
      pend.delete(m.id);
    }
  });
  await new Promise((r) => ws.addEventListener('open', r));

  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: h, deviceScaleFactor: 1, mobile: false,
  });
  // Give the resize handler + rAF re-measure time to settle.
  await new Promise((r) => setTimeout(r, 1500));

  const expr = `(() => {
    const main = document.querySelector('.hero-title-main');
    const lockup = document.querySelector('.hero-type-anim');
    if (!main || !lockup) return JSON.stringify({ error: 'missing' });
    const r = main.getBoundingClientRect();
    const lr = lockup.getBoundingClientRect();
    const cs = getComputedStyle(main);
    return JSON.stringify({
      fontSize: cs.fontSize,
      fitVar: cs.getPropertyValue('--title-fit').trim(),
      wordW: Math.round(r.width),
      wordH: Math.round(r.height),
      wordFitsX: r.left >= -1 && r.right <= innerWidth + 1,
      lockupTop: Math.round(lr.top),
      lockupBottom: Math.round(lr.bottom),
      lockupFitsY: lr.top >= -1 && lr.bottom <= innerHeight + 1,
    });
  })()`;

  const out = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  ws.close();
  return JSON.parse(out.result.value);
}

const rows = [];
for (const [w, h] of sizes) {
  const port = 9400 + Math.floor(Math.random() * 400);
  const chrome = spawn(chromePath, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    `--window-size=${w},${h}`, '--force-device-scale-factor=1',
    '--remote-allow-origins=*', `--remote-debugging-port=${port}`,
    `--user-data-dir=C:/Users/qwere/AppData/Local/Temp/cdpv-${port}`,
    url,
  ], { stdio: 'ignore' });

  try {
    await waitFor(port);
    await new Promise((r) => setTimeout(r, 4500));
    rows.push({ viewport: `${w}x${h}`, ...(await measure(port, w, h)) });
  } catch (e) {
    rows.push({ viewport: `${w}x${h}`, error: e.message });
  } finally {
    chrome.kill();
    await new Promise((r) => setTimeout(r, 300));
  }
}

console.log(JSON.stringify(rows, null, 2));
