type Shape = "wave" | "curve" | "tilt" | "arrow" | "drops" | "zigzag";

type Props = {
  shape?: Shape;
  fillColor: string;
  className?: string;
  flip?: boolean;
  height?: number;
};

const paths: Record<Shape, string> = {
  wave: "M0,64 C320,160 640,-32 960,96 C1280,224 1440,32 1440,32 L1440,320 L0,320 Z",
  curve: "M0,160 Q720,320 1440,160 L1440,320 L0,320 Z",
  tilt: "M0,224 L1440,96 L1440,320 L0,320 Z",
  arrow: "M0,256 L720,128 L1440,256 L1440,320 L0,320 Z",
  drops: "M0,192 C240,320 480,128 720,224 C960,320 1200,128 1440,192 L1440,320 L0,320 Z",
  zigzag: "M0,224 L180,160 L360,224 L540,160 L720,224 L900,160 L1080,224 L1260,160 L1440,224 L1440,320 L0,320 Z",
};

export default function ShapeDivider({
  shape = "wave",
  fillColor,
  className = "",
  flip = false,
  height = 80,
}: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{
        height,
        ...(flip ? { transform: "rotate(180deg)" } : {}),
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
      >
        <path d={paths[shape]} fill={fillColor} />
      </svg>
    </div>
  );
}
