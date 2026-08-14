import type { Metadata } from "next";
import { siteData } from '@/data/siteData';
import { articles as siteArticles } from '@/data/articlesContent';
import ArticlesGrid from '@/components/ArticlesGrid';
import CtaSection from '@/components/CtaSection';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/motion/Reveal';
import { Section, SectionHeading, ArrowLink } from '@/components/ui/Section';
import { ArrowIcon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: "מאמרים וטיפים מקצועיים | טל גורן אדריכלית",
  description: "מאמרים מקצועיים על תכנון בית פרטי, עלויות בנייה, אדריכלות מודרנית, שיפוצים ועוד. טיפים מעשיים מהאדריכלית טל גורן.",
  alternates: {
    canonical: "/articles",
  },
};

export default async function Articles() {
  const mediaArticles: any[] = siteData.mediaArticles;

  return (
    <>

      <PageHeader
        current="מאמרים וכתבות"
        eyebrow="Blog &amp; Press"
        title={<>תוכן<br />והשראה</>}
        lede="טיפים מקצועיים, כתבות בתקשורת ותהליכי תכנון מאחורי הקלעים."
      />

      <Section tone="paper">
        <SectionHeading
          index="01"
          eyebrow="מדריכים"
          title="מאמרים וטיפים מקצועיים"
          className="mb-12"
        />
        <ArticlesGrid articles={siteArticles} />
      </Section>

      {mediaArticles && mediaArticles.length > 0 && (
        <Section tone="sand">
          <SectionHeading
            index="02"
            eyebrow="Media &amp; Press"
            title="בתקשורת ובכתבות"
            className="mb-12"
          />
          {/* A press index: entries on hairlines, source first. Four bordered
              cards gave the same visual weight to a press mention as to a full
              guide above, which is not the hierarchy that is actually true. */}
          <div className="border-t border-hairline">
            {mediaArticles.map((article: any, index: number) => (
              <Reveal key={index} delay={(index % 4) * 70}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7 border-b border-hairline items-baseline"
                >
                  <span className="md:col-span-2 font-label text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                    {article.source}
                  </span>
                  <h3 className="md:col-span-4 font-headline font-bold text-lg text-primary leading-snug transition-colors duration-300 group-hover:text-clay">
                    {article.title}
                  </h3>
                  <p className="md:col-span-5 font-body text-[15px] text-secondary leading-relaxed">
                    {article.description}
                  </p>
                  <span className="md:col-span-1 flex md:justify-end">
                    <ArrowIcon
                      size={18}
                      className="text-ink-mute transition-all duration-500 group-hover:text-clay group-hover:-translate-x-1.5"
                    />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <ArrowLink href="https://www.facebook.com/tahlgoren" external>
              עוד כתבות ותכנים בעמוד הפייסבוק
            </ArrowLink>
          </Reveal>
        </Section>
      )}

      <CtaSection
        title="קראתם, למדתם — עכשיו בואו נדבר"
        subtitle="פגישת ייעוץ ראשונה ללא עלות. נשמח להכיר ולהתחיל לחשוב יחד על הפרויקט שלכם."
      />
    </>
  );
}
