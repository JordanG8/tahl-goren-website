import Link from "next/link";

const quickLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/projects", label: "פרויקטים" },
  { href: "/areas", label: "אזורי שירות" },
  { href: "/articles", label: "מאמרים ומדריכים" },
  { href: "/contact", label: "צור קשר" },
];

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-8 py-24 bg-surface">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-headline font-black text-7xl md:text-9xl text-secondary/30 leading-none">404</p>
        <h1 className="font-headline font-black text-3xl md:text-5xl tracking-tight text-primary mt-6">
          הדף לא נמצא
        </h1>
        <p className="text-secondary text-lg leading-relaxed mt-6 max-w-xl mx-auto">
          מצטערים, העמוד שחיפשתם לא קיים או שכתובתו השתנתה. אפשר לחזור לדף הבית או להמשיך לאחד מהעמודים הבאים:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-outline/20 px-5 py-3 font-headline font-bold text-sm text-primary hover:bg-surface-container-highest hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 font-headline font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-colors mt-12"
        >
          חזרה לדף הבית
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </Link>
      </div>
    </section>
  );
}
