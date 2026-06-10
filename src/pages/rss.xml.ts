import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { caseSlug } from '../lib/utils';

export async function GET(context: APIContext) {
  const cases = (await getCollection('cases', (c) => !c.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: cases.map((c) => ({
      title: c.data.title,
      description: c.data.description,
      pubDate: c.data.pubDate,
      link: `/cases/${caseSlug(c.id)}/`,
      categories: c.data.categories,
      author: c.data.author,
    })),
    customData: `<language>${SITE.language}</language>`,
  });
}
