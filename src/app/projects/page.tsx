import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteData } from '@/data/siteData';
import CtaSection from '@/components/CtaSection';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/motion/Reveal';
import { Section } from '@/components/ui/Section';
import { ArrowIcon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: "פרויקטים ותיק עבודות | טל גורן אדריכלית",
  description: "צפו בתיק העבודות של טל גורן אדריכלית: בתים מאוכלסים ובתים בתכנון באזור השרון הצפוני, מנשה, חוף הכרמל והסביבה. מעל 100 בתים פרטיים שתוכננו ונבנו.",
  alternates: {
    canonical: "/projects",
  },
};

const categories = [
  {
    href: '/projects/completed',
    title: 'בתים מאוכלסים',
    description: 'בתים גמורים שתוכננו ונבנו — צילומי הפרויקטים המאוכלסים.',
    image: siteData.projects[0]?.image,
  },
  {
    href: '/projects/in-design',
    title: 'בתים בתכנון',
    description: 'הצצה לפרויקטים בשלבי תכנון — הדמיות אדריכליות של בתים שייבנו בקרוב.',
    image: siteData.projects[2]?.image,
  },
];

export default function Projects() {
  return (
    <>
      <PageHeader
        current="פרויקטים"
        eyebrow="תיק עבודות"
        title="פרויקטים"
        lede="למעלה מ-100 בתים פרטיים שתוכננו ונבנו באזור השרון הצפוני, מנשה וחוף הכרמל."
      />

      {/* Two doors into the portfolio. The photograph carries the difference
          between "built" and "in design" better than an icon can, so the card
          is the image, with the label set beneath it on a hairline — the same
          plate treatment used everywhere else the work appears. */}
      <Section tone="paper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {categories.map((page, i) => (
            <Reveal key={page.href} delay={i * 120}>
              <Link href={page.href} className="group block">
                <div className="aspect-[16/11] overflow-hidden relative bg-surface-container">
                  {page.image && (
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover img-grayscale"
                      priority={i === 0}
                    />
                  )}
                </div>
                <div className="pt-5 mt-5 border-t border-hairline flex items-start justify-between gap-6">
                  <div>
                    <h2 className="font-headline font-black text-2xl text-primary leading-snug transition-colors duration-300 group-hover:text-clay">
                      {page.title}
                    </h2>
                    <p className="font-body text-[15px] text-secondary leading-relaxed mt-2.5 measure">
                      {page.description}
                    </p>
                  </div>
                  <ArrowIcon
                    size={22}
                    className="text-ink-mute mt-1.5 transition-all duration-500 group-hover:text-clay group-hover:-translate-x-1.5"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaSection
        title="יש לכם פרויקט?"
        subtitle="בואו נדבר על הבית שאתם חולמים עליו. נשמח להכיר, להקשיב ולהתחיל לתכנן יחד."
        primaryLabel="בואו נדבר"
      />
    </>
  );
}
