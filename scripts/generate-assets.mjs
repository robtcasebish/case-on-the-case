/**
 * One-off brand asset generator. Renders the default OpenGraph card and the
 * square logo (used in Organization schema) from inline SVG via sharp.
 * Run: node scripts/generate-assets.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
await mkdir(publicDir, { recursive: true });

const BG = '#0b0b0d';
const CRIMSON = '#c1121f';
const SEPIA = '#c9a96a';
const TEXT = '#e9e6e1';
const MUTED = '#a7a39b';

const serif =
  "'Iowan Old Style','Palatino Linotype',Palatino,'Book Antiqua',Georgia,'Times New Roman',serif";
const sans = "system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const glass = (cx, cy, r, sw) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${CRIMSON}" stroke-width="${sw}"/>
  <line x1="${cx + r * 0.7}" y1="${cy + r * 0.7}" x2="${cx + r * 1.45}" y2="${cy + r * 1.45}"
        stroke="${CRIMSON}" stroke-width="${sw * 1.2}" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.42}" fill="${SEPIA}"/>`;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="50%" cy="-10%" r="120%">
      <stop offset="0%" stop-color="#15151a"/>
      <stop offset="60%" stop-color="${BG}"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="${CRIMSON}"/>
  ${glass(995, 175, 95, 16)}
  <text x="90" y="150" font-family="${sans}" font-size="26" letter-spacing="6"
        fill="${SEPIA}" font-weight="600">INVESTIGATIVE TRUE CRIME</text>
  <text x="86" y="320" font-family="${serif}" font-size="112" fill="${TEXT}"
        font-weight="700">Case on the Case</text>
  <text x="90" y="400" font-family="${serif}" font-size="40" fill="${MUTED}"
        font-style="italic">Told with care. Sourced with rigor.</text>
  <text x="90" y="560" font-family="${sans}" font-size="28" fill="${MUTED}"
        font-weight="600">caseonthecase.com</text>
</svg>`;

const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${BG}"/>
  ${glass(216, 216, 112, 40)}
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, 'og-default.png'));
await sharp(Buffer.from(logoSvg)).png().toFile(join(publicDir, 'logo.png'));
// A 180x180 apple-touch-icon for good measure.
await sharp(Buffer.from(logoSvg)).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'));

console.log('Generated: og-default.png, logo.png, apple-touch-icon.png');
