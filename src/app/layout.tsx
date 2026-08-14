import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Assistant, Heebo } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "./providers";


const assistant = Assistant({ subsets: ['hebrew'], variable: '--font-assistant' });
const heebo = Heebo({ subsets: ['hebrew'], variable: '--font-heebo' });

const SITE_URL = "https://talgoren.co.il";
const SITE_TITLE = "טל גורן אדריכלית מומלצת | תכנון ועיצוב בתים פרטיים";
const SITE_DESCRIPTION =
  "אדריכלית מומלצת עם מעל 25 שנות ניסיון בתכנון בתים פרטיים בשרון הצפוני. ליווי מקצועי ואישי מהרעיון הראשון ועד למפתח — פגישת ייעוץ ראשונה ללא עלות.";
const OG_IMAGE = "/images/tahl-portrait.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "טל גורן אדריכלית",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: "טל גורן אדריכלית" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: {
    languages: {
      "he-IL": "/",
      "x-default": "/",
    },
  },
};

// Stable identifiers so the same business / person entity is referenced (not
// re-declared) across every page's structured data.
const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/about#person`;

// The architect, described once with verifiable professional credentials.
// Reference this via { "@id": PERSON_ID } elsewhere instead of re-declaring it.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "טל גורן",
  jobTitle: "אדריכלית רשויה ומורשית היתר",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}${OG_IMAGE}`,
  worksFor: { "@id": ORG_ID },
  alumniOf: { "@type": "CollegeOrUniversity", name: "הטכניון — מכון טכנולוגי לישראל" },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "professional license", name: "אדריכלית רשומה, מס' רישום 118121" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "professional license", name: "אדריכלית רשויה, מס' רישיון 11085135" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "professional license", name: "אדריכלית מורשית היתר, מס' תעודה 01-002-0000009445" },
  ],
};

// Local business structured data (helps Google show the firm in local results / rich cards).
// Note: self-serving review/aggregateRating markup was intentionally removed — reviews about
// the business, hosted on its own site, are not eligible for review rich results and risk a
// structured-data manual action. Genuine, visible review text lives on /testimonials, and the
// durable source of an aggregate rating is the live Google Business Profile (see /api/reviews).
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "טל גורן אדריכלית",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: "+972-52-8345799",
  email: "tahl.goren.arch@gmail.com",
  priceRange: "₪₪₪",
  address: {
    "@type": "PostalAddress",
    streetAddress: "רחוב האלה 22",
    addressLocality: "גבעת עדה",
    addressRegion: "מחוז חיפה",
    addressCountry: "IL",
  },
  // Approximate office coordinates in Givat Ada — verify the exact pin before relying on it.
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.4936,
    longitude: 34.9317,
  },
  areaServed: ["חיפה והצפון", "השרון", "אזור מנשה", "חוף הכרמל", "זכרון יעקב", "פרדס חנה-כרכור", "בנימינה"],
  founder: { "@id": PERSON_ID },
  knowsAbout: ["אדריכלות", "תכנון בתים פרטיים", "עיצוב פנים", "היתרי בנייה"],
  sameAs: [
    "https://www.instagram.com/tahlgoren/",
    "https://www.facebook.com/tahlgoren",
    "https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/",
    "https://maps.app.goo.gl/6hAN8p1iuDtFnb77A",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "טל גורן אדריכלית",
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/articles?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={cn("font-sans", assistant.variable, heebo.variable)}>
      <head>
        {/* The Google "Material Symbols" stylesheet used to be loaded here on
            every page. It is gone: every icon on the site is now an inline SVG
            (components/ui/Icon.tsx). That removes a render-blocking
            third-party stylesheet plus a ~100KB variable icon font from every
            page load — and with it the flash where the browser painted the raw
            ligature text ("arrow_back", "verified") before the font arrived.
            The remaining preconnects serve the Heebo and Assistant faces,
            which next/font still fetches from the Google Fonts CDN. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-background text-on-surface font-body">
        <PostHogProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
