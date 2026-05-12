import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "גלריית פרויקטים | טל גורן אדריכלית",
  description: "הצצה לפרויקטים השונים של משרד טל גורן אדריכלים. תמונות ממגוון בתים פרטיים, עיצוב פנים וחוץ, בסגנונות שונים.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-right">
          <Breadcrumb current="גלריית פרויקטים" />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            גלריית<br/>הפרויקטים
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
            אוסף נבחר של תמונות מבתים פרטיים שתכננתי לאורך השנים. בכל פרויקט תמצאו את החיבור המדויק בין חוץ לפנים ובין החלום למציאות.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10 mr-0 ml-auto"></div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-8 bg-surface-container-low min-h-screen">
        <div className="max-w-[1920px] mx-auto">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
