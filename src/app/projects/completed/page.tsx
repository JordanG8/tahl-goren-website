import type { Metadata } from 'next';
import { siteData } from '@/data/siteData';
import ProjectCard from '@/components/ProjectCard';
import CtaSection from '@/components/CtaSection';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/motion/Reveal';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: "בתים מאוכלסים ופרויקטים גמורים | טל גורן אדריכלית",
  description: "צפו בגלריית הבתים המאוכלסים והפרויקטים הגמורים שתוכננו ונבנו על ידי טל גורן אדריכלית באזור השרון, מנשה וחוף הכרמל.",
  alternates: {
    canonical: "/projects/completed",
  },
};

export default async function ProjectsCompleted() {
  const projects = siteData.projects;

  return (
    <>
      <PageHeader
        items={[
          { label: 'ראשי', to: '/' },
          { label: 'פרויקטים', to: '/projects' },
          { label: 'בתים מאוכלסים' },
        ]}
        eyebrow="תיק עבודות"
        title="בתים מאוכלסים"
        lede="מרגש אותי כל פעם מחדש לראות איך תכנון יעיל וגמיש הופך לבית אמיתי ומלא חיים. כל בית כאן שונה לגמרי מהאחרים — כי הוא משקף את הסיפור, הטעם והאופי של משפחה אחרת."
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {projects.map((project: any, i: number) => (
            <Reveal key={project.id} delay={(i % 3) * 90}>
              <ProjectCard project={project} priority={i < 3} />
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
