/**
 * Minimal PNG analysis — scans a screenshot to find bright/white pixel
 * clusters (the ROBOTRON / 2026 / COMING SOON text) and reports their
 * bounding box as a fraction of the viewport. No external deps.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function parsePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504E47) throw new Error('Not a PNG');
  let pos = 8;
  let w, h, bitDepth, colorType, idatData = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('latin1', pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatData.push(data);
    } else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const raw = zlib.unzipSync(Buffer.concat(idatData));
  // Determine channel count from color type
  const chans = [0,1,1,2,3,4,3,4][colorType];
  const bpp = chans; // 8-bit assumed
  // Un-filter the scanlines
  const stride = w * bpp;
  const pixels = new Uint8Array(w * h * bpp);
  let src = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[src++];
    const dstRow = y * stride;
    // Copy raw bytes for this row
    for (let i = 0; i < stride; i++) pixels[dstRow + i] = raw[src++];
    // Reverse the filter
    if (filter === 1) { // Sub
      for (let i = 0; i < stride; i++) {
        if (i >= bpp) pixels[dstRow + i] += pixels[dstRow + i - bpp];
      }
    } else if (filter === 2) { // Up
      if (y > 0) for (let i = 0; i < stride; i++) pixels[dstRow + i] += pixels[dstRow - stride + i];
    } else if (filter === 3) { // Average
      for (let i = 0; i < stride; i++) {
        let left = (i >= bpp) ? pixels[dstRow + i - bpp] : 0;
        let up = (y > 0) ? pixels[dstRow - stride + i] : 0;
        pixels[dstRow + i] += Math.floor((left + up) / 2);
      }
    } else if (filter === 4) { // Paeth
      for (let i = 0; i < stride; i++) {
        let left = (i >= bpp) ? pixels[dstRow + i - bpp] : 0;
        let up = (y > 0) ? pixels[dstRow - stride + i] : 0;
        let ul = (y > 0 && i >= bpp) ? pixels[dstRow - stride + i - bpp] : 0;
        let p = left + up - ul;
        let pa = Math.abs(p - left), pb = Math.abs(p - up), pc = Math.abs(p - ul);
        let pr = (pa <= pb && pa <= pc) ? left : (pb <= pc ? up : ul);
        pixels[dstRow + i] += pr;
      }
    }
  }
  return { w, h, bpp, pixels };
}

function isBright(p, idx) {
  // Treat as bright if any channel is very high (the gradient text has white highlights)
  const r = p[idx], g = p[idx+1], b = p[idx+2];
  const a = p[idx+3];
  if (a !== undefined && a < 128) return false; // transparent
  return r > 200 || g > 200 || b > 200;
}

function analyze(file) {
  const buf = fs.readFileSync(file);
  const png = parsePNG(buf);
  const { w, h, bpp, pixels } = png;
  let minX = w, minY = h, maxX = 0, maxY = 0;
  let count = 0;
  // Sample: scan for bright pixels (the text + its glow)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w * bpp + x * bpp;
      if (isBright(pixels, idx)) {
        count++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`\n=== ${file} (${w}x${h}) ===`);
  console.log(`Bright pixels found: ${count}`);
  if (count === 0) { console.log('  No bright pixels — text may be rendered differently'); return; }
  console.log(`Bounding box:`);
  console.log(`  X: ${minX} to ${maxX}  (${((maxX-minX)/w*100).toFixed(1)}% of width)`);
  console.log(`  Y: ${minY} to ${maxY}  (${((maxY-minY)/h*100).toFixed(1)}% of height)`);
  console.log(`  Center X: ${(minX+maxX)/2} (viewport center: ${w/2})  → offset: ${((minX+maxX)/2 - w/2)/(w/2)*100}%`);
  console.log(`  Center Y: ${(minY+maxY)/2} (viewport center: ${h/2})  → offset: ${((minY+maxY)/2 - h/2)/(h/2)*100}%`);
  console.log(`  Block height: ${(maxY-minY)}px = ${((maxY-minY)/h*100).toFixed(1)}% of viewport`);
}

const dir = path.resolve(__dirname, '..');
for (const f of ['final-1920.png', 'final-short.png', 'shot-1920.png']) {
  const fp = path.join(dir, f);
  if (fs.existsSync(fp)) analyze(fp);
}
