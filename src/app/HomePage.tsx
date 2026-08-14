"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import GoogleReviews from '@/components/GoogleReviewsLazy';
import StarRating from '@/components/StarRating';
import type { SiteReviews } from '@/lib/reviews';
import HomeCtaForm from '@/components/HomeCtaForm';
import FaqAccordion from '@/components/FaqAccordion';
import Reveal from '@/components/motion/Reveal';
import { Section, SectionHeading, ArrowLink, ButtonLink } from '@/components/ui/Section';
import { SealIcon, BudgetIcon, PlanIcon, ArrowIcon, CompassIcon } from '@/components/ui/Icon';
import { aboutExcerpt } from '@/data/siteData';
import { packages as homePackages } from '@/data/packagesContent';

/* ---------------------------------------------------------------------------
   Homepage.

   Rebuilt around one rule: a screen carries one idea, and wherever a graphic
   can say the thing, the text steps back to a caption. The previous version ran
   thirteen sections in the same shape — centred eyebrow, centred black 6xl
   headline, centred paragraph, button — including five separate lead-capture
   interruptions. Nothing could be emphasised because everything already was.

   The order below is an argument, not a list: promise (hero) → credentials in
   one line (ribbon) → proof by showing the work (01) → who she is (02) → how
   the process actually runs (03) → the three fears answered (04) → a pause to
   make contact → what it costs (05) → what clients say (06) → what she knows
   (07) → open questions (08) → the ask.
--------------------------------------------------------------------------- */

const heroVideos = ['/videos/hero-1.mp4', '/videos/hero-2.mp4', '/videos/hero-3.mp4'];

const HERO_LOGO_ID = 'site-logo-hero';
const NAV_LOGO_ID = 'site-logo-navbar';
const DOCK_SCROLL_THRESHOLD = 20;

type LogoRect = { top: number; left: number; width: number; height: number };

function readRect(el: Element | null): LogoRect | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

// The navbar's own logo shrinks (h-12/h-16 -> h-9/h-10) via a separate
// component's scroll listener, which commits a frame or two after ours.
// Poll until that class swap has actually landed before trusting its rect,
// instead of guessing a fixed delay (which would read a stale size and
// make the clone "jump-correct" partway through the flight).
function waitForDockedNavRect(onReady: (rect: LogoRect | null) => void, attempt = 0) {
  const el = document.getElementById(NAV_LOGO_ID);
  const isDockedSize = !!el && (el.className.includes('h-9') || el.className.includes('h-10'));
  if (isDockedSize || attempt > 15) {
    onReady(readRect(el));
    return;
  }
  requestAnimationFrame(() => waitForDockedNavRect(onReady, attempt + 1));
}

const featuredArticles = [
  { slug: "building-cost-total", title: "כמה תעלה לנו הבנייה בסך הכל?", image: "/images/blog/building-cost-total.png", excerpt: "המדריך המלא להכנת תקציב ריאלי לבניית בית פרטי בישראל." },
  { slug: "choose-architect", title: "איך בוחרים אדריכלית לבניית בית פרטי?", image: "/images/blog/choose-architect.png", excerpt: "מה באמת חשוב לבדוק לפני שבוחרים את מי שיוביל את הפרויקט." },
  { slug: "building-timeline", title: "כמה זמן ייקח לתכנן ולבנות בית?", image: "/images/blog/building-timeline.png", excerpt: "שלב אחרי שלב, עם לוחות זמנים ריאליים והגורמים שמשפיעים עליהם." },
];

// The facts that answer "can I trust her" — stated once, in one line, instead
// of being repeated inside four different sections.
const trustFacts = [
  { value: '25+', label: 'שנות ניסיון' },
  { value: '100+', label: 'בתים שתוכננו' },
  { value: 'הטכניון', label: 'בוגרת בהצטיינות' },
  { value: 'מורשית היתר', label: 'אדריכלית רשויה' },
];

/**
 * The stages, taken verbatim from the scope line shared by all three packages:
 * "בירורים מקדימים, תכנון מוקדם, רישוי מלא, תכניות עבודה מפורטות 1:50,
 *  כתב כמויות וייעוץ חומרי גמר, וליווי לתעודת גמר".
 * Drawn as a dimension line, because that is what this list is.
 */
const processSteps = [
  { n: '01', title: 'בירורים מקדימים', text: 'בדיקת המגרש, זכויות הבנייה והמגבלות התכנוניות — לפני שמשרטטים קו אחד.' },
  { n: '02', title: 'תכנון מוקדם', text: 'מהצרכים של המשפחה לתכנית: העמדה, חלוקת החללים והאופי של הבית.' },
  { n: '03', title: 'רישוי מלא', text: 'הגשה לוועדה, מול היועצים והרשויות, עד קבלת היתר הבנייה ביד.' },
  { n: '04', title: 'תכניות עבודה 1:50', text: 'תכניות מפורטות לביצוע, כתב כמויות וייעוץ בבחירת חומרי הגמר.' },
  { n: '05', title: 'ליווי עד תעודת גמר', text: 'פיקוח עליון באתר לאורך הבנייה, עד שהבית מוכן ואתם נכנסים.' },
];

const values = [
  {
    Icon: SealIcon,
    title: 'מומחיות מוכחת',
    text: 'למעלה מ-25 שנות ניסיון בתכנון בתים פרטיים, שיפוצים והרחבות. כל פרויקט מקבל את מלוא תשומת הלב והמקצועיות.',
  },
  {
    Icon: BudgetIcon,
    title: 'שליטה מלאה בתקציב',
    text: 'אני מכירה את החשש מ"בור" תקציבי ללא תחתית. לכן אני בונה איתכם תקציב ריאלי כבר בפגישה הראשונה, ודואגת שהחלטות תכנוניות לא יהפכו בהמשך לחריגות יקרות.',
  },
  {
    Icon: PlanIcon,
    title: 'ליווי אישי לאורך כל הדרך',
    text: 'מהפגישה הראשונה ועד הכניסה הביתה — כולל מול הבירוקרטיה שמלחיצה הכי הרבה. תמיד זמינה, תמיד עם תשובה.',
  },
];

type Props = {
  projects: any[];
  faqItems: any[];
  reviewsData: SiteReviews;
};

export default function HomePage({ projects, reviewsData }: Props) {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // 3s was quick enough to register as a slideshow. 7s lets a shot settle,
    // so the hero reads as film rather than as a rotating banner.
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % heroVideos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    const nextIndex = (activeVideo + 1) % heroVideos.length;
    const nextVideo = videoRefs.current[nextIndex];
    if (nextVideo && nextVideo.preload === 'none') {
      nextVideo.preload = 'auto';
      nextVideo.load();
    }
  }, [activeVideo]);

  // Logo dock: the monochrome hero logo "flies" up into the navbar's logo
  // slot and turns to full color the moment the user scrolls past the hero.
  const [docked, setDocked] = useState(false);
  const [heroRect, setHeroRect] = useState<LogoRect | null>(null);
  const [navRect, setNavRect] = useState<LogoRect | null>(null);
  const [transitionsReady, setTransitionsReady] = useState(false);
  const dockedRef = useRef(false);

  useEffect(() => {
    // Measuring a DOM rect right after mount (to seed the fixed clone's
    // starting position) has to happen in an effect: it needs the real
    // client-rendered layout, which doesn't exist during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeroRect(readRect(document.getElementById(HERO_LOGO_ID)));

    const initialDocked = window.scrollY > DOCK_SCROLL_THRESHOLD;
    dockedRef.current = initialDocked;
    setDocked(initialDocked);
    if (initialDocked) {
      waitForDockedNavRect(setNavRect);
    }

    // Skip the initial mount transition so the logo doesn't animate in from
    // nowhere on first paint — only actual scroll crossings should animate.
    const readyFrame = requestAnimationFrame(() => setTransitionsReady(true));

    const handleScroll = () => {
      const nowDocked = window.scrollY > DOCK_SCROLL_THRESHOLD;
      if (nowDocked !== dockedRef.current) {
        dockedRef.current = nowDocked;
        setDocked(nowDocked);
        if (nowDocked) {
          waitForDockedNavRect(setNavRect);
        } else {
          setHeroRect(readRect(document.getElementById(HERO_LOGO_ID)));
        }
      }
    };
    const handleResize = () => {
      if (!dockedRef.current) {
        setHeroRect(readRect(document.getElementById(HERO_LOGO_ID)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(readyFrame);
    };
  }, []);

  const activeLogoRect = docked ? navRect ?? heroRect : heroRect ?? navRect;

  const [lead, ...restProjects] = projects.slice(0, 6);

  return (
    <>
      {/* Flying logo clone: docks white-in-hero -> colored-in-navbar on scroll */}
      {activeLogoRect && (
        <div
          id="hero-logo-clone"
          aria-hidden
          className="fixed z-[60] pointer-events-none top-0 left-0"
          style={{
            width: activeLogoRect.width,
            height: activeLogoRect.height,
            transform: `translate3d(${activeLogoRect.left}px, ${activeLogoRect.top}px, 0)`,
            filter: docked ? 'none' : 'brightness(0) invert(1)',
            transition: transitionsReady
              ? 'transform 480ms cubic-bezier(0.16,1,0.3,1), width 480ms cubic-bezier(0.16,1,0.3,1), height 480ms cubic-bezier(0.16,1,0.3,1), filter 320ms ease 80ms'
              : 'none',
          }}
        >
          <Image
            src="/images/logo-v2.png"
            alt=""
            width={280}
            height={94}
            className="w-full h-full object-contain drop-shadow-lg"
            priority
          />
        </div>
      )}

      {/* ================= HERO =================
          One promise, one action. The credential list that used to crowd the
          hero moved to the ribbon directly below, where it can be read rather
          than skimmed past. The scrim is a bottom-weighted gradient instead of
          a flat 40% black wash, so the footage stays bright where it matters
          and goes dark only under the type. */}
      <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden -mt-20 sm:-mt-24">
        {heroVideos.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={src}
            muted
            loop
            playsInline
            autoPlay
            preload={i === 0 ? 'auto' : 'none'}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-in-out"
            style={{ opacity: activeVideo === i ? 1 : 0 }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,30,37,0.55) 0%, rgba(20,30,37,0.20) 35%, rgba(20,30,37,0.45) 72%, rgba(20,30,37,0.85) 100%)',
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="sr-only">טל גורן אדריכלית</h1>

          <div className="w-[230px] sm:w-[310px] lg:w-[400px]">
            <Image
              id={HERO_LOGO_ID}
              src="/images/logo-v2.png"
              alt=""
              width={280}
              height={94}
              className="w-full h-auto object-contain opacity-0"
              priority
            />
          </div>

          <p className="mt-8 font-headline font-bold text-white text-xl sm:text-2xl lg:text-[1.9rem] tracking-tight leading-snug max-w-2xl">
            ליווי מקצועי ואישי לחוויית בנייה רגועה
          </p>
          <p className="mt-3 font-body text-white/70 text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed">
            תכנון אדריכלי חכם לבית שגדל עם המשפחה
          </p>

          <div className="mt-11 flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            <ButtonLink href="/contact" variant="paper">
              שיחת ייעוץ ללא עלות
            </ButtonLink>
            <ArrowLink href="/projects" tone="paper" className="text-[13px] uppercase tracking-[0.18em]">
              לצפייה בפרויקטים
            </ArrowLink>
          </div>
        </div>

        {/* Scroll cue: a hairline that fills downward on a slow loop — the same
            drawn-line language used for section rules. */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
          <span className="font-label text-[9px] tracking-[0.35em] uppercase text-white/45">גלילה</span>
          <span className="relative block w-px h-10 bg-white/20 overflow-hidden">
            <span className="scroll-cue-fill absolute inset-x-0 top-0 h-1/2 bg-white/70" />
          </span>
        </div>

        {/* Chapter markers for the background films */}
        <div className="absolute bottom-9 right-6 sm:right-10 flex gap-3">
          {heroVideos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveVideo(i)}
              aria-label={`מעבר לוידאו רקע ${i + 1}`}
              aria-current={activeVideo === i}
              className={`h-px transition-all duration-700 ${
                activeVideo === i ? 'w-10 bg-white' : 'w-5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= TRUST RIBBON =================
          Four facts, one hairline row. This is the entire "credentials" story
          that used to be scattered across the hero, the about block and every
          form footer. */}
      <section className="bg-background border-b border-hairline">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12">
          <Reveal className="grid grid-cols-2 lg:grid-cols-4">
            {trustFacts.map((f, i) => (
              <div
                key={f.label}
                className={`py-8 sm:py-10 px-4 sm:px-8 text-center border-hairline ${
                  // Hairlines between cells only — never on the outer edges, so
                  // the ribbon reads as one measured run rather than four boxes.
                  i % 2 === 1 ? 'border-s' : ''
                } ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i === 2 ? 'lg:border-s' : ''}`}
              >
                <span className="font-headline font-black text-2xl sm:text-[2rem] text-primary block leading-none">
                  {f.value}
                </span>
                <span className="font-label text-[10px] uppercase tracking-[0.22em] text-ink-mute mt-3 block">
                  {f.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= 01 · SELECTED WORK =================
          Moved to the top of the page: for an architect the work is the pitch,
          and it makes the argument faster than any paragraph can. Laid out as
          an editorial plate section — one lead image at scale, then supporting
          plates — rather than four equal tiles, the last of which used to be a
          blurred teaser card the visitor could not open. */}
      <Section tone="paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 items-end mb-14 lg:mb-20">
          <SectionHeading
            className="lg:col-span-7"
            index="01"
            eyebrow="פרויקטים נבחרים"
            size="lg"
            title={<>בתים שכבר<br />עומדים</>}
          />
          <Reveal delay={140} className="lg:col-span-5 lg:pb-3">
            <p className="font-body text-lg text-secondary leading-relaxed measure">
              כל בית כאן התחיל בשיחה על מגרש ומשפחה, ונגמר במפתח ביד. זה המקום
              הכי כן להתרשם מהעבודה — לפני שקוראים מילה אחת עליי.
            </p>
            <div className="mt-7">
              <ArrowLink href="/projects">לכל הפרויקטים</ArrowLink>
            </div>
          </Reveal>
        </div>

        {lead && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <ProjectCard project={lead} size="lg" priority />
            </Reveal>
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-10">
              {restProjects.slice(0, 2).map((project: any, i: number) => (
                <Reveal key={project.id} delay={120 + i * 100}>
                  <ProjectCard project={project} size="sm" showTeaser={false} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {restProjects.length > 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-8 lg:mt-10">
            {restProjects.slice(2, 5).map((project: any, i: number) => (
              <Reveal key={project.id} delay={i * 90}>
                <ProjectCard project={project} size="md" showTeaser={false} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* ================= 02 · ABOUT ================= */}
      <Section tone="sand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          <Reveal className="lg:col-span-5">
            {/* The portrait sits in a plain frame with a single clay rule
                beneath it — the ornamental corner-ticks that used to surround
                it competed with the face for attention. */}
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="aspect-[3/4] relative overflow-hidden bg-surface-container">
                <Image
                  src="/images/tahl-portrait.jpg"
                  alt="טל גורן אדריכלית"
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover object-top img-settle"
                />
              </div>
              <div className="h-px w-24 bg-clay mt-6 rule-draw" />
              <span className="font-label text-[10px] uppercase tracking-[0.25em] text-ink-mute mt-4 block">
                טל גורן · אדריכלית רשויה ומורשית היתר
              </span>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading
              index="02"
              eyebrow="אודות"
              size="lg"
              title={<>נעים מאוד,<br />אני טל.</>}
            />
            <Reveal delay={120}>
              <p className="font-body text-lg text-secondary leading-[1.85] mt-8 measure">
                {aboutExcerpt}
              </p>
              <div className="flex flex-wrap gap-2.5 mt-9">
                {['תכנון בתים פרטיים', 'רישוי והיתרי בנייה', 'עיצוב פנים', 'ליווי בביצוע'].map((b) => (
                  <span
                    key={b}
                    className="font-label text-[10px] uppercase tracking-[0.16em] text-secondary border border-hairline px-3.5 py-2"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-9">
                <ArrowLink href="/about">קראו עוד עליי</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ================= 03 · PROCESS =================
          New. The site promised "ליווי" on every screen but never showed what
          that actually consists of — the single most common thing a family
          wants to know before making contact. Drawn as a dimension line, the
          notation an architect already uses to describe a sequence. */}
      <Section tone="paper">
        <SectionHeading
          index="03"
          eyebrow="איך זה עובד"
          size="lg"
          title={<>הדרך מהמגרש<br />אל המפתח</>}
          lede="חמישה שלבים, כולם כלולים בכל אחד מהמסלולים. אתם תמיד יודעים באיזה שלב אנחנו, מה קורה עכשיו ומה הדבר הבא."
          className="mb-16 lg:mb-24"
        />

        <Reveal className="relative">
          {/* The dimension line itself: a hairline with a tick above each stage,
              exactly as a run of measurements is drawn on a plan. On narrow
              screens it rotates to a vertical rule down the reading edge. */}
          {/* Horizontal on desktop, vertical down the reading edge on mobile.
              Each stage hangs a tick off the line at its own position. */}
          {/* Runs from the first tick to the last and stops there, the way a
              dimension line terminates at its witness lines — a full-width rule
              would trail off past the end of the sequence. */}
          <div className="hidden lg:block absolute top-[6px] start-0 w-4/5 h-px bg-hairline rule-draw" />
          <div className="lg:hidden absolute top-1.5 bottom-8 start-[6px] w-px bg-hairline" />

          <ol className="grid grid-cols-1 lg:grid-cols-5 gap-y-11 gap-x-8">
            {processSteps.map((s) => (
              <li key={s.n} className="relative ps-10 lg:ps-0 lg:pt-10">
                <span
                  aria-hidden
                  className="absolute top-0 start-0 w-[13px] h-[13px] rounded-full border border-clay bg-background"
                />
                <span className="font-label text-[11px] tracking-[0.22em] text-clay block mb-2.5">
                  {s.n}
                </span>
                <h3 className="font-headline font-bold text-lg text-primary leading-snug">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-secondary leading-relaxed mt-2.5">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* ================= 04 · WHY =================
          The three real fears — is she good, will it blow the budget, will I be
          left alone with the bureaucracy — answered next to a working photo. */}
      <Section tone="sand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          <Reveal className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden bg-surface-container">
              <Image
                src="/images/tahl-goren-first-meeting.jpeg"
                alt="טל גורן אדריכלית בפגישת תכנון"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center img-settle"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <SectionHeading
              index="04"
              eyebrow="למה איתי"
              size="lg"
              title={<>שקט נפשי,<br />לא רק תוכנית</>}
            />
            <div className="mt-12 space-y-11">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 110}>
                  <div className="flex gap-6 items-start">
                    <v.Icon size={30} className="text-clay mt-1 flex-shrink-0" strokeWidth={1} />
                    <div>
                      <h3 className="font-headline font-bold text-lg text-primary">{v.title}</h3>
                      <p className="font-body text-[15px] text-secondary leading-relaxed mt-2 measure">
                        {v.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ================= PAUSE · CONTACT ================= */}
      <HomeCtaForm
        eyebrow="בואו נדבר"
        heading="מתכננים לבנות את הבית הבא שלכם?"
        placement="home_cta_mid"
      />

      {/* ================= 05 · PACKAGES ================= */}
      <Section tone="paper">
        <SectionHeading
          index="05"
          eyebrow="מסלולי ליווי"
          size="lg"
          title="שלושה מסלולים, מחיר גלוי"
          lede="ההבדל בין המסלולים הוא כמה מעיצוב הפנים אני לוקחת על עצמי. האדריכלות, הרישוי והליווי עד תעודת גמר כלולים בכולם."
          className="mb-14 lg:mb-20"
        />

        {/* Cheapest first, matching /services — the eye climbs the price ladder
            rather than being met by the largest number. The cards are separated
            by hairlines (a 1px grid gap over an ink-tinted ground) instead of
            being three floating boxes with their own borders and shadows. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {[...homePackages].reverse().map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 100} className="bg-surface">
              <Link
                href="/packages"
                className="group flex flex-col h-full p-8 lg:p-10 transition-colors duration-500 hover:bg-surface-container-low"
              >
                <div className="min-h-[1.75rem]">
                  {pkg.recommended && (
                    <span className="font-label text-[9px] uppercase tracking-[0.2em] text-clay border border-clay/40 px-2.5 py-1">
                      הבחירה המומלצת
                    </span>
                  )}
                </div>

                <h3 className="font-headline font-black text-xl text-primary leading-tight mt-6">
                  {pkg.name}
                </h3>
                <p className="font-body text-[15px] text-secondary leading-relaxed mt-3">
                  {pkg.subtitle}
                </p>
                <p className="font-body text-sm text-ink-mute leading-relaxed mt-4 flex-1 line-clamp-4">
                  {pkg.forWhom}
                </p>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-ink-mute block mb-2">
                    מחיר, לפני מע&quot;מ
                  </span>
                  <span className="font-headline font-black text-3xl text-primary block">
                    {pkg.price.toLocaleString('he-IL')} ₪
                  </span>
                  <div className="flex items-center gap-2 font-headline font-bold text-[13px] text-primary group-hover:text-clay transition-colors mt-6">
                    <span className="link-quiet">לפרטים המלאים</span>
                    <ArrowIcon size={16} className="transition-transform duration-500 group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================= 06 · REVIEWS ================= */}
      <Section tone="sand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14 lg:mb-16">
          <SectionHeading
            className="lg:col-span-7"
            index="06"
            eyebrow="לקוחות מספרים"
            size="lg"
            title="מה אומרים עליי"
          />
          <Reveal delay={120} className="lg:col-span-5 lg:pb-2">
            <div className="flex items-center gap-3" dir="rtl">
              <span className="font-headline font-black text-3xl text-primary leading-none">
                {reviewsData.rating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(reviewsData.rating)} className="w-5 h-5" />
            </div>
            <p className="font-body text-sm text-secondary mt-3">
              מבוסס על {reviewsData.totalReviews} ביקורות אמיתיות ב־Google
            </p>
            <div className="mt-6">
              <ArrowLink href="/testimonials">כל ההמלצות</ArrowLink>
            </div>
          </Reveal>
        </div>
        <GoogleReviews reviews={reviewsData.reviews} />
      </Section>

      {/* ================= 07 · WRITING ================= */}
      <Section tone="paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14 lg:mb-16">
          <SectionHeading
            className="lg:col-span-7"
            index="07"
            eyebrow="מאמרים ומדריכים"
            size="lg"
            title="ידע שחוסך לכם כסף"
          />
          <Reveal delay={120} className="lg:col-span-5 lg:pb-2">
            <p className="font-body text-lg text-secondary leading-relaxed measure">
              רוב הטעויות היקרות בבנייה נעשות לפני שהאדריכלית בכלל נכנסת לתמונה.
              כתבתי את המדריכים האלה כדי שתגיעו מוכנים.
            </p>
            <div className="mt-6">
              <ArrowLink href="/articles">לכל המאמרים</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredArticles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 100}>
              <Link href={`/articles/${article.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover img-grayscale"
                    loading="lazy"
                  />
                </div>
                <div className="pt-5 mt-5 border-t border-hairline">
                  <h3 className="font-headline font-bold text-lg text-primary leading-snug transition-colors duration-300 group-hover:text-clay">
                    {article.title}
                  </h3>
                  <p className="font-body text-[15px] text-secondary leading-relaxed mt-3">
                    {article.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 font-headline font-bold text-[13px] text-primary group-hover:text-clay transition-colors mt-5">
                    <span className="link-quiet">לקריאה</span>
                    <ArrowIcon size={16} className="transition-transform duration-500 group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Lead magnet, folded down from a full section into one hairline row —
            it is a useful offer, not a chapter of the story. */}
        <Reveal className="mt-20 lg:mt-24">
          <div className="border-y border-hairline py-9 flex flex-col md:flex-row md:items-center gap-7 md:gap-10">
            <CompassIcon size={34} className="text-clay flex-shrink-0" strokeWidth={1} />
            <div className="flex-1">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-ink-mute">
                מתנה ממני
              </span>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-primary mt-2 leading-snug">
                צ&apos;ק-ליסט חינמי: מה בודקים במגרש לפני שבונים
              </h3>
              <p className="font-body text-[15px] text-secondary mt-2 measure">
                12 נקודות מפתח שיחסכו לכם טעויות יקרות — עוד לפני שקבעתם פגישה.
              </p>
            </div>
            <div className="flex-shrink-0">
              <ButtonLink href="/resources/plot-checklist" variant="outline">
                לצ&apos;ק-ליסט
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ================= 08 · FAQ ================= */}
      <Section tone="sand" width="text">
        <SectionHeading
          index="08"
          eyebrow="שאלות נפוצות"
          size="lg"
          title="מה שכולם שואלים"
          lede="השאלות שחוזרות כמעט בכל פגישת היכרות. לחצו על שאלה לתשובה מלאה."
          className="mb-14"
        />

        <Reveal>
          <FaqAccordion limit={6} />
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
          <ArrowLink href="/faq">לכל השאלות</ArrowLink>
          <ArrowLink href="/articles" tone="clay">למאמרים המלאים</ArrowLink>
        </Reveal>
      </Section>

      {/* ================= THE ASK ================= */}
      <HomeCtaForm
        eyebrow="הצעד הראשון"
        heading="הבית הבא שלכם מתחיל בשיחה"
        placement="home_cta_bottom"
        showDirect
      />
    </>
  );
}
