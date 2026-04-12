import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBar from "@/components/FloatingBar";
import LoadingScreen from "@/components/LoadingScreen";
import CursorEffect from "@/components/CursorEffect";
import { VisualEditing } from "@/components/VisualEditing";
import "./globals.css";

export const metadata: Metadata = {
  title: "טל גורן אדריכלות | תכנון בתים פרטיים",
  description: "ליווי מקצועי ואישי לחווית בניה רגועה. תכנון אדריכלי חכם לבית שגדל עם המשפחה. למעלה מ-25 שנות ניסיון.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&family=Assistant:wght@400;600;700&family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
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
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
