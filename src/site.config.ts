/**
 * Central site configuration for Case on the Case.
 * Single source of truth for brand, navigation, categories, and SEO/GEO signals.
 */

export const SITE = {
  name: 'Case on the Case',
  shortName: 'Case on the Case',
  /** No trailing slash. Canonical base for every URL. */
  url: 'https://caseonthecase.com',
  domain: 'caseonthecase.com',
  tagline:
    'True crime stories, cold case breakthroughs, forgotten victims, and the clues that changed everything.',
  description:
    'Case on the Case revisits true crime with curiosity, care, and respect, cold case breakthroughs, famous cases, missing persons, forensic evidence, and the cases that changed the law, told with rigor and credibility.',
  language: 'en',
  locale: 'en_US',
  publisher: 'Case on the Case',
  foundingYear: 2026,
  /** Contact / submissions inbox. */
  email: 'editor@caseonthecase.com',
} as const;

export const AUTHOR = {
  name: 'Rob T. Case',
  bio: 'Rob T. Case is the founder and lead researcher of Case on the Case. He has been independently researching unsolved cases since 2021, beginning with the disappearance of the Sodder children, and brings a background in data and research to reconstructing timelines and tracing overlooked leads. Earlier, he spent several years in licensed private security, close protection, and private investigation in Ontario, hands-on work built on observation, documentation, and carefully following evidence. He is not, and has never been, a police officer. Case on the Case applies that same research discipline to the public record, with rigorous sourcing and respect for the people involved at its center.',
  url: 'https://caseonthecase.com/about',
  sameAs: ['https://robtcase.com'],
  knowsAbout: [
    'Cold cases',
    'True crime research',
    'Missing persons cases',
    'Forensic genetic genealogy',
    'Private investigation',
    'Open-source research',
  ],
} as const;

export const SOCIAL = {
  twitter: '',
  twitterHandle: '',
  youtube: '',
  instagram: '',
  facebook: '',
} as const;

/**
 * The six editorial categories. Order here drives nav + homepage order.
 * `code` is a quiet archival reference; `cta` is the per-section call to action
 * (varied on purpose, so the site doesn't read as one repeated label).
 */
export const CATEGORIES = [
  {
    slug: 'solved-cold-cases',
    title: 'Solved Cold Cases',
    code: 'I',
    cta: 'Review the file',
    tagline: 'The ones that refused to stay cold.',
    blurb: "Files that sat untouched for years, sometimes decades, and the DNA, dogged detectives, or single overlooked detail that finally broke them open.",
  },
  {
    slug: 'famous-cases',
    title: 'Famous Cases',
    code: 'II',
    cta: 'Read the records',
    tagline: 'The cases everyone thinks they know.',
    blurb: "The cases that escaped the file and entered the culture, names you already half-remember, examined past the headlines and the myth.",
  },
  {
    slug: 'missing-and-vanished',
    title: 'Missing & Vanished',
    code: 'III',
    cta: 'Follow the trail',
    tagline: 'Gone, but not closed.',
    blurb: 'People who stepped out of an ordinary day and never came back. Disappearances, unidentified remains, and the questions still left open.',
  },
  {
    slug: 'the-evidence-room',
    title: 'The Evidence Room',
    code: 'IV',
    cta: 'Enter the archive',
    tagline: 'Where the small things decide everything.',
    blurb: 'A note, a fiber, a phone record. These cases turn on the smallest details, what the evidence said, and what it took to finally read it.',
  },
  {
    slug: 'citizen-sleuths',
    title: 'Citizen Sleuths',
    code: 'V',
    cta: 'Explore the cases',
    tagline: 'When the public got there first.',
    blurb: 'Before investigators closed in, ordinary people were already looking. The tips, forums, and quiet obsessions that moved real cases forward.',
  },
  {
    slug: 'cases-that-changed-the-law',
    title: 'Cases That Changed the Law',
    code: 'VI',
    cta: 'Open the casebook',
    tagline: 'When one case rewrote the rules.',
    blurb: 'Some crimes end in a verdict. These ended in new rules, for packaging, for policing, for safety, for the rest of us.',
  },
] as const;

/** Tuple of category titles, used by the content schema enum. */
export const CATEGORY_TITLES = [
  'Solved Cold Cases',
  'Famous Cases',
  'Missing & Vanished',
  'The Evidence Room',
  'Citizen Sleuths',
  'Cases That Changed the Law',
] as const;

export type CategoryTitle = (typeof CATEGORY_TITLES)[number];

export function categoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
export function categoryByTitle(title: string) {
  return CATEGORIES.find((c) => c.title === title);
}
export function categorySlug(title: string): string {
  return categoryByTitle(title)?.slug ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/** Primary navigation: Home, Cases, the six categories, About, Submit. */
export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Cases', href: '/cases' },
  ...CATEGORIES.map((c) => ({ label: c.title, href: `/${c.slug}` })),
  { label: 'About', href: '/about' },
  { label: 'Submit a Case', href: '/submit' },
] as const;

/** Absolute URL helper, joins a path to the canonical site origin. */
export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}
