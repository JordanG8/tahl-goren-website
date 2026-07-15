import { MetadataRoute } from 'next'

const BASE_URL = 'https://talgoren.co.il'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // All crawlers — including AI answer-engine crawlers (GPTBot, OAI-SearchBot,
      // ClaudeBot, PerplexityBot, etc.) — may crawl everything except the private
      // admin panel, the Sanity studio, and API routes.
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/studio', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
