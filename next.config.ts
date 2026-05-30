import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'talgoren.co.il',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async redirects() {
    return [
      // Articles (old Hebrew slugs → new)
      { source: "/%D7%A2%D7%9C%D7%95%D7%99%D7%95%D7%AA-%D7%91%D7%A0%D7%99%D7%94-%D7%95%D7%9E%D7%97%D7%99%D7%A8-%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA", destination: "/articles/building-cost-total", permanent: true },
      { source: "/%D7%AA%D7%9B%D7%A0%D7%95%D7%9F-%D7%91%D7%99%D7%AA-%D7%A4%D7%A8%D7%98%D7%99", destination: "/articles/building-stages", permanent: true },
      { source: "/%D7%94%D7%A1%D7%9C%D7%95%D7%9F-%D7%98%D7%99%D7%A4%D7%99%D7%9D-%D7%95%D7%9B%D7%9C%D7%99%D7%9D-%D7%9E%D7%A2%D7%A9%D7%99%D7%99%D7%9D-%D7%9C%D7%AA%D7%9B%D7%A0%D7%95%D7%9F", destination: "/articles", permanent: true },
      { source: "/%D7%90%D7%99%D7%9A-%D7%9C%D7%91%D7%97%D7%95%D7%A8-%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%99%D7%AA", destination: "/articles/choose-architect", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA-%D7%91%D7%AA%D7%99%D7%9D-%D7%A4%D7%A8%D7%98%D7%99%D7%99%D7%9D", destination: "/articles", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA-%D7%9E%D7%95%D7%93%D7%A8%D7%A0%D7%99%D7%AA", destination: "/articles/modern-architecture", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA-%D7%99%D7%95%D7%A7%D7%A8%D7%94", destination: "/articles", permanent: true },
      { source: "/%D7%9E%D7%A2%D7%A6%D7%91%D7%AA-%D7%A4%D7%A0%D7%99%D7%9D", destination: "/articles", permanent: true },
      // Guid articles
      { source: "/guid/%D7%A9%D7%90%D7%9C%D7%95%D7%9F-%D7%A4%D7%A8%D7%95%D7%92%D7%A8%D7%9E%D7%94-%D7%9C%D7%91%D7%99%D7%AA-%D7%97%D7%93%D7%A9", destination: "/articles", permanent: true },
      { source: "/guid/%D7%A9%D7%90%D7%9C%D7%95%D7%9F-%D7%A4%D7%A8%D7%95%D7%92%D7%A8%D7%9E%D7%94-%D7%9C%D7%A9%D7%99%D7%A4%D7%95%D7%A5-%D7%95%D7%AA%D7%95%D7%A1%D7%A4%D7%AA-%D7%91%D7%A0%D7%99%D7%94", destination: "/articles", permanent: true },
      { source: "/guid/%D7%A6%D7%A7-%D7%9C%D7%99%D7%A1%D7%98-%D7%9C%D7%AA%D7%9B%D7%A0%D7%95%D7%9F-%D7%9E%D7%98%D7%91%D7%97", destination: "/articles", permanent: true },
      { source: "/guid/%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%9C%D7%94%D7%92%D7%A9%D7%99%D7%9D-%D7%91%D7%99%D7%AA-%D7%95%D7%9C%D7%91%D7%A0%D7%95%D7%AA-%D7%97%D7%9C%D7%95%D7%9D", destination: "/articles/first-meeting-prep", permanent: true },
      { source: "/guid/%D7%A9%D7%9C%D7%91%D7%99-%D7%94%D7%AA%D7%9B%D7%A0%D7%95%D7%9F-%D7%95%D7%94%D7%91%D7%A0%D7%99%D7%94-%D7%A2%D7%9C-%D7%A6%D7%99%D7%A8-%D7%94%D7%96%D7%9E%D7%9F", destination: "/articles/building-timeline", permanent: true },
      // Local landing pages → dedicated per-area pages (1:1, preserves local SEO intent)
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%99%D7%9D-%D7%A4%D7%A8%D7%93%D7%A1-%D7%97%D7%A0%D7%94-%D7%9B%D7%A8%D7%9B%D7%95%D7%A8", destination: "/areas/pardes-hanna-karkur", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C-%D7%97%D7%95%D7%A3-%D7%94%D7%9B%D7%A8%D7%9E%D7%9C", destination: "/areas/hof-hakarmel", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C-%D7%91%D7%A2%D7%AA%D7%9C%D7%99%D7%AA", destination: "/areas/atlit", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C-%D7%A2%D7%9E%D7%A7-%D7%97%D7%A4%D7%A8", destination: "/areas/emek-hefer", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C-%D7%96%D7%9B%D7%A8%D7%95%D7%9F-%D7%99%D7%A2%D7%A7%D7%91%D6%BF", destination: "/areas/zichron-yaakov", permanent: true },
      // Site structure
      { source: "/%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98", destination: "/projects", permanent: true },
      { source: "/%D7%9E%D7%90%D7%9E%D7%A8%D7%99%D7%9D", destination: "/articles", permanent: true },
      // Articles hub — the slug actually indexed in the old sitemap is misspelled (מאאםרים)
      { source: "/%D7%9E%D7%90%D7%90%D7%9D%D7%A8%D7%99%D7%9D", destination: "/articles", permanent: true },
      { source: "/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D", destination: "/services", permanent: true },
      { source: "/%D7%90%D7%95%D7%93%D7%95%D7%AA", destination: "/about", permanent: true },
      { source: "/%D7%A6%D7%95%D7%A8-%D7%A7%D7%A9%D7%A8", destination: "/contact", permanent: true },
      { source: "/%D7%9C%D7%A7%D7%95%D7%97%D7%95%D7%AA-%D7%9E%D7%A1%D7%A4%D7%A8%D7%99%D7%9D", destination: "/testimonials", permanent: true },
      { source: "/%D7%A9%D7%95%D7%AA", destination: "/faq", permanent: true },
      { source: "/%D7%AA%D7%A7%D7%A0%D7%95%D7%9F-%D7%AA%D7%A0%D7%90%D7%99-%D7%A9%D7%99%D7%9E%D7%95%D7%A9-%D7%95%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%A4%D7%A8%D7%98%D7%99%D7%95%D7%AA", destination: "/terms", permanent: true },
      // WP taxonomy
      { source: "/author/:path*", destination: "/about", permanent: true },
      { source: "/tag/:path*", destination: "/articles", permanent: true },
      { source: "/category/:path*", destination: "/articles", permanent: true },
      { source: "/guid", destination: "/articles", permanent: true },
      { source: "/guides", destination: "/articles", permanent: true },
      // Catch-all for any guid article not mapped above (placed after the specific /guid/* mappings so those win)
      { source: "/guid/:path*", destination: "/articles", permanent: true },
      // Project pages → matching individual project (1:1, slugs taken from the live old sitemap)
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a8-%d7%91%d7%90%d7%95%d7%a8-%d7%a2%d7%a7%d7%99%d7%91%d7%90", destination: "/projects/r-or-akiva", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a1-%d7%91%d7%91%d7%a0%d7%99%d7%9e%d7%99%d7%a0%d7%94", destination: "/projects/s-binyamina", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%98-%d7%91%d7%9e%d7%95%d7%a9%d7%91-%d7%9e%d7%90%d7%95%d7%a8", destination: "/projects/t-maor", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a0-%d7%91%d7%96%d7%9b%d7%a8%d7%95%d7%9f-%d7%99%d7%a2%d7%a7%d7%91-2", destination: "/projects/n-zichron-2", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a9-%d7%91%d7%a7%d7%a6%d7%99%d7%a8", destination: "/projects/sh-katzir", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%94-%d7%91%d7%90%d7%95%d7%a8-%d7%a2%d7%a7%d7%99%d7%91%d7%90", destination: "/projects/h-or-akiva", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a9%d7%a7-%d7%91%d7%9e%d7%90%d7%95%d7%a8", destination: "/projects/shak-maor", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a9-%d7%91%d7%9e%d7%95%d7%a9%d7%91-%d7%9e%d7%90%d7%95%d7%a8", destination: "/projects/sh-maor", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a9-%d7%91%d7%a4%d7%a8%d7%93%d7%a1-%d7%97%d7%a0%d7%94", destination: "/projects/sh-pardes-hanna", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%9e%d7%a0-%d7%91%d7%9e%d7%95%d7%a9%d7%91-%d7%9e%d7%90%d7%95%d7%a8", destination: "/projects/m-maor", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%9e-%d7%91%d7%9e%d7%95%d7%a9%d7%91-%d7%9e%d7%90%d7%95%d7%a8", destination: "/projects/ma-maor", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%92-%d7%91%d7%91%d7%a0%d7%99%d7%9e%d7%99%d7%a0%d7%94", destination: "/projects/g-binyamina", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%95-%d7%91%d7%96%d7%9b%d7%a8%d7%95%d7%9f-%d7%99%d7%a2%d7%a7%d7%91", destination: "/projects/v-zichron", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a4-%d7%91%d7%a4%d7%a8%d7%93%d7%a1-%d7%97%d7%a0%d7%94", destination: "/projects/p-pardes-hanna", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%95-%d7%91%d7%92%d7%91%d7%a2%d7%aa-%d7%a2%d7%93%d7%94", destination: "/projects/v-givat-ada", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a0-%d7%91%d7%96%d7%9b%d7%a8%d7%95%d7%9f-%d7%99%d7%a2%d7%a7%d7%91", destination: "/projects/ni-zichron", permanent: true },
      { source: "/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%95-%d7%91%d7%92%d7%91%d7%a2%d7%aa-%d7%a2%d7%93%d7%94-2", destination: "/projects/v-givat-ada-2", permanent: true },
      // Fallback: any other בית-משפחת-* URL not matched above → completed projects listing
      { source: "/%D7%91%D7%99%D7%AA-%D7%9E%D7%A9%D7%A4%D7%97%D7%AA-:slug", destination: "/projects/completed", permanent: true },
    ];
  },
};

export default nextConfig;
