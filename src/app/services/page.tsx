import Image from 'next/image';
import type { Metadata } from "next";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionHeading, ArrowLink, ButtonLink } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Icon";
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

      <PageHeader
        current="שירותים"
        eyebrow="ליווי אדריכלי מלא"
        title="שירותים"
        lede="ליווי אדריכלי מלא לתכנון, רישוי ובניית בית פרטי — מהרעיון הראשון ועד המפתח. ריכזתי כאן את המדריכים המקצועיים החשובים ביותר, ואת שלושת מסלולי הליווי עם התכולה והמחיר של כל אחד."
      />

      {/* ======== 01 · GUIDES ======== */}
      <Section tone="paper">
        <SectionHeading
          index="01"
          eyebrow="מדריכים"
          title="מדריכים מקצועיים"
          lede="שלושת המאמרים שהכי כדאי לקרוא לפני שמתחילים."
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {serviceArticles.map((article, i) => (
            <Reveal key={article.id} delay={i * 100}>
              <Link href={article.href} className="group block">
                <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover img-grayscale"
                  />
                </div>
                <div className="pt-5 mt-5 border-t border-hairline">
                  <h3 className="font-headline font-bold text-lg text-primary leading-snug transition-colors duration-300 group-hover:text-clay">
                    {article.title}
                  </h3>
                  <p className="font-body text-[15px] text-secondary mt-3 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                  <div className="inline-flex items-center gap-2 font-headline font-bold text-[13px] text-primary group-hover:text-clay transition-colors mt-5">
                    <span className="link-quiet">למאמר המלא</span>
                    <ArrowIcon size={16} className="transition-transform duration-500 group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ======== 02 · PACKAGES ========
          Moved in from the former top-level "מסלולים ומחירים" page. Cheapest
          first, so the eye climbs the price ladder. The recommended plan used
          to be marked by a terracotta header bar, a heavy shadow and a 16px
          upward offset, which broke the row's alignment; it is now marked by a
          rule and a label, and the three plans stay on one baseline. */}
      <Section tone="sand" id="packages" className="scroll-mt-24">
        <SectionHeading
          index="02"
          eyebrow="מסלולים ומחירים"
          title="שלושה מסלולי ליווי, מחיר ותכולה שקופים"
          lede="המסלולים נבדלים זה מזה בעיקר ברמת הטיפול בעיצוב הפנים. האדריכלות, הרישוי והליווי עד תעודת גמר כלולים בכולם."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {servicePackages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 100} className="bg-surface">
              <div className="flex flex-col h-full p-8 lg:p-10">
                <div className="min-h-[1.75rem]">
                  {pkg.recommended && (
                    <span className="font-label text-[9px] uppercase tracking-[0.2em] text-clay border border-clay/40 px-2.5 py-1">
                      הבחירה המומלצת שלי
                    </span>
                  )}
                </div>

                <h3 className="font-headline font-black text-2xl text-primary leading-tight mt-6">
                  {pkg.name}
                </h3>
                <p className="font-body text-[15px] text-secondary mt-3 leading-relaxed">
                  {pkg.subtitle}
                </p>

                <div className="mt-7 pt-6 border-t border-hairline">
                  <span className="font-headline font-black text-4xl text-primary block">
                    {pkg.price.toLocaleString("he-IL")} ₪
                  </span>
                  <p className="font-label text-xs text-ink-mute mt-2">
                    {pkg.priceWithVat.toLocaleString("he-IL")} ₪ כולל מע&quot;מ
                  </p>
                </div>

                <div className="mt-7 pt-6 border-t border-hairline flex-1">
                  <h4 className="font-label text-[10px] uppercase tracking-[0.24em] text-ink-mute">
                    למי זה מתאים
                  </h4>
                  <p className="font-body text-[15px] text-secondary leading-relaxed mt-3">
                    {pkg.forWhom}
                  </p>
                </div>

                <div className="mt-8">
                  <ButtonLink href="/packages" variant={pkg.recommended ? "solid" : "outline"} className="w-full">
                    לפירוט המלא
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <ArrowLink href="/packages">להשוואה המלאה בין שלושת המסלולים</ArrowLink>
        </Reveal>
      </Section>

      {/* ======== 03 · SERVICE AREAS ======== */}
      <Section tone="paper">
        <SectionHeading
          index="03"
          eyebrow="Service Areas"
          title="אזורי שירות"
          lede="המשרד מתמחה באזור שבין נתניה לחיפה — היכרות קרובה עם ועדות התכנון והאתגרים הספציפיים של כל יישוב."
          className="mb-12"
        />
        <Reveal className="flex flex-wrap gap-2.5">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="border border-hairline px-5 py-3 font-body text-[15px] text-secondary hover:border-clay hover:text-primary transition-colors duration-300"
            >
              {area.h1}
            </Link>
          ))}
        </Reveal>
        <Reveal className="mt-10">
          <ArrowLink href="/areas">למפת אזורי השירות</ArrowLink>
        </Reveal>
      </Section>

      <CtaSection
        title="רוצים להתחיל לתכנן את הבית שלכם?"
        subtitle="פגישת ייעוץ ראשונה ללא עלות וללא התחייבות. נכיר, נבין מה אתם צריכים, ואלווה אתכם בבחירת המסלול הנכון לפרויקט שלכם."
      />
    </>
  );
}
