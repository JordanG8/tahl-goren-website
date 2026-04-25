import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBar from "@/components/FloatingBar";
import LoadingScreen from "@/components/LoadingScreen";
import CursorEffect from "@/components/CursorEffect";
import "./globals.css";
import { Assistant, Heebo, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const assistant = Assistant({ subsets: ['hebrew'], variable: '--font-assistant' });
const heebo = Heebo({ subsets: ['hebrew'], variable: '--font-heebo' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "טל גורן אדריכלות | תכנון בתים פרטיים",
  description: "ליווי מקצועי ואישי לחווית בניה רגועה. תכנון אדריכלי חכם לבית שגדל עם המשפחה. למעלה מ-25 שנות ניסיון.",
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
      </head>
      <body className="bg-background text-on-surface font-body pb-[10vh] sm:pb-0">
        <LoadingScreen />
        <CursorEffect />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <FloatingBar />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
