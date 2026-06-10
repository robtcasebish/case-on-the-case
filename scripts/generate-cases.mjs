/**
 * Generate placeholder case files for Case on the Case.
 * Idempotent: only writes a file if it doesn't already exist, so your edits
 * are never clobbered. Run: node scripts/generate-cases.mjs
 */
import { writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'content', 'cases');
await mkdir(dir, { recursive: true });

// index 0 = newest; dates step back 3 days each.
const BASE = Date.parse('2026-06-09T12:00:00Z');
const dateAt = (i) => new Date(BASE - i * 3 * 86400000).toISOString().slice(0, 10);

const C = {
  solved: 'Solved Cold Cases',
  famous: 'Famous Cases',
  missing: 'Missing & Vanished',
  evidence: 'The Evidence Room',
  citizen: 'Citizen Sleuths',
  law: 'Cases That Changed the Law',
};

/** @type {Array<object>} */
const CASES = [
  // ---- Solved Cold Cases ----
  { slug: 'sheri-jo-elliott', title: 'Sheri Jo Elliott', categories: [C.solved], status: 'Solved',
    one: 'A cold case that stayed open for years until investigators finally found the answer.',
    desc: 'A long-unsolved case revisited and ultimately resolved years later. Full story coming soon.' },
  { slug: 'april-tinsley', title: 'April Tinsley', categories: [C.solved], status: 'Solved', location: 'Indiana, USA', year: 1988,
    one: 'A 1988 murder that went cold for decades, until DNA and genetic genealogy named a suspect in 2018.',
    desc: 'An Indiana cold case solved decades later through DNA and genetic-genealogy investigation.' },
  { slug: 'curtis-lee-jones', title: 'Curtis Lee Jones', categories: [C.solved], status: 'Solved',
    one: 'A name that stayed in an open file for years before the case finally closed.',
    desc: 'A cold case revisited and resolved years later. Full write-up in progress.' },
  { slug: 'the-50-year-secret', title: 'The 50-Year Secret', categories: [C.solved], status: 'Solved',
    one: 'A secret kept for half a century, and the cold case it finally cracked open.',
    desc: 'A secret kept for fifty years that finally cracked a cold case open. Full story coming soon.' },
  { slug: 'the-man-with-two-lives', title: 'The Man with Two Lives', categories: [C.solved], status: 'Solved',
    one: 'A hidden double life that, once exposed, unraveled a long-cold case.',
    desc: 'A man whose hidden double life unraveled a long-cold case. Full story coming soon.' },
  { slug: 'the-richmond-crown', title: 'The Richmond Crown', categories: [C.solved], status: 'Solved',
    one: 'A cold case revisited and finally resolved years after it began.',
    desc: 'A cold case revisited and resolved years later. Full write-up in progress.' },
  { slug: '43-years-later-solved', title: '43 Years Later: Solved', categories: [C.solved], status: 'Solved',
    one: 'A case that stayed cold for 43 years before investigators finally closed it.',
    desc: 'A case that stayed cold for forty-three years before it was finally closed. Full story coming soon.' },

  // ---- Famous Cases ----
  { slug: 'the-tylenol-murders', title: 'The Tylenol Murders', categories: [C.famous, C.evidence, C.law], status: 'Unsolved', location: 'Chicago, USA', year: 1982,
    one: 'Seven people died in 1982 after taking cyanide-laced Tylenol, a still-unsolved case that changed product safety forever.',
    desc: 'The 1982 Chicago Tylenol poisonings: an unsolved case that reshaped product-tampering law and packaging safety.' },
  { slug: 'adam-walsh', title: 'Adam Walsh', categories: [C.famous, C.law], status: 'Cold', location: 'Florida, USA', year: 1981,
    one: 'A 1981 abduction and murder that galvanized a national movement for missing children.',
    desc: 'A 1981 case that helped launch the modern missing-children movement and lasting legal change.' },
  { slug: 'the-black-dahlia', title: 'The Black Dahlia', categories: [C.famous], status: 'Unsolved', location: 'Los Angeles, USA', year: 1947,
    one: 'The 1947 Los Angeles murder of Elizabeth Short, one of the most infamous unsolved cases in American history.',
    desc: 'The 1947 Los Angeles murder that became one of the most enduring unsolved cases in American history.' },
  { slug: 'db-cooper', title: 'D. B. Cooper', categories: [C.famous, C.missing], status: 'Unsolved', location: 'Pacific Northwest, USA', year: 1971, featured: true,
    one: 'In 1971 a man hijacked a plane, took a ransom, and parachuted into the night, never to be identified.',
    desc: 'The 1971 skyjacking and parachute escape that remains the only unsolved air-piracy case in U.S. history.' },
  { slug: 'the-somerton-man', title: 'The Somerton Man / Tamam Shud', categories: [C.famous, C.missing], status: 'Cold', location: 'Adelaide, Australia', year: 1948,
    one: 'A man found dead on an Australian beach in 1948, his identity a mystery for more than seventy years.',
    desc: 'The 1948 Tamam Shud case: an unidentified man on an Australian beach and a decades-long identity mystery.' },
  { slug: 'green-river-killer', title: 'Green River Killer', categories: [C.famous], status: 'Solved', location: 'Washington, USA',
    one: "One of America's most prolific serial-murder cases, finally closed when DNA identified the killer.",
    desc: 'A long-running serial-murder investigation in Washington State, ultimately solved through DNA evidence.' },
  { slug: 'luka-magnotta', title: 'Luka Magnotta', categories: [C.famous, C.citizen], status: 'Solved', year: 2012,
    one: 'An online manhunt by amateur sleuths helped track a killer whose crimes first surfaced on the internet.',
    desc: 'A 2012 case where online communities of citizen sleuths helped trace a killer first known from internet videos.' },
  { slug: 'trial-of-the-century', title: 'Trial of the Century', categories: [C.famous, C.law],
    one: 'A courtroom drama so closely watched it reshaped how the public sees criminal justice.',
    desc: 'A landmark, heavily publicized trial that influenced public perception of the justice system. Full story coming soon.' },

  // ---- Missing & Vanished ----
  { slug: 'jonelle-matthews', title: 'Jonelle Matthews', categories: [C.missing], status: 'Solved', location: 'Colorado, USA', year: 1984,
    one: 'A 12-year-old vanished from her Colorado home in 1984; answers came only decades later.',
    desc: 'A 1984 Colorado disappearance that remained unsolved for decades before a breakthrough.' },
  { slug: 'vanished-in-the-night-1945', title: 'Vanished in the Night, 1945', categories: [C.missing], status: 'Unsolved', year: 1945,
    one: 'A wartime-era disappearance that was never explained.',
    desc: 'A 1945 disappearance that was never explained. Full story coming soon.' },
  { slug: 'the-impossible-exit', title: 'The Impossible Exit', categories: [C.missing], status: 'Unsolved',
    one: 'Someone disappeared from a place with no apparent way out, and no explanation has ever fit.',
    desc: 'A disappearance from a place with no apparent way out. Full story coming soon.' },

  // ---- The Evidence Room ----
  { slug: 'the-silent-witness-1982', title: 'The Silent Witness, 1982', categories: [C.evidence], status: 'Cold', year: 1982,
    one: 'A single overlooked piece of evidence that waited decades to tell its story.',
    desc: 'A single overlooked piece of evidence that waited decades to speak. Full story coming soon.' },
  { slug: '1996-the-ransom-note', title: '1996: The Ransom Note', categories: [C.evidence], status: 'Cold', year: 1996,
    one: 'A ransom note at the center of a case investigators and the public have analyzed for decades.',
    desc: 'A ransom note at the heart of a case still debated decades later. Full story coming soon.' },
  { slug: 'the-ogre-in-the-filing-cabinet', title: 'The Ogre in the Filing Cabinet', categories: [C.evidence], status: 'Cold',
    one: 'The answer was sitting in an old case file the whole time, overlooked for years.',
    desc: 'The answer sat in an old case file, overlooked for years. Full story coming soon.' },
  { slug: 'the-digital-witness', title: 'The Digital Witness', categories: [C.evidence], status: 'Solved',
    one: 'When phones, metadata, and digital trails became the most reliable witness in the room.',
    desc: "When digital evidence became the case's most reliable witness. Full story coming soon." },
  { slug: 'case-file-cold', title: 'Case File Cold', categories: [C.evidence], status: 'Cold',
    one: 'Inside a case that went cold, and the evidence still waiting to break it open.',
    desc: 'Inside a case that went cold, and the evidence that could still break it. Full story coming soon.' },
  { slug: 'the-wrong-profile', title: 'The Wrong Profile', categories: [C.evidence, C.law],
    one: 'How a flawed profile sent an investigation down the wrong path, and what it changed.',
    desc: 'How a flawed profile derailed an investigation, and what it changed. Full story coming soon.' },

  // ---- Citizen Sleuths ----
  { slug: 'citizen-justice', title: 'Citizen Justice', categories: [C.citizen],
    one: 'When ordinary people refused to let a case be forgotten.',
    desc: 'When ordinary people refused to let a case be forgotten. Full story coming soon.' },
  { slug: 'east-la-1985-community-justice', title: 'East LA 1985: Community Justice', categories: [C.citizen], location: 'Los Angeles, USA', year: 1985,
    one: 'A neighborhood that came together to push a stalled case forward.',
    desc: 'A neighborhood that came together to push a stalled case forward. Full story coming soon.' },
  { slug: 'hidden-in-plain-sight', title: 'Hidden in Plain Sight', categories: [C.citizen],
    one: 'The clue everyone walked past, until someone finally looked.',
    desc: 'The clue everyone walked past, until someone finally looked. Full story coming soon.' },
  { slug: 'hiding-in-plain-sight-the-unseen-suspect', title: 'Hiding in Plain Sight: The Unseen Suspect', categories: [C.citizen],
    one: 'A suspect who lived openly for years, unnoticed in plain sight.',
    desc: 'A suspect who lived openly for years, unnoticed. Full story coming soon.' },

  // ---- Cases That Changed the Law ----
  { slug: 'the-case-that-changed-the-law-1981', title: 'The Case That Changed the Law, 1981', categories: [C.law], year: 1981,
    one: 'One case whose aftermath rewrote the rules and made everyone safer.',
    desc: 'One 1981 case whose aftermath rewrote the rules. Full story coming soon.' },
];

const BODY = `## Who Was Involved

_Add the people at the center of this case, victims, investigators, and the key figures. Write with care and accuracy._

## What Happened

_Lay out the events: where, when, and what is known to have occurred. Stick to the public record._

## The Investigation

_How the case was worked: the leads, the dead ends, the agencies involved, and the timeline._

## The Breakthrough

_What changed, new evidence, a tip, DNA, a confession, or a fresh set of eyes on an old file._

## Where the Case Stands Today

_The current status: charges, convictions, appeals, or the questions still open._

## Why This Case Still Matters

_The legacy, legal impact, lessons learned, or why this case still resonates._
`;

const q = (s) => JSON.stringify(s);

function frontmatter(c, i) {
  const lines = [
    `title: ${q(c.title)}`,
    `description: ${q(c.desc)}`,
    `oneSentence: ${q(c.one)}`,
    `pubDate: ${dateAt(i)}`,
    `categories: ${JSON.stringify(c.categories)}`,
  ];
  if (c.status) lines.push(`caseStatus: ${q(c.status)}`);
  if (c.location) lines.push(`location: ${q(c.location)}`);
  if (c.year) lines.push(`caseYear: ${c.year}`);
  if (c.featured) lines.push('featured: true');
  lines.push('placeholder: true');
  return `---\n${lines.join('\n')}\n---\n`;
}

let created = 0;
let skipped = 0;
for (let i = 0; i < CASES.length; i++) {
  const c = CASES[i];
  const file = join(dir, `${c.slug}.md`);
  try {
    await access(file, constants.F_OK);
    skipped++;
    continue; // exists, never overwrite
  } catch {
    /* doesn't exist, create */
  }
  await writeFile(file, frontmatter(c, i) + '\n' + BODY, 'utf8');
  created++;
}

console.log(`Cases: ${created} created, ${skipped} skipped (already existed), ${CASES.length} total.`);
