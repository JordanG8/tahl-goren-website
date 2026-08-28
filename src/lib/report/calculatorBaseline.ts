import { packages } from "@/data/packagesContent";
import {
  FLOORS,
  ROOM_SIZES,
  calculate,
  type RoomRow,
  type Selections,
} from "@/lib/houseCostCalculator";
import type { Report } from "./schema";

/**
 * The report's numbers, built from the office's own cost workbook.
 *
 * The construction figure is not a range and is not estimated here: it is the
 * workbook's own output for exactly the house the visitor assembled, rounded
 * the way the workbook rounds it. Everything else on the page is layered on top
 * of that single number.
 *
 * The layering is the point. The workbook explicitly excludes planning and
 * licensing, and says so in its own notes; a family reading only the
 * construction figure would under-budget by a wide margin. So the report adds
 * the lines the workbook leaves out — consultants and fees, the architect's
 * own fee, and a reserve — at the rates this site already publishes.
 *
 * The model never sees these numbers before they are computed and never writes
 * one. That split is inherited from the original report pipeline and is the
 * whole safety story: prose from a model, currency from arithmetic.
 */

/** Consultants, surveyor, soil, safety, committee fees and levies. */
const CONSULTANTS_RATE = 0.07;
/** The line most worth not skipping. */
const RESERVE_RATE = 0.1;

const round = (n: number) => Math.round(n / 1000) * 1000;

/**
 * Which support track suits this house.
 *
 * The old quiz asked outright how much interior design the family wanted. This
 * flow does not ask, so the finish standard stands in for it: someone choosing
 * bespoke joinery and stone has far more decisions to make than someone
 * choosing laminate, and those decisions are what the upper tracks cover.
 */
function trackForStandard(standard: string) {
  const id =
    standard === "צנוע וסגפני" || standard === "בסיסי"
      ? "basic"
      : standard === "גבוה" || standard === "יוקרתי ומפנק"
        ? "total-design"
        : "worthwhile";
  return packages.find((p) => p.id === id) ?? packages[1];
}

/** Reads back the house they described, for the report's opening. */
function describeHouse(selections: Selections, rooms: RoomRow[]) {
  const byFloor = FLOORS.map((f) => {
    const n = rooms.filter((r) => r.floor === f.id).length;
    return n ? `${f.label}: ${n} חדרים` : null;
  }).filter(Boolean);

  return [
    `מיקום: ${selections.region}`,
    `רמת גימור: ${selections.standard}`,
    `גג: ${selections.roofType}`,
    `שיטת בנייה: ${selections.buildMethod}`,
    `סה"כ ${rooms.length} חדרים${byFloor.length ? ` — ${byFloor.join(", ")}` : ""}`,
  ];
}

const TIMELINE = {
  steps: [
    {
      title: "בירורים מקדימים",
      duration: "2–4 שבועות",
      detail: "בדיקת המגרש, זכויות הבנייה והמגבלות התכנוניות — לפני שמשרטטים קו.",
    },
    {
      title: "תכנון מוקדם",
      duration: "1–2 חודשים",
      detail: "מהצרכים של המשפחה לתכנית: העמדה, חלוקת החללים והאופי של הבית.",
    },
    {
      title: "רישוי מלא",
      duration: "6–9 חודשים",
      detail: "הגשה לוועדה, ריכוז היועצים והרשויות, עד קבלת היתר הבנייה ביד.",
    },
    {
      title: 'תכניות עבודה 1:50',
      duration: "2–3 חודשים",
      detail: "תכניות מפורטות לביצוע, כתב כמויות וייעוץ בבחירת חומרי הגמר.",
    },
    {
      title: "ביצוע ופיקוח עליון",
      duration: "12–18 חודשים",
      detail: "ביקורי פיקוח באתר לאורך הבנייה, עד תעודת גמר וכניסה הביתה.",
    },
  ],
  totalLabel: "כשנתיים וחצי עד שלוש מהיום שמתחילים",
};

export function buildCalculatorBaseline(
  selections: Selections,
  rooms: RoomRow[],
): Omit<Report, "aiAuthored"> {
  const result = calculate(rooms, selections);
  const pkg = trackForStandard(selections.standard);

  const lines: Report["costs"]["lines"] = [];
  let total = 0;

  // Only when the house falls inside the workbook's size bands. Above them the
  // workbook defines no marginal-cost factor and produces no figure, and this
  // report will not invent one.
  if (result.total !== null) {
    const build = result.total;
    lines.push({
      label: "בנייה וגמר",
      low: build,
      high: build,
      note: `כ-${result.chargeableArea.toLocaleString("he-IL", { maximumFractionDigits: 0 })} מ"ר בנוי, כולל מע"מ`,
    });

    const consultants = round(build * CONSULTANTS_RATE);
    lines.push({
      label: "יועצים, אגרות והיטלים",
      low: consultants,
      high: consultants,
      note: "קונסטרוקטור, מודד, יועץ קרקע, בטיחות ואגרות ועדה — לא נכללים בתחשיב הבנייה",
    });

    lines.push({
      label: "תכנון אדריכלי וליווי",
      low: pkg.price,
      high: pkg.price,
      note: `מסלול ${pkg.name}, לפני מע"מ`,
    });

    const subtotal = build + consultants + pkg.price;
    const reserve = round(subtotal * RESERVE_RATE);
    lines.push({
      label: "רזרבה",
      low: reserve,
      high: reserve,
      note: "10%. הסעיף שהכי כדאי לא לוותר עליו",
    });

    total = subtotal + reserve;
  }

  const sqm = result.total !== null ? Math.round(result.chargeableArea) : null;

  return {
    headline: "הערכת העלות שלכם",
    summary: "",
    profile: describeHouse(selections, rooms),
    costs: {
      // The workbook produces one figure rather than a range, so low and high
      // are equal. Presenting a spread around it would be inventing precision
      // the office does not claim.
      lines,
      total: { low: total, high: total },
      perSqm: sqm ? { low: Math.round(total / sqm), high: Math.round(total / sqm) } : null,
      assumedSqm: sqm,
      budgetVerdict: null,
    },
    timeline: TIMELINE,
    track: {
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      priceWithVat: pkg.priceWithVat,
      subtitle: pkg.subtitle,
      reason: "",
    },
    recommendations: [],
    watchouts: [],
    readingList: [],
  };
}

/** A compact, human-readable list of the rooms, for the owner's notification. */
export function describeRooms(rooms: RoomRow[]) {
  return rooms.map((r) => {
    const floor = FLOORS.find((f) => f.id === r.floor)?.label ?? "";
    const size = ROOM_SIZES.find((s) => s.label === r.size)?.label ?? r.size;
    return `${r.type} (${size}, ${floor})`;
  });
}
