import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { packages, packageSpecs, packagesFootnote, packagesBottomLine } from "@/data/packagesContent";

export const metadata: Metadata = {
  title: "מסלולי ליווי אדריכלי ומחירים | טל גורן אדריכלות",
  description:
    "שלושה מסלולי ליווי אדריכלי לבניית בית פרטי — בסיסי, משתלם ו-Total Design. השוואת מחירים ומה כלול בכל מסלול, כדי לבחור את המסלול המתאים לתקציב ולצרכים שלכם.",
  alternates: { canonical: "/packages" },
};

const formatPrice = (n: number) => `${n.toLocaleString("he-IL")} ₪`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ליווי אדריכלי לבית פרטי",
  provider: { "@id": "https://talgoren.co.il/#organization" },
  areaServed: "IL",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "מסלולי ליווי אדריכלי - טל גורן אדריכלות",
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.name, description: p.forWhom },
      priceSpecification: {
        "@type": "PriceSpecification",
        price: p.price,
        priceCurrency: "ILS",
      },
    })),
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ראשי", item: "https://talgoren.co.il/" },
    { "@type": "ListItem", position: 2, name: "מסלולי ליווי", item: "https://talgoren.co.il/packages" },
  ],
};

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-right">
          <Breadcrumb current="מסלולי ליווי" />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            איזה מסלול מתאים לכם?
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
            בניית בית היא פרויקט מורכב עם מאות החלטות לאורך הדרך. כדי להתאים
            את השירות שלי לצרכים המשתנים של משפחות שונות, פיתחתי שלושה
            מסלולי ליווי שנבדלים זה מזה בעיקר ברמת הטיפול בעיצוב הפנים — כך
            שתוכלו לבחור את המסלול שמתאים לתקציב, לאופי ולרמת המעורבות
            הרצויה לכם.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10 mr-0 ml-auto"></div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 md:py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col bg-surface border text-right h-full ${
                  pkg.recommended
                    ? "border-accent shadow-2xl md:-translate-y-4"
                    : "border-outline/10"
                }`}
              >
                <div className={`px-8 pt-8 pb-6 ${pkg.recommended ? "bg-accent text-white" : "bg-primary text-white"}`}>
                  {pkg.recommended && (
                    <span className="inline-block bg-white/20 font-label text-[10px] uppercase tracking-[0.2em] px-3 py-1 mb-3">
                      הבחירה המומלצת שלי
                    </span>
                  )}
                  <h2 className="font-headline font-black text-2xl leading-tight">{pkg.name}</h2>
                  <p className="font-body text-sm text-white/70 mt-2">{pkg.subtitle}</p>
                </div>

                <div className="px-8 py-6 border-b border-outline/10">
                  <span className="font-headline font-black text-4xl text-primary">{formatPrice(pkg.price)}</span>
                  <p className="font-label text-xs text-secondary mt-1">
                    ({formatPrice(pkg.priceWithVat)} כולל מע&quot;מ)
                  </p>
                </div>

                <div className="px-8 py-6 space-y-6 flex-1">
                  <div>
                    <h3 className="font-headline font-bold text-sm text-primary mb-2">למי זה מתאים?</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">{pkg.forWhom}</p>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm text-primary mb-2">מה אני עושה עבורכם?</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">{pkg.weDo}</p>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm text-primary mb-2">מה נשאר באחריותכם?</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">{pkg.remainsWithYou}</p>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <Link
                    href="/contact"
                    className={`block text-center w-full px-6 py-4 font-headline font-bold text-sm uppercase tracking-widest transition-colors ${
                      pkg.recommended
                        ? "bg-accent text-white hover:opacity-90"
                        : "bg-primary text-white hover:bg-secondary"
                    }`}
                  >
                    לשיחת ייעוץ על המסלול
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-right">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
              השוואה מלאה
            </span>
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mt-4">
              ההבדלים בין המסלולים
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-right border-collapse">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="py-4 px-4 font-headline font-bold text-sm text-secondary"></th>
                  {packages.map((pkg) => (
                    <th
                      key={pkg.id}
                      className={`py-4 px-4 font-headline font-black text-base ${pkg.recommended ? "text-accent" : "text-primary"}`}
                    >
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {packageSpecs.map((row) => (
                  <tr key={row.label} className="border-b border-outline/10">
                    <td className="py-4 px-4 font-body text-sm text-secondary">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="py-4 px-4 font-headline font-bold text-lg text-primary">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-outline/10">
                  <td className="py-4 px-4 font-body text-sm text-secondary font-bold">עיצוב פנים כלול</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="py-4 px-4 align-top">
                      {pkg.includesDesign.length ? (
                        <ul className="space-y-1.5">
                          {pkg.includesDesign.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-secondary">
                              <span className="material-symbols-outlined text-tertiary text-base mt-0.5">check</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="material-symbols-outlined text-outline text-lg">close</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs text-secondary/70 mt-6 leading-relaxed">{packagesFootnote}</p>
        </div>
      </section>

      {/* Bottom line */}
      <section className="py-16 md:py-24 px-8 bg-primary relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-right relative z-10">
          <span className="font-label text-[10px] tracking-[0.3em] text-white/50 uppercase">השורה התחתונה שלי</span>
          <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed mt-6">{packagesBottomLine}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-surface-container-low">
        <div className="max-w-5xl mx-auto p-12 bg-surface-container text-right border border-outline/10">
          <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight leading-tight text-primary mb-6">
            לא בטוחים איזה מסלול מתאים לכם?
          </h2>
          <p className="text-lg text-secondary mb-10 max-w-2xl leading-relaxed">
            בפגישת הייעוץ הראשונה — ללא עלות וללא התחייבות — נבין יחד את
            הצרכים, התקציב והאופי שלכם, ואמליץ לכם על המסלול הנכון ביותר
            לפרויקט שלכם.
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
