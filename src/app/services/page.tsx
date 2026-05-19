/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { siteData } from "@/data/siteData";

export const metadata: Metadata = {
  title: "שירותים | טל גורן אדריכלות",
  description:
    "שירותי אדריכלות ועיצוב פנים לבית פרטי: בחירת אדריכלית, עלויות בנייה ותכנון, וטיפים מעשיים לתכנון הבית. מדריכים מקצועיים מטל גורן אדריכלית.",
  alternates: { canonical: "/services" },
};

// The three promoted articles from the existing site, kept for SEO value.
// Each links to its migrated on-site article (matching the redirects in next.config.ts).
const serviceArticles = [
  { id: "choose-architect", href: "/articles/choose-architect" },
  { id: "costs", href: "/articles/building-cost-total" },
  { id: "salon-tips", href: "/articles" },
].map((s) => {
  const article = siteData.articles.find((a) => a.id === s.id)!;
  return { ...s, ...article };
});

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-right">
          <Breadcrumb current="שירותים" />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            שירותים
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
            ליווי אדריכלי מלא לתכנון, רישוי ובניית בית פרטי — מהרעיון הראשון ועד
            המפתח. ריכזתי עבורכם את המדריכים המקצועיים החשובים ביותר שילוו אתכם
            בקבלת ההחלטות הגדולות.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10 mr-0 ml-auto"></div>
        </div>
      </section>

      {/* Promoted Articles */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-right">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
              Guides &amp; Services
            </span>
            <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary mt-4">
              מדריכים מקצועיים
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceArticles.map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="group card-hover block bg-surface overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover img-grayscale"
                  />
                </div>
                <div className="p-8 text-right">
                  <h3 className="font-headline font-bold text-xl text-primary leading-tight group-hover:text-secondary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-secondary text-sm mt-3 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                  <div className="inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors mt-6">
                    למאמר המלא
                    <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">
                      arrow_back
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-surface">
        <div className="max-w-5xl mx-auto p-12 bg-surface-container text-right border border-outline/10">
          <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight leading-tight text-primary mb-6">
            רוצים להתחיל לתכנן את הבית שלכם?
          </h2>
          <p className="text-lg text-secondary mb-10 max-w-2xl leading-relaxed">
            פגישת ייעוץ ראשונה ללא עלות וללא התחייבות. נכיר, נבין מה אתם צריכים,
            ואלווה אתכם בבחירת המסלול הנכון לפרויקט שלכם.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 font-headline font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            לקביעת פגישת ייעוץ
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
        </div>
      </section>
    </>
  );
}
