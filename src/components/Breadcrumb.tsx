import Link from 'next/link';

type BreadcrumbItem = { label: string; to?: string };

export default function Breadcrumb({ current, items, light }: { current?: string; items?: BreadcrumbItem[]; light?: boolean }) {
  if (items) {
    const base = light ? "text-white/70" : "text-secondary";
    const active = light ? "text-white font-medium" : "text-primary font-medium";
    const hover = light ? "hover:text-white" : "hover:text-primary";
    return (
      <div className={`flex items-center gap-1 mb-10 font-label text-xs ${base} tracking-wide`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && <span className="breadcrumb-sep" style={light ? { color: "rgba(255,255,255,0.4)" } : undefined} />}
              {item.to && !isLast ? (
                <Link href={item.to} className={`${hover} transition-colors`}>{item.label}</Link>
              ) : (
                <span className={isLast ? active : ""}>{item.label}</span>
              )}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 mb-10 font-label text-xs text-secondary tracking-wide">
      <Link href="/" className="hover:text-primary transition-colors">ראשי</Link>
      <span className="breadcrumb-sep" />
      <span className="text-primary font-medium">{current}</span>
    </div>
  );
}
