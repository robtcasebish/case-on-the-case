/**
 * One-off: add the optional "Further Viewing" video block to the test-batch
 * articles. Only approved-channel videos, each verified via YouTube oEmbed
 * (exists + embeddable) and confirmed channel name. Inserts a `video:` YAML
 * block after the `description:` line. Idempotent: skips files already having one.
 * Run: node scripts/add-further-viewing.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const casesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'cases');

const MAP = {
  'db-cooper': {
    title: 'Declassified FBI files explore the 1971 D.B. Cooper hijacking',
    source: 'NBC News',
    youtubeId: 'g8N6RHHLGdA',
    note: "NBC News on the FBI's declassified files, background on the only unsolved hijacking in U.S. aviation history.",
  },
  'the-tylenol-murders': {
    title: 'Inside the Tylenol Murders: A Chicago Stories Documentary',
    source: 'WTTW / PBS (Chicago Stories)',
    youtubeId: 'HQBky1u29Ss',
    note: 'A public-television documentary on the 1982 poisonings and the consumer-safety changes that followed.',
  },
  '1996-the-ransom-note': {
    title: "The Search for JonBenét's Killer (Full Episode)",
    source: 'CBS News / 48 Hours',
    youtubeId: '07crEWbtYO4',
    note: 'A CBS News 48 Hours episode on the continuing search and the DNA at the center of this unsolved case.',
  },
  'adam-walsh': {
    title: 'Cops: 1981 Walsh Murder Solved',
    source: 'CBS News',
    youtubeId: 'YVNz_wv-lDQ',
    note: 'A CBS News report on the 2008 decision to close the case, context for its unresolved legal status.',
  },
  'luka-magnotta': {
    title: 'Hunting Luka Magnotta (the fifth estate)',
    source: 'CBC News (the fifth estate)',
    youtubeId: 'Vyb4fOBMWds',
    note: "CBC's the fifth estate traces the online hunt that surrounded the case, directly relevant to its citizen-sleuth questions.",
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
