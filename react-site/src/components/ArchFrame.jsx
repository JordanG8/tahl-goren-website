import React from 'react';

/**
 * ArchFrame component - provides a static, signature 'architectural' frame 
 * with corners styled as drafting lines.
 */
export default function ArchFrame({ children, className = '' }) {
  const PAD = 28; // Padding for the frame
  const GAP = 12; // Gap for the corners
  const T = 1;    // Thickness of lines
  const LINE = 40; // Length of corner lines
  const FP = PAD - GAP; // Corner offset point

  // Fixed corner configuration:
  // Each corner has a horizontal and vertical line.
  const CORNERS = [
    // Top-Left
    { top: FP, left: FP - 2, width: LINE, height: T },
    { top: FP - 2, left: FP, width: T, height: LINE },
    // Top-Right
    { top: FP, right: FP - 2, width: LINE, height: T },
    { top: FP - 2, right: FP, width: T, height: LINE },
    // Bottom-Left
    { bottom: FP, left: FP - 2, width: LINE, height: T },
    { bottom: FP - 2, left: FP, width: T, height: LINE },
    // Bottom-Right
    { bottom: FP, right: FP - 2, width: LINE, height: T },
    { bottom: FP - 2, right: FP, width: T, height: LINE },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Background layer */}
      <div className="absolute inset-0 bg-surface-container/30 -z-10" />
      
      {/* Static Drawing Lines (Drafting Style) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {CORNERS.map((style, i) => (
          <span
            key={i}
            className="absolute bg-primary/40"
            style={style}
          />
        ))}
      </div>

      {/* Content with padding */}
      <div style={{ padding: `${PAD}px` }}>
        {children}
      </div>
    </div>
  );
}
