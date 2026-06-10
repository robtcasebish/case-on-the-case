/**
 * One-off copy cleanup: strip boilerplate "Full story coming soon." /
 * "Full write-up in progress." tails from placeholder case descriptions.
 * The in-progress state is now conveyed by the card/article treatment instead.
 * Run: node scripts/clean-placeholder-copy.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'cases');
const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));

const TAILS = /\s*(?:Full story coming soon\.|Full write-up in progress\.)(")/g;

let changed = 0;
for (const f of files) {
  const p = join(dir, f);
  const before = await readFile(p, 'utf8');
  const after = before.replace(TAILS, '$1');
  if (after !== before) {
    await writeFile(p, after, 'utf8');
    changed++;
  }
}
console.log(`Cleaned ${changed} file(s).`);
