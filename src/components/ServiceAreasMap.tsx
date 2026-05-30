'use client';

import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from '@/components/ui/map';
import { areas } from '@/data/areasContent';
import Link from 'next/link';

export default function ServiceAreasMap() {
  return (
    <div className="w-full max-w-7xl mx-auto h-[320px] md:h-[600px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 bg-surface-container-low relative">
      <div id="service-areas-map-container" className="w-full h-full">
        <Map
          center={[34.97, 32.45]}
          zoom={9}
          theme="light"
          className="w-full h-full"
          cooperativeGestures={true}
        >
          <MapControls
            showZoom={true}
            showCompass={true}
            showFullscreen={true}
            showLocate={false}
            position="bottom-right"
          />

          {areas.map((area) => (
            <MapMarker key={area.slug} longitude={area.coords.lng} latitude={area.coords.lat}>
              <MarkerContent>
                <div className="relative group">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg transform transition-transform group-hover:scale-125"
                    style={{ backgroundColor: area.color }}
                  />
                </div>
              </MarkerContent>

              <MarkerTooltip>
                <div className="font-headline font-bold text-sm px-1">{area.h1}</div>
              </MarkerTooltip>

              <MarkerPopup closeButton={true} className="min-w-[220px] p-0 overflow-hidden rounded-xl border-none shadow-2xl">
                <div className="p-4 bg-white text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <h4 className="font-headline font-bold text-primary text-base">{area.h1}</h4>
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: area.color }} />
                  </div>
                  <p className="font-body text-secondary text-xs mb-3 line-clamp-3">{area.intro}</p>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline group"
                  >
                    <span>לעמוד האזור</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-[-2px] transition-transform">
                      arrow_back
                    </span>
                  </Link>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );
}
