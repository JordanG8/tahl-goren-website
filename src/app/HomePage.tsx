"use client";
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import GoogleReviews from '@/components/GoogleReviewsLazy';
import StarRating from '@/components/StarRating';
import type { SiteReviews } from '@/lib/reviews';
import HomeCtaForm from '@/components/HomeCtaForm';
import HeroShowcase from '@/components/home/HeroShowcase';
import FaqAccordion from '@/components/FaqAccordion';
import Reveal from '@/components/motion/Reveal';
import { Section, SectionHeading, ArrowLink, ButtonLink } from '@/components/ui/Section';
import { SealIcon, BudgetIcon, PlanIcon, ArrowIcon, CompassIcon, ChatIcon, PhoneIcon } from '@/components/ui/Icon';
import { aboutExcerpt } from '@/data/siteData';
import { heroSlides } from '@/data/heroSlides';
import { trackLead } from '@/lib/trackLead';

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

const featuredArticles = [
  { slug: "building-cost-total", title: "כמה תעלה לנו הבנייה בסך הכל?", image: "/images/blog/building-cost-total.png", excerpt: "המדריך המלא להכנת תקציב ריאלי לבניית בית פרטי בישראל." },
  { slug: "choose-architect", title: "איך בוחרים אדריכלית לבניית בית פרטי?", image: "/images/blog/choose-architect.png", excerpt: "מה באמת חשוב לבדוק לפני שבוחרים את מי שיוביל את הפרויקט." },
  { slug: "building-timeline", title: "כמה זמן ייקח לתכנן ולבנות בית?", image: "/images/blog/building-timeline.png", excerpt: "שלב אחרי שלב, עם לוחות זמנים ריאליים והגורמים שמשפיעים עליהם." },
];

/**
 * The facts that answer "can I trust her", stated once.
 *
 * This was four cells, each pairing a big number with a 10px caption in
 * wide-tracked caps. The captions carried the actual meaning and were the least
 * readable thing on the page. It is now one sentence at reading size, with only
 * the figures emphasised — the same information, said out loud instead of
 * arranged into a dashboard.
 */
const trustFacts = [
  { value: '25+', label: 'שנות ניסיון' },
  { value: '100+', label: 'בתים פרטיים שתוכננו' },
  { value: null, label: 'בוגרת הטכניון בהצטיינות' },
  { value: null, label: 'אדריכלית רשויה ומורשית היתר' },
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
  const [lead, ...restProjects] = projects.slice(0, 6);

  return (
    <>
      {/* ================= HERO =================
          The lead-generation hero: photography at full bleed, the promise set
          on the reading edge, and the two things a visitor actually wants to do
          from here — ask a question, or call. The credit chip in the corner
          links to whichever house is currently on screen. */}
      <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-primary -mt-20 sm:-mt-24">
        <HeroShowcase slides={heroSlides} />

        {/* On tall phones dead-centering leaves the block floating; the top
            padding shifts it down by half its value. Narrow-and-tall only, so
            small phones and every desktop size stay centred. */}
        <div className="relative z-10 h-full max-w-[1680px] mx-auto px-6 sm:px-10 flex flex-col justify-center [@media(max-width:639px)_and_(min-height:750px)]:pt-16">
          <div className="max-w-[780px]">
            {/* The regions are dropped below sm: at full tracking the line wraps
                and shoves the eyebrow into the navbar on a 375px screen. */}
            <span className="block font-label font-medium text-[13px] tracking-[0.16em] sm:tracking-[0.3em] uppercase text-white/70 mb-4 sm:mb-7">
              אדריכלות לבתים פרטיים
              <span className="hidden sm:inline"> · שרון, מנשה וחוף הכרמל</span>
            </span>

            <h1
              className="m-0 font-headline font-light text-[42px] sm:text-[56px] lg:text-[74px] leading-[1.06] tracking-[-0.03em] text-white"
              style={{ textShadow: "0 2px 30px rgba(20,30,36,0.45)" }}
            >
              לבנות בית
              <br />
              <span className="font-bold">בלי לאבד שליטה.</span>
            </h1>

            <p className="mt-5 sm:mt-7 font-body font-light text-lg sm:text-[22px] leading-[1.7] text-white/85 max-w-[560px] text-pretty">
              {/* Two lines on a phone, the full sentence from sm: up. The dash is
                  glued to the preceding word with an NBSP so it can never wrap to
                  the start of the next line. */}
              <span className="sm:hidden">
                אני טל גורן. 25 שנה אני מלווה משפחות שבונות בית{"\u00A0"}— עם תשובות ברורות על תקציב וזמנים.
              </span>
              <span className="hidden sm:inline">
                אני טל גורן. 25 שנה אני מלווה משפחות בדיוק בנקודה שאתם נמצאים בה עכשיו{"\u00A0"}— עם מגרש, עם
                חלום, ועם המון שאלות פתוחות על כמה זה יעלה וכמה זמן זה ייקח.
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mt-7 sm:mt-11">
              <a
                href="https://wa.me/972528345799?text=%D7%94%D7%99%D7%99%20%D7%98%D7%9C%2C%20%D7%99%D7%A9%20%D7%9C%D7%99%20%D7%A9%D7%90%D7%9C%D7%94%20%D7%A2%D7%9C%20%D7%AA%D7%9B%D7%A0%D7%95%D7%9F%20%D7%91%D7%99%D7%AA%20%D7%A4%D7%A8%D7%98%D7%99%20%E2%80%94%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%9C%D7%94%D7%AA%D7%99%D7%99%D7%A2%D7%A5%3F"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLead("whatsapp", { placement: "home_hero" })}
                className="inline-flex items-center gap-3 bg-white text-primary px-6 sm:px-8 py-4 sm:py-5 font-headline font-bold text-base tracking-wide shadow-[0_18px_50px_rgba(0,0,0,0.28)] hover:bg-surface-container-highest transition-colors"
              >
                <ChatIcon size={21} />
                <span className="sm:hidden">לשאול שאלה בוואטסאפ</span>
                <span className="hidden sm:inline">לשאול אותי שאלה בוואטסאפ</span>
              </a>
              <a
                href="tel:0528345799"
                onClick={() => trackLead("phone", { placement: "home_hero" })}
                className="inline-flex items-center gap-3 border border-white/45 text-white px-5 sm:px-7 py-4 sm:py-5 font-headline text-base hover:bg-white/10 transition-colors"
              >
                <PhoneIcon size={19} />
                <span>
                  <span className="hidden sm:inline">או פשוט תתקשרו · </span>
                  052-8345799
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Hidden on phones: a touch screen needs no hint that the page scrolls. */}
        <div className="absolute bottom-8 right-6 sm:right-10 z-10 hidden sm:flex items-center gap-3">
          <span className="font-label font-medium text-[13px] tracking-[0.18em] uppercase text-white/55">גלילה</span>
          <span className="relative block w-px h-[46px] bg-white/25 overflow-hidden">
            <span className="scroll-cue-fill absolute inset-x-0 top-0 h-1/2 bg-white/80" />
          </span>
        </div>
      </section>

      {/* ================= TRUST RIBBON =================
          One sentence, at reading size. See the note on `trustFacts`. */}
      <section className="bg-background border-b border-hairline">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-9 sm:py-11">
          <Reveal>
            <p className="font-headline text-xl sm:text-2xl lg:text-[1.7rem] text-secondary leading-[1.6] text-center">
              {trustFacts.map((f, i) => (
                <span key={f.label} className="inline-block">
                  {i > 0 && <span aria-hidden className="text-hairline mx-3 sm:mx-4">·</span>}
                  {f.value && <span className="font-black text-primary">{f.value} </span>}
                  <span className={f.value ? '' : 'font-bold text-primary'}>{f.label}</span>
                </span>
              ))}
            </p>
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
              <span className="font-label font-medium text-[13px] uppercase tracking-[0.17em] text-ink-mute mt-4 block">
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
                    className="font-label font-medium text-[13px] uppercase tracking-[0.12em] text-secondary border border-hairline px-3.5 py-2"
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
                <span className="font-label font-medium text-[13px] tracking-[0.15em] text-clay block mb-2.5">
                  {s.n}
                </span>
                <h3 className="font-headline font-bold text-lg text-primary leading-snug">
                  {s.title}
                </h3>
                <p className="font-body text-base text-secondary leading-relaxed mt-2.5">
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
                      <p className="font-body text-base text-secondary leading-relaxed mt-2 measure">
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

      {/* ================= 05 · THE COST CALCULATOR =================
          This slot used to be the price list: three cards, three numbers, on
          the homepage of an architect people have not met yet. A price with no
          context is the fastest way to lose someone who would have been a good
          fit — it invites a comparison against a number they have in their head
          rather than against what they actually want to build.

          The prices have not been hidden: /packages and /services still publish
          all three tracks in full. What sits here now is the question the
          visitor actually arrived with, and the tool that answers it on the
          spot — no questionnaire, no waiting on an email. */}
      <Section tone="paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              index="05"
              eyebrow="מחשבון עלויות · ללא עלות"
              size="lg"
              title={<>כמה יעלה הבית<br />שאתם מדמיינים?</>}
              lede="בנו את הבית חדר אחר חדר, בחרו סטנדרט, מיקום, סוג גג ושיטת בנייה — והמחשבון יראה לכם הערכת עלות בנייה מיידית, לפי אותם מקדמי תכנון שהמשרד עובד איתם מול לקוחות."
            />
            <Reveal delay={140} className="mt-9">
              <ButtonLink href="/resources/house-cost-calculator">למחשבון העלויות</ButtonLink>
            </Reveal>
          </div>

          {/* What they get, as a numbered list — the same chapter device used
              for the process, because this is a small process too. */}
          <Reveal delay={200} className="lg:col-span-5">
            <ol className="border-t border-hairline">
              {[
                { n: '01', t: 'תוכנית חדרים', d: 'הוסיפו, הסירו ושנו גודל של כל חדר — והשטח הכולל מתעדכן מיד.' },
                { n: '02', t: 'הערכת עלות', d: 'עלות בנייה משוערת כולל מע"מ, לפי הסטנדרט, המיקום, הגג ושיטת הבנייה.' },
                { n: '03', t: 'תשובה מיידית', d: 'המספר מתעדכן תוך כדי — בלי שאלון, בלי להמתין למייל.' },
                { n: '04', t: 'דוח אישי, אם תרצו', d: 'בסוף אפשר לבקש דוח PDF מפורט למייל — רק אם בא לכם.' },
              ].map((item) => (
                <li key={item.n} className="py-6 border-b border-hairline">
                  <span className="font-label font-semibold text-sm tracking-[0.14em] text-clay">
                    {item.n}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-primary mt-2">{item.t}</h3>
                  <p className="font-body text-base text-secondary leading-relaxed mt-1.5">
                    {item.d}
                  </p>
                </li>
              ))}
            </ol>
            <p className="font-body text-base text-ink-mute mt-5">
              רוצים לראות את המחירים המלאים קודם?{' '}
              <Link href="/packages" className="text-primary link-quiet hover:text-clay transition-colors">
                כל שלושת המסלולים כאן
              </Link>
              .
            </p>
          </Reveal>
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
            <p className="font-body text-base text-secondary mt-3">
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
                  <p className="font-body text-base text-secondary leading-relaxed mt-3">
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
              <span className="font-label font-medium text-[13px] uppercase tracking-[0.2em] text-ink-mute">
                מתנה ממני
              </span>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-primary mt-2 leading-snug">
                צ&apos;ק-ליסט חינמי: מה בודקים במגרש לפני שבונים
              </h3>
              <p className="font-body text-base text-secondary mt-2 measure">
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
