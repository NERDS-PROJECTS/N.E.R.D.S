/**
 * Capture screenshots via Chrome CDP using puppeteer-core + ws.
 * Usage: node scripts/capture-screenshot.cjs [port] [url]
 */
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const PORT = parseInt(process.argv[2] || '9222');
const URL = process.argv[3] || 'http://localhost:5215/';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

function waitForCDP() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const tryConnect = () => {
      attempts++;
      const req = http.get(`http://127.0.0.1:${PORT}/json/version`, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => resolve(JSON.parse(data)));
      });
      req.on('error', () => {
        if (attempts < 40) setTimeout(tryConnect, 500);
        else reject(new Error('CDP not ready after 20s'));
      });
      req.setTimeout(2000, () => { req.destroy(); if (attempts < 40) setTimeout(tryConnect, 500); else reject(new Error('CDP timeout')) });
    };
    tryConnect();
  });
}

async function main() {
  console.log('Starting Chrome with remote debugging...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--window-size=1920,1080',
    '--force-device-scale-factor=1',
    '--remote-allow-origins=*',
    '--remote-debugging-port=' + PORT,
    URL,
  ], { stdio: 'pipe' });

  chrome.stdout.on('data', d => process.stdout.write('[chrome] ' + d));
  chrome.stderr.on('data', d => process.stderr.write('[chrome-err] ' + d));

  try {
    console.log('Waiting for CDP...');
    await waitForCDP();

    // Get WebSocket URL
    const tabs = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${PORT}/json`, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
    const page = tabs.find(t => t.type === 'page');
    const wsUrl = page.webSocketDebuggerUrl;
    console.log('Connecting to:', wsUrl);

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.on('open', resolve);
      ws.on('error', reject);
      setTimeout(() => reject(new Error('WS timeout')), 10000);
    });
    console.log('WebSocket connected!');

    let msgId = 1;
    const pending = new Map();
    ws.on('message', (raw) => {
      const msg = JSON.parse(raw.toString());
      if (msg.id && pending.has(msg.id)) {
        const { resolve } = pending.get(msg.id);
        pending.delete(msg.id);
        resolve(msg);
      }
    });

    function cdp(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++msgId;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
        setTimeout(() => {
          if (pending.has(id)) {
            pending.delete(id);
            reject(new Error('CDP ' + method + ' timeout'));
          }
        }, 10000);
      });
    }

    // Enable domains and wait for load
    await cdp('Page.enable');
    await cdp('Runtime.enable');

    console.log('Waiting for page load (8s)...');
    await new Promise(r => setTimeout(r, 8000));

        // Set viewport to exact 1920x1080 before capturing
    console.log('Setting viewport to 1920x1080...');
    await cdp('Emulation.setDeviceMetricsOverride', {
      width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false
    });
    await new Promise(r => setTimeout(r, 500));

    // Capture 1920x1080 screenshot
    console.log('Capturing 1920x1080 screenshot...');
    const result = await cdp('Page.captureScreenshot', {
      format: 'png',
      quality: 100,
      captureBeyondViewport: false,
    });

    if (result.result && result.result.data) {
      const buf = Buffer.from(result.result.data, 'base64');
      fs.writeFileSync('new-shot-1920.png', buf);
      console.log('Saved new-shot-1920.png (' + buf.length + ' bytes)');
    } else {
      console.log('No data:', JSON.stringify(result));
    }

    // Capture 1920x700 screenshot
    console.log('Capturing 1920x700 screenshot...');
    await cdp('Emulation.setDeviceMetricsOverride', {
      width: 1920, height: 700, deviceScaleFactor: 1, mobile: false
    });
    await new Promise(r => setTimeout(r, 2000));
    const result2 = await cdp('Page.captureScreenshot', {
      format: 'png',
      quality: 100,
      captureBeyondViewport: false,
    });
    if (result2.result && result2.result.data) {
      const buf = Buffer.from(result2.result.data, 'base64');
      fs.writeFileSync('new-shot-700.png', buf);
      console.log('Saved new-shot-700.png (' + buf.length + ' bytes)');
    }

    ws.close();
  } catch(e) {
    console.error('Error:', e.message);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}

main();
