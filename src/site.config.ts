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
    'Case on the Case revisits true crime with curiosity, care, and respect — cold case breakthroughs, famous cases, missing persons, forensic evidence, and the cases that changed the law, told with rigor and credibility.',
  language: 'en',
  locale: 'en_US',
  publisher: 'Case on the Case',
  foundingYear: 2026,
  /** Contact / submissions inbox. */
  email: 'editor@caseonthecase.com',
} as const;

export const AUTHOR = {
  name: 'The Case on the Case Editorial Team',
  bio: 'The Case on the Case editorial team researches and verifies every case against primary sources — court records, police filings, and contemporaneous reporting — and revisits each story with care and respect for the people involved.',
  url: 'https://caseonthecase.com/about',
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
 * `code` is the case-file "archive tab" motif shown on category surfaces.
 */
export const CATEGORIES = [
  {
    slug: 'solved-cold-cases',
    title: 'Solved Cold Cases',
    code: 'CCF-01',
    blurb: 'Stories where justice or answers finally came — years, sometimes decades, later.',
    tagline: 'The cases that refused to stay cold.',
  },
  {
    slug: 'famous-cases',
    title: 'Famous Cases',
    code: 'CCF-02',
    blurb: 'The recognizable cases that shaped public awareness of true crime.',
    tagline: 'The cases everyone thinks they know.',
  },
  {
    slug: 'missing-and-vanished',
    title: 'Missing & Vanished',
    code: 'CCF-03',
    blurb: 'Disappearances, unidentified people, and the mysteries still without an ending.',
    tagline: 'Gone — but never forgotten.',
  },
  {
    slug: 'the-evidence-room',
    title: 'The Evidence Room',
    code: 'CCF-04',
    blurb: 'Forensic clues, documents, DNA, ransom notes, and digital trails — the details that crack cases open.',
    tagline: 'Where the clues are kept.',
  },
  {
    slug: 'citizen-sleuths',
    title: 'Citizen Sleuths',
    code: 'CCF-05',
    blurb: 'Public tips, online sleuthing, and community investigation that moved real cases forward.',
    tagline: 'When the public became the investigation.',
  },
  {
    slug: 'cases-that-changed-the-law',
    title: 'Cases That Changed the Law',
    code: 'CCF-06',
    blurb: 'Cases whose legal, cultural, or safety-system consequences outlived the headlines.',
    tagline: 'When one case rewrote the rules.',
  },
] as const;

/** Tuple of category titles — used by the content schema enum. */
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

/** Absolute URL helper — joins a path to the canonical site origin. */
export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}
