import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, AUTHOR } from '../site.config';
import { storySlug, isoDate } from '../lib/utils';

/**
 * /llms.txt — the emerging standard (llmstxt.org) for giving AI engines a
 * clean, curated map of the site: what it is, who's behind it, and a linked
 * index of citable content. Markdown, served as text/plain.
 */
export async function GET(context: APIContext) {
  const origin = (context.site ?? new URL(SITE.url)).toString().replace(/\/$/, '');
  const stories = (await getCollection('stories', (s) => !s.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const storyLines = stories.map((s) => {
    const url = `${origin}/stories/${storySlug(s.id)}/`;
    const bits = [
      s.data.category,
      s.data.location,
      s.data.caseStatus,
      `published ${isoDate(s.data.pubDate)}`,
    ].filter(Boolean);
    return `- [${s.data.title}](${url}): ${s.data.description} (${bits.join(' · ')})`;
  });

  const body = `# ${SITE.name}

> ${SITE.description}

${AUTHOR.bio}

All stories are sourced from public records and primary documents, with a full
citation list on each page. Content is free to read and may be cited with
attribution to ${SITE.name} (${origin}).

## Stories
${storyLines.join('\n') || '- (No stories published yet.)'}

## Key pages
- [All stories](${origin}/stories/): Complete archive, newest first.
- [Topics](${origin}/topics/): Stories grouped by theme.
- [About & editorial standards](${origin}/about/): Sourcing methodology, accuracy and corrections policy.

## About this site
- Publisher: ${SITE.publisher}
- Canonical base URL: ${origin}
- Feed: ${origin}/rss.xml
- Sitemap: ${origin}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
