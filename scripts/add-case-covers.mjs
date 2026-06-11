/**
 * One-off: wire the second set of editorial cover images into their case
 * frontmatter. Inserts `cover` (relative path into the Astro image() pipeline,
 * matching the db-cooper/tylenol convention) and `coverAlt` right after the
 * existing `description:` line. Idempotent: skips a file that already has a
 * cover. Does NOT touch article body content or any other field.
 * Run: node scripts/add-case-covers.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const casesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'cases');

// slug (md filename) -> { img (filename in src/assets/cases), alt, todo? }
const MAP = {
  'april-tinsley': {
    img: 'april-tinsley.png',
    alt: 'A quiet residential street at dusk, used as symbolic cover art for the April Tinsley case.',
    todo: 'replace with a no-text cover; current art has baked-in title/logo that duplicates the page typography.',
  },
  'sheri-jo-elliott': {
    img: 'sheri-jo-elliott.png',
    alt: 'A sealed archival case folder on a vintage investigation desk, used as symbolic cover art for the Sheri Jo Elliott case.',
  },
  'curtis-lee-jones': {
    img: 'curtis-lee-jones.png',
    alt: 'A rural road at sunset leading toward a small town, used as symbolic cover art for the Curtis Lee Jones case.',
  },
  'the-50-year-secret': {
    img: 'the-50-year-secret.png',
    alt: 'A sealed envelope on a vintage desk, used as symbolic cover art for The 50-Year Secret.',
  },
  'the-man-with-two-lives': {
    img: 'the-man-with-two-lives.png',
    alt: 'Two shadowed identity documents on a map, used as symbolic cover art for The Man with Two Lives.',
  },
  'the-richmond-crown': {
    img: 'the-richmond-crown.png',
    alt: 'A jeweled crown on dark velvet in an archive room, used as symbolic cover art for The Richmond Crown.',
  },
  '43-years-later-solved': {
    img: '43-years-later-solved.png',
    alt: 'An old 1981 calendar and investigation files on a desk, used as symbolic cover art for 43 Years Later: Solved.',
  },
  'adam-walsh': {
    img: 'adam-walsh.png',
    alt: 'An empty playground at misty twilight, used as symbolic cover art for the Adam Walsh case.',
  },
  'the-black-dahlia': {
    img: 'the-black-dahlia.png',
    alt: 'A dark flower and rain-soaked noir city street, used as symbolic cover art for The Black Dahlia.',
  },
  'the-somerton-man': {
    img: 'the-somerton-man.png',
    alt: 'A dusk beach scene with a small paper note, used as symbolic cover art for the Somerton Man mystery.',
  },
};

let done = 0;
for (const [slug, { img, alt, todo }] of Object.entries(MAP)) {
  const file = join(casesDir, `${slug}.md`);
  const src = await readFile(file, 'utf8');
  if (/^cover:/m.test(src)) { console.log(`skip (already has cover): ${slug}`); continue; }

  const lines = [];
  if (todo) lines.push(`# TODO: ${todo}`);
  lines.push(`cover: ../../assets/cases/${img}`);
  lines.push(`coverAlt: "${alt}"`);
  const block = lines.join('\n');

  // Insert right after the first `description:` line (present in every file).
  const out = src.replace(/^(description:.*)$/m, `$1\n${block}`);
  if (out === src) { console.log(`NO description line, skipped: ${slug}`); continue; }
  await writeFile(file, out, 'utf8');
  done++;
  console.log(`wired: ${slug}`);
}
console.log(`\nWired ${done} case cover(s).`);
