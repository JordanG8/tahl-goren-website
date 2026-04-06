import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// PAD  — image inset from container edge
// GAP  — space between image edge and the frame lines
// FP   — frame line position from container edge (PAD - GAP)
// LINE — total length of each corner line
// OVF  — how many px each line extends PAST the corner point (creates the X)
const PAD  = 28;
const GAP  = 10;
const FP   = PAD - GAP;   // 18
const LINE = 120;
const OVF  = 14;
const T    = 1.5;          // thickness in px
const COLOR = 'rgba(48,51,47,0.30)';

// Both lines of each corner share the same scroll offset so they draw simultaneously.
// Corners are staggered: each corner fully draws in over a different portion of the
// scroll range [0, 1], spaced so all 4 complete by mid-scroll.
const CORNERS = [
  // top-right
  [
    { top: FP,       right: FP - OVF, width: LINE, height: T, transformOrigin: 'right center',  scaleAxis: 'X' },
    { top: FP - OVF, right: FP,       width: T, height: LINE, transformOrigin: 'top center',    scaleAxis: 'Y' },
  ],
  // top-left
  [
    { top: FP,       left: FP - OVF,  width: LINE, height: T, transformOrigin: 'left center',   scaleAxis: 'X' },
    { top: FP - OVF, left: FP,        width: T, height: LINE, transformOrigin: 'top center',    scaleAxis: 'Y' },
  ],
  // bottom-left
  [
    { bottom: FP,       left: FP - OVF, width: LINE, height: T, transformOrigin: 'left center',   scaleAxis: 'X' },
    { bottom: FP - OVF, left: FP,       width: T, height: LINE, transformOrigin: 'bottom center', scaleAxis: 'Y' },
  ],
  // bottom-right
  [
    { bottom: FP,       right: FP - OVF, width: LINE, height: T, transformOrigin: 'right center',  scaleAxis: 'X' },
    { bottom: FP - OVF, right: FP,       width: T, height: LINE, transformOrigin: 'bottom center', scaleAxis: 'Y' },
  ],
];

// Each corner draws in over a staggered scroll window
const CORNER_RANGES = [
  [0.0, 0.35],
  [0.2, 0.55],
  [0.4, 0.75],
  [0.6, 0.95],
];

function CornerLines({ lines, scrollYProgress, range }) {
  // Use a clamped eased transform instead of useSpring to prevent snap-back oscillation
  const scale = useTransform(scrollYProgress, range, [0, 1], {
    clamp: true,
  });

  return (
    <>
      {lines.map(({ scaleAxis, transformOrigin, ...pos }, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            background: COLOR,
            transformOrigin,
            willChange: 'transform',
            [scaleAxis === 'X' ? 'scaleX' : 'scaleY']: scale,
            ...pos,
          }}
        />
      ))}
    </>
  );
}

export default function ArchFrame({ children, className = '' }) {
  const ref = useRef(null);

  const { scrollYProgress: rawScroll } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scrollYProgress = useSpring(rawScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ padding: PAD }}
    >

      {CORNERS.map((lines, i) => (
        <CornerLines
          key={i}
          lines={lines}
          scrollYProgress={scrollYProgress}
          range={CORNER_RANGES[i]}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

