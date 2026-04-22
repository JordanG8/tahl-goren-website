'use client';

import { useMemo } from 'react';
import { 
  Map, 
  MapControls, 
  MapMarker, 
  MarkerContent, 
  MarkerPopup, 
  MarkerTooltip 
} from '@/components/ui/map';
import { siteData } from '@/data/siteData';
import Link from 'next/link';

const LOCATION_COORDS: Record<string, { lng: number, lat: number }> = {
  "מושב מאור": { lng: 35.00639, lat: 32.42392 },
  "בנימינה": { lng: 34.945, lat: 32.52222 },
  "זכרון יעקב": { lng: 34.95167, lat: 32.57083 },
  "פרדס חנה": { lng: 34.9675, lat: 32.47111 },
  "אור עקיבא": { lng: 34.91667, lat: 32.50000 },
  "קציר": { lng: 35.10194, lat: 32.48806 },
  "גבעת עדה": { lng: 34.955, lat: 32.517 },
};

export default function InteractiveProjectsMap() {
  // Group projects by location
  const projectsByLocation = useMemo(() => {
    const map: Record<string, typeof siteData.projects> = {};
    siteData.projects.forEach((p) => {
      if (!map[p.location]) map[p.location] = [];
      map[p.location].push(p);
    });
    return map;
  }, []);

  // Filter locations that have coordinates
  const locationsWithCoords = Object.keys(projectsByLocation).filter(loc => LOCATION_COORDS[loc]);

  return (
    <div className="w-full max-w-7xl mx-auto h-[200px] md:h-[600px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 bg-surface-container-low relative group/map">
      <button 
        onClick={() => {
          const el = document.getElementById('interactive-map-container');
          if (el) {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              el.requestFullscreen();
            }
          }
        }}
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-[#30332f] px-4 py-2 rounded-lg shadow-lg border border-border/50 flex items-center gap-2 font-bold text-sm transition-all active:scale-95"
      >
        <span className="material-symbols-outlined text-base">fullscreen</span>
        <span>מסך מלא</span>
      </button>
      
      <div id="interactive-map-container" className="w-full h-full">
        <Map 
          center={[34.97, 32.5]}
          zoom={11}
          theme="light"
          className="w-full h-full"
          cooperativeGestures={false}
        >
        <MapControls 
          showZoom={true} 
          showCompass={true} 
          showFullscreen={false} 
          showLocate={true}
          position="bottom-right"
        />

        {locationsWithCoords.map((locName) => {
          const coords = LOCATION_COORDS[locName];
          const projects = projectsByLocation[locName];
          const mainProject = projects[0];

          return (
            <MapMarker 
              key={locName}
              longitude={coords.lng} 
              latitude={coords.lat}
            >
              <MarkerContent>
                <div className="relative group">
                  <div className="w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs transform transition-transform group-hover:scale-110">
                    {projects.length}
                  </div>
                  {/* Pulse animation for the marker */}
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20 pointer-events-none"></div>
                </div>
              </MarkerContent>

              <MarkerTooltip>
                <div className="font-headline font-bold text-sm px-1">
                  {locName} — {projects.length} פרויקטים
                </div>
              </MarkerTooltip>

              <MarkerPopup closeButton={true} className="min-w-[280px] p-0 overflow-hidden rounded-xl border-none shadow-2xl">
                <div className="flex flex-col">
                  {mainProject.image && (
                    <div className="h-32 w-full overflow-hidden">
                      <img 
                        src={mainProject.image} 
                        alt={mainProject.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 bg-white">
                    <h4 className="font-headline font-bold text-primary text-base mb-1">{locName}</h4>
                    <p className="font-body text-secondary text-xs mb-3">
                      {projects.length} פרויקטים שתכננו באזור זה.
                    </p>
                    
                    <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                      {projects.slice(0, 3).map(p => (
                        <div key={p.id} className="text-xs border-r-2 border-primary/20 pr-2 py-1">
                          <p className="font-headline font-semibold text-primary/80 line-clamp-1">{p.title}</p>
                        </div>
                      ))}
                      {projects.length > 3 && (
                        <p className="text-[10px] text-secondary/60 italic">ועוד {projects.length - 3} פרויקטים נוספים...</p>
                      )}
                    </div>

                    <Link 
                      href="/projects" 
                      className="mt-4 inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline group"
                    >
                      <span>לכל הפרויקטים</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-[-2px] transition-transform">arrow_back</span>
                    </Link>
                  </div>
                </div>
              </MarkerPopup>
            </MapMarker>
          );
        })}
        </Map>
      </div>
      
      {/* Decorative Blueprint Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none opacity-20">
        <div className="w-32 h-32 border border-primary/30 rounded-full flex items-center justify-center">
          <div className="w-24 h-24 border border-primary/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 border border-primary/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
