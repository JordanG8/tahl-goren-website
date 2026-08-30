import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionHeading, ButtonLink } from "@/components/ui/Section";
import { CheckIcon, CloseIcon } from "@/components/ui/Icon";
import { packages, packageSpecs, packagesFootnote, packagesBottomLine } from "@/data/packagesContent";

export const metadata: Metadata = {
  title: "מסלולי ליווי אדריכלי ומחירים | טל גורן אדריכלית",
  description:
    "שלושה מסלולי ליווי אדריכלי לבניית בית פרטי — בסיסי, משתלם ו-Total Design. השוואת מחירים ומה כלול בכל מסלול, כדי לבחור את המסלול המתאים לתקציב ולצרכים שלכם.",
  alternates: { canonical: "/packages" },
};

const formatPrice = (n: number) => `${n.toLocaleString("he-IL")} ₪`;

// Displayed cheapest-first. `packageSpecs.values` is positionally tied to the
// source order of `packages`, so look values up by the source index rather
// than reversing the data itself — reversing the array alone would silently
// mismatch every row of the comparison table.
const displayPackages = [...packages].reverse();
const sourceIndexOf = (id: (typeof packages)[number]["id"]) =>
  packages.findIndex((p) => p.id === id);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ליווי אדריכלי לבית פרטי",
  provider: { "@id": "https://talgoren.co.il/#organization" },
  areaServed: "IL",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "מסלולי ליווי אדריכלי - טל גורן אדריכלית",
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
    {
      "@type": "ListItem",
      position: 1,
      item: { "@id": "https://talgoren.co.il/", name: "ראשי" },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: { "@id": "https://talgoren.co.il/packages", name: "מסלולי ליווי" },
    },
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

      <PageHeader
        current="מסלולי ליווי"
        eyebrow="מסלולים ומחירים"
        title="איזה מסלול מתאים לכם?"
        lede="בניית בית היא פרויקט מורכב עם מאות החלטות לאורך הדרך. שלושת המסלולים נבדלים זה מזה בעיקר ברמת הטיפול בעיצוב הפנים — כך שתוכלו לבחור את זה שמתאים לתקציב, לאופי ולרמת המעורבות הרצויה לכם."
      />

      {/* Pricing.
          The recommended plan used to be pushed 16px up the page and wrapped in
          a terracotta header and a heavy shadow, which broke the row off its
          baseline and made the other two look like rejects. All three now sit
          on one line, separated by hairlines; the recommendation is stated in
          words, which is also how it would be said out loud. */}
      <Section tone="sand">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {displayPackages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 100} className="bg-surface">
              <div className="flex flex-col h-full p-8 lg:p-10">
                <div className="min-h-[1.75rem]">
                  {pkg.recommended && (
                    <span className="font-label text-[12px] uppercase tracking-[0.14em] text-clay border border-clay/40 px-2.5 py-1">
                      הבחירה המומלצת שלי
                    </span>
                  )}
                </div>

                <h2 className="font-headline font-black text-2xl text-primary leading-tight mt-6">
                  {pkg.name}
                </h2>
                <p className="font-body text-base text-secondary mt-3 leading-relaxed">
                  {pkg.subtitle}
                </p>

                <div className="mt-7 pt-6 border-t border-hairline">
                  <span className="font-headline font-black text-4xl text-primary block">
                    {formatPrice(pkg.price)}
                  </span>
                  <p className="font-label font-medium text-[13px] text-ink-mute mt-2">
                    {formatPrice(pkg.priceWithVat)} כולל מע&quot;מ
                  </p>
                </div>

                <dl className="mt-7 pt-6 border-t border-hairline space-y-6 flex-1">
                  {[
                    { q: 'למי זה מתאים', a: pkg.forWhom },
                    { q: 'מה אני עושה עבורכם', a: pkg.weDo },
                    { q: 'מה נשאר באחריותכם', a: pkg.remainsWithYou },
                  ].map((row) => (
                    <div key={row.q}>
                      <dt className="font-label font-medium text-[13px] uppercase tracking-[0.16em] text-ink-mute">
                        {row.q}
                      </dt>
                      <dd className="font-body text-base text-secondary leading-relaxed mt-2.5">
                        {row.a}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8">
                  <ButtonLink
                    href="/contact"
                    variant={pkg.recommended ? 'solid' : 'outline'}
                    className="w-full"
                  >
                    לשיחת ייעוץ
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparison table */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="השוואה מלאה"
          title="ההבדלים בין המסלולים"
          className="mb-12"
        />

        <Reveal className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-start border-collapse">
            <thead>
              <tr className="border-b border-primary/25">
                <th className="py-5 pe-4 w-[38%]" />
                {displayPackages.map((pkg) => (
                  <th
                    key={pkg.id}
                    className="py-5 px-4 text-start font-headline font-black text-base text-primary align-bottom"
                  >
                    {pkg.name}
                    {pkg.recommended && (
                      <span className="block font-label text-[12px] uppercase tracking-[0.14em] text-clay mt-2">
                        מומלץ
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packageSpecs.map((row) => (
                <tr key={row.label} className="border-b border-hairline">
                  <td className="py-4 pe-4 font-body text-base text-secondary">{row.label}</td>
                  {displayPackages.map((pkg) => (
                    <td key={pkg.id} className="py-4 px-4 font-headline font-bold text-lg text-primary">
                      {row.values[sourceIndexOf(pkg.id)]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-hairline">
                <td className="py-5 pe-4 font-body text-base text-primary font-bold align-top">
                  עיצוב פנים כלול
                </td>
                {displayPackages.map((pkg) => (
                  <td key={pkg.id} className="py-5 px-4 align-top">
                    {pkg.includesDesign.length ? (
                      <ul className="space-y-2">
                        {pkg.includesDesign.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-base text-secondary leading-snug">
                            <CheckIcon size={15} className="text-clay mt-1" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <CloseIcon size={16} className="text-ink-mute" title="לא כלול" />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <p className="font-body text-xs text-ink-mute mt-7 leading-relaxed">{packagesFootnote}</p>
        </Reveal>
      </Section>

      {/* Bottom line — her own summary, given the weight of a statement */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-[0.35] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-clay/70" />
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-24">
          <Reveal className="max-w-3xl">
            <div className="flex items-center gap-4 mb-7">
              <span className="rule-draw h-px w-10 bg-white/30" />
              <span className="font-label font-medium text-[13px] uppercase tracking-[0.2em] text-white/50">
                השורה התחתונה שלי
              </span>
            </div>
            <p className="font-body text-lg md:text-xl text-white/85 leading-[1.8]">
              {packagesBottomLine}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title="לא בטוחים איזה מסלול מתאים לכם?"
        subtitle="בנו את הבית שלכם חדר אחר חדר במחשבון וקבלו הערכת עלות בנייה מיידית — ואם תרצו, גם דוח אישי למייל. ללא עלות וללא התחייבות."
        primaryLabel="למחשבון העלויות"
        primaryHref="/resources/house-cost-calculator"
      />
    </>
  );
}
