import Image from "next/image";
import Link from "next/link";

const CREDENTIALS = [
  "בוגרת הפקולטה לארכיטקטורה בטכניון בהצטיינות",
  "אדריכלית רשומה (מס' רישום 118121) ואדריכלית רשויה",
  "אדריכלית מורשית היתר",
  "25+ שנות ניסיון ותכנון של 100+ בתים פרטיים",
];

export default function ArticleAuthorBox({ updatedAt }: { updatedAt: string }) {
  const formattedDate = new Date(updatedAt).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
