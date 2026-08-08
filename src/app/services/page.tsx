import Image from 'next/image';
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { siteData } from "@/data/siteData";
import { areas } from "@/data/areasContent";
import { packages } from "@/data/packagesContent";

// Cheapest-first, matching the order on /packages.
const servicePackages = [...packages].reverse();

export const metadata: Metadata = {
  title: "שירותים | טל גורן אדריכלית",
  description:
    "שירותי אדריכלות ועיצוב פנים לבית פרטי: בחירת אדריכלית, עלויות בנייה ותכנון, וטיפים מעשיים לתכנון הבית. מדריכים מקצועיים מטל גורן אדריכלית.",
  alternates: { canonical: "/services" },
};

// The three promoted articles from the existing site, kept for SEO value.
// Each links to its migrated on-site article (matching the redirects in next.config.ts).
const serviceArticles = [
  { id: "choose-architect", href: "/articles/choose-architect" },
  { id: "costs", href: "/articles/building-cost-total" },
  { id: "salon-tips", href: "/articles/rooms-living-room" },
].map((s) => {
  const article = siteData.articles.find((a) => a.id === s.id)!;
  return { ...s, ...article };
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: { "@id": "https://talgoren.co.il/", name: "ראשי" },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: { "@id": "https://talgoren.co.il/services", name: "שירותים" },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover img-grayscale"
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

      {/* Packages — moved in from the former top-level "מסלולים ומחירים" page.
          Ordered cheapest-first, so the eye climbs the price ladder. */}
      <section
        id="packages"
        className="py-24 md:py-32 px-8 bg-surface-container-low scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto text-right">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
            מסלולים ומחירים
          </span>
          <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary mt-4 max-w-3xl">
            שלושה מסלולי ליווי, מחיר ותכולה שקופים
          </h2>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
            המסלולים נבדלים זה מזה בעיקר ברמת הטיפול בעיצוב הפנים. בחרו את
            זה שמתאים לתקציב, לאופי ולרמת המעורבות שנוחה לכם.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10 mr-0 ml-auto" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-start">
            {servicePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col h-full bg-surface text-right border ${
                  pkg.recommended
                    ? "border-brand-accent shadow-2xl md:-translate-y-4"
                    : "border-outline/15"
                }`}
              >
                <div
                  className={`px-7 pt-7 pb-6 ${
                    pkg.recommended ? "bg-brand-accent text-white" : "bg-primary text-white"
                  }`}
                >
                  {pkg.recommended ? (
                    <span className="inline-block bg-white/20 font-label text-[10px] uppercase tracking-[0.2em] px-3 py-1 mb-3">
                      הבחירה המומלצת שלי
                    </span>
                  ) : null}
                  <h3 className="font-headline font-black text-2xl leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="font-body text-sm text-white/70 mt-2 leading-relaxed">
                    {pkg.subtitle}
                  </p>
                </div>

                <div className="px-7 py-6 border-b border-outline/10">
                  <span className="font-headline font-black text-4xl text-primary">
                    {pkg.price.toLocaleString("he-IL")} ₪
                  </span>
                  <p className="font-label text-xs text-secondary mt-2">
                    {pkg.priceWithVat.toLocaleString("he-IL")} ₪ כולל מע&quot;מ
                  </p>
                </div>

                <div className="px-7 py-6 flex-1">
                  <h4 className="font-headline font-bold text-sm text-primary mb-2">
                    למי זה מתאים?
                  </h4>
                  <p className="font-body text-sm text-secondary leading-relaxed">
                    {pkg.forWhom}
                  </p>
                </div>

                <div className="px-7 pb-7">
                  <Link
                    href="/packages"
                    className={`block text-center w-full px-6 py-4 font-headline font-bold text-xs uppercase tracking-widest transition-colors ${
                      pkg.recommended
                        ? "bg-brand-accent text-white hover:opacity-90"
                        : "bg-primary text-white hover:bg-secondary"
                    }`}
                  >
                    לפירוט המלא
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors mt-12"
          >
            להשוואה המלאה בין שלושת המסלולים
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </Link>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-20 px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-right">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
            Service Areas
          </span>
          <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mt-4 mb-8">
            אזורי שירות
          </h2>
          <div className="flex flex-wrap gap-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="border border-outline/20 px-5 py-3 font-headline font-bold text-sm text-primary hover:bg-surface-container-highest hover:text-secondary transition-colors"
              >
                {area.h1}
              </Link>
            ))}
          </div>
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors mt-8"
          >
            למפת אזורי השירות
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-surface-container-low">
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
