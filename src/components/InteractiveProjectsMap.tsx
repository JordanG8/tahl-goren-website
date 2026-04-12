'use client';

import { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { siteData } from '@/data/siteData';

const LOCATIONS = [
  { name: 'זכרון יעקב', cx: 210, cy: 100, color: '#6B8C6B' },
  { name: 'אור עקיבא', cx: 110, cy: 260, color: '#6B7FA1' },
  { name: 'בנימינה', cx: 360, cy: 180, color: '#A6806A' },
  { name: 'גבעת עדה', cx: 430, cy: 310, color: '#8B7560' },
  { name: 'פרדס חנה', cx: 580, cy: 360, color: '#887B98' },
  { name: 'מושב מאור', cx: 720, cy: 210, color: '#5B8A7C' },
  { name: 'קציר', cx: 850, cy: 410, color: '#A89060' },
];

const CONNECTIONS: [number, number, number, number][] = [
  [210, 100, 110, 260],
  [210, 100, 360, 180],
  [110, 260, 430, 310],
  [360, 180, 430, 310],
  [430, 310, 580, 360],
  [360, 180, 720, 210],
  [580, 360, 720, 210],
  [720, 210, 850, 410],
];

export default function InteractiveProjectsMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const projectsByLocation = useMemo(() => {
    const map: Record<string, typeof siteData.projects> = {};
    siteData.projects.forEach((p) => {
      if (!map[p.location]) map[p.location] = [];
      map[p.location].push(p);
    });
    return map;
  }, []);

  const filteredProjects = selectedLocation
    ? projectsByLocation[selectedLocation] || []
    : [];

  const handleClick = (name: string) => {
    setSelectedLocation((prev) => (prev === name ? null : name));
  };

  return (
    <div>
      {/* SVG Map */}
      <div className="bg-surface-container-low p-4 md:p-8 overflow-hidden">
        <svg
          viewBox="0 0 960 520"
          className="w-full h-auto"
          role="img"
          aria-label="מפת פרויקטים אינטראקטיבית"
        >
          <defs>
            <linearGradient id="coastBg" x1="0" y1="0" x2="0.12" y2="0">
              <stop offset="0%" stopColor="#b5c8d8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b5c8d8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Coast background hint */}
          <rect x="0" y="0" width="960" height="520" fill="url(#coastBg)" />
          <path
            d="M 35,0 Q 55,100 45,200 Q 30,300 50,400 Q 60,460 45,520"
            stroke="#b5c8d8"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />

          {/* Compass indicator */}
          <g transform="translate(910, 55)" opacity="0.5">
            <circle cx="0" cy="0" r="16" fill="none" stroke="#b1b3ad" strokeWidth="1" />
            <text
              x="0"
              y="-4"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#625e58"
              fontFamily="Inter, sans-serif"
            >
              N
            </text>
            <line x1="0" y1="0" x2="0" y2="9" stroke="#b1b3ad" strokeWidth="1" />
          </g>

          {/* Road connections */}
          {CONNECTIONS.map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#ccc9c2"
              strokeWidth="1.5"
              strokeDasharray="8,5"
              opacity="0.45"
            />
          ))}

          {/* Location circles */}
          {LOCATIONS.map((loc) => {
            const count = projectsByLocation[loc.name]?.length || 0;
            const isSelected = selectedLocation === loc.name;
            const isHovered = hoveredLocation === loc.name;
            const r = 40 + count * 7;

            return (
              <g
                key={loc.name}
                onClick={() => handleClick(loc.name)}
                onMouseEnter={() => setHoveredLocation(loc.name)}
                onMouseLeave={() => setHoveredLocation(null)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label={`${loc.name} – ${count} פרויקטים`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleClick(loc.name);
                }}
              >
                {/* Selection ring */}
                {isSelected && (
                  <circle
                    cx={loc.cx}
                    cy={loc.cy}
                    r={r + 10}
                    fill="none"
                    stroke={loc.color}
                    strokeWidth="2"
                    opacity="0.5"
                    strokeDasharray="4,3"
                  />
                )}

                {/* Hover / selected glow */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={loc.cx}
                    cy={loc.cy}
                    r={r + 6}
                    fill={loc.color}
                    opacity="0.15"
                  />
                )}

                {/* Main circle */}
                <circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r={r}
                  fill={loc.color}
                  opacity={isSelected ? 1 : isHovered ? 0.9 : 0.72}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="2"
                />

                {/* Count number */}
                <text
                  x={loc.cx}
                  y={loc.cy + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={r > 65 ? 30 : 24}
                  fontWeight="800"
                  fontFamily="Heebo, sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {count}
                </text>

                {/* Location name below circle */}
                <text
                  x={loc.cx}
                  y={loc.cy + r + 20}
                  textAnchor="middle"
                  fill="#30332f"
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="Heebo, sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {loc.name}
                </text>
              </g>
            );
          })}

          {/* Instruction */}
          <text
            x="480"
            y="505"
            textAnchor="middle"
            fill="#625e58"
            fontSize="12"
            fontFamily="Assistant, sans-serif"
            opacity="0.6"
          >
            לחצו על אזור במפה לצפייה בפרויקטים
          </text>
        </svg>
      </div>

      {/* Filtered Projects */}
      {selectedLocation && filteredProjects.length > 0 && (
        <div className="pt-10">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: LOCATIONS.find(
                    (l) => l.name === selectedLocation,
                  )?.color,
                }}
              />
              <h3 className="font-headline font-bold text-2xl text-primary">
                פרויקטים ב{selectedLocation}
              </h3>
              <span className="font-label text-sm text-secondary bg-surface-container-low px-3 py-1 rounded-full">
                {filteredProjects.length}
              </span>
            </div>
            <button
              onClick={() => setSelectedLocation(null)}
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-label text-sm"
            >
              <span>נקה בחירה</span>
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
