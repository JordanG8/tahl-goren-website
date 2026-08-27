/**
 * Parity check: the ported cost model vs. the office's original workbook.
 *
 * The figures in `src/lib/houseCostCalculator.ts` are a hand port of
 * "תחשיבים וטבלת חדרים". The fixture below is the worked example saved in that
 * workbook's own "עותק של טבלת חדרים" sheet, and the expected values are the
 * numbers Excel had computed and cached in those cells — not values produced by
 * this code and then written down.
 *
 * Run with: npm run verify:calculator
 */
import {
  calculate,
  type RoomRow,
} from "../src/lib/houseCostCalculator.ts";

const rooms: RoomRow[] = [
  { type: 'ממ"ד', size: "קטן", floor: "basement" },
  { type: "פינת משפחה", size: "סטנדרטי", floor: "basement" },
  { type: "מטבח", size: "קטן", floor: "basement" },
  { type: "חדר רחצה ילדים", size: "קטן", floor: "basement" },
  { type: "חדר מדרגות", size: "קטן", floor: "basement" },
  { type: "סלון", size: "גדול", floor: "ground" },
  { type: "מטבח", size: "סטנדרטי", floor: "ground" },
  { type: "פינת אוכל", size: "סטנדרטי", floor: "ground" },
  { type: "חדר רחצה ילדים", size: "קטן", floor: "ground" },
  { type: "מבואת כניסה", size: "סטנדרטי", floor: "ground" },
  { type: "מחסן פנימי בתוך הבית", size: "סטנדרטי", floor: "ground" },
  { type: 'ממ"ד', size: "קטן", floor: "ground" },
  { type: "חדר הורים", size: "גדול", floor: "upper" },
  { type: "חדר רחצה הורים", size: "גדול", floor: "upper" },
  { type: "חדר ארונות הורים", size: "גדול", floor: "upper" },
  { type: "חדר ילדים", size: "סטנדרטי", floor: "upper" },
  { type: "חדר ילדים", size: "סטנדרטי", floor: "upper" },
  { type: "חדר רחצה ילדים", size: "סטנדרטי", floor: "upper" },
  { type: "חדר כביסה", size: "סטנדרטי", floor: "upper" },
];

const result = calculate(rooms, {
  region: "אזור חדרה-גדרה",
  standard: "סטנדרטי",
  roofType: "משולב שטוח ורעפים",
  buildMethod: "קונבנציונלית 'רגילה'",
});

// [sheet cell, computed, value Excel cached in that cell]
const checks: [string, number, number][] = [
  ["D16  שטח מרתף", result.floorAreas.basement, 60.09],
  ["D17  שטח קומת קרקע", result.floorAreas.ground, 109.056],
  ["D18  שטח קומה עליונה", result.floorAreas.upper, 81.66],
  ["D19  שטח עליית גג", result.floorAreas.attic, 0],
  ["D20  סה\"כ שטח הבית", result.totalArea, 250.806],
  ["N25  סה\"כ שטח לתחשיב", result.weightedArea, 230.64],
  ["D24  כולל מעברים וקירות", result.chargeableArea, 276.768],
  ["D22  מקדם עלות שולית", result.sizeBand?.factor ?? NaN, 0.9],
  ["D26  סה\"כ עלות בניה", result.total ?? NaN, 3600000],
];

let failed = 0;
for (const [cell, got, want] of checks) {
  // Tolerance covers binary floating-point drift only; the workbook's own
  // values carry at most three decimals.
  const ok = Math.abs(got - want) < 1e-6;
  if (!ok) failed++;
  console.log(`${ok ? "✓" : "✗"}  ${cell.padEnd(26)} ${got}${ok ? "" : `  (workbook: ${want})`}`);
}

if (failed > 0) {
  console.error(`\n${failed} value(s) no longer match the workbook.`);
  process.exit(1);
}
console.log("\nAll values match the workbook.");
