/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import ArchFrame from '@/components/ArchFrame';
import Breadcrumb from '@/components/Breadcrumb';

const credentials = [
  { icon: 'workspace_premium', title: 'הנדסאית אדריכלות בהצטיינות יתרה', sub: 'ביה״ס הארצי להנדסאים בטכניון, 2000' },
  { icon: 'school', title: 'בוגרת הפקולטה לארכיטקטורה בטכניון בהצטיינות', sub: 'טכניון, 2004' },
  { icon: 'verified', title: 'אדריכלית רשומה', sub: 'משנת 2004 · מס׳ רישום 118121' },
  { icon: 'verified_user', title: 'אדריכלית רשויה', sub: 'משנת 2014 · מס׳ רישיון 11085135' },
  { icon: 'workspace_premium', title: 'אדריכלית מורשית היתר', sub: 'משנת 2025 · מס׳ תעודה 01-002-0000009445' },
];

const officeValues = [
  {
    n: '01',
    icon: 'person',
    title: 'תשומת לב אישית',
    text: 'אתם לא "עוד פרויקט" במערכת — אתם מרכז העבודה שלי.',
  },
  {
    n: '02',
    icon: 'verified',
    title: 'מומחיות ללא פשרות',
    text: 'כל הידע, הכלים והניסיון שלי מוקדשים להבנת הצרכים הייחודיים של משפחות בונות.',
  },
  {
    n: '03',
    icon: 'location_on',
    title: 'היכרות מקומית עמוקה',
    text: 'אני חיה ונושמת את האזור שבין נתניה לחיפה, ומכירה מקרוב את ועדות התכנון והאתגרים בשרון הצפוני, יישובי מנשה, חוף הכרמל, בנימינה, פרדס חנה-כרכור והסביבה.',
  },
];

export default function About() {
  return (
    <>

      {/* ======== HERO — SPLIT SCREEN ======== */}
      <section className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 -mt-24">

        {/* Dark left panel */}
        <div className="bg-primary flex flex-col justify-end px-12 lg:px-20 pt-36 pb-16 lg:pb-20 relative overflow-hidden order-2 lg:order-1">
          {/* Giant decorative background text */}
          <span className="absolute inset-0 flex items-center justify-center font-headline font-black text-[22vw] lg:text-[14vw] leading-none text-white/[0.04] select-none pointer-events-none tracking-tighter">
            TAL
          </span>
          <div className="relative z-10 space-y-8">
            <Breadcrumb current="אודות" light />
            <h1 className="font-headline font-black text-6xl md:text-7xl lg:text-8xl text-white leading-[0.88] tracking-tight">
              טל<br />גורן
            </h1>
            <p className="font-body text-lg text-white/60 max-w-sm leading-relaxed">
              אדריכלית מורשית היתר — המומחית שלכם לבתים פרטיים
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
            <div className="aspect-[3/4]">
              <img
                src="/images/tahl-portrait.jpg"
                alt="טל גורן אדריכלית"
                className="w-full h-full object-cover object-top img-grayscale"
              />
            </div>
          </ArchFrame>
        </div>

      </section>


      {/* ======== PULL QUOTE ======== */}
      <section className="py-24 lg:py-32 px-8 bg-surface">
        <div className="max-w-5xl mx-auto">
          <span className="font-headline text-8xl text-surface-container-highest leading-none select-none block">&ldquo;</span>
          <blockquote className="font-headline font-black text-3xl md:text-4xl lg:text-5xl text-primary leading-tight tracking-tight -mt-6">
            בסוף הדרך, המטרה שלי היא אחת: שתגיעו הביתה — למקום שמותאם בדיוק לחלומות, לצרכים ולתקציב שלכם.
          </blockquote>
          <div className="flex items-center gap-4 mt-10">
            <div className="w-12 h-[2px] bg-secondary" />
            <span className="font-label text-sm text-secondary tracking-wide">טל גורן, אדריכלית</span>
          </div>
        </div>
      </section>


      {/* ======== BIO ======== */}
      <section className="pb-24 md:pb-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Story */}
            <div className="lg:col-span-7 space-y-8">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">נעים להכיר</span>
              <h2 className="font-headline font-black text-3xl md:text-4xl text-primary leading-tight">
                נעים להכיר, אני טל גורן
              </h2>
              <p className="font-body text-primary text-xl leading-relaxed border-r-2 border-secondary pr-6">
                אדריכלית רשויה ומורשית היתר, בוגרת הטכניון בהצטיינות, בעלת ניסיון של מעל 25 שנה. המשרד מתמחה אך ורק בתכנון בתים פרטיים ללקוחות פרטיים באזור השרון הצפוני, יישובי מנשה, חוף הכרמל והסביבה. המומחיות שלי היא יצירת בתים שגדלים עם המשפחה — תכנון גמיש, פרקטי וחסכוני, המלווה ביחס אישי צמוד ובביטחון מקצועי מלא.
              </p>
              <div className="space-y-6 font-body text-secondary text-lg leading-relaxed">
                <p>
                  אני מבינה מה אתם מרגישים עכשיו מתוך ניסיון אישי. מצד אחד — התרגשות עצומה לקראת הגשמת חלום חייכם. מצד שני — החששות הטבעיים מהלא נודע: הבלבול מול הבירוקרטיה, הפחד מטעויות תכנוניות יקרות והאחריות האדירה שבניהול תקציב של מיליוני שקלים.
                </p>
                <p>
                  אני כאן כדי להגיד לכם: אתם לא צריכים לעבור את זה לבד. מתוך ניסיון של מעל 25 שנה, שבהן תכננתי למעלה מ-100 בתים פרטיים, פיתחתי גישה ששמה את השקט הנפשי שלכם במרכז.
                </p>
                <p>
                  בניגוד למשרדי אדריכלות גדולים שעוסקים במגדלים או מבני ציבור, המשרד שלי בגבעת עדה מתמחה אך ורק בתכנון בתים פרטיים ללקוחות פרטיים.
                </p>
              </div>
            </div>

            {/* Credentials card */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-low p-10 space-y-2">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary block mb-6">הכשרה וביטחון מקצועי</span>
                {credentials.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-5 border-b border-outline/10 last:border-0">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-headline font-bold text-sm text-primary">{item.title}</p>
                      <p className="font-label text-xs text-secondary mt-1 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
                <p className="font-body text-secondary text-sm leading-relaxed pt-6">
                  המשמעות עבורכם היא ביטחון מלא בידיעה שהתכנון נעשה באחריות, תוך מיצוי מלא של זכויות הבנייה שלכם וליווי אישי, סבלני ומכיל. אני רואה את עצמי כשותפה שלכם לדרך, והתפקיד שלי הוא להפוך את המסע המורכב הזה לחוויה חיובית, ברורה ומעצימה.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ======== PHILOSOPHY ======== */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <div className="mb-20">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">המשרד שלי</span>
            <h2 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.88] text-primary mt-4 max-w-2xl">
              בית שגדל<br />עם המשפחה
            </h2>
            <div className="space-y-6 font-body text-lg text-secondary leading-relaxed max-w-2xl mt-6">
              <p>
                כאמא לשלושה בנים בוגרים, חוויתי בעצמי איך צרכי המשפחה משתנים לאורך השנים. הניסיון הזה לימד אותי שהחוכמה היא לא רק לתכנן בית יפה — אלא בית שגדל עם המשפחה.
              </p>
              <p>
                התכנון שלי מושתת על יעילות ופרקטיות. אני מוודאת שהבית שלכם ינצל כל מטר בצורה חכמה, יחסוך לכם כסף בתחזוקה ובאנרגיה, ויידע להשתנות יחד איתכם — מבלי להצריך שיפוצים יקרים ומסורבלים בעתיד.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {officeValues.map((v) => (
              <div key={v.n} className="group relative bg-surface p-12 lg:p-16 card-hover overflow-hidden">
                <span className="absolute top-4 left-6 font-headline font-black text-8xl text-outline/[0.07] leading-none select-none pointer-events-none">{v.n}</span>
                <div className="relative z-10 space-y-6 mt-6">
                  <div className="w-14 h-14 bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">{v.icon}</span>
                  </div>
                  <h3 className="font-headline font-black text-2xl text-primary">{v.title}</h3>
                  <p className="font-body text-secondary leading-relaxed text-sm">{v.text}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-outline/10 group-hover:bg-primary transition-colors duration-500" />
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ======== CTA ======== */}
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95" />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">בואו נדבר</span>
          <h2 className="font-headline font-black text-4xl md:text-6xl tracking-tight leading-[1.05] text-white">
            מתכננים לבנות בשרון הצפוני, ביישובי מנשה או בחוף הכרמל?
          </h2>
          <p className="font-body text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            אני מזמינה אתכם לשיחת ייעוץ ראשונית, ללא התחייבות, כדי שנכיר ונראה איך נוכל להגשים יחד את הבית שלכם.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-4 bg-white text-primary px-12 py-5 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors group">
            צרו קשר עכשיו
            <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
          </Link>
          <p className="font-body text-white/50 text-base mt-2">איתכם בדרך להגשמת הבית, טל גורן</p>
        </div>
      </section>

    </>
  );
}
