import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ArchFrame from '@/components/ArchFrame';
import Breadcrumb from '@/components/Breadcrumb';
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

const credentials = [
  { icon: 'workspace_premium', text: `הנדסאית אדריכלות בהצטיינות יתרה (ביה"ס הארצי להנדסאים בטכניון, 2000).` },
  { icon: 'school', text: `בוגרת הפקולטה לארכיטקטורה בטכניון בהצטיינות (2004).` },
  { icon: 'verified', text: `אדריכלית רשומה משנת 2004 (מס' רישום 118121).` },
  { icon: 'verified_user', text: `אדריכלית רשויה משנת 2014 (מס' רישיון 11085135).` },
  { icon: 'workspace_premium', text: `אדריכלית מורשית היתר משנת 2025 (מס' תעודה 01-002-0000009445).` },
];

const credentialsMeaning = `המשמעות עבורכם היא ביטחון מלא בידיעה שהתכנון נעשה באחריות, תוך מיצוי מלא של זכויות הבנייה שלכם וליווי אישי, סבלני ומכיל. אני רואה את עצמי כשותפה שלכם לדרך, והתפקיד שלי הוא להפוך את המסע המורכב הזה לחוויה חיובית, ברורה ומעצימה.`;

const closingQuote = `בסוף הדרך, המטרה שלי היא אחת: שתגיעו הביתה. למקום שמותאם בדיוק לחלומות, לצרכים ולתקציב שלכם.`;

const ctaHeading = `מתכננים לבנות בשרון הצפוני, ביישובי מנשה או בחוף הכרמל?`;
const ctaText = `אני מזמינה אתכם לשיחת ייעוץ ראשונית, ללא התחייבות, כדי שנכיר ונראה איך נוכל להגשים יחד את הבית שלכם.`;
const ctaSignature = `איתכם בדרך להגשמת הבית, טל גורן`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ראשי", item: "https://talgoren.co.il/" },
    { "@type": "ListItem", position: 2, name: "אודות", item: "https://talgoren.co.il/about" },
  ],
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ======== HERO — SPLIT SCREEN ======== */}
      <section className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 -mt-24">

        {/* Dark left panel */}
        <div className="bg-primary flex flex-col justify-end px-12 lg:px-20 pt-36 pb-16 lg:pb-20 relative overflow-hidden order-2 lg:order-1">
          {/* Giant decorative background text */}
          <span className="absolute inset-0 flex items-center justify-center font-headline font-black text-[22vw] lg:text-[14vw] leading-none text-white/[0.04] select-none pointer-events-none tracking-tighter">
            TAHL
          </span>
          <div className="relative z-10 space-y-8">
            <Breadcrumb current="אודות" light />
            <h1 className="font-headline font-black text-6xl md:text-7xl lg:text-8xl text-white leading-[0.88] tracking-tight">
              טל<br />גורן
            </h1>
            <p className="font-body text-lg text-white/60 max-w-sm leading-relaxed">
              {heroSubtitle}
            </p>
            <div className="flex gap-12 pt-8 border-t border-white/10">
              <div>
                <span className="font-headline font-black text-5xl text-white block leading-none">25+</span>
                <span className="font-label text-[10px] text-white/40 uppercase tracking-widest mt-2 block">שנות ניסיון</span>
              </div>
              <div>
                <span className="font-headline font-black text-5xl text-white block leading-none">100+</span>
                <span className="font-label text-[10px] text-white/40 uppercase tracking-widest mt-2 block">בתים פרטיים</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portrait right panel */}
        <div className="bg-surface-container-low flex items-center justify-center px-12 lg:px-16 py-20 pt-32 lg:pt-36 order-1 lg:order-2">
          <ArchFrame className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <div className="aspect-[3/4] relative w-full h-full">
              <Image
                src="/images/tahl-portrait.jpg"
                alt="טל גורן אדריכלית"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover object-top img-grayscale"
              />
            </div>
          </ArchFrame>
        </div>

      </section>


      {/* ======== BIO ======== */}
      <section className="py-24 lg:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Story */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="font-headline font-black text-3xl md:text-4xl text-primary leading-tight">
                נעים להכיר, אני טל גורן
              </h2>
              <p className="font-body text-primary text-xl leading-relaxed border-r-2 border-secondary pr-6">
                {aboutExcerpt}
              </p>
              <div className="space-y-6 font-body text-secondary text-lg leading-relaxed">
                {introParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Credentials card */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-low p-10 space-y-2">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary block mb-2">מה ההכשרה והביטחון המקצועי שאני מביאה איתי?</span>
                <p className="font-body text-secondary text-sm leading-relaxed pb-4">
                  {credentialsIntro}
                </p>
                {credentials.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-5 border-b border-outline/10 last:border-0">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                    <p className="font-headline font-bold text-sm text-primary leading-relaxed">{item.text}</p>
                  </div>
                ))}
                <p className="font-body text-secondary text-sm leading-relaxed pt-6">
                  {credentialsMeaning}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ======== OFFICE FOCUS ======== */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">המשרד שלי</span>
            <h2 className="font-headline font-black text-3xl md:text-4xl text-primary leading-tight mt-4">
              {officeHeading}
            </h2>
            <p className="font-body text-lg text-secondary leading-relaxed mt-6">{officeIntro}</p>
            <p className="font-body text-lg text-primary font-bold leading-relaxed mt-6">{officeMeaningLead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {officeBullets.map((b, i) => (
              <div key={i} className="bg-surface p-8 border border-outline/10">
                <h3 className="font-headline font-bold text-lg text-primary mb-3">{b.title}</h3>
                <p className="font-body text-secondary text-base leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ======== OFFICE TEAM ======== */}
      <section className="py-24 md:py-32 px-8 bg-surface border-t border-outline/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">האנשים מאחורי התכנון</span>
            <h2 className="font-headline font-black text-3xl md:text-4xl text-primary leading-tight mt-4">
              צוות המשרד
            </h2>
            <p className="font-body text-lg text-secondary leading-relaxed mt-6">
              במשרד שלנו תיהנו מליווי מקצועי, יחס אישי וזמינות מלאה. הצוות המקצועי מורכב מהנדסאיות אדריכלות מוכשרות ומנוסות, השותפות לחזון של תכנון בתים פרקטיים, יעילים ומרשימים.
            </p>
          </div>

          {/* Wide Team Banner */}
          <div className="mb-20 overflow-hidden relative group">
            <div className="aspect-[21/9] w-full bg-surface-container-low overflow-hidden relative">
              <Image
                src="/images/team/tal-goren-and-team.jpg"
                alt="צוות המשרד - טל גורן"
                fill
                sizes="100vw"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
              />
            </div>
            <div className="absolute bottom-6 right-6 bg-primary/95 text-white px-6 py-3 font-headline font-bold text-sm tracking-wide z-10">
              טל גורן וצוות המשרד
            </div>
          </div>

          {/* 3-Column Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Member 1: Or Zarfati */}
            <div className="flex flex-col group">
              <div className="aspect-[3/4] overflow-hidden bg-surface-container-low mb-6 relative">
                <Image
                  src="/images/team/or-zarfati.jpg"
                  alt="אור צרפתי"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out scale-100 group-hover:scale-105"
                />
              </div>
              <h3 className="font-headline font-black text-xl text-primary mb-1">אור צרפתי</h3>
              <p className="font-label text-xs tracking-wider text-secondary mb-3">הנדסאית אדריכלות ועיצוב פנים</p>
              <p className="font-body text-secondary text-sm leading-relaxed">
                בוגרת המכללה הטכנולוגית רופין. מתמחה בתכנון פונקציונלי מוקפד, שרטוט תוכניות עבודה מפורטות וליווי שלבים שונים ברישוי.
              </p>
            </div>

            {/* Member 2: Yasmin Ichilov */}
            <div className="flex flex-col group">
              <div className="aspect-[3/4] overflow-hidden bg-surface-container-low mb-6 relative">
                <Image
                  src="/images/team/yasmin-ichilov.jpg"
                  alt="יסמין איכילוב"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out scale-100 group-hover:scale-105"
                />
              </div>
              <h3 className="font-headline font-black text-xl text-primary mb-1">יסמין איכילוב</h3>
              <p className="font-label text-xs tracking-wider text-secondary mb-3">הנדסאית אדריכלות ועיצוב פנים</p>
              <p className="font-body text-secondary text-sm leading-relaxed">
                בוגרת המכללה הטכנולוגית רופין. מביאה איתה חשיבה עיצובית מרעננת ויצירתית, הדמיות תלת-ממדיות מתקדמות וסיוע בגיבוש סקיצות מותאמות אישית.
              </p>
            </div>

            {/* Member 3: Hagit Koren */}
            <div className="flex flex-col group">
              <div className="aspect-[3/4] overflow-hidden bg-surface-container-low mb-6 relative">
                <Image
                  src="/images/team/hagit-koren.jpg"
                  alt="חגית קורן"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out scale-100 group-hover:scale-105"
                />
              </div>
              <h3 className="font-headline font-black text-xl text-primary mb-1">חגית קורן</h3>
              <p className="font-label text-xs tracking-wider text-secondary mb-3">הנדסאית אדריכלות ועיצוב פנים</p>
              <p className="font-body text-secondary text-sm leading-relaxed">
                בוגרת בית הספר הארצי להנדסאים בטכניון. בעלת עין חדה לפרטים טכניים, ניהול מפרטי ביצוע מורכבים ותיאום מול מהנדסים ויועצי הפרויקט השונים.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ======== PHILOSOPHY ======== */}
      <section className="py-24 md:py-32 px-8 bg-surface overflow-hidden border-t border-outline/10">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl">
            <h2 className="font-headline font-black text-3xl md:text-4xl text-primary leading-tight">
              {flexibleHeading}
            </h2>
            <div className="space-y-6 font-body text-lg text-secondary leading-relaxed mt-6">
              {flexibleParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ======== PULL QUOTE ======== */}
      <section className="py-24 lg:py-32 px-8 bg-surface-container-low">
        <div className="max-w-5xl mx-auto">
          <span className="font-headline text-8xl text-surface-container-highest leading-none select-none block">&ldquo;</span>
          <blockquote className="font-headline font-black text-3xl md:text-4xl lg:text-5xl text-primary leading-tight tracking-tight -mt-6">
            {closingQuote}
          </blockquote>
          <div className="flex items-center gap-4 mt-10">
            <div className="w-12 h-[2px] bg-secondary" />
            <span className="font-label text-sm text-secondary tracking-wide">טל גורן, אדריכלית</span>
          </div>
        </div>
      </section>


      {/* ======== CTA ======== */}
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95" />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">בואו נדבר</span>
          <h2 className="font-headline font-black text-4xl md:text-6xl tracking-tight leading-[1.05] text-white">
            {ctaHeading}
          </h2>
          <p className="font-body text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            {ctaText}
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-4 bg-white text-primary px-12 py-5 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors group">
            צרו קשר עכשיו
            <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
          </Link>
          <p className="font-body text-white/50 text-base mt-2">{ctaSignature}</p>
        </div>
      </section>

    </>
  );
}
