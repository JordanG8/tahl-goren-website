"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BUILD_METHODS,
  DISCLAIMERS,
  FLOORS,
  MAX_ROOMS,
  REGIONS,
  ROOF_TYPES,
  ROOM_SIZES,
  ROOM_TYPES,
  SIZE_BANDS,
  STANDARDS,
  calculate,
  type FloorId,
  type RoomRow,
} from "@/lib/houseCostCalculator";
import { ArrowIcon } from "@/components/ui/Icon";
import ReportRequest from "./ReportRequest";

/**
 * The build-cost calculator.
 *
 * This is the office's own pricing workbook, made self-service. The visitor
 * builds the house room by room — every room carries a base area, a size and
 * a floor — and the estimate updates as they go, using exactly the factors the
 * office uses internally.
 *
 * The working is deliberately NOT on show. The factor stack — the rate per m²,
 * the regional and standard multipliers, the per-room base areas, the marginal
 * band by house size — is the practice's own pricing model, built over years,
 * and publishing it would hand a competitor the whole method. It runs in the
 * background and the visitor sees what they came for: a number, and what to do
 * next.
 *
 * It is also what the visitor actually wants. Nobody choosing between a small
 * and a large bedroom wants to audit a coefficient; they want to know roughly
 * what the house costs and whether it is worth a conversation.
 */

const shekels = (n: number) => `${n.toLocaleString("he-IL")} ₪`;

/** A starting house, so the page opens with something to read rather than an empty table. */
const INITIAL_ROOMS: RoomRow[] = [
  { type: "סלון", size: "סטנדרטי", floor: "ground" },
  { type: "מטבח", size: "סטנדרטי", floor: "ground" },
  { type: "פינת אוכל", size: "סטנדרטי", floor: "ground" },
  { type: "מבואת כניסה", size: "סטנדרטי", floor: "ground" },
  { type: "שרותי אורחים", size: "סטנדרטי", floor: "ground" },
  { type: "חדר הורים", size: "סטנדרטי", floor: "upper" },
  { type: "חדר רחצה הורים", size: "סטנדרטי", floor: "upper" },
  { type: "חדר ילדים", size: "סטנדרטי", floor: "upper" },
  { type: "חדר ילדים", size: "סטנדרטי", floor: "upper" },
  { type: "חדר רחצה ילדים", size: "סטנדרטי", floor: "upper" },
  { type: 'ממ"ד', size: "סטנדרטי", floor: "ground" },
  { type: "חדר מדרגות", size: "סטנדרטי", floor: "ground" },
];

const selectClass =
  "w-full bg-surface border border-hairline px-3 py-2.5 font-body text-[15px] text-primary " +
  "transition-colors duration-300 hover:border-primary/40 focus:border-clay focus:outline-none " +
  "focus:ring-2 focus:ring-clay/25 appearance-none cursor-pointer";

const labelClass =
  "block font-label font-medium text-[12px] uppercase tracking-[0.14em] text-ink-mute mb-2";

function Field({
  label,
  value,
  onChange,
  options,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; factor: number }[];
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        {options.map((o) => (
          <option key={o.label} value={o.label}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function HouseCostCalculator() {
  const [region, setRegion] = useState(REGIONS[1].label);
  const [standard, setStandard] = useState(STANDARDS[2].label);
  const [roofType, setRoofType] = useState(ROOF_TYPES[0].label);
  const [buildMethod, setBuildMethod] = useState(BUILD_METHODS[0].label);
  const [rooms, setRooms] = useState<RoomRow[]>(INITIAL_ROOMS);

  const result = useMemo(
    () => calculate(rooms, { region, standard, roofType, buildMethod }),
    [rooms, region, standard, roofType, buildMethod],
  );

  const updateRoom = (index: number, patch: Partial<RoomRow>) =>
    setRooms((rs) => rs.map((r, i) => (i === index ? { ...r, ...patch } : r)));

  const removeRoom = (index: number) =>
    setRooms((rs) => rs.filter((_, i) => i !== index));

  const addRoom = () => {
    if (rooms.length >= MAX_ROOMS) return;
    setRooms((rs) => [...rs, { type: ROOM_TYPES[0].label, size: "סטנדרטי", floor: "ground" }]);
  };

  const full = rooms.length >= MAX_ROOMS;

  return (
    <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_400px] gap-10 lg:gap-14 items-start">
        {/* ---------------- Inputs ---------------- */}
        <div className="min-w-0">
          {/* Step one: the house-wide parameters. */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-label font-semibold text-sm tracking-[0.14em] text-clay">01</span>
              <span className="h-px w-10 bg-hairline" />
              <span className="font-label font-medium text-sm uppercase tracking-[0.14em] text-ink-mute">
                נתוני הבית
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="region" label="מיקום גאוגרפי" value={region} onChange={setRegion} options={REGIONS} />
              <Field id="standard" label="סטנדרט הבניה" value={standard} onChange={setStandard} options={STANDARDS} />
              <Field id="roof" label="סוג הגג" value={roofType} onChange={setRoofType} options={ROOF_TYPES} />
              <Field id="method" label="שיטת הבניה" value={buildMethod} onChange={setBuildMethod} options={BUILD_METHODS} />
            </div>
          </section>

          {/* Step two: the rooms. */}
          <section className="mt-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-label font-semibold text-sm tracking-[0.14em] text-clay">02</span>
              <span className="h-px w-10 bg-hairline" />
              <span className="font-label font-medium text-sm uppercase tracking-[0.14em] text-ink-mute">
                תוכנית החדרים
              </span>
            </div>

            <p className="font-body text-secondary leading-relaxed measure mb-8">
              הוסיפו את החדרים שאתם רוצים בבית, ולכל אחד בחרו גודל וקומה. ההערכה מתעדכנת מיד.
            </p>

            {full && (
              <p className="font-body text-[14px] text-clay mb-6">
                הגעתם ל-{MAX_ROOMS} חדרים — המספר המרבי.
              </p>
            )}

            {rooms.length === 0 ? (
              <p className="font-body text-secondary py-10 text-center border border-dashed border-hairline">
                עדיין לא הוספתם חדרים.
              </p>
            ) : (
              <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[420px] border-collapse">
                  <thead>
                    <tr className="border-b border-hairline">
                      {["החדר", "גודל", "קומה", ""].map((h, i) => (
                        <th
                          key={i}
                          scope="col"
                          className="text-start font-label font-medium text-[12px] uppercase tracking-[0.14em] text-ink-mute pb-3 px-2"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, i) => (
                      <tr key={i} className="border-b border-hairline/60 align-middle">
                        <td className="py-2.5 px-2 w-[44%]">
                          <select
                            aria-label={`סוג החדר בשורה ${i + 1}`}
                            value={room.type}
                            onChange={(e) => updateRoom(i, { type: e.target.value })}
                            className={selectClass}
                          >
                            {ROOM_TYPES.map((r) => (
                              <option key={r.label} value={r.label}>
                                {r.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2.5 px-2 w-[24%]">
                          <select
                            aria-label={`גודל החדר בשורה ${i + 1}`}
                            value={room.size}
                            onChange={(e) => updateRoom(i, { size: e.target.value })}
                            className={selectClass}
                          >
                            {ROOM_SIZES.map((s) => (
                              <option key={s.label} value={s.label}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2.5 px-2 w-[26%]">
                          <select
                            aria-label={`הקומה של החדר בשורה ${i + 1}`}
                            value={room.floor}
                            onChange={(e) => updateRoom(i, { floor: e.target.value as FloorId })}
                            className={selectClass}
                          >
                            {FLOORS.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2.5 px-2 text-end">
                          <button
                            type="button"
                            onClick={() => removeRoom(i)}
                            aria-label={`הסירו את ${room.type} משורה ${i + 1}`}
                            className="text-ink-mute hover:text-clay transition-colors duration-300 text-2xl leading-none px-2 py-1"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Adding a room is one press. The old version made the visitor
                pick a type from a separate list before they could add
                anything, which is a decision they can just as easily make on
                the row itself. */}
            <button
              type="button"
              onClick={addRoom}
              disabled={full}
              className="mt-4 group inline-flex items-center gap-2.5 px-6 py-3 border border-dashed border-hairline text-primary font-headline font-bold text-[15px] transition-colors duration-300 hover:border-clay hover:text-clay disabled:opacity-40 disabled:pointer-events-none"
            >
              <span className="text-xl leading-none">+</span>
              הוסיפו חדר
            </button>
          </section>
        </div>

        {/* ---------------- Result ---------------- */}
        <aside className="lg:sticky lg:top-24">
          <div className="bg-primary text-white p-8">
            <span className="font-label font-medium text-[12px] uppercase tracking-[0.2em] text-white/55">
              סה&quot;כ עלות בניה משוערת
            </span>

            {result.total === null ? (
              <p className="font-body text-white/80 leading-relaxed mt-5">
                {rooms.length === 0
                  ? "הוסיפו חדרים כדי לראות הערכת עלות."
                  : `הבית שתכננתם גדול מ-${SIZE_BANDS[SIZE_BANDS.length - 1].upTo} מ"ר. בהיקף כזה נעדיף לתת הערכה אישית — נשמח שתשאירו פרטים.`}
              </p>
            ) : (
              <>
                <div className="font-headline font-black text-4xl sm:text-5xl tracking-tight mt-3 tabular-nums">
                  {shekels(result.total)}
                </div>
                <p className="font-body text-[14px] text-white/60 mt-3 leading-relaxed">
                  לבית של כ-{Math.round(result.totalArea).toLocaleString("he-IL")} מ&quot;ר · כולל מע&quot;מ
                </p>
              </>
            )}
          </div>

          {/* This is what the page is for. */}
          <div className="mt-4">
            <ReportRequest
              selections={{ region, standard, roofType, buildMethod }}
              rooms={rooms}
              disabled={result.total === null}
            />
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-clay text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-primary"
            >
              לשיחת ייעוץ ללא עלות
              <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
            </Link>
          </div>
        </aside>
      </div>

      {/* ---------------- What the figure does and does not cover ---------------- */}
      <section className="mt-20 pt-12 border-t border-hairline">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary tracking-tight">
          מה ההערכה כוללת, ומה לא
        </h2>
        <ul className="mt-7 grid sm:grid-cols-2 gap-x-10 gap-y-4">
          {DISCLAIMERS.map((line) => (
            <li key={line} className="flex gap-3 font-body text-secondary leading-relaxed">
              <span className="mt-[0.6rem] h-px w-4 bg-clay shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-[14px] text-ink-mute leading-relaxed mt-9 measure">
          ההערכה מבוססת על מקדמי התכנון של המשרד ונועדה לתת סדר גודל לתכנון תקציב מוקדם.
          העלות בפועל נקבעת מול הקבלן ומושפעת מתנאי המגרש, ממפרט טכני מדויק וממצב השוק בזמן הביצוע.
        </p>
      </section>
    </div>
  );
}
