/**
 * The construction-cost model, ported cell-for-cell from the office's
 * "תחשיבים וטבלת חדרים" workbook.
 *
 * Every number in this file is copied from the workbook's
 * "טבלאות עזר ופרמטרים" sheet. Nothing here is estimated, rounded or
 * re-derived — if a figure needs to change it changes in the spreadsheet
 * first, and then here, so the page and the office never quote two different
 * prices for the same house.
 *
 * Sheet references in the comments below are to the original workbook.
 */

/** Base build cost per m², incl. VAT — sheet cell D14 (= parameters M7). */
export const COST_PER_SQM = 14000;

/** Circulation-and-walls uplift applied to floor areas — the `* 1.2` in D16:D19 and D24. */
export const CIRCULATION_FACTOR = 1.2;

/** The final total is rounded to the nearest multiple of this — MROUND(..., 20000) in D26. */
export const ROUNDING_STEP = 20000;

export type Option = { label: string; factor: number };

/** Geographic area — parameters B5:C7, feeding E9. */
export const REGIONS: Option[] = [
  { label: "אזור המרכז", factor: 1.15 },
  { label: "אזור חדרה-גדרה", factor: 1.0 },
  { label: "פריפריה", factor: 0.9 },
];

/** Build standard — parameters K5:L10, feeding E10. */
export const STANDARDS: Option[] = [
  { label: "צנוע וסגפני", factor: 0.93 },
  { label: "בסיסי", factor: 0.97 },
  { label: "סטנדרטי", factor: 1.0 },
  { label: "משופר", factor: 1.1 },
  { label: "גבוה", factor: 1.25 },
  { label: "יוקרתי ומפנק", factor: 1.43 },
];

/** Roof type — parameters T5:U7, feeding E11. */
export const ROOF_TYPES: Option[] = [
  { label: "גג שטוח", factor: 1.0 },
  { label: "גג רעפים", factor: 1.07 },
  { label: "משולב שטוח ורעפים", factor: 1.03 },
];

/** Build method — parameters W5:X7, feeding E12. */
export const BUILD_METHODS: Option[] = [
  { label: "קונבנציונלית 'רגילה'", factor: 1.0 },
  { label: "בניה מתקדמת", factor: 1.12 },
  { label: "GSB או ICF", factor: 1.07 },
];

/** Per-room size — parameters E5:F8, feeding column J. */
export const ROOM_SIZES: Option[] = [
  { label: "קטן", factor: 0.85 },
  { label: "סטנדרטי", factor: 1.0 },
  { label: "גדול", factor: 1.1 },
  { label: "ענק", factor: 1.2 },
];

export type FloorId = "basement" | "ground" | "upper" | "attic";

/**
 * Floors — parameters H5:I8, feeding column M.
 *
 * `key` is the substring the workbook's SUMIF patterns match on when it
 * splits areas per floor (D16:D19 use "*מרתף*", "*קרקע*", "*עליונ*", "*גג*").
 * The four labels below are the only values the sheet's dropdown offers, and
 * each matches exactly one pattern.
 */
export const FLOORS: { id: FloorId; label: string; factor: number }[] = [
  { id: "basement", label: "מרתף", factor: 1.5 },
  { id: "ground", label: "קומת קרקע", factor: 1.0 },
  { id: "upper", label: "קומה עליונה", factor: 0.95 },
  { id: "attic", label: "עליית גג", factor: 0.95 },
];

/** Room catalogue with base areas in m² — parameters Q5:R24, feeding column H. */
export const ROOM_TYPES: { label: string; baseArea: number }[] = [
  { label: "סלון", baseArea: 25 },
  { label: "מטבח", baseArea: 18 },
  { label: "מזווה", baseArea: 4.5 },
  { label: "פינת אוכל", baseArea: 15 },
  { label: "חדר הורים", baseArea: 14 },
  { label: "חדר רחצה הורים", baseArea: 5.8 },
  { label: "חדר ארונות הורים", baseArea: 5.7 },
  { label: "חדר ילדים", baseArea: 14 },
  { label: "חדר רחצה ילדים", baseArea: 7.8 },
  { label: "חדר אורחים", baseArea: 14 },
  { label: "חדר עבודה", baseArea: 14 },
  { label: 'ממ"ד', baseArea: 15 },
  { label: "פינת משפחה", baseArea: 8 },
  { label: "מבואת כניסה", baseArea: 5 },
  { label: "שרותי אורחים", baseArea: 3 },
  { label: "מחסן פנימי בתוך הבית", baseArea: 6 },
  { label: "חדר כביסה", baseArea: 4.2 },
  { label: "חניה בנויה למכונית אחת", baseArea: 18.5 },
  { label: "חדר מדרגות", baseArea: 8.7 },
  { label: "מרפסת עם פרגולה", baseArea: 15 },
];

/**
 * Marginal cost by total house size — parameters N5:O10, feeding D22.
 *
 * The workbook's IFS walks these bands in order and takes the first whose
 * upper bound the house fits under. Above the last band it returns an empty
 * cell, which makes the sheet's total an error rather than a number; the
 * office reads that as "too large for the table, talk to us". `bandFor`
 * returns null there and the UI says so instead of inventing a factor.
 */
export const SIZE_BANDS: { upTo: number; label: string; factor: number }[] = [
  { upTo: 100, label: "0-100", factor: 1.15 },
  { upTo: 140, label: "100-140", factor: 1.04 },
  { upTo: 180, label: "140-180", factor: 1.0 },
  { upTo: 220, label: "180-220", factor: 0.93 },
  { upTo: 280, label: "220-280", factor: 0.9 },
  { upTo: 350, label: "280-350", factor: 0.87 },
];

export function bandFor(totalArea: number) {
  return SIZE_BANDS.find((b) => totalArea <= b.upTo) ?? null;
}

/** The maximum number of room rows the workbook provides (rows 3–23). */
export const MAX_ROOMS = 21;

/** Disclaimers shown with the result — parameters B15:B20, verbatim. */
export const DISCLAIMERS = [
  "לא כולל מערכות ותשתיות מיוחדות כגון תאים סולריים, חימום תת רצפתי, בריכת שחיה וכו'",
  'כן כולל מע"מ',
  "לא כולל עלויות של תכנון ורישוי (אגרות, היטלים, מתכננים, יועצים וכו')",
  "לא כולל עלויות של איבזור הבית (רהיטים, גופי תאורה, מכשירי חשמל...)",
  "החישוב כולל שטח קירות, וכן שטחי 'אקסטרה' למעברים ו'פחת'",
];

export type RoomRow = {
  /** Matches a `label` in ROOM_TYPES; empty means the row is not filled in. */
  type: string;
  /** Matches a `label` in ROOM_SIZES. */
  size: string;
  floor: FloorId;
};

export type Selections = {
  region: string;
  standard: string;
  roofType: string;
  buildMethod: string;
};

/** Excel's MROUND: to the nearest multiple, halves away from zero. */
function mround(value: number, multiple: number) {
  return Math.round(value / multiple) * multiple;
}

function factorOf(options: Option[], label: string, fallback: number) {
  return options.find((o) => o.label === label)?.factor ?? fallback;
}

export type RoomResult = {
  /** Column H — base area from the catalogue. */
  baseArea: number;
  /** Column J — size factor. */
  sizeFactor: number;
  /** Column K — area of the room in the house. */
  roomArea: number;
  /** Column M — floor factor. */
  floorFactor: number;
  /** Column N — area carried into the cost calculation. */
  weightedArea: number;
};

export type CalculationResult = {
  rooms: RoomResult[];
  /** D16:D19 — per-floor area including the 20% circulation uplift. */
  floorAreas: Record<FloorId, number>;
  /** D20 — total house area, the figure the size band is read from. */
  totalArea: number;
  /** N25 — sum of the floor-weighted room areas. */
  weightedArea: number;
  /** D24 — weighted area including the 20% uplift; the area the price is built on. */
  chargeableArea: number;
  /** D22 — marginal-cost factor, or null when the house exceeds the last band. */
  sizeBand: { upTo: number; label: string; factor: number } | null;
  regionFactor: number;
  standardFactor: number;
  roofFactor: number;
  methodFactor: number;
  /** D26 — the estimate, or null when no size band applies. */
  total: number | null;
};

/**
 * Runs the workbook end to end.
 *
 * Note the asymmetry, which is the sheet's own and deliberate: the size band
 * (D22) is read from the *unweighted* floor total (D20), while the price is
 * charged on the *floor-weighted* area (D24). A basement therefore raises the
 * price without pushing the house into a cheaper size band.
 */
export function calculate(rooms: RoomRow[], selections: Selections): CalculationResult {
  const filled = rooms.filter((r) => r.type);

  const floorAreas: Record<FloorId, number> = {
    basement: 0,
    ground: 0,
    upper: 0,
    attic: 0,
  };

  let weightedArea = 0;

  const results: RoomResult[] = filled.map((row) => {
    const baseArea = ROOM_TYPES.find((r) => r.label === row.type)?.baseArea ?? 0;
    const sizeFactor = factorOf(ROOM_SIZES, row.size, 1);
    const floorFactor = FLOORS.find((f) => f.id === row.floor)?.factor ?? 1;

    const roomArea = baseArea * sizeFactor;
    const weighted = baseArea * sizeFactor * floorFactor;

    floorAreas[row.floor] += roomArea;
    weightedArea += weighted;

    return { baseArea, sizeFactor, roomArea, floorFactor, weightedArea: weighted };
  });

  // D16:D19 — each floor's area, plus 20% for circulation.
  for (const floor of FLOORS) {
    floorAreas[floor.id] *= CIRCULATION_FACTOR;
  }

  // D20, D24.
  const totalArea = FLOORS.reduce((sum, f) => sum + floorAreas[f.id], 0);
  const chargeableArea = weightedArea * CIRCULATION_FACTOR;

  const sizeBand = bandFor(totalArea);
  const regionFactor = factorOf(REGIONS, selections.region, 1);
  const standardFactor = factorOf(STANDARDS, selections.standard, 1);
  const roofFactor = factorOf(ROOF_TYPES, selections.roofType, 1);
  const methodFactor = factorOf(BUILD_METHODS, selections.buildMethod, 1);

  // D26 = MROUND(D24 * D14 * E9 * E10 * D22 * E11 * E12, 20000)
  const total =
    sizeBand && filled.length > 0
      ? mround(
          chargeableArea *
            COST_PER_SQM *
            regionFactor *
            standardFactor *
            sizeBand.factor *
            roofFactor *
            methodFactor,
          ROUNDING_STEP,
        )
      : null;

  return {
    rooms: results,
    floorAreas,
    totalArea,
    weightedArea,
    chargeableArea,
    sizeBand,
    regionFactor,
    standardFactor,
    roofFactor,
    methodFactor,
    total,
  };
}
