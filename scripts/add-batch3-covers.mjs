/**
 * One-off: wire the third set of editorial cover images into their case
 * frontmatter (slug-based asset names, same image() pipeline as prior covers).
 * Inserts `cover` and `coverAlt` after the existing `description:` line.
 * Idempotent: skips a file that already has a cover. Body content untouched.
 * Run: node scripts/add-batch3-covers.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const casesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'cases');

const MAP = {
  'jonelle-matthews': 'A quiet snow-dusted residential street at dusk with a single porch light glowing, used as symbolic cover art for the Jonelle Matthews case.',
  '1996-the-ransom-note': 'A large older home at night in winter with warm-lit windows and bare trees, used as symbolic cover art for the JonBenét Ramsey ransom note case.',
  'the-silent-witness-1982': 'A long bridge over a dark misty river at night with distant city lights, used as symbolic cover art for the Wayne Williams fiber evidence case.',
  'citizen-justice': 'An empty Los Angeles street at first light with long shadows and low sun, used as symbolic cover art for the Night Stalker capture.',
  'hidden-in-plain-sight': 'A quiet California-style suburban street at night beneath a single streetlight, used as symbolic cover art for the Golden State Killer case.',
  'green-river-killer': 'A foggy Pacific Northwest riverbank at dawn bordered by dense evergreen forest, used as symbolic cover art for the Green River Killer case.',
  'trial-of-the-century': 'A weathered wooden ladder leaning against a dark rural farmhouse at night, used as symbolic cover art for the Lindbergh kidnapping case.',
};

let done = 0;
for (const [slug, alt] of Object.entries(MAP)) {
  const file = join(casesDir, `${slug}.md`);
  const src = await readFile(file, 'utf8');
  if (/^cover:/m.test(src)) { console.log(`skip (already has cover): ${slug}`); continue; }
  const block = `cover: ../../assets/cases/${slug}.png\ncoverAlt: "${alt}"`;
  const out = src.replace(/^(description:.*)$/m, `$1\n${block}`);
  if (out === src) { console.log(`NO description line, skipped: ${slug}`); continue; }
  await writeFile(file, out, 'utf8');
  done++;
  console.log(`wired: ${slug}`);
}
console.log(`\nWired ${done} cover(s).`);
