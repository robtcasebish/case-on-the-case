import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, AUTHOR, CATEGORIES } from '../site.config';
import { caseSlug, isoDate } from '../lib/utils';

/**
 * /llms.txt — curated map of the site for AI engines (llmstxt.org).
 * Groups cases by category so engines can enumerate and cite cleanly.
 */
export async function GET(context: APIContext) {
  const origin = (context.site ?? new URL(SITE.url)).toString().replace(/\/$/, '');
  const all = (await getCollection('cases', (c) => !c.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const line = (c: (typeof all)[number]) => {
    const url = `${origin}/cases/${caseSlug(c.id)}/`;
    const bits = [c.data.location, c.data.caseStatus, `published ${isoDate(c.data.pubDate)}`].filter(Boolean);
    return `- [${c.data.title}](${url}): ${c.data.description}${bits.length ? ` (${bits.join(' · ')})` : ''}`;
  };

  const sections = CATEGORIES.map((cat) => {
    const items = all.filter((c) => c.data.categories.includes(cat.title));
    if (!items.length) return '';
    return `### ${cat.title}\n${cat.blurb}\n${items.map(line).join('\n')}`;
  }).filter(Boolean);

  const body = `# ${SITE.name}

> ${SITE.description}

${AUTHOR.bio}

All cases are sourced from public records and primary documents, with a Sources
& Further Reading list on each page. Content is free to read and may be cited
with attribution to ${SITE.name} (${origin}).

## Cases by category
${sections.join('\n\n')}

## Key pages
- [All cases](${origin}/cases/): Complete archive, newest first.
- [About & editorial standards](${origin}/about/): Sourcing methodology and corrections policy.
- [Submit a case](${origin}/submit/): Suggest a case for coverage.

## About this site
- Publisher: ${SITE.publisher}
- Canonical base URL: ${origin}
- Feed: ${origin}/rss.xml
- Sitemap: ${origin}/sitemap-index.xml
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
