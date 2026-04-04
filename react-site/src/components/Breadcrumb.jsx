import { Link } from 'react-router-dom';

export default function Breadcrumb({ current, items }) {
  // Support both old API (current) and new API (items)
  if (items) {
    return (
      <div className="flex items-center gap-1 mb-10 font-label text-xs text-secondary tracking-wide">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && <span className="breadcrumb-sep" />}
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-primary transition-colors">{item.label}</Link>
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
      <Link to="/" className="hover:text-primary transition-colors">ראשי</Link>
      <span className="breadcrumb-sep" />
      <span className="text-primary font-medium">{current}</span>
    </div>
  );
}
