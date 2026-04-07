export default function ArchFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const PAD = 28;
  const GAP = 12;
  const T = 1;
  const LINE = 40;
  const FP = PAD - GAP;

  const CORNERS = [
    { top: FP, left: FP - 2, width: LINE, height: T },
    { top: FP - 2, left: FP, width: T, height: LINE },
    { top: FP, right: FP - 2, width: LINE, height: T },
    { top: FP - 2, right: FP, width: T, height: LINE },
    { bottom: FP, left: FP - 2, width: LINE, height: T },
    { bottom: FP - 2, left: FP, width: T, height: LINE },
    { bottom: FP, right: FP - 2, width: LINE, height: T },
    { bottom: FP - 2, right: FP, width: T, height: LINE },
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-surface-container/30 -z-10" />
      <div className="absolute inset-0 pointer-events-none z-10">
        {CORNERS.map((style, i) => (
          <span key={i} className="absolute bg-primary/40" style={style} />
        ))}
      </div>
      <div style={{ padding: `${PAD}px` }}>{children}</div>
    </div>
  );
}
