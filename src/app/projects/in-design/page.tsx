import type { Metadata } from 'next';
import Image from 'next/image';
import CtaSection from '@/components/CtaSection';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/motion/Reveal';
import { Section, ArrowLink } from '@/components/ui/Section';
import { CompassIcon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: "בתים בתכנון והדמיות אדריכליות | טל גורן אדריכלית",
  description: "הצצה לתהליכי העבודה והדמיות תלת-ממד של בתים פרטיים בתהליכי תכנון ורישוי של טל גורן אדריכלית באזור השרון והצפון.",
  alternates: {
    canonical: "/projects/in-design",
  },
};

const designProjects: any[] = [];

export default function ProjectsInDesign() {
  return (
    <>
      <PageHeader
        items={[
          { label: 'ראשי', to: '/' },
          { label: 'פרויקטים', to: '/projects' },
          { label: 'בתים בתכנון' },
        ]}
        eyebrow="על שולחן העבודה"
        title="בתים בתכנון"
        lede="כל בית היה פעם חלום של משפחה, והמשימה שלי היא לתרגם אותו לשרטוטים והדמיות. כאן מוצגים בתים שעדיין נמצאים על שולחן העבודה — רגע לפני שהם הופכים לאמיתיים."
      />

      <Section tone="paper">
        {designProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {designProjects.map((project: any, i: number) => (
              <Reveal key={project.id} delay={(i % 3) * 90}>
                <div className="group block">
                  <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover img-grayscale"
                    />
                  </div>
                  <div className="pt-4 mt-4 border-t border-hairline">
                    <h2 className="font-headline font-bold text-base text-primary leading-snug">
                      {project.title}
                    </h2>
                    <span className="font-label text-[10px] uppercase tracking-[0.22em] text-ink-mute mt-1.5 block">
                      {project.location}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          /* Empty state, set as a plain note rather than a grey panel with a
             giant icon — nothing is broken here, there is simply nothing to
             publish yet, and the page should say so quietly. */
          <Reveal className="border-y border-hairline py-16 max-w-2xl">
            <CompassIcon size={34} className="text-clay" strokeWidth={1} />
            <h2 className="font-headline font-black text-2xl text-primary mt-6">
              הדמיות חדשות יעלו כאן בקרוב
            </h2>
            <p className="font-body text-secondary leading-relaxed mt-3 measure">
              בינתיים מוזמנים לראות את הבתים שכבר תוכננו, נבנו ומאוכלסים.
            </p>
            <div className="mt-7">
              <ArrowLink href="/projects/completed">לבתים מאוכלסים</ArrowLink>
            </div>
          </Reveal>
        )}
      </Section>

      <CtaSection
        title="רוצים לראות את הבית שלכם כאן?"
        subtitle="בואו נתחיל לתכנן יחד את הבית שאתם חולמים עליו."
        primaryLabel="בואו נדבר"
      />
    </>
  );
}
