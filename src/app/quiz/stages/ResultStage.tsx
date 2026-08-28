"use client";

import Link from "next/link";
import type { Report } from "@/lib/report/schema";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icon";

/**
 * What the visitor sees once the report is on its way.
 *
 * The number is shown here rather than held hostage in the email: they earned
 * it, and a page that takes the details and then says "check your inbox" reads
 * as a bait. The email and the PDF are the copy they keep, and the calculator
 * link is the invitation to keep playing with the thing they just built.
 */

const shekels = (n: number) => `${n.toLocaleString("he-IL")} ₪`;

export default function ResultStage({
  report,
  emailed,
}: {
  report: Report;
  emailed: boolean;
}) {
  const { total } = report.costs;
  const single = total.low === total.high;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-primary text-white p-7 sm:p-10">
        <span className="font-label font-medium text-[12px] uppercase tracking-[0.2em] text-white/55">
          סך העלות המשוערת
        </span>
        <div className="font-headline font-black text-4xl sm:text-6xl tracking-tight mt-3 tabular-nums">
          {single ? shekels(total.low) : `${shekels(total.low)}–${shekels(total.high)}`}
        </div>
        {report.costs.assumedSqm && (
          <p className="font-body text-[15px] text-white/65 mt-3">
            לבית של כ-{report.costs.assumedSqm.toLocaleString("he-IL")} מ&quot;ר, כולל מע&quot;מ
          </p>
        )}

        <div className="h-px bg-white/15 my-7" />

        <dl className="space-y-3 font-body text-[15px]">
          {report.costs.lines.map((l) => (
            <div key={l.label} className="flex justify-between gap-6">
              <dt className="text-white/70">
                {l.label}
                {l.note && (
                  <span className="block text-[13px] text-white/45 mt-0.5">{l.note}</span>
                )}
              </dt>
              <dd className="tabular-nums shrink-0">
                {l.low === l.high ? shekels(l.low) : `${shekels(l.low)}–${shekels(l.high)}`}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border border-hairline border-t-0 bg-surface p-7 sm:p-8">
        <p className="flex items-start gap-3 font-body text-[15px] text-primary">
          <CheckIcon size={20} className="text-clay shrink-0 mt-0.5" />
          <span>
            {emailed
              ? "הדוח המלא נשלח אליכם למייל, עם פירוט העלויות, לוח הזמנים והמלצות אישיות."
              : "הדוח מוכן. אם הוא לא הגיע למייל תוך כמה דקות, בדקו בספאם או פנו אלינו ונשלח שוב."}
          </span>
        </p>

        {report.watchouts.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {report.watchouts.map((w) => (
              <li key={w} className="flex gap-3 font-body text-[14px] text-secondary leading-relaxed">
                <span className="mt-[0.55rem] h-px w-3.5 bg-clay shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            href="/resources/house-cost-calculator"
            className="group flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-clay text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-primary"
          >
            שחקו עם המחשבון
            <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-primary/25 text-primary font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:border-primary hover:bg-primary hover:text-white"
          >
            לשיחת ייעוץ
          </Link>
        </div>
      </div>
    </div>
  );
}
