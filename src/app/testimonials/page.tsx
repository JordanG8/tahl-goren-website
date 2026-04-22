import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ReviewsCarousel from "@/components/ReviewsCarousel";

export const metadata: Metadata = {
  title: "המלצות לקוחות | טל גורן אדריכלות",
  description:
    "קראו מה לקוחות אומרים על העבודה עם טל גורן אדריכלית. ביקורות אמיתיות ממשפחות שבנו את בית חלומותיהן.",
  alternates: { canonical: "/testimonials" },
};

export default function Testimonials() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 px-8 lg:px-12 max-w-[1920px] mx-auto">
        <Breadcrumb items={[{ label: "ראשי", to: "/" }, { label: "לקוחות מספרים" }]} />
        <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-5xl">
          מה אומרים עלינו
        </h1>
        <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-8">
          הביקורות של הלקוחות שלנו מדברות בעד עצמן. מוזמנים להתרשם מהמלצות של משפחות שליווינו לאורך השנים.
        </p>
      </section>

      {/* Reviews Grid */}
      <section className="px-8 lg:px-12 pb-12 md:pb-24 max-w-[1920px] mx-auto">
        <ReviewsCarousel />

        {/* Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJJ3hIcCwPHRURDSsOb8puf5g"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors group"
          >
            <span>השאירו ביקורת בגוגל</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">edit</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border-2 border-primary text-primary px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors group"
          >
            <span>בואו נדבר</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95" />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">הסיפור הבא</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tight leading-[0.95] text-white">
            בואו נבנה גם את<br />הסיפור שלכם.
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            כל בית שתכננתי התחיל בשיחה. ספרו לי על החלום שלכם ונהפוך אותו יחד למציאות.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 mt-6">
            <Link href="/contact" className="inline-flex items-center justify-center gap-4 bg-white text-primary px-12 py-5 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors group">
              דברו איתי
              <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
            </Link>
            <Link href="/projects" className="inline-flex items-center justify-center gap-4 bg-white/10 text-white px-12 py-5 font-headline font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-colors">
              צפו בפרויקטים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
