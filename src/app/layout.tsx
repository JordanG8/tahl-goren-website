import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Assistant, Heebo, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "./providers";
import { reviews } from "@/data/reviews";


const assistant = Assistant({ subsets: ['hebrew'], variable: '--font-assistant' });
const heebo = Heebo({ subsets: ['hebrew'], variable: '--font-heebo' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
    siteName: "טל גורן אדריכלות",
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

// Local business structured data (helps Google show the firm in local results / rich cards)
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "טל גורן אדריכלית",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: "+972-52-8345799",
  email: "tahl.goren.arch@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "גבעת עדה",
    addressRegion: "מחוז חיפה",
    addressCountry: "IL",
  },
  areaServed: ["חיפה והצפון", "השרון", "אזור מנשה", "חוף הכרמל", "זכרון יעקב", "פרדס חנה-כרכור", "בנימינה"],
  founder: { "@type": "Person", name: "טל גורן", jobTitle: "אדריכלית רשויה" },
  knowsAbout: ["אדריכלות", "תכנון בתים פרטיים", "עיצוב פנים", "היתרי בנייה"],
  sameAs: [
    "https://www.instagram.com/tahlgoren/",
    "https://www.facebook.com/tahlgoren",
    "https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/",
    "https://maps.app.goo.gl/6hAN8p1iuDtFnb77A",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)),
    bestRating: 5,
    reviewCount: reviews.length,
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "טל גורן אדריכלית",
  url: SITE_URL,
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
    <html lang="he" dir="rtl" className={cn("font-sans", assistant.variable, heebo.variable, inter.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
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
