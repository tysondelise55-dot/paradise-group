import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/* Search engines and AI assistants are allowed everywhere except the API.
   To opt out of AI *training* crawlers while staying visible in AI search,
   move GPTBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot-Extended,
   CCBot and meta-externalagent into a rule with `disallow: '/'`. */
const bots = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'CCBot',
  'meta-externalagent', 'DuckAssistBot', 'Amazonbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: bots, allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
