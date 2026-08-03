import Link from "next/link";
import Image from "next/image";
import type { SiteReviews } from "@/lib/reviews";
import { reviews as curatedReviews } from "@/data/reviews";
import { PHONE_DISPLAY } from "@/lib/whatsapp";
import RevealObserver from "@/components/home/RevealObserver";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import CostCalculator from "@/components/home/CostCalculator";
import StickyDock from "@/components/home/StickyDock";
import { PhoneLink, WhatsAppLink } from "@/components/home/ContactLinks";
import StarRating from "@/components/StarRating";

type Project = { id: string; title: string; location: string; image: string; description: string };

type Props = {
  projects: Project[];
  faqItems: unknown[];
  reviewsData: SiteReviews;
};

/** The three anxieties every family arrives with, each answered in the same breath. */
const FEARS = [
  {
    num: "01",
    title: "״נכנסנו לבור תקציבי בלי תחתית״",
    body: "רוב חריגות התקציב לא נולדות באתר הבנייה. הן נולדות בהחלטה תכנונית שהתקבלה בלי לבדוק מה היא עולה.",
    answer: "אנחנו בונים תקציב ריאלי כבר בפגישה הראשונה, וכל החלטה נבדקת מול המספר הזה.",
  },
  {
    num: "02",
    title: "״אין לנו מושג כמה זמן זה ייקח״",
    body: "חוסר ודאות בלוחות זמנים הוא מה שהופך פרויקט מרגש לפרויקט מלחיץ — במיוחד כשיש שכירות שמתקתקת.",
    answer: "אתם מקבלים לוח זמנים בפועל לכל שלב, ואני מעדכנת אותו כשמשהו זז.",
  },
  {
    num: "03",
    title: "״הבירוקרטיה תשגע אותנו״",
    body: "ועדות, יועצים, מודד, קונסטרוקטור, היתר. אף אחד מאלה לא באמת אמור להיות באחריות שלכם.",
    answer: "כמורשית היתר אני מנהלת את כל הרישוי מול הוועדה — אתם מקבלים עדכון, לא משימות.",
  },
];

const STEPS = [
  {
    num: "01",
    duration: "שיחה קצרה",
    title: "היכרות וכיוון",
    body: 'מספרים לי מה יש לכם ביד: מגרש, תב"ע, משפחה, תקציב. אני אומרת לכם מה ריאלי ומה לא — עוד לפני שהתחייבתם למשהו.',
    yours: "מה שאתם צריכים להביא: כלום.",
  },
  {
    num: "02",
    duration: "2–4 שבועות",
    title: "בירורים ותכנון מוקדם",
    body: "בודקים זכויות בנייה, מגבלות מגרש, כניסות ותנועת שמש, ומגיעים לסקיצה ראשונה שמשקפת את החיים שלכם.",
    yours: "אתם מחליטים על התכנית. אני מציעה.",
  },
  {
    num: "03",
    duration: "6–9 חודשים",
    title: "רישוי והיתר בנייה",
    body: "אני מרכזת את היועצים, מגישה לוועדה ומטפלת בכל הדרישות עד שההיתר בידיים.",
    yours: "הבירוקרטיה עליי, לא עליכם.",
  },
  {
    num: "04",
    duration: "8–12 שבועות",
    title: "תכניות עבודה מפורטות",
    body: "תכניות 1:50, נגרות, חשמל, פריסות וכתב כמויות — כדי שהקבלן יתמחר בדיוק ולא בהערכה.",
    yours: "כאן נשמר התקציב באמת.",
  },
  {
    num: "05",
    duration: "12–18 חודשים",
    title: "בנייה ופיקוח עליון",
    body: "ביקורי פיקוח באתר, החלטות בזמן אמת, ופתרון בעיות מול הקבלן — עד תעודת גמר וכניסה הביתה.",
    yours: "אתם לא מנהלים את הקבלן לבד.",
  },
];

const CREDENTIALS = [
  "אדריכלית רשויה · 11085135",
  "מורשית היתר",
  "בוגרת הטכניון בהצטיינות",
  "אדריכלות ועיצוב פנים",
];

const HERO_PROJECT_IDS = ["m-maor", "shai-maor", "n-gan-shomron"];
const FEATURED_PROJECT_IDS = ["m-maor", "sh-katzir", "r-or-akiva"];

const AVATAR_COLORS = ["#455A64", "#00796B", "#5D4037", "#3B5566", "#A96F57"];

const EYEBROW = "block font-label text-[11px] tracking-[0.35em] uppercase text-accent mb-5";
const SECTION_H2 =
  "m-0 font-headline font-extralight text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.12] tracking-tight text-primary";

/** Picks the named projects, in order, and tolerates any of them being absent. */
function pickProjects(projects: Project[], ids: string[]) {
  return ids.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p));
}

export default function HomePage({ projects, reviewsData }: Props) {
  const heroProjects = pickProjects(projects, HERO_PROJECT_IDS);
  const heroImages = (heroProjects.length > 0 ? heroProjects : projects.slice(0, 3)).map((p) => ({
    src: p.image,
    alt: p.title,
  }));

  const featured = pickProjects(projects, FEATURED_PROJECT_IDS);
  const featuredProjects = featured.length === 3 ? featured : projects.slice(0, 3);

  // Live Google reviews when available; the curated list only supplies the
  // town name, which the API doesn't return.
  const homeReviews = reviewsData.reviews.slice(0, 3).map((r, i) => ({
    ...r,
    location: curatedReviews.find((c) => c.name.trim() === r.name.trim())?.location,
    initial: r.name.trim().charAt(0),
    avatar: AVATAR_COLORS[i % AVATAR_COLORS.length],
  }));

  return (
    <>
      <RevealObserver />

      {/* ============ 1. HERO ============ */}
      <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-primary -mt-20 sm:-mt-24">
        <HeroSlideshow images={heroImages} />

        <div className="relative z-10 h-full max-w-[1680px] mx-auto px-6 sm:px-10 flex flex-col justify-center">
          <div className="max-w-[780px]">
            {/* The regions are dropped below sm: at 0.42em they push the line to two
                rows and shove the eyebrow into the navbar on a 375px screen. */}
            <span
              data-reveal
              className="block font-label text-[11px] tracking-[0.22em] sm:tracking-[0.42em] uppercase text-white/60 mb-4 sm:mb-7"
            >
              אדריכלות לבתים פרטיים
              <span className="hidden sm:inline"> · שרון, מנשה וחוף הכרמל</span>
            </span>
            <h1
              data-reveal
              className="m-0 font-headline font-light text-[42px] sm:text-[56px] lg:text-[74px] leading-[1.06] tracking-[-0.03em] text-white"
              style={{ textShadow: "0 2px 30px rgba(20,30,36,0.45)" }}
            >
              לבנות בית
              <br />
              <span className="font-bold">בלי לאבד שליטה.</span>
            </h1>
            <p
              data-reveal
              className="mt-5 sm:mt-7 font-body font-light text-lg sm:text-[22px] leading-[1.7] text-white/80 max-w-[560px] text-pretty"
            >
              {/* Two lines on a phone, the full sentence from sm: up. */}
              <span className="sm:hidden">
                אני טל גורן. 25 שנה אני מלווה משפחות שבונות בית — עם תשובות ברורות על תקציב וזמנים.
              </span>
              <span className="hidden sm:inline">
                אני טל גורן. 25 שנה אני מלווה משפחות בדיוק בנקודה שאתם נמצאים בה עכשיו — עם מגרש, עם חלום, ועם
                המון שאלות פתוחות על כמה זה יעלה וכמה זמן זה ייקח.
              </span>
            </p>

            <div data-reveal className="flex flex-wrap items-center gap-3 sm:gap-3.5 mt-7 sm:mt-11">
              <WhatsAppLink
                placement="home_hero"
                message="היי טל, יש לי שאלה על תכנון בית פרטי — אפשר להתייעץ?"
                className="inline-flex items-center gap-3 bg-white text-primary px-6 sm:px-8 py-4 sm:py-5 font-headline font-bold text-base tracking-wide shadow-[0_18px_50px_rgba(0,0,0,0.28)] hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  chat
                </span>
                <span className="sm:hidden">לשאול שאלה בוואטסאפ</span>
                <span className="hidden sm:inline">לשאול אותי שאלה בוואטסאפ</span>
              </WhatsAppLink>
              <PhoneLink
                placement="home_hero"
                className="inline-flex items-center gap-3 border border-white/45 text-white px-5 sm:px-7 py-4 sm:py-5 font-headline text-base hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">call</span>
                <span>
                  <span className="hidden sm:inline">או פשוט תתקשרו · </span>
                  {PHONE_DISPLAY}
                </span>
              </PhoneLink>
            </div>
            <p data-reveal className="mt-3 sm:mt-4.5 font-label text-xs tracking-wide text-white/50">
              <span className="sm:hidden">שיחה ראשונה ללא עלות · בלי מכירות, בלי לחץ</span>
              <span className="hidden sm:inline">
                שיחה ראשונה ללא עלות · תשובה בדרך כלל באותו יום · בלי מכירות, בלי לחץ
              </span>
            </p>
          </div>
        </div>

        {/* Hidden on phones: it collided with the reassurance line, and a touch
            screen needs no hint that the page scrolls. */}
        <div className="absolute bottom-8 right-6 sm:right-10 z-10 hidden sm:flex items-center gap-3">
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-white/45">גלילה</span>
          <span className="block w-px h-[46px] bg-white/50 animate-scrollcue" />
        </div>
      </section>

      {/* ============ 2. TRUST STRIP ============ */}
      <section className="bg-surface border-b border-outline/40">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div data-reveal className="py-8 pe-7 flex flex-col gap-1.5">
              <span className="font-headline font-light text-[34px] text-primary leading-none">25+</span>
              <span className="font-label text-[11px] tracking-[0.18em] uppercase text-secondary">שנות ניסיון</span>
            </div>
            <div data-reveal className="py-8 px-7 sm:border-s border-outline/40 flex flex-col gap-1.5">
              <span className="font-headline font-light text-[34px] text-primary leading-none">100+</span>
              <span className="font-label text-[11px] tracking-[0.18em] uppercase text-secondary">בתים שתוכננו</span>
            </div>
            <div data-reveal className="py-8 px-7 lg:border-s border-outline/40 flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <span className="font-headline font-light text-[34px] text-primary leading-none">
                  {reviewsData.rating.toFixed(1)}
                </span>
                <StarRating rating={Math.round(reviewsData.rating)} className="w-[15px] h-[15px]" />
              </span>
              <span className="font-label text-[11px] tracking-[0.18em] uppercase text-secondary">
                דירוג לקוחות בגוגל
              </span>
            </div>
            <div data-reveal className="py-8 ps-7 sm:border-s border-outline/40 flex flex-col gap-1.5">
              <span className="font-headline font-light text-xl text-primary leading-snug">
                אדריכלית רשויה
                <br />
                ומורשית היתר
              </span>
              <span className="font-label text-[11px] tracking-[0.18em] uppercase text-secondary">
                רישיון 11085135 · בוגרת הטכניון
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. THE THREE FEARS ============ */}
      <section className="py-20 lg:py-32 bg-surface">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-14 lg:gap-[90px] items-start">
            <div data-reveal>
              <span className={EYEBROW}>בדרך כלל זה מתחיל כאן</span>
              <h2 className={SECTION_H2}>
                שלושה דברים
                <br />
                שלא נותנים לכם לישון.
              </h2>
              <p className="mt-7 font-body font-light text-[19px] leading-[1.8] text-secondary max-w-[420px] text-pretty">
                אחרי מאה בתים אני יכולה להגיד לכם בדיוק מה מטריד כל משפחה שנכנסת אליי למשרד. וגם — מה עושים עם
                זה. לא בסוף התהליך. בפגישה הראשונה.
              </p>
            </div>
            <div className="flex flex-col">
              {FEARS.map((f) => (
                <div
                  key={f.num}
                  data-reveal
                  className="grid grid-cols-[38px_1fr] sm:grid-cols-[54px_1fr] gap-5 sm:gap-6 py-9 border-t border-outline/55"
                >
                  <span className="font-label text-xs tracking-wider text-accent pt-2">{f.num}</span>
                  <div>
                    <h3 className="m-0 font-headline font-medium text-[22px] sm:text-[25px] text-primary leading-[1.35]">
                      {f.title}
                    </h3>
                    <p className="mt-3 font-body font-light text-[17px] leading-[1.8] text-secondary text-pretty">
                      {f.body}
                    </p>
                    <p className="mt-4 flex items-start gap-2.5 font-body font-semibold text-base leading-[1.7] text-primary">
                      <span className="material-symbols-outlined text-[19px] text-tertiary flex-shrink-0 mt-[3px]">
                        check
                      </span>
                      <span>{f.answer}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. COST CALCULATOR ============ */}
      <section
        id="calculator"
        className="py-20 lg:py-32 bg-surface-container border-y border-outline/50 scroll-mt-24"
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
          <div data-reveal className="text-center max-w-[700px] mx-auto mb-14">
            <span className={EYEBROW}>הצעד הראשון · בלי להשאיר פרטים</span>
            <h2 className={SECTION_H2}>
              כמה תעלה הבנייה
              <br />
              <span className="font-bold">על המגרש שלכם?</span>
            </h2>
            <p className="mt-6 font-body font-light text-[19px] leading-[1.8] text-secondary">
              הזיזו את המספרים ותקבלו טווח עלויות ריאלי לפי אזור, גודל ורמת גמר — אותו חישוב שאני עושה איתכם
              בפגישה הראשונה.
            </p>
          </div>
          <div data-reveal>
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* ============ 5. PROCESS ============ */}
      <section id="process" className="py-20 lg:py-32 bg-surface scroll-mt-24">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-10">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-x-16 gap-y-10 mb-16">
            <div className="max-w-[640px]">
              <span className={EYEBROW}>הדרך, שלב אחר שלב</span>
              <h2 className={SECTION_H2}>
                מהשיחה הראשונה
                <br />
                <span className="font-bold">ועד שאתם מקבלים מפתח.</span>
              </h2>
            </div>
            <p className="m-0 font-body font-light text-lg leading-[1.8] text-secondary max-w-[400px] text-pretty">
              אף אחד לא בונה בית פעמיים. לכן בכל שלב אתם יודעים מה קורה עכשיו, מה הצעד הבא, ומה נשאר לי לטפל בו
              בשבילכם.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-y-11">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                data-reveal
                className="relative pe-7 border-t-2"
                style={{ borderTopColor: i === 0 ? "#3B5566" : "rgba(194,205,210,0.8)" }}
              >
                <span
                  className="absolute -top-[7px] start-0 w-3 h-3 rounded-full"
                  style={{ background: i === 0 ? "#A96F57" : "#c2cdd2" }}
                />
                <div className="pt-9">
                  <span className="block font-label text-[11px] tracking-[0.2em] text-accent mb-3.5">
                    {s.num} · {s.duration}
                  </span>
                  <h3 className="m-0 font-headline font-medium text-[22px] text-primary leading-[1.3]">{s.title}</h3>
                  <p className="mt-3.5 font-body font-light text-base leading-[1.75] text-secondary text-pretty">
                    {s.body}
                  </p>
                  <p className="mt-4.5 font-label text-xs leading-relaxed text-tertiary">{s.yours}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="mt-16 bg-surface-container-low px-6 py-8 sm:px-12 sm:py-11 flex flex-wrap items-center justify-between gap-10"
          >
            <div className="flex items-center gap-6">
              <span className="material-symbols-outlined text-[34px] text-primary">schedule</span>
              <p className="m-0 font-body font-light text-lg sm:text-xl leading-relaxed text-primary max-w-[640px]">
                בסך הכול: <span className="font-bold">כשנה עד היתר, וכ-12–18 חודשי בנייה.</span> מי שיודע את זה
                מראש לא נלחץ באמצע.
              </p>
            </div>
            <WhatsAppLink
              placement="home_process"
              message="היי טל, אני רוצה להבין באיזה שלב בתהליך אני נמצא ומה הצעד הבא."
              className="flex-shrink-0 inline-flex items-center gap-2.5 bg-primary text-white px-7 py-4.5 font-headline font-medium text-[15px] hover:bg-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                chat
              </span>
              <span>לשאול איפה אני נמצא בתהליך</span>
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* ============ 6. ABOUT ============ */}
      <section id="about" className="bg-surface-container-low scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-stretch">
          <div className="relative w-full max-w-[400px] mx-auto aspect-[3/4] mt-14 lg:mt-0 lg:max-w-none lg:mx-0 lg:aspect-auto lg:min-h-[720px] overflow-hidden">
            <Image
              src="/images/tahl-portrait.jpg"
              alt="טל גורן, אדריכלית"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-top"
            />
            {/* Corner ticks — the drafting-frame motif used across the site. */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute top-10 left-10 w-11 h-px bg-white/70" />
              <span className="absolute top-10 left-10 w-px h-11 bg-white/70" />
              <span className="absolute bottom-10 right-10 w-11 h-px bg-white/70" />
              <span className="absolute bottom-10 right-10 w-px h-11 bg-white/70" />
            </div>
          </div>
          <div className="px-6 sm:px-10 lg:px-[90px] py-16 lg:py-32 flex flex-col justify-center">
            <div data-reveal className="max-w-[640px]">
              <span className={EYEBROW}>מי תלווה אתכם</span>
              <h2 className="m-0 font-headline font-extralight text-[34px] sm:text-[42px] lg:text-[54px] leading-[1.1] tracking-tight text-primary">
                נעים מאוד,
                <br />
                <span className="font-bold">אני טל.</span>
              </h2>
              <p className="mt-7 font-body font-light text-lg sm:text-xl leading-[1.85] text-secondary text-pretty">
                אדריכלית רשויה ומורשית היתר, בוגרת הטכניון בהצטיינות, ומעל 25 שנה מתכננת בתים פרטיים — ורק בתים
                פרטיים. בשרון הצפוני, ביישובי מנשה, בחוף הכרמל ובסביבה.
              </p>
              <p className="mt-5 font-body font-light text-lg sm:text-xl leading-[1.85] text-secondary text-pretty">
                המומחיות שלי היא &quot;בתים שגדלים עם המשפחה&quot;: תכנון גמיש, פרקטי וחסכוני, שמתאים לחיים שלכם
                גם בעוד עשר שנים. ואת כל הדרך — הוועדות, היועצים, הקבלן — אתם עוברים איתי, לא לבד.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-9">
                {CREDENTIALS.map((c) => (
                  <span
                    key={c}
                    className="font-label text-[11px] tracking-[0.14em] uppercase text-secondary border border-outline/90 px-4 py-2.5"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <WhatsAppLink
                  placement="home_about"
                  message="היי טל, קראתי עלייך באתר ואשמח להתייעץ אישית."
                  className="inline-flex items-center gap-2.5 bg-primary text-white px-7 py-4.5 font-headline font-medium text-[15px] hover:bg-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    chat
                  </span>
                  <span>להתייעץ איתי אישית</span>
                </WhatsAppLink>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 font-headline font-medium text-[15px] text-primary hover:text-secondary transition-colors"
                >
                  <span>קראו עוד עליי</span>
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                    arrow_back
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. PROJECTS ============ */}
      <section id="projects" className="py-20 lg:py-32 bg-surface scroll-mt-24">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-10">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8 mb-14">
            <div>
              <span className={EYEBROW}>בתים שכבר גרים בהם</span>
              <h2 className={SECTION_H2}>מהעשייה שלנו</h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-headline font-medium text-[15px] text-primary pb-2 border-b border-outline/90 hover:text-secondary transition-colors"
            >
              <span>לכל הפרויקטים</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {featuredProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                data-reveal
                className="group block relative overflow-hidden bg-surface-container"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="px-[26px] pt-[26px] pb-[30px]">
                  <span className="block font-label text-[11px] tracking-[0.2em] uppercase text-accent mb-3">
                    {p.location}
                  </span>
                  <h3 className="m-0 font-headline text-[21px] text-primary leading-[1.35]">{p.title}</h3>
                  <p className="mt-3 font-body font-light text-base leading-[1.7] text-secondary">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8. REVIEWS ============ */}
      <section id="reviews" className="py-20 lg:py-32 bg-surface-container border-t border-outline/50 scroll-mt-24">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-10">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8 mb-14">
            <div>
              <span className={EYEBROW}>
                {reviewsData.totalReviews} ביקורות · {reviewsData.rating.toFixed(1)} בגוגל
              </span>
              <h2 className={SECTION_H2}>
                מה אומרות המשפחות
                <br />
                <span className="font-bold">שכבר עברו את זה.</span>
              </h2>
            </div>
            <a
              href="https://maps.app.goo.gl/6hAN8p1iuDtFnb77A"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <Image src="/images/google-maps-logo.svg" alt="" width={40} height={40} className="w-10 h-10" />
              <span className="font-headline font-medium text-[15px] text-primary">לכל הביקורות בגוגל</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {homeReviews.map((r) => (
              <div
                key={r.name}
                data-reveal
                className="bg-surface border border-outline/55 px-8 py-9 flex flex-col gap-4.5"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-[42px] h-[42px] rounded-full text-white flex items-center justify-center font-label text-[17px] flex-shrink-0"
                    style={{ background: r.avatar }}
                    aria-hidden
                  >
                    {r.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 font-body font-semibold text-base text-primary">{r.name}</p>
                    {r.location && (
                      <p className="mt-0.5 mb-0 font-label text-[11px] tracking-wide text-secondary">{r.location}</p>
                    )}
                  </div>
                  <svg viewBox="0 0 48 48" className="w-[19px] h-[19px] flex-shrink-0" aria-hidden>
                    <path
                      fill="#FFC107"
                      d="M43.6 20.5H42V20H24v8h11.3C33.8 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                    />
                    <path
                      fill="#FF3D00"
                      d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C41 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"
                    />
                  </svg>
                </div>
                <StarRating rating={Math.round(r.rating)} className="w-[15px] h-[15px]" />
                <p className="m-0 font-body font-light text-[17px] leading-[1.8] text-secondary text-pretty">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-2 font-headline font-medium text-[15px] text-primary hover:text-secondary transition-colors"
            >
              <span>כל ההמלצות</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 9. FINAL CTA ============ */}
      <section className="relative py-24 lg:py-36 bg-primary overflow-hidden">
        {featuredProjects[0] && (
          <Image
            src={featuredProjects[0].image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            quality={70}
            className="object-cover opacity-[0.16]"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 sm:px-10 text-center">
          <span
            data-reveal
            className="block font-label text-[11px] tracking-[0.4em] uppercase text-white/50 mb-7"
          >
            הצעד הבא הוא שיחה. זה הכול.
          </span>
          <h2
            data-reveal
            className="m-0 font-headline font-extralight text-[34px] sm:text-[44px] lg:text-[58px] leading-[1.12] tracking-tight text-white"
          >
            בואו נדבר על המגרש שלכם
            <br />
            <span className="font-bold">לפני שאתם מחליטים משהו.</span>
          </h2>
          <p
            data-reveal
            className="mt-7 mx-auto font-body font-light text-lg sm:text-xl leading-[1.8] text-white/75 max-w-[620px] text-pretty"
          >
            שיחה קצרה, ללא עלות וללא התחייבות. תספרו לי מה יש לכם ביד, ואני אגיד לכם בכתב מה אפשרי, מה זה עולה
            בגדול, וכמה זמן זה לוקח.
          </p>
          <div data-reveal className="flex flex-wrap items-center justify-center gap-3.5 mt-11">
            <WhatsAppLink
              placement="home_final_cta"
              message="היי טל, אשמח לשיחה קצרה על המגרש שלנו."
              className="inline-flex items-center gap-3 bg-white text-primary px-9 py-5 font-headline font-bold text-[17px] hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                chat
              </span>
              <span>לפתוח שיחה בוואטסאפ</span>
            </WhatsAppLink>
            <PhoneLink
              placement="home_final_cta"
              className="inline-flex items-center gap-3 border border-white/45 text-white px-8 py-5 font-headline text-[17px] hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">call</span>
              <span>{PHONE_DISPLAY}</span>
            </PhoneLink>
          </div>
          <p data-reveal className="mt-5 font-label text-xs tracking-wide text-white/45">
            טל גורן · אדריכלית רשויה ומורשית היתר · רחוב האלה 22, גבעת עדה
          </p>
        </div>
      </section>

      <StickyDock />
    </>
  );
}
