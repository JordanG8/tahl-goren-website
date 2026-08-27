import { projects as staticProjects } from '@/data/projectsContent'
import { articles as staticArticles } from '@/data/articlesContent'
import { areas as staticAreas } from '@/data/areasContent'

// Hardcoded to match the canonical host declared in robots.ts and every page's
// canonical/JSON-LD URL. Previously this resolved via an env-var fallback
// chain (NEXT_PUBLIC_SITE_URL → VERCEL_PROJECT_PRODUCTION_URL → VERCEL_URL)
// that could silently emit vercel.app or localhost URLs in a misconfigured
// environment; a sitemap listing the wrong host is worse than a rigid one.
const BASE_URL = 'https://talgoren.co.il'

// lastmod values below are the last real git commit date of the page/data
// file backing that route, not `new Date()` recomputed on every request —
// Google discounts (and can start ignoring sitemap-wide) lastmod values that
// change on every regeneration. Bump the relevant date here when the
// underlying page or data file is next meaningfully edited.
const staticRoutes = [
  { url: `${BASE_URL}/`, lastModified: '2026-07-13T09:56:19+00:00', changeFrequency: 'daily', priority: 1 },
  { url: `${BASE_URL}/about`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/projects`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/projects/completed`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/projects/in-design`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/projects/map`, lastModified: '2026-04-25T20:21:08+03:00', changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services`, lastModified: '2026-07-13T09:56:19+00:00', changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/areas`, lastModified: '2026-07-10T00:25:35+00:00', changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/articles`, lastModified: '2026-07-12T00:22:07+00:00', changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE_URL}/faq`, lastModified: '2026-07-12T00:22:07+00:00', changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/packages`, lastModified: '2026-07-13T09:56:19+00:00', changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/gallery`, lastModified: '2026-07-12T00:22:07+00:00', changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/resources/plot-checklist`, lastModified: '2026-07-13T09:56:19+00:00', changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/resources/house-cost-calculator`, lastModified: '2026-08-27T00:00:00+00:00', changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/testimonials`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/videos`, lastModified: '2026-07-12T00:22:07+00:00', changeFrequency: 'weekly', priority: 0.6 },
  { url: `${BASE_URL}/contact`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/social`, lastModified: '2026-07-12T00:22:07+00:00', changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/accessibility`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/privacy`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/terms`, lastModified: '2026-06-28T02:51:01+03:00', changeFrequency: 'yearly', priority: 0.3 },
]

// Data files' own last git commit date — real, not fabricated, and identical
// across each group is expected (they're one shared data file), unlike the
// old per-request `new Date()` stamp.
const PROJECTS_DATA_LASTMOD = '2026-05-21T15:47:10+03:00'
const AREAS_DATA_LASTMOD = '2026-05-30T15:38:39+03:00'

export async function GET() {
  const projectRoutes = staticProjects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug || p.id}`,
    lastModified: PROJECTS_DATA_LASTMOD,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const articleRoutes = staticArticles.map((a) => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const areaRoutes = staticAreas.map((a) => ({
    url: `${BASE_URL}/areas/${a.slug}`,
    lastModified: AREAS_DATA_LASTMOD,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const allRoutes = [...staticRoutes, ...projectRoutes, ...articleRoutes, ...areaRoutes]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${new Date(route.lastModified).toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
