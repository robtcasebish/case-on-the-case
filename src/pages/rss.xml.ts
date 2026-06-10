import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { storySlug } from '../lib/utils';

export async function GET(context: APIContext) {
  const stories = (await getCollection('stories', (s) => !s.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: stories.map((s) => ({
      title: s.data.title,
      description: s.data.description,
      pubDate: s.data.pubDate,
      link: `/stories/${storySlug(s.id)}/`,
      categories: [s.data.category, ...s.data.tags],
      author: s.data.author,
    })),
    customData: `<language>${SITE.language}</language>`,
  });
}
