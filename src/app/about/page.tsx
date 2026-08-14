import type { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import HomeCtaForm from '@/components/HomeCtaForm';
import Reveal from '@/components/motion/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { SealIcon } from '@/components/ui/Icon';
import { aboutExcerpt } from '@/data/siteData';

export const metadata: Metadata = {
  title: "אודות טל גורן | אדריכלות ותכנון בתים פרטיים",
  description: "נעים להכיר, אני טל גורן, אדריכלית רשויה ומורשית היתר בוגרת הטכניון עם מעל 25 שנות ניסיון ותכנון של מעל 100 בתים פרטיים באזור השרון והצפון.",
  alternates: {
    canonical: "/about",
  },
};

const heroSubtitle = `אדריכלית מורשית היתר: המומחית שלכם לבתים פרטיים`;

const introParagraphs = [
  `אני מבינה מה אתם מרגישים עכשיו מתוך ניסיון אישי. מצד אחד – התרגשות עצומה לקראת הגשמת חלום חייכם. מצד שני – החששות הטבעיים מהלא נודע: הבלבול מול הבירוקרטיה, הפחד מטעויות תכנוניות יקרות והאחריות האדירה שבניהול תקציב של מיליוני שקלים.`,
  `אני כאן כדי להגיד לכם: אתם לא צריכים לעבור את זה לבד. מתוך ניסיון של מעל 25 שנה, שבהן תכננתי למעלה מ-100 בתים פרטיים, פיתחתי גישה ששמה את השקט הנפשי שלכם במרכז.`,
];

const officeHeading = `המשרד שלי: התמחות אחת, מעמיקה ובלעדית`;
const officeIntro = `בניגוד למשרדי אדריכלות גדולים שעוסקים במגדלים או מבני ציבור, המשרד שלי בגבעת עדה מתמחה אך ורק בתכנון בתים פרטיים ללקוחות פרטיים.`;
const officeMeaningLead = `המשמעות עבורכם היא דרמטית:`;
const officeBullets = [
  { title: `תשומת לב אישית`, text: `אתם לא "עוד פרויקט" במערכת, אתם מרכז העבודה שלי.` },
  { title: `מומחיות ללא פשרות`, text: `כל הידע, הכלים והניסיון שלי מוקדשים להבנת הצרכים הייחודיים של משפחות בונות.` },
  { title: `היכרות מקומית עמוקה`, text: `אני חיה ונושמת את האזור שבין נתניה לחיפה. אני מכירה מקרוב את ועדות התכנון והאתגרים הספציפיים בשרון הצפוני, יישובי המועצה האזורית מנשה, חוף הכרמל, בנימינה, פרדס חנה-כרכור והסביבה.` },
];

const flexibleHeading = `למה חשוב לי שהבית שלכם יהיה "גמיש" ויעיל?`;

const flexibleParagraphs = [
  `כאמא לשלושה בנים בוגרים, חוויתי בעצמי איך צרכי המשפחה משתנים לאורך השנים. הניסיון הזה לימד אותי שהחוכמה היא לא רק לתכנן בית יפה, אלא בית שגדל עם המשפחה.`,
  `התכנון שלי מושתת על יעילות ופרקטיות. אני מוודאת שהבית שלכם ינצל כל מטר בצורה חכמה, יחסוך לכם כסף בתחזוקה ובאנרגיה, ויידע להשתנות יחד איתכם מבלי להצריך שיפוצים יקרים ומסורבלים בעתיד.`,
];

const credentialsIntro = `חשוב לי שתדעו שאתם בידיים המקצועיות והאחראיות ביותר שיש. המסלול המקצועי שלי מבטיח לכם שקט נפשי בכל שלב בדרך:`;

// Every entry carried a different Material icon (`school`, `verified`,
// `verified_user`, …) that added no information and only varied the noise
// beside each line. One repeated seal mark now reads as a register of
// credentials, which is what this is.
const credentials = [
  { text: `הנדסאית אדריכלות בהצטיינות יתרה (ביה"ס הארצי להנדסאים בטכניון, 2000).` },
  { text: `בוגרת הפקולטה לארכיטקטורה בטכניון בהצטיינות (2004).` },
  { text: `אדריכלית רשומה משנת 2004 (מס' רישום 118121).` },
  { text: `אדריכלית רשויה משנת 2014 (מס' רישיון 11085135).` },
  { text: `אדריכלית מורשית היתר משנת 2025 (מס' תעודה 01-002-0000009445).` },
];

// Was three copy-pasted blocks of near-identical JSX.
const team = [
  {
    name: 'אור צרפתי',
    role: 'הנדסאית אדריכלות ועיצוב פנים',
    image: '/images/team/or-zarfati.jpg',
    bio: 'בוגרת המכללה הטכנולוגית רופין. מתמחה בתכנון פונקציונלי מוקפד, שרטוט תוכניות עבודה מפורטות וליווי שלבים שונים ברישוי.',
  },
  {
    name: 'יסמין איכילוב',
    role: 'הנדסאית אדריכלות ועיצוב פנים',
    image: '/images/team/yasmin-ichilov.jpg',
    bio: 'בוגרת המכללה הטכנולוגית רופין. מביאה איתה חשיבה עיצובית מרעננת ויצירתית, הדמיות תלת-ממדיות מתקדמות וסיוע בגיבוש סקיצות מותאמות אישית.',
  },
  {
    name: 'חגית קורן',
    role: 'הנדסאית אדריכלות ועיצוב פנים',
    image: '/images/team/hagit-koren.jpg',
    bio: 'בוגרת בית הספר הארצי להנדסאים בטכניון. בעלת עין חדה לפרטים טכניים, ניהול מפרטי ביצוע מורכבים ותיאום מול מהנדסים ויועצי הפרויקט השונים.',
  },
];

const credentialsMeaning = `המשמעות עבורכם היא ביטחון מלא בידיעה שהתכנון נעשה באחריות, תוך מיצוי מלא של זכויות הבנייה שלכם וליווי אישי, סבלני ומכיל. אני רואה את עצמי כשותפה שלכם לדרך, והתפקיד שלי הוא להפוך את המסע המורכב הזה לחוויה חיובית, ברורה ומעצימה.`;

const closingQuote = `בסוף הדרך, המטרה שלי היא אחת: שתגיעו הביתה. למקום שמותאם בדיוק לחלומות, לצרכים ולתקציב שלכם.`;

// The page now closes with the shared contact band, which supplies its own
// standing invitation copy and the direct phone / WhatsApp row — so only the
// page-specific heading is still needed here.
const ctaHeading = `מתכננים לבנות בשרון הצפוני, ביישובי מנשה או בחוף הכרמל?`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: { "@id": "https://talgoren.co.il/", name: "ראשי" },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: { "@id": "https://talgoren.co.il/about", name: "אודות" },
    },
  ],
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@id": "https://talgoren.co.il/about#person",
    "@type": "Person",
    name: "טל גורן",
    jobTitle: "אדריכלית רשויה ומורשית היתר",
    description: "אדריכלית רשויה ומורשית היתר, בעלת למעלה מ-25 שנות ניסיון בתכנון ועיצוב בתים פרטיים בצפון ובשרון.",
    image: "https://talgoren.co.il/images/tahl-portrait.jpg",
    sameAs: [
      "https://www.instagram.com/tahlgoren/",
      "https://www.facebook.com/tahlgoren",
      "https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/",
    ],
  },
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />

      {/* ======== HERO — SPLIT SCREEN ========
          Kept: it is the one page whose subject is a person, and facing the
          name across a portrait is the right move. Restyled so the two halves
          sit on the same baseline grid as the rest of the site. */}
      <section className="min-h-[88vh] grid grid-cols-1 lg:grid-cols-2 -mt-20 sm:-mt-24">
        {/* Ink panel */}
        <div className="bg-primary flex flex-col justify-end px-8 sm:px-12 lg:px-20 pt-36 pb-16 lg:pb-24 relative overflow-hidden order-2 lg:order-1">
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-headline font-black text-[22vw] lg:text-[13vw] leading-none text-white/[0.035] select-none pointer-events-none tracking-tighter"
          >
            TAHL
          </span>
          <Reveal className="relative z-10">
            <Breadcrumb current="אודות" light />
            <h1 className="font-headline font-black text-6xl md:text-7xl lg:text-8xl text-white leading-[0.88] tracking-tight">
              טל<br />גורן
            </h1>
            <p className="font-body text-lg text-white/60 max-w-sm leading-relaxed mt-8">
              {heroSubtitle}
            </p>
            <div className="flex gap-14 pt-8 mt-10 border-t border-white/12">
              <div>
                <span className="font-headline font-black text-5xl text-white block leading-none">25+</span>
                <span className="font-label font-medium text-[13px] text-white/40 uppercase tracking-[0.15em] mt-3 block">שנות ניסיון</span>
              </div>
              <div>
                <span className="font-headline font-black text-5xl text-white block leading-none">100+</span>
                <span className="font-label font-medium text-[13px] text-white/40 uppercase tracking-[0.15em] mt-3 block">בתים פרטיים</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Portrait panel */}
        <div className="bg-surface-container-low flex items-center justify-center px-8 sm:px-12 lg:px-16 py-20 pt-32 lg:pt-36 order-1 lg:order-2">
          <Reveal className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <div className="aspect-[3/4] relative w-full overflow-hidden bg-surface-container">
              <Image
                src="/images/tahl-portrait.jpg"
                alt="טל גורן אדריכלית"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover object-top img-settle"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======== 01 · BIO ======== */}
      <Section tone="paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div className="lg:col-span-7">
            <SectionHeading index="01" eyebrow="הסיפור" title="נעים להכיר, אני טל גורן" />
            <Reveal delay={100}>
              {/* The excerpt is the thesis of the page, so it is set larger and
                  marked with a clay rule on the reading edge; the paragraphs
                  that follow are the argument, at body size. */}
              <p className="font-body text-primary text-xl leading-[1.75] border-s-2 border-clay ps-6 mt-10 measure">
                {aboutExcerpt}
              </p>
              <div className="space-y-6 font-body text-secondary text-lg leading-[1.85] mt-8 measure">
                {introParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Credentials, as a ruled register rather than a filled panel —
              this is a list of facts on file, and it should look like one. */}
          <Reveal delay={180} className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="font-label font-medium text-[13px] uppercase tracking-[0.2em] text-ink-mute block">
              הכשרה ורישוי
            </span>
            <p className="font-body text-secondary text-base leading-relaxed mt-4">
              {credentialsIntro}
            </p>
            <ul className="mt-7 border-t border-hairline">
              {credentials.map((item, i) => (
                <li key={i} className="flex items-start gap-4 py-5 border-b border-hairline">
                  <SealIcon size={20} className="text-clay mt-0.5" strokeWidth={1} />
                  <p className="font-headline font-bold text-base text-primary leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <p className="font-body text-secondary text-base leading-relaxed mt-6">
              {credentialsMeaning}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ======== 02 · OFFICE FOCUS ======== */}
      <Section tone="sand">
        <SectionHeading
          index="02"
          eyebrow="המשרד שלי"
          title={officeHeading}
          lede={officeIntro}
          className="mb-14"
        />
        <Reveal delay={100}>
          <p className="font-headline font-bold text-lg text-primary">{officeMeaningLead}</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 mt-10 border-t border-hairline pt-10">
          {officeBullets.map((b, i) => (
            <Reveal key={i} delay={i * 110}>
              <span className="font-label font-medium text-[13px] tracking-[0.15em] text-clay block mb-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-headline font-bold text-lg text-primary">{b.title}</h3>
              <p className="font-body text-secondary text-base leading-relaxed mt-2.5">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ======== 03 · TEAM ======== */}
      <Section tone="paper">
        <SectionHeading
          index="03"
          eyebrow="האנשים מאחורי התכנון"
          title="צוות המשרד"
          lede="במשרד תיהנו מליווי מקצועי, יחס אישי וזמינות מלאה. הצוות מורכב מהנדסאיות אדריכלות מוכשרות ומנוסות, השותפות לחזון של תכנון בתים פרקטיים, יעילים ומרשימים."
          className="mb-14"
        />

        <Reveal className="mb-16">
          <div className="aspect-[21/9] w-full bg-surface-container overflow-hidden relative">
            <Image
              src="/images/team/tal-goren-and-team.jpg"
              alt="טל גורן וצוות המשרד"
              fill
              sizes="100vw"
              className="object-cover img-settle"
            />
          </div>
          <span className="font-label font-medium text-[13px] uppercase tracking-[0.15em] text-ink-mute mt-4 block">
            טל גורן וצוות המשרד
          </span>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 110}>
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden bg-surface-container relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover img-grayscale"
                  />
                </div>
                <div className="pt-5 mt-5 border-t border-hairline">
                  <h3 className="font-headline font-black text-xl text-primary">{member.name}</h3>
                  <p className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute mt-2">
                    {member.role}
                  </p>
                  <p className="font-body text-secondary text-base leading-relaxed mt-4">
                    {member.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ======== 04 · PHILOSOPHY ======== */}
      <Section tone="sand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <SectionHeading
            className="lg:col-span-5"
            index="04"
            eyebrow="הגישה"
            title={flexibleHeading}
          />
          <Reveal delay={120} className="lg:col-span-7">
            <div className="space-y-6 font-body text-lg text-secondary leading-[1.85] measure">
              {flexibleParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Closing statement, given the page's last word */}
        <Reveal className="mt-20 pt-16 border-t border-hairline">
          <blockquote className="font-headline font-black text-2xl sm:text-3xl lg:text-[2.6rem] text-primary leading-[1.2] tracking-tight max-w-4xl">
            {closingQuote}
          </blockquote>
          <div className="flex items-center gap-4 mt-9">
            <span className="rule-draw h-px w-12 bg-clay" />
            <span className="font-label font-medium text-[13px] uppercase tracking-[0.15em] text-ink-mute">
              טל גורן, אדריכלית
            </span>
          </div>
        </Reveal>
      </Section>

      {/* ======== CTA ======== */}
      <HomeCtaForm eyebrow="בואו נדבר" heading={ctaHeading} placement="about_cta" showDirect />
    </>
  );
}
