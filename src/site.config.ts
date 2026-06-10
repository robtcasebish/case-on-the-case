/**
 * Central site configuration for Case on the Case.
 * Single source of truth for brand, SEO, and GEO (generative-engine) signals.
 * Change a value here and it propagates to titles, metadata, schema.org JSON-LD,
 * sitemap, RSS, robots.txt and llms.txt.
 */

export const SITE = {
  name: 'Case on the Case',
  shortName: 'Case on the Case',
  /** No trailing slash. Used as the canonical base for every URL. */
  url: 'https://caseonthecase.com',
  domain: 'caseonthecase.com',
  tagline: 'Investigative true crime, told with care and sourced with rigor.',
  description:
    'Case on the Case publishes meticulously researched, fully sourced true crime stories — cold cases, trials, and investigations explained with clarity, accuracy, and respect for the people involved.',
  language: 'en',
  locale: 'en_US',
  /** Used in OpenGraph and Organization schema. */
  publisher: 'Case on the Case',
  /** Founding/coverage year for copyright + Organization schema. */
  foundingYear: 2026,
} as const;

/** Default author / editorial voice. Powers E-E-A-T + author schema. */
export const AUTHOR = {
  name: 'The Case on the Case Editorial Team',
  // A short, credible bio used on author/about surfaces and Person schema.
  bio: 'The Case on the Case editorial team researches and verifies every story against primary sources — court records, police filings, and contemporaneous reporting.',
  // Optional public profile URL for sameAs (leave '' if none yet).
  url: 'https://caseonthecase.com/about',
} as const;

/** Social / sameAs links. Empty strings are filtered out of schema. */
export const SOCIAL = {
  twitter: '', // e.g. 'https://x.com/caseonthecase'  (handle below for Twitter cards)
  twitterHandle: '', // e.g. '@caseonthecase'
  youtube: '',
  instagram: '',
  facebook: '',
} as const;

/** Primary navigation. */
export const NAV = [
  { label: 'Stories', href: '/stories' },
  { label: 'Topics', href: '/topics' },
  { label: 'About', href: '/about' },
] as const;

/** Absolute URL helper — joins a path to the canonical site origin. */
export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}
