import { Link } from 'react-router-dom';

export default function Breadcrumb({ current }) {
  return (
    <div className="flex items-center gap-1 mb-10 font-label text-xs text-secondary tracking-wide">
      <Link to="/" className="hover:text-primary transition-colors">ראשי</Link>
      <span className="breadcrumb-sep" />
      <span className="text-primary font-medium">{current}</span>
    </div>
  );
}
