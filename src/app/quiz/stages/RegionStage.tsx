"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { StepOption } from "@/data/calculatorSteps";
import { regionAreas } from "@/data/regionAreas";
import { StageFrame } from "./StageFrame";

/**
 * Location, on a real map.
 *
 * The three regions are painted as polygons over a muted basemap and are
 * clickable directly — picking your area by pointing at where you are building
 * is a great deal more natural than reading three labels off a list. The chips
 * underneath stay in place as the accessible equivalent, and both drive the
 * same state.
 *
 * The polygons are the office's own commercial bands, so the map carries a note
 * saying they are indicative rather than pretending to draw an official border.
 */

/**
 * The basemap is declared inline rather than fetched as a style URL.
 *
 * With a remote style, maplibre cannot fire `load` until that JSON arrives — so
 * a slow or unreachable CDN leaves the visitor with an empty grey box and no
 * way to answer the question. Declaring the style locally means the regions are
 * drawn from local data immediately; the Carto raster tiles then paint in
 * underneath them if and when they arrive, and their absence costs context
 * rather than the control itself.
 */
const BASEMAP: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, © <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [
    { id: "bg", type: "background", paint: { "background-color": "#F4F1EC" } },
    { id: "carto", type: "raster", source: "carto" },
  ],
};

export default function RegionStage({
  options,
  value,
  onChange,
}: {
  options: StepOption[];
  value: string | null;
  onChange: (label: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  // The click handler closes over `onChange`; keeping it in a ref means the
  // listener is attached once instead of being torn down on every render.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!container.current || map.current) return;

    const m = new maplibregl.Map({
      container: container.current,
      style: BASEMAP,
      center: [34.95, 31.6],
      zoom: 6.1,
      attributionControl: { compact: true },
      // This map is a picker, not an atlas.
      dragRotate: false,
touchPitch: false,
    });
    map.current = m;
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");

    m.on("load", () => {
      for (const area of regionAreas) {
        const id = `region-${area.label}`;
        m.addSource(id, {
          type: "geojson",
          data: {
            type: "Feature",
            // feature-state is addressed by id; without one, the selected and
            // hover paint expressions below never match anything.
            id: 0,
            properties: { label: area.label },
            geometry: area.geometry,
          },
        });
        m.addLayer({
          id: `${id}-fill`,
          type: "fill",
          source: id,
          paint: {
            "fill-color": area.color,
            // Raised by the feature-state below when selected or hovered.
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "selected"], false], 0.55,
              ["boolean", ["feature-state", "hover"], false], 0.38,
              0.22,
            ],
            "fill-opacity-transition": { duration: 350 },
          },
        });
        m.addLayer({
          id: `${id}-line`,
          type: "line",
          source: id,
          paint: {
            "line-color": area.color,
            "line-width": [
              "case", ["boolean", ["feature-state", "selected"], false], 3, 1.25,
            ],
            "line-opacity": [
              "case", ["boolean", ["feature-state", "selected"], false], 1, 0.5,
            ],
            "line-width-transition": { duration: 350 },
          },
        });

        m.on("click", `${id}-fill`, () => onChangeRef.current(area.label));
        m.on("mouseenter", `${id}-fill`, () => {
          m.getCanvas().style.cursor = "pointer";
          m.setFeatureState({ source: id, id: 0 }, { hover: true });
        });
        m.on("mouseleave", `${id}-fill`, () => {
          m.getCanvas().style.cursor = "";
          m.setFeatureState({ source: id, id: 0 }, { hover: false });
        });
      }
      m.resize();
      // Frame the whole country, keeping the lower band clear of the scrim.
      m.fitBounds(
        [
          [34.2, 29.45],
          [35.75, 33.35],
        ],
        { padding: { top: 20, bottom: 132, left: 20, right: 20 }, duration: 0 },
      );
    });

    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  // Selection is owned by the wizard, so the map follows it — whether the
  // change came from a polygon click or from the chips below.
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const apply = () => {
      for (const area of regionAreas) {
        if (!m.getSource(`region-${area.label}`)) return;
        m.setFeatureState(
          { source: `region-${area.label}`, id: 0 },
          { selected: area.label === value },
        );
      }
    };
    if (m.isStyleLoaded()) apply();
    else m.once("load", apply);
  }, [value]);

  return (
    <StageFrame options={options} value={value} onChange={onChange} tall>
      {/* Sized with h-full rather than absolute insets: maplibre's own
          stylesheet sets `.maplibregl-map { position: relative }` and loads
          after Tailwind, so an `absolute` utility here is overridden and the
          container collapses to zero height. */}
      <div ref={container} className="h-full w-full" aria-hidden />
      <p className="absolute top-3 right-3 z-10 bg-surface/90 border border-hairline px-3 py-1.5 font-body text-[12px] text-secondary max-w-[15rem] leading-snug">
        חלוקה מנחה לצורך התמחור — לא גבול מנהלי.
      </p>
    </StageFrame>
  );
}
