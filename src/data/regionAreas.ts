/**
 * The three pricing regions from the workbook, drawn as map polygons.
 *
 * These are commercial bands the office prices by, not administrative
 * boundaries — there is no official line on any map that separates
 * "אזור חדרה-גדרה" from "פריפריה". The shapes below are therefore deliberately
 * simplified and are labelled as indicative on the page. They exist so a
 * visitor can recognise roughly where they are, not to adjudicate a border.
 *
 * `label` must match a region label in houseCostCalculator.ts — that is the
 * join between the picture and the price.
 */

export type RegionArea = {
  label: string;
  /** Fill colour, from the site palette. */
  color: string;
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
};

export const regionAreas: RegionArea[] = [
  {
    label: "פריפריה",
    color: "#5A6B76",
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        // North: Galilee, Carmel and the valleys, above the Hadera line.
        [[
          [34.88, 32.48], [35.10, 32.30], [35.60, 32.70], [35.68, 33.10],
          [35.55, 33.28], [35.05, 33.05], [34.94, 32.82], [34.88, 32.48],
        ]],
        // South: the Shfela's edge, the Negev and the Arava.
        [[
          [34.55, 31.72], [35.05, 31.78], [35.20, 31.35], [35.45, 30.90],
          [35.40, 30.10], [34.92, 29.50], [34.30, 30.40], [34.48, 31.35],
          [34.55, 31.72],
        ]],
      ],
    },
  },
  {
    label: "אזור חדרה-גדרה",
    color: "#318BA2",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [34.55, 31.72], [35.05, 31.78], [35.12, 32.10], [35.10, 32.30],
        [34.88, 32.48], [34.62, 32.42], [34.55, 31.72],
      ]],
    },
  },
  {
    label: "אזור המרכז",
    color: "#A96F57",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [34.72, 31.95], [34.98, 31.97], [35.04, 32.12], [34.90, 32.24],
        [34.74, 32.18], [34.72, 31.95],
      ]],
    },
  },
];
