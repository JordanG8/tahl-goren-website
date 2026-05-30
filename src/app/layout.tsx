import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBar from "@/components/FloatingBar";
import LoadingScreen from "@/components/LoadingScreen";
import CursorEffect from "@/components/CursorEffect";
import "./globals.css";
import { Assistant, Heebo, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "./providers";


const assistant = Assistant({ subsets: ['hebrew'], variable: '--font-assistant' });
const heebo = Heebo({ subsets: ['hebrew'], variable: '--font-heebo' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const SITE_URL = "https://talgoren.co.il";
const SITE_TITLE = "טל גורן אדריכלית | אדריכלות, תכנון ועיצוב בתים פרטיים";
const SITE_DESCRIPTION =
  "ליווי מקצועי ואישי לחווית בניה רגועה. תכנון אדריכלי חכם לבית שגדל עם המשפחה. למעלה מ-25 שנות ניסיון.";
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
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={cn("font-sans", assistant.variable, heebo.variable, inter.variable)}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="bg-background text-on-surface font-body pb-[10vh] sm:pb-0">
        <PostHogProvider>
          <LoadingScreen />
          <CursorEffect />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <FloatingBar />
          <Footer />
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
