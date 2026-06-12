/**
 * One-off: wire the 16 new symbolic editorial covers (already renamed to their
 * target slugs in src/assets/cases) into their articles. Inserts `cover` and
 * `coverAlt` after the `description:` line. Idempotent. No new images created here.
 * Run: node scripts/add-final-covers.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const casesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'cases');

const MAP = {
  'polly-klaas': 'A dim hallway opening onto a child\'s bedroom, with candles glowing in an adjoining room, used as symbolic cover art for the Polly Klaas case.',
  'megan-kanka': 'A suburban house at dusk with a single warmly lit doorway, used as symbolic cover art for the Megan Kanka case.',
  'kitty-genovese': 'A dark city apartment building at night with scattered lit windows above an empty wet street, used as symbolic cover art for the Kitty Genovese case.',
  'matthew-shepard': 'A weathered wooden fence on an open prairie under a wide sunset sky, used as symbolic cover art for the Matthew Shepard case.',
  'laci-peterson': 'A fog-shrouded bay bridge at dawn seen from a rocky shore, used as symbolic cover art for the Laci Peterson case.',
  'boy-in-the-box': 'An empty, weathered cardboard box on the floor of a misty forest, used as symbolic cover art for the Boy in the Box case.',
  'asha-degree': 'A rain-slicked rural road at night beneath a single streetlight, used as symbolic cover art for the Asha Degree case.',
  'beaumont-children': 'A quiet beach at sunset with a line of footprints in the sand near the water, used as symbolic cover art for the Beaumont children case.',
  'bear-brook-murders': 'A misty evergreen forest at dawn, used as symbolic cover art for the Bear Brook murders.',
  'buckskin-girl': 'A fringed buckskin garment resting on an aged map in soft light, used as symbolic cover art for the Buckskin Girl case.',
  'springfield-three': 'A suburban home at night with a warmly lit front entrance, used as symbolic cover art for the Springfield Three case.',
  'maura-murray': 'A snow-dusted forest road curving into the dusk, used as symbolic cover art for the Maura Murray case.',
  'luka-magnotta': 'A dark desk workspace lit by screens showing network and link diagrams, used as symbolic cover art for the Luka Magnotta case.',
  'zodiac-killer': 'A foggy coastal road at night marked with faint cipher-like symbols, used as symbolic cover art for the Zodiac Killer case.',
  'hall-mills-murders': 'A solitary tree in a misty field at dusk, used as symbolic cover art for the Hall-Mills murders.',
  'hinterkaifeck-murders': 'A moonlit, snow-covered farmstead at night with footprints leading toward the house, used as symbolic cover art for the Hinterkaifeck murders.',
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
console.log(`\nWired ${done} cover(s).`);
