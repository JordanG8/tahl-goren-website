"use client";

import { useState } from "react";
import { trackLead } from "@/lib/trackLead";
import { waLink } from "@/lib/whatsapp";

const REGIONS = [
  { id: "sharon", label: "השרון הצפוני", mult: 1.06 },
  { id: "menashe", label: "יישובי מנשה", mult: 1.0 },
  { id: "carmel", label: "חוף הכרמל", mult: 1.05 },
  { id: "zichron", label: "זכרון יעקב / בנימינה", mult: 1.08 },
  { id: "north", label: "חיפה והצפון", mult: 0.98 },
  { id: "other", label: "אזור אחר בארץ", mult: 1.0 },
] as const;

const FINISHES = [
  { id: "standard", label: "גמר סטנדרטי טוב", hint: "חומרים אמינים, בלי מותרות", base: 7600 },
  { id: "high", label: "גמר גבוה", hint: "מטבח ונגרות בהתאמה אישית, מיזוג מוסתר", base: 9400 },
  { id: "premium", label: "גמר יוקרתי", hint: "פתחים גדולים, אבן טבעית, מערכות חכמות", base: 11800 },
] as const;

const STOREYS = [
  { id: "one", label: "קומה אחת", mult: 1.0 },
  { id: "two", label: "שתי קומות", mult: 1.05 },
] as const;

const BREAKDOWN = [
  { label: "מבנה ומעטפת", share: 0.42, color: "#ffffff" },
  { label: "גמרים פנימיים", share: 0.24, color: "#dce4e7" },
  { label: "מערכות (חשמל, אינסטלציה, מיזוג)", share: 0.15, color: "#318BA2" },
  { label: "פיתוח וחוץ", share: 0.11, color: "#A96F57" },
  { label: "תכנון, יועצים ואגרות", share: 0.08, color: "#9DB2BC" },
];

const nf = new Intl.NumberFormat("he-IL");

const optionClasses = (active: boolean) =>
  [
    "text-start px-4 py-3.5 border cursor-pointer transition-all duration-200 font-body font-semibold text-[15px]",
    active
      ? "border-primary bg-primary text-white"
      : "border-outline/90 bg-surface text-secondary hover:border-primary/50",
  ].join(" ");

export default function CostCalculator() {
  const [area, setArea] = useState(190);
  const [regionId, setRegionId] = useState<string>("sharon");
  const [finishId, setFinishId] = useState<string>("high");
  const [storeyId, setStoreyId] = useState<string>("one");

  const region = REGIONS.find((r) => r.id === regionId) ?? REGIONS[0];
  const finish = FINISHES.find((f) => f.id === finishId) ?? FINISHES[1];
  const storeys = STOREYS.find((s) => s.id === storeyId) ?? STOREYS[0];

  // Rounded to the nearest ₪50/m² so the headline number reads like an
  // estimate rather than a quote — it is one.
  const perMeter = Math.round((finish.base * region.mult * storeys.mult) / 50) * 50;
  const total = perMeter * area;
  const low = Math.round(total * 0.92);
  const high = Math.round(total * 1.09);

  const summaryMessage = `היי טל, עשיתי את החישוב באתר: בית של ${area} מ"ר, ${storeys.label}, ${finish.label}, באזור ${region.label}. יצא אומדן של ${nf.format(low)}–${nf.format(high)} ₪ (כ-${nf.format(perMeter)} ₪ למ"ר). אשמח להבין מה זה אומר במגרש שלי.`;

  return (
    <div className="bg-surface border border-outline/60 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
      {/* ---- Inputs ---- */}
      <div className="p-8 sm:p-12 flex flex-col gap-10">
        <div>
          <div className="flex items-baseline justify-between mb-5">
            <label htmlFor="calc-area" className="font-headline font-medium text-[17px] text-primary">
              שטח הבית המתוכנן
            </label>
            <span className="font-headline font-light text-3xl text-primary">
              {area} <span className="text-[15px] text-secondary">מ&quot;ר</span>
            </span>
          </div>
          <input
            id="calc-area"
            className="tg-range"
            type="range"
            min={80}
            max={400}
            step={5}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
          />
          <div className="flex justify-between mt-2.5 font-label text-[11px] tracking-wider text-secondary">
            <span>80 מ&quot;ר</span>
            <span>400 מ&quot;ר</span>
          </div>
        </div>

        <fieldset>
          <legend className="font-headline font-medium text-[17px] text-primary mb-4">אזור המגרש</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={r.id === regionId}
                onClick={() => setRegionId(r.id)}
                className={optionClasses(r.id === regionId)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-headline font-medium text-[17px] text-primary mb-4">רמת גמר</legend>
          <div className="flex flex-col gap-2.5">
            {FINISHES.map((f) => {
              const active = f.id === finishId;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFinishId(f.id)}
                  className={`flex items-center gap-3.5 text-start px-[18px] py-4 border cursor-pointer transition-all duration-200 ${
                    active
                      ? "border-primary bg-surface-container"
                      : "border-outline/90 bg-surface hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 ${
                      active ? "border-primary bg-primary" : "border-outline bg-transparent"
                    }`}
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="font-body font-semibold text-base text-primary">{f.label}</span>
                    <span className="font-body font-light text-sm text-secondary">{f.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-headline font-medium text-[17px] text-primary mb-4">מבנה</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {STOREYS.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={s.id === storeyId}
                onClick={() => setStoreyId(s.id)}
                className={optionClasses(s.id === storeyId)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ---- Result ---- */}
      <div className="relative overflow-hidden bg-primary p-8 sm:p-12 flex flex-col justify-between">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10">
          <span className="block font-label text-[11px] tracking-[0.3em] uppercase text-white/45">
            אומדן עלות בנייה
          </span>
          <div
            className="mt-5 font-headline font-extralight text-[23px] sm:text-[34px] xl:text-[42px] text-white leading-tight tracking-tight whitespace-nowrap"
            aria-live="polite"
          >
            {nf.format(low)}
            <span className="text-white/50"> – </span>
            {nf.format(high)}
          </div>
          <div className="mt-2.5 font-body font-light text-base text-white/60">
            ₪ · לפני מע&quot;מ · כ-{nf.format(perMeter)} ₪ למ&quot;ר
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {BREAKDOWN.map((b) => (
              <div key={b.label}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-body text-[15px] text-white/85">{b.label}</span>
                  <span className="font-label text-[13px] text-white/60">
                    {nf.format(Math.round((total * b.share) / 1000) * 1000)} ₪
                  </span>
                </div>
                <div className="h-[3px] bg-white/[0.14]">
                  <div
                    className="h-[3px] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ width: `${Math.round(b.share * 100 * 2.2)}%`, background: b.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-11">
          <a
            href={waLink(summaryMessage)}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackLead("whatsapp", {
                placement: "home_calculator",
                area,
                region: region.id,
                finish: finish.id,
                storeys: storeys.id,
                estimate_low: low,
                estimate_high: high,
              })
            }
            className="flex items-center justify-center gap-3 bg-white text-primary px-6 py-5 font-headline font-bold text-base hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-[21px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              chat
            </span>
            <span>לשלוח לי את החישוב הזה בוואטסאפ</span>
          </a>
          <p className="mt-4 font-body font-light text-[13px] leading-relaxed text-white/50">
            האומדן מבוסס על מחירי שוק מעודכנים לבנייה פרטית ואינו כולל עלות מגרש, מיסים והיטלים. בשיחה קצרה
            אעבור איתכם על המגרש הספציפי ואומר לכם מה באמת צפוי — בלי הפתעות.
          </p>
        </div>
      </div>
    </div>
  );
}
