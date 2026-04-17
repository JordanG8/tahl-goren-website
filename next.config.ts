import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Articles (old Hebrew slugs → new)
      { source: "/%D7%A2%D7%9C%D7%95%D7%99%D7%95%D7%AA-%D7%91%D7%A0%D7%99%D7%94-%D7%95%D7%9E%D7%97%D7%99%D7%A8-%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA", destination: "/articles/costs", permanent: true },
      { source: "/%D7%AA%D7%9B%D7%A0%D7%95%D7%9F-%D7%91%D7%99%D7%AA-%D7%A4%D7%A8%D7%98%D7%99", destination: "/articles/planning-private-house", permanent: true },
      { source: "/%D7%94%D7%A1%D7%9C%D7%95%D7%9F-%D7%98%D7%99%D7%A4%D7%99%D7%9D-%D7%95%D7%9B%D7%9C%D7%99%D7%9D-%D7%9E%D7%A2%D7%A9%D7%99%D7%99%D7%9D-%D7%9C%D7%AA%D7%9B%D7%A0%D7%95%D7%9F", destination: "/articles/living-room-guide", permanent: true },
      { source: "/%D7%90%D7%99%D7%9A-%D7%9C%D7%91%D7%97%D7%95%D7%A8-%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%99%D7%AA", destination: "/articles/choose-architect", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA-%D7%91%D7%AA%D7%99%D7%9D-%D7%A4%D7%A8%D7%98%D7%99%D7%99%D7%9D", destination: "/articles/private-house-architecture", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA-%D7%9E%D7%95%D7%93%D7%A8%D7%A0%D7%99%D7%AA", destination: "/articles/modern-architecture", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA-%D7%99%D7%95%D7%A7%D7%A8%D7%94", destination: "/articles/luxury-homes", permanent: true },
      { source: "/%D7%9E%D7%A2%D7%A6%D7%91%D7%AA-%D7%A4%D7%A0%D7%99%D7%9D", destination: "/articles/architect-vs-interior-designer", permanent: true },
      // Guid articles
      { source: "/guid/%D7%A9%D7%90%D7%9C%D7%95%D7%9F-%D7%A4%D7%A8%D7%95%D7%92%D7%A8%D7%9E%D7%94-%D7%9C%D7%91%D7%99%D7%AA-%D7%97%D7%93%D7%A9", destination: "/articles/program-questionnaire", permanent: true },
      { source: "/guid/%D7%A9%D7%90%D7%9C%D7%95%D7%9F-%D7%A4%D7%A8%D7%95%D7%92%D7%A8%D7%9E%D7%94-%D7%9C%D7%A9%D7%99%D7%A4%D7%95%D7%A5-%D7%95%D7%AA%D7%95%D7%A1%D7%A4%D7%AA-%D7%91%D7%A0%D7%99%D7%94", destination: "/articles/renovation-and-additions", permanent: true },
      { source: "/guid/%D7%A6%D7%A7-%D7%9C%D7%99%D7%A1%D7%98-%D7%9C%D7%AA%D7%9B%D7%A0%D7%95%D7%9F-%D7%9E%D7%98%D7%91%D7%97", destination: "/articles/kitchen-checklist", permanent: true },
      { source: "/guid/%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%9C%D7%94%D7%92%D7%A9%D7%99%D7%9D-%D7%91%D7%99%D7%AA-%D7%95%D7%9C%D7%91%D7%A0%D7%95%D7%AA-%D7%97%D7%9C%D7%95%D7%9D", destination: "/articles/planning-private-house", permanent: true },
      { source: "/guid/%D7%A9%D7%9C%D7%91%D7%99-%D7%94%D7%AA%D7%9B%D7%A0%D7%95%D7%9F-%D7%95%D7%94%D7%91%D7%A0%D7%99%D7%94-%D7%A2%D7%9C-%D7%A6%D7%99%D7%A8-%D7%94%D7%96%D7%9E%D7%9F", destination: "/articles/planning-timeline", permanent: true },
      // Local landing pages → services
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%99%D7%9D-%D7%A4%D7%A8%D7%93%D7%A1-%D7%97%D7%A0%D7%94-%D7%9B%D7%A8%D7%9B%D7%95%D7%A8", destination: "/services", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C-%D7%97%D7%95%D7%A3-%D7%94%D7%9B%D7%A8%D7%9E%D7%9C", destination: "/services", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C-%D7%91%D7%A2%D7%AA%D7%9C%D7%99%D7%AA", destination: "/services", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C-%D7%A2%D7%9E%D7%A7-%D7%97%D7%A4%D7%A8", destination: "/services", permanent: true },
      { source: "/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C-%D7%96%D7%9B%D7%A8%D7%95%D7%9F-%D7%99%D7%A2%D7%A7%D7%91%D6%BF", destination: "/services", permanent: true },
      // Site structure
      { source: "/%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98", destination: "/projects", permanent: true },
      { source: "/%D7%9E%D7%90%D7%9E%D7%A8%D7%99%D7%9D", destination: "/articles", permanent: true },
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
      // Project pages → projects completed listing (catch-all for בית-משפחת-* URLs)
      { source: "/%D7%91%D7%99%D7%AA-%D7%9E%D7%A9%D7%A4%D7%97%D7%AA-:slug", destination: "/projects/completed", permanent: true },
    ];
  },
};

export default nextConfig;
