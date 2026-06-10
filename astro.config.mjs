// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Hint search + AI crawlers about freshness and priority
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2026-06-09'),
    }),
  ],
  build: {
    // Clean URLs: /stories/the-case/  -> /stories/the-case/index.html
    format: 'directory',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
