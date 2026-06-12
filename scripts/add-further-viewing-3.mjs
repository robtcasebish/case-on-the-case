/**
 * One-off: carry the "Further Viewing" video convention forward to newer
 * completed articles. Each video was verified via YouTube oEmbed (exists +
 * embeddable + approved channel). Inserts the `video:` YAML block after the
 * `description:` line. Idempotent (skips files that already have a video).
 * Run: node scripts/add-further-viewing-3.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const casesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'cases');

const MAP = {
  'april-tinsley': { id: 'fCscBF5lmdU', source: 'NBC News', title: 'DNA leads to an arrest in a decades-old Indiana murder', note: 'NBC News on the 2018 genetic-genealogy breakthrough that identified a suspect 30 years after April Tinsley was killed.' },
  'polly-klaas': { id: 'tCWxEpgeLU4', source: 'ABC7 News Bay Area', title: 'Struck by Justice: The Impact of Polly Klaas', note: 'An ABC station documentary on the case and its lasting legal legacy, including California\'s Three Strikes law.' },
  'megan-kanka': { id: 'X6QHLpHID3k', source: 'CBS News Philadelphia', title: "Megan Kanka's murder and the legacy of Megan's Law", note: 'A CBS News Philadelphia feature, with Megan\'s parents, on the 1994 case that led to Megan\'s Law.' },
  'kitty-genovese': { id: '1oQNDwXYM50', source: 'PBS (Independent Lens)', title: 'The Witness (Independent Lens trailer)', note: 'The PBS Independent Lens documentary in which Kitty Genovese\'s brother reexamines the case and the 38-witnesses media myth.' },
  'matthew-shepard': { id: 'ykwkWF3eutk', source: 'NBC / Sunday TODAY', title: "20 years after Matthew Shepard's murder, his parents' activism continues", note: 'An NBC retrospective centering Dennis and Judy Shepard and the advocacy behind the federal hate-crimes law.' },
  'sherri-rasmussen': { id: '4Q-YeG3rbGs', source: 'Dateline NBC', title: 'Dateline: Detective Story (episode trailer)', note: 'Dateline NBC\'s preview of its investigation into the 1986 cold case solved when the killer proved to be an LAPD detective.' },
  'springfield-three': { id: 'oTIEpmBkRAo', source: 'KY3 News (NBC affiliate)', title: 'Springfield cold-case investigator on the three missing women', note: 'A local NBC-affiliate report in which a cold-case investigator discusses the still-unsolved 1992 disappearance.' },
  'boy-in-the-box': { id: 'p5MYtd1Ynr0', source: 'NBC10 Philadelphia', title: "Boy in the Box: Naming America's Unknown Child", note: 'NBC10 Philadelphia on the decades-long effort and the genetic genealogy that finally named the 1957 victim.' },
  'bear-brook-murders': { id: 'VPjRetfCcRk', source: 'WMUR-TV (ABC affiliate)', title: 'Officials announce a Bear Brook victim identification', note: 'New Hampshire ABC-affiliate coverage of the news conference announcing a Bear Brook victim identification.' },
  'buckskin-girl': { id: 'jSKM4EUGozw', source: 'CBS News', title: 'New DNA technology identifies the 1981 Buckskin Girl victim', note: 'CBS News on the 2018 identification of Marcia King, an early forensic-genetic-genealogy case.' },
  'carla-walker': { id: 'A2X-S5K7fAM', source: 'Dateline NBC', title: 'Dateline: After the Dance (episode trailer)', note: 'Dateline NBC\'s preview of its episode on the 1974 case solved in 2020 through advanced DNA testing.' },
  'beaumont-children': { id: 'oH0LK9Zr7CM', source: '9 News Australia', title: 'The missing Beaumont children: inside the investigation', note: 'A major Australian national news broadcaster revisits the 1966 Glenelg Beach disappearance and the investigation.' },
  'maura-murray': { id: '_8Kf_kFN1jM', source: 'WMUR-TV (ABC affiliate)', title: "20 years after Maura Murray's disappearance, family still hopes for answers", note: 'Sober New Hampshire ABC-affiliate coverage centering Maura Murray\'s family, a counterweight to online speculation.' },
  'the-black-dahlia': { id: '7m0YhEJg6yc', source: 'NBC Los Angeles (From the Archives)', title: "The search for the Black Dahlia's killer (From the Archives)", note: 'An archival report from NBC\'s Los Angeles station revisiting the 1947 unsolved killing of Elizabeth Short.' },
  'trial-of-the-century': { id: 'JXONvsj6UEg', source: 'AP / British Movietone', title: 'Hauptmann faces trial for murder (1935 newsreel)', note: 'A 1935 contemporaneous newsreel from the AP-owned British Movietone archive marking the opening of the Hauptmann trial.' },
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
    `  youtubeId: "${v.id}"`,
    `  url: "https://www.youtube.com/watch?v=${v.id}"`,
    `  note: "${v.note}"`,
  ].join('\n');
  const out = src.replace(/^(description:.*)$/m, `$1\n${block}`);
  if (out === src) { console.log(`NO description line, skipped: ${slug}`); continue; }
  await writeFile(file, out, 'utf8');
  done++;
  console.log(`wired video: ${slug}`);
}
console.log(`\nWired ${done} video(s).`);
