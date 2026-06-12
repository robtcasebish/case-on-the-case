/**
 * One-off: wire reused orphan cover images (renamed to their target slugs)
 * into five articles. Inserts `cover` + `coverAlt` after the `description:`
 * line. Idempotent. No new images created; assets already exist in src/assets/cases.
 * Run: node scripts/add-reused-covers.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const casesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'cases');

const MAP = {
  'brandon-swanson': 'A rural road at dusk leading toward a distant town, used as symbolic cover art for the Brandon Swanson case.',
  'carla-walker': 'An old calendar and investigation files on a worn desk, used as symbolic cover art for the Carla Walker cold case.',
  'sherri-rasmussen': 'A wax-sealed envelope resting on a vintage desk, used as symbolic cover art for the Sherri Rasmussen case.',
  'colin-pitchfork': 'A sealed archival case folder on a vintage investigation desk, used as symbolic cover art for the Colin Pitchfork case.',
  'btk-dennis-rader': 'Two shadowed identity documents laid over a map, used as symbolic cover art for the BTK case.',
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
  console.log(`wired cover: ${slug}`);
}
console.log(`\nWired ${done} reused cover(s).`);
