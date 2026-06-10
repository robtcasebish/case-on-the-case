import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * "stories" — the true-crime articles.
 * The schema is intentionally strict: every field that powers SEO/GEO
 * (structured data, OpenGraph, sitemap, citations) is required or validated,
 * so a story can't ship without the signals AI engines and search rely on.
 */
const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(110),
      // One- to two-sentence factual summary. Used for meta description,
      // OG description, and as the citable abstract for AI engines.
      description: z.string().min(50).max(320),
      // Short, declarative lede shown on the page and used in schema "abstract".
      dek: z.string().max(280).optional(),

      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      author: z.string().default('The Case on the Case Editorial Team'),

      // Hero image (optional). When present, feeds OG + Article image schema.
      cover: image().optional(),
      coverAlt: z.string().optional(),

      // Taxonomy — powers topic hubs + internal linking (a GEO ranking aid).
      category: z
        .enum(['Cold Case', 'Trial', 'Investigation', 'Missing Persons', 'Forensics', 'Profile'])
        .default('Investigation'),
      tags: z.array(z.string()).default([]),

      // Geography & time of the real case — strong entity signals for AI.
      location: z.string().optional(),
      caseYear: z.number().int().optional(),
      // Case status helps engines answer "is this solved?" precisely.
      caseStatus: z.enum(['Solved', 'Unsolved', 'Cold', 'Ongoing']).optional(),

      // Sources/citations. Well-sourced content is favored by AI engines.
      sources: z
        .array(
          z.object({
            title: z.string(),
            url: z.string().url().optional(),
            publisher: z.string().optional(),
          }),
        )
        .default([]),

      // Editorial controls.
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      // Estimated read time override (otherwise computed).
      readingTime: z.number().optional(),
    }),
});

export const collections = { stories };
