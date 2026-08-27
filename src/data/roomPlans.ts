/**
 * Top-view plans for the room picker.
 *
 * The point of these drawings is scale. A visitor choosing "חדר ילדים — גדול"
 * is committing real money to square metres they cannot picture, so each room
 * is drawn at its true size from the workbook with real furniture at real
 * dimensions inside it. If a bed, a wardrobe and a desk do not comfortably fit,
 * the drawing shows that — which is the honest answer to "is this big enough?".
 *
 * Everything is in metres. Furniture sizes are ordinary domestic ones, not
 * bespoke, because that is what a family will actually buy.
 *
 * `type` keys match the room labels in houseCostCalculator.ts, which is where
 * the base areas come from — the drawings never invent an area of their own.
 */

/** Where a piece sits in the room. Compass points are walls; C is the middle. */
export type Anchor = "N" | "S" | "E" | "W" | "C" | "NE" | "NW" | "SE" | "SW";

export type Item = {
  /** Width along the room's east–west axis, in metres. */
  w: number;
  /** Depth along the room's north–south axis, in metres. */
  d: number;
  at: Anchor;
  /** Nudge along the wall, in metres; positive is east / south. */
  offset?: number;
  /** Drawn with a heavier outline — the defining piece of the room. */
  primary?: boolean;
  /** Rounded, for baths, basins and round tables. */
  round?: boolean;
  /** Seats drawn around the piece, for dining and meeting tables. */
  seats?: number;
};

export type RoomPlan = {
  /** Width-to-depth ratio the room is generated at. */
  aspect: number;
  items: Item[];
  /** Wall the door is in, and how far along it (0–1). */
  door: { wall: "N" | "S" | "E" | "W"; at: number };
};

const bed = (w: number, d: number, at: Anchor = "N"): Item => ({ w, d, at, primary: true });

export const roomPlans: Record<string, RoomPlan> = {
  "סלון": {
    aspect: 1.3,
    door: { wall: "E", at: 0.8 },
    items: [
      { w: 2.4, d: 0.9, at: "S", primary: true },   // sofa
      { w: 1.2, d: 0.6, at: "C" },                   // coffee table
      { w: 0.85, d: 0.85, at: "SW" },                // armchair
      { w: 1.8, d: 0.45, at: "N" },                  // media unit
    ],
  },
  "מטבח": {
    aspect: 1.35,
    door: { wall: "S", at: 0.85 },
    items: [
      { w: 3.2, d: 0.65, at: "N", primary: true },   // main run
      { w: 2.0, d: 0.95, at: "C" },                  // island
      { w: 0.8, d: 0.7, at: "NE" },                  // fridge
      { w: 1.4, d: 0.65, at: "W" },                  // secondary run
    ],
  },
  "מזווה": {
    aspect: 1.6,
    door: { wall: "S", at: 0.5 },
    items: [
      { w: 2.0, d: 0.45, at: "N", primary: true },
      { w: 2.0, d: 0.45, at: "S" },
    ],
  },
  "פינת אוכל": {
    aspect: 1.25,
    door: { wall: "W", at: 0.5 },
    items: [{ w: 1.9, d: 1.0, at: "C", primary: true, seats: 6 }],
  },
  "חדר הורים": {
    aspect: 1.15,
    door: { wall: "S", at: 0.8 },
    items: [
      bed(1.8, 2.0),
      { w: 0.45, d: 0.4, at: "NW", offset: 0.1 },
      { w: 0.45, d: 0.4, at: "NE", offset: -0.1 },
      { w: 2.2, d: 0.6, at: "S", primary: true },    // wardrobe
    ],
  },
  "חדר רחצה הורים": {
    aspect: 1.5,
    door: { wall: "S", at: 0.85 },
    items: [
      { w: 1.4, d: 0.55, at: "N", primary: true },   // double vanity
      { w: 0.9, d: 0.9, at: "NE" },                  // shower
      { w: 0.42, d: 0.65, at: "SW" },                // wc
    ],
  },
  "חדר ארונות הורים": {
    aspect: 1.7,
    door: { wall: "S", at: 0.5 },
    items: [
      { w: 2.4, d: 0.6, at: "N", primary: true },
      { w: 2.4, d: 0.6, at: "S" },
    ],
  },
  "חדר ילדים": {
    aspect: 1.2,
    door: { wall: "S", at: 0.85 },
    items: [
      bed(1.0, 2.0, "NW"),
      { w: 1.2, d: 0.6, at: "NE" },                  // desk
      { w: 1.6, d: 0.6, at: "S", primary: true },    // wardrobe
    ],
  },
  "חדר רחצה ילדים": {
    aspect: 1.6,
    door: { wall: "S", at: 0.85 },
    items: [
      { w: 1.7, d: 0.75, at: "N", primary: true, round: true }, // bath
      { w: 0.8, d: 0.5, at: "SW" },                  // basin
      { w: 0.42, d: 0.65, at: "SE" },                // wc
    ],
  },
  "חדר אורחים": {
    aspect: 1.2,
    door: { wall: "S", at: 0.85 },
    items: [
      bed(1.4, 2.0),
      { w: 1.6, d: 0.6, at: "S", primary: true },
    ],
  },
  "חדר עבודה": {
    aspect: 1.25,
    door: { wall: "S", at: 0.85 },
    items: [
      { w: 1.6, d: 0.7, at: "N", primary: true },    // desk
      { w: 0.6, d: 0.6, at: "C" },                   // chair
      { w: 2.0, d: 0.35, at: "W" },                  // shelving
    ],
  },
  'ממ"ד': {
    aspect: 1.15,
    door: { wall: "S", at: 0.5 },
    items: [
      bed(1.0, 2.0, "NW"),
      { w: 1.2, d: 0.5, at: "NE" },
    ],
  },
  "פינת משפחה": {
    aspect: 1.3,
    door: { wall: "E", at: 0.5 },
    items: [
      { w: 2.0, d: 0.9, at: "S", primary: true },
      { w: 1.0, d: 0.5, at: "C" },
    ],
  },
  "מבואת כניסה": {
    aspect: 1.5,
    door: { wall: "S", at: 0.5 },
    items: [
      { w: 1.2, d: 0.4, at: "N", primary: true },    // bench
      { w: 0.9, d: 0.35, at: "W" },                  // coats
    ],
  },
  "שרותי אורחים": {
    aspect: 1.7,
    door: { wall: "S", at: 0.7 },
    items: [
      { w: 0.42, d: 0.65, at: "N", primary: true },
      { w: 0.5, d: 0.42, at: "W" },
    ],
  },
  "מחסן פנימי בתוך הבית": {
    aspect: 1.4,
    door: { wall: "S", at: 0.5 },
    items: [
      { w: 1.8, d: 0.5, at: "N", primary: true },
      { w: 1.8, d: 0.5, at: "S" },
    ],
  },
  "חדר כביסה": {
    aspect: 1.5,
    door: { wall: "S", at: 0.7 },
    items: [
      { w: 0.62, d: 0.62, at: "NW", primary: true },
      { w: 0.62, d: 0.62, at: "N", offset: 0.66 },
      { w: 0.6, d: 0.5, at: "NE" },
    ],
  },
  "חניה בנויה למכונית אחת": {
    aspect: 0.62,
    door: { wall: "S", at: 0.5 },
    items: [{ w: 1.85, d: 4.5, at: "C", primary: true }],
  },
  "חדר מדרגות": {
    aspect: 0.75,
    door: { wall: "S", at: 0.5 },
    items: [{ w: 1.1, d: 3.0, at: "C", primary: true }],
  },
  "מרפסת עם פרגולה": {
    aspect: 1.5,
    door: { wall: "N", at: 0.5 },
    items: [
      { w: 1.6, d: 0.9, at: "C", primary: true, seats: 4 },
      { w: 0.9, d: 0.9, at: "SW" },
    ],
  },
};
