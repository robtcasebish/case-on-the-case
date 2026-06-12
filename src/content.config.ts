import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Category titles, kept in sync with CATEGORY_TITLES in site.config.ts. */
const CATEGORY_ENUM = [
  'Solved Cold Cases',
  'Famous Cases',
  'Missing & Vanished',
  'The Evidence Room',
  'Citizen Sleuths',
  'Cases That Changed the Law',
] as const;

/**
 * "cases", the true-crime case articles.
 * Strict schema: every field powering SEO/GEO (structured data, OpenGraph,
 * sitemap, citations) is required or validated. A case follows the house
 * 8-part template; `oneSentence` is section 1 and `sources` is section 8.
 */
const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(120),
      // Meta description / OG description / citable abstract for AI engines.
      description: z.string().min(40).max(320),
      // Section 1 of the template, "The Case in One Sentence."
      oneSentence: z.string().max(280).optional(),
      // Short serif lede shown under the hero title.
      dek: z.string().max(280).optional(),

      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Rob T. Case'),

      cover: image().optional(),
      coverAlt: z.string().optional(),

      // Optional single "Further Viewing" embed, only from an approved-channel
      // whitelist (see docs). Rendered privacy-enhanced; omit when no suitable
      // approved-source video exists.
      video: z
        .object({
          title: z.string(),
          source: z.string(),
          youtubeId: z.string(),
          url: z.string().url().optional(),
          note: z.string().optional(),
        })
        .optional(),

      // One or more categories; the first is the primary (drives the badge + URL grouping).
      categories: z.array(z.enum(CATEGORY_ENUM)).min(1).default(['Famous Cases']),

      // Real-world case metadata, strong entity signals for search + AI.
      location: z.string().optional(),
      caseYear: z.number().int().optional(),
      caseStatus: z.enum(['Solved', 'Unsolved', 'Cold', 'Ongoing']).optional(),

      // Sources / further reading (section 8). Well-sourced content is favored by AI engines.
      sources: z
        .array(
          z.object({
            title: z.string(),
            url: z.string().url().optional(),
            publisher: z.string().optional(),
          }),
        )
        .default([]),

      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      // Marks scaffold content awaiting a full write-up (shows a subtle notice).
      placeholder: z.boolean().default(false),
      readingTime: z.number().optional(),
    }),
});

export const collections = { cases };
