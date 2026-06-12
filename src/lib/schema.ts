/**
 * schema.org JSON-LD builders.
 * These objects are what search engines and AI/GEO crawlers parse to
 * understand and cite the site. Keep them accurate and minimal, every
 * field should be true and resolvable.
 */
import { SITE, AUTHOR, SOCIAL, absoluteUrl } from '../site.config';

const sameAs = [SOCIAL.twitter, SOCIAL.youtube, SOCIAL.instagram, SOCIAL.facebook].filter(
  Boolean,
);

/** Stable @id for the publishing Organization. */
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.publisher,
    url: SITE.url,
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
      width: 512,
      height: 512,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { '@id': ORG_ID },
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string; // absolute
  datePublished: Date;
  dateModified?: Date;
  authorName?: string;
  image?: string; // absolute
  section?: string;
  keywords?: string[];
  /** Pull-through of source citations -> schema "citation". */
  citations?: { title: string; url?: string; publisher?: string }[];
  /** Geographic entity of the case. */
  locationName?: string;
}

export function articleSchema(a: ArticleSchemaInput) {
  const author = a.authorName ?? AUTHOR.name;
  // Attach the named author's identity/expertise only when it's the house author.
  const isHouseAuthor = author === AUTHOR.name;
  return {
    '@type': 'NewsArticle',
    headline: a.headline.slice(0, 110),
    description: a.description,
    url: a.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
    datePublished: a.datePublished.toISOString(),
    dateModified: (a.dateModified ?? a.datePublished).toISOString(),
    inLanguage: SITE.language,
    ...(a.image ? { image: [a.image] } : {}),
    author: {
      '@type': 'Person',
      name: author,
      url: AUTHOR.url,
      ...(isHouseAuthor && AUTHOR.bio ? { description: AUTHOR.bio } : {}),
      ...(isHouseAuthor && AUTHOR.sameAs.length ? { sameAs: [...AUTHOR.sameAs] } : {}),
      ...(isHouseAuthor && AUTHOR.knowsAbout.length ? { knowsAbout: [...AUTHOR.knowsAbout] } : {}),
    },
    publisher: { '@id': ORG_ID },
    isAccessibleForFree: true,
    ...(a.section ? { articleSection: a.section } : {}),
    ...(a.keywords?.length ? { keywords: a.keywords.join(', ') } : {}),
    ...(a.locationName
      ? { contentLocation: { '@type': 'Place', name: a.locationName } }
      : {}),
    ...(a.citations?.length
      ? {
          citation: a.citations.map((c) =>
            c.url
              ? {
                  '@type': 'CreativeWork',
                  name: c.title,
                  url: c.url,
                  ...(c.publisher ? { publisher: c.publisher } : {}),
                }
              : { '@type': 'CreativeWork', name: c.title },
          ),
        }
      : {}),
  };
}

export interface Crumb {
  name: string;
  url: string; // absolute
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export interface CollectionItem {
  url: string;
  name: string;
}

/** ItemList for hub pages (home, /stories, topic pages), helps AI enumerate. */
export function itemListSchema(items: CollectionItem[], name: string) {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: it.url,
      name: it.name,
    })),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

/** FAQPage, only emit when the same Q&A is visible on the page. */
export function faqSchema(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/**
 * Wrap one or more node objects into a single @graph document.
 * Using one graph (rather than many script tags) is the cleanest signal.
 */
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
