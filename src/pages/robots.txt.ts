import type { APIContext } from 'astro';
import { SITE } from '../site.config';

/**
 * robots.txt — explicitly welcomes search AND generative-engine (GEO) crawlers.
 * Listing the AI user-agents with `Allow: /` makes our consent unambiguous,
 * which is what lets engines like ChatGPT, Perplexity, Gemini, and Claude
 * crawl and cite the site.
 */
const AI_BOTS = [
  'GPTBot', // OpenAI (training/discovery)
  'OAI-SearchBot', // OpenAI search
  'ChatGPT-User', // ChatGPT browsing
  'PerplexityBot', // Perplexity
  'Perplexity-User',
  'Google-Extended', // Gemini / Vertex grounding
  'ClaudeBot', // Anthropic
  'Claude-Web',
  'anthropic-ai',
  'Applebot-Extended', // Apple Intelligence
  'Amazonbot',
  'Bytespider', // TikTok
  'CCBot', // Common Crawl (feeds many models)
  'cohere-ai',
  'Meta-ExternalAgent',
];

export async function GET(context: APIContext) {
  const origin = (context.site ?? new URL(SITE.url)).toString().replace(/\/$/, '');

  const lines = [
    '# Case on the Case - crawling welcome',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Generative-engine / AI crawlers - explicitly allowed',
    ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${origin}/sitemap-index.xml`,
    `# Structured site summary for AI: ${origin}/llms.txt`,
    '',
  ].join('\n');

  return new Response(lines, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
