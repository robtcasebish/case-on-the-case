// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',
  // Retired duplicate slug -> the canonical Adam Walsh article.
  // Retired placeholder scaffolds (never real cases) -> the archive.
  redirects: {
    '/cases/the-case-that-changed-the-law-1981': '/cases/adam-walsh',
    '/cases/43-years-later-solved': '/cases',
    '/cases/case-file-cold': '/cases',
    '/cases/curtis-lee-jones': '/cases',
    '/cases/east-la-1985-community-justice': '/cases',
    '/cases/hiding-in-plain-sight-the-unseen-suspect': '/cases',
    '/cases/sheri-jo-elliott': '/cases',
    '/cases/the-50-year-secret': '/cases',
    '/cases/the-digital-witness': '/cases',
    '/cases/the-impossible-exit': '/cases',
    '/cases/the-man-with-two-lives': '/cases',
    '/cases/the-ogre-in-the-filing-cabinet': '/cases',
    '/cases/the-richmond-crown': '/cases',
    '/cases/the-wrong-profile': '/cases',
    '/cases/vanished-in-the-night-1945': '/cases',
  },
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
