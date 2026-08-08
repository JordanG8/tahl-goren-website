import Image from "next/image";
import Link from "next/link";

// Order and wording per Tal's spec (August 2026) — do not reorder.
const CREDENTIALS = [
  "אדריכלית מורשית היתר, מס' תעודה 01-002-0000009445",
  "אדריכלית רשויה מספר 11085135",
  "25+ שנות ניסיון ותכנון של 100+ בתים פרטיים",
  "בוגרת הפקולטה לארכיטקטורה בטכניון, בהצטיינות",
];

export default function ArticleAuthorBox({ updatedAt }: { updatedAt: string }) {
  const formattedDate = new Date(updatedAt).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="mt-16 p-6 md:p-8 bg-surface-container-low border border-outline/10 text-right">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Link href="/about" className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-full border border-outline/20">
          <Image
            src="/images/tahl-portrait.jpg"
            alt="טל גורן אדריכלית"
            fill
            sizes="80px"
            className="object-cover object-top"
          />
        </Link>
        <div className="flex-1">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-1">נכתב ונבדק מקצועית על ידי</p>
          <Link href="/about" className="font-headline font-black text-lg text-primary hover:text-secondary transition-colors">
            טל גורן, אדריכלית
          </Link>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {CREDENTIALS.map((c) => (
              <li key={c} className="flex items-center gap-1.5 text-xs text-secondary">
                <span className="material-symbols-outlined text-tertiary text-sm">verified</span>
                {c}
              </li>
            ))}
          </ul>
          <p className="font-body text-xs text-secondary/70 mt-4">
            עודכן לאחרונה: <time dateTime={updatedAt}>{formattedDate}</time>
          </p>
        </div>
      </div>
    </div>
  );
}
