import type { ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";

/**
 * The opening of every inner page.
 *
 * Each page previously invented its own header: different top padding, three
 * different h1 sizes, a `w-16 h-[2px]` accent rule on some pages and not
 * others, `bg-surface` on some and nothing on others. Arriving anywhere from
 * the nav felt like landing on a different site. One component now sets the
 * entrance, and the page below it starts from a known baseline.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  current,
  items,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Breadcrumb leaf label, for the simple "ראשי / <current>" case. */
  current?: string;
  /** Full breadcrumb trail, when the page is nested deeper. */
  items?: { label: string; to?: string }[];
  /** Extra content under the lede — rating lines, filters, buttons. */
  children?: ReactNode;
}) {
  return (
    <section className="bg-background border-b border-hairline">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <Reveal>
          {items ? <Breadcrumb items={items} /> : <Breadcrumb current={current} />}

          {eyebrow && (
            <div className="flex items-center gap-4 mb-6">
              <span className="rule-draw h-px w-10 bg-hairline" />
              <span className="font-label font-medium text-[13px] uppercase tracking-[0.2em] text-ink-mute">
                {eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-headline font-black text-4xl sm:text-6xl lg:text-7xl text-primary tracking-tight leading-[0.98] max-w-4xl">
            {title}
          </h1>

          {lede && (
            <p className="font-body text-lg sm:text-xl text-secondary leading-relaxed mt-8 measure">
              {lede}
            </p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
