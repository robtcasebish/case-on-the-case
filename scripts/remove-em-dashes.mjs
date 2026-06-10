/**
 * One-off: remove every em dash (U+2014) from source + docs, replacing it with a
 * comma (the standard substitution) and tidying any doubled commas. Only spaces
 * and tabs around the dash are consumed, so line breaks are preserved.
 * Run: node scripts/remove-em-dashes.mjs
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXT = new Set(['.md', '.astro', '.ts', '.mjs', '.css']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);
const EXTRA = ['README.md', 'DEPLOY.md'];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(join(dir, entry.name));
    } else if (EXT.has(extname(entry.name)) && entry.name !== 'remove-em-dashes.mjs') {
      yield join(dir, entry.name);
    }
  }
}

const targets = [];
for (const sub of ['src', 'scripts', 'docs']) {
  try {
    await stat(join(root, sub));
    for await (const f of walk(join(root, sub))) targets.push(f);
  } catch {}
}
for (const f of EXTRA) targets.push(join(root, f));

let changed = 0;
let removed = 0;
for (const file of targets) {
  let before;
  try { before = await readFile(file, 'utf8'); } catch { continue; }
  if (!before.includes('—')) continue;
  removed += (before.match(/—/g) || []).length;
  const after = before
    .replace(/[ \t]*—[ \t]*/g, ', ')
    .replace(/,(?:[ \t]*,)+/g, ',') // collapse accidental double commas
    .replace(/, +/g, ', ');
  if (after !== before) {
    await writeFile(file, after, 'utf8');
    changed++;
  }
}
console.log(`Removed ${removed} em dash(es) across ${changed} file(s).`);
