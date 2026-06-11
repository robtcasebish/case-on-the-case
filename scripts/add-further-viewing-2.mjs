/**
 * One-off (batch 2): extend "Further Viewing" to the remaining completed
 * articles where a suitable APPROVED-channel video exists. Each video was
 * verified via YouTube oEmbed (exists + embeddable) and its channel confirmed.
 * Inserts a `video:` YAML block after `description:`. Idempotent.
 * Run: node scripts/add-further-viewing-2.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const casesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'cases');

const MAP = {
  'the-somerton-man': {
    title: 'Somerton Man identified as a Melbourne electrical engineer, researcher says',
    source: 'ABC News (Australia)',
    youtubeId: 'L3vvBg6k-yc',
    note: 'ABC News (Australia) on the 2022 announcement that researchers had identified the man, consistent with this article noting the identification is not officially confirmed.',
  },
  'green-river-killer': {
    title: 'The 20-Year Hunt for the Green River Killer (Cold Case Files)',
    source: 'A&E (Cold Case Files)',
    youtubeId: 'pTE5bKdqej0',
    note: "A&E's Cold Case Files on the two-decade investigation and the DNA evidence that finally identified Gary Ridgway.",
  },
  'jonelle-matthews': {
    title: 'Steve Pankey found guilty in the 1984 murder of Jonelle Matthews (second trial)',
    source: 'CBS News Colorado',
    youtubeId: 'WJHWFJyVL2M',
    note: "CBS News Colorado on Steve Pankey's 2022 conviction at his second trial.",
  },
  'citizen-justice': {
    title: 'Arrest in the LA serial killings (From the Archives)',
    source: 'NBC Los Angeles (From the Archives)',
    youtubeId: 'PZwN0N7rQ5g',
    note: 'Archival NBC Los Angeles coverage of the 1985 arrest that ended the Night Stalker manhunt.',
  },
  'hidden-in-plain-sight': {
    title: 'Police matched DNA from a public database to the Golden State Killer suspect',
    source: 'CBS News',
    youtubeId: '0_sdV7QPlB4',
    note: 'CBS News on how investigators used a public genealogy database to identify the suspect.',
  },
};

let done = 0;
for (const [slug, v] of Object.entries(MAP)) {
  const file = join(casesDir, `${slug}.md`);
  const src = await readFile(file, 'utf8');
  if (/^video:/m.test(src)) { console.log(`skip (already has video): ${slug}`); continue; }
  const block = [
    'video:',
    `  title: "${v.title}"`,
    `  source: "${v.source}"`,
    `  youtubeId: "${v.youtubeId}"`,
    `  url: "https://www.youtube.com/watch?v=${v.youtubeId}"`,
    `  note: "${v.note}"`,
  ].join('\n');
  const out = src.replace(/^(description:.*)$/m, `$1\n${block}`);
  if (out === src) { console.log(`NO description line, skipped: ${slug}`); continue; }
  await writeFile(file, out, 'utf8');
  done++;
  console.log(`wired video: ${slug}`);
}
console.log(`\nWired ${done} video(s).`);
