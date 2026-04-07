import Link from 'next/link';

type BreadcrumbItem = { label: string; to?: string };

export default function Breadcrumb({ current, items }: { current?: string; items?: BreadcrumbItem[] }) {
  if (items) {
    return (
      <div className="flex items-center gap-1 mb-10 font-label text-xs text-secondary tracking-wide">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && <span className="breadcrumb-sep" />}
              {item.to && !isLast ? (
                <Link href={item.to} className="hover:text-primary transition-colors">{item.label}</Link>
              ) : (
                <span className={isLast ? "text-primary font-medium" : ""}>{item.label}</span>
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
