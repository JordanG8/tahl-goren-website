import Image from "next/image";
import Link from "next/link";
import { SealIcon } from "@/components/ui/Icon";

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
    // The byline of every article on the site, so it is set as a colophon on
    // hairlines rather than a filled panel. Each credential was prefixed by a
    // Material "verified" ligature; until that font loaded, all four lines read
    // "verified" in plain text on 44 article pages.
    <div className="mt-16 border-t border-hairline pt-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Link
          href="/about"
          className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-full border border-hairline"
        >
          <Image
            src="/images/tahl-portrait.jpg"
            alt="טל גורן אדריכלית"
            fill
            sizes="80px"
            className="object-cover object-top"
          />
        </Link>
        <div className="flex-1">
          <p className="font-label font-medium text-[13px] uppercase tracking-[0.16em] text-ink-mute mb-2">
            נכתב ונבדק מקצועית על ידי
          </p>
          <Link
            href="/about"
            className="font-headline font-black text-xl text-primary hover:text-clay transition-colors"
          >
            טל גורן, אדריכלית
          </Link>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {CREDENTIALS.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[13px] text-secondary">
                <SealIcon size={15} className="text-clay flex-shrink-0" strokeWidth={1} />
                {c}
              </li>
            ))}
          </ul>
          <p className="font-body text-xs text-ink-mute mt-5">
            עודכן לאחרונה: <time dateTime={updatedAt}>{formattedDate}</time>
          </p>
        </div>
      </div>
    </div>
  );
}
