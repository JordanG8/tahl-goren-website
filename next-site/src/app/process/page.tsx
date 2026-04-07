/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function Process() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 px-8 blueprint-grid overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-start gap-6 relative z-10">
          <Breadcrumb current="תהליך העבודה" />
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">מהסקיצה הראשונה ועד לכניסה הביתה</span>
          <h1 className="font-headline font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] max-w-4xl text-primary">
            הדרך לבית שלך
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-4">
            מסע הבנייה בישראל יכול להיות מורכב, אך עם 25 שנות ניסיון, אני כאן כדי להפוך את הבירוקרטיה לשקט נפשי ואת החלום למציאות מוחשית.
          </p>
          <div className="mt-12">
            <Link href="/contact" className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 font-headline font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all group">
              התחילו את המסע
              <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
            </Link>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute top-1/2 left-0 w-1/4 h-[60vh] hidden lg:block transform -translate-y-1/2 opacity-[0.04]">
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-headline font-black text-[20rem] text-primary leading-none select-none">01</span>
          </div>
        </div>
      </section>

      {/* Stage 01 */}
      <section className="py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <span className="font-headline text-7xl md:text-8xl font-black text-outline/20">01</span>
                <div className="h-px w-24 bg-primary"></div>
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-black leading-tight text-primary">הסקיצה והחזון</h2>
              <p className="text-secondary leading-relaxed text-lg">
                הכל מתחיל בהקשבה. אני יושבת איתכם, מבינה את אורח החיים שלכם, את הצרכים של כל בן משפחה ואת החלומות שלכם. בשלב זה אנחנו מגבשים את הקונספט האדריכלי, בוחנים כיווני אור, זרימת אוויר ושימושיות יומיומית.
              </p>
              <div className="bg-primary/5 p-8 border-r-4 border-primary">
                <p className="text-primary font-headline font-bold text-lg leading-snug">
                  &quot;המטרה היא ליצור בית שמרגיש נכון מהרגע הראשון.&quot;
                </p>
              </div>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  שיחת היכרות והבנת צרכים
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  גיבוש תוכנית אדריכלית ראשונית
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  הצגת חלופות ודיון משותף
                </li>
              </ul>
            </div>
            <div className="md:col-span-7 relative">
              <div className="aspect-video bg-surface-container overflow-hidden">
                <img
                  alt="תכנון וסקיצות אדריכליות"
                  className="w-full h-full object-cover img-grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3rEafBpTtjlNMpIFbltpLG4qSBp7sLnx7k4UO5SfZAxEzKp5fKHnzd9pE2wyM-tGR5RqRjMMXhI0yoWswWyVCDohkMR-v4pKwHHYb5UPaglJvFjA-GScrFF4CxGk8MKn42B36IAp_Q2ICSO0g73mbXBqhTBUS-7jN0Vw41TkTvp5IUbD_Zz6aK2CdMb7EooRNKv2rzP6OfReRfa3uZqN6kpqAgZmTp-Lxu3KwgB3cajZt-VvaRLA6nE31mzg0bGm6I9RqSmWtVVy2"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-primary p-10 text-white hidden md:block max-w-xs">
                <p className="font-headline font-bold text-xl leading-snug">חתימה אישית על כל פרט בתכנון.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 02 */}
      <section className="py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7 order-2 md:order-1 relative">
              <div className="aspect-[4/3] bg-surface-container-highest overflow-hidden">
                <img
                  alt="ניהול היתרים ורישוי"
                  className="w-full h-full object-cover img-grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANS1iBmWPRJBbxP6zkqL1nx96FbPfu3S4tkrSPJ1LihhST2vun-e-awTo2wvlfBZHNyhl4BCjURRCLSizdtgL7AtdyKGVp9ir3WLADH1AQjprPurEBChUzpoMFE8GL8ZL3Aoj7dYkxV2Ji1DLORc-jroKzgnLpgHY0LuuD1FSii7gQlGFVnEjXFMP-dFhjDkaQCJTxC79hcnDqyqCmo1iFxPhgo1f5iRvq7CFzfuPoFi0R1VdtXG6pPegg3WJw6AaG7njMOWqrCcGz"
                />
              </div>
            </div>
            <div className="md:col-span-5 order-1 md:order-2 flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <span className="font-headline text-7xl md:text-8xl font-black text-outline/20">02</span>
                <div className="h-px w-24 bg-primary"></div>
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-black leading-tight text-primary">ניווט בהיתרים</h2>
              <div className="bg-primary/5 p-8 border-r-4 border-primary">
                <p className="text-primary font-headline font-bold text-lg mb-3">&quot;החלק הקשה? בשבילי זו שגרה.&quot;</p>
                <p className="text-secondary text-base leading-relaxed">
                  הבירוקרטיה הישראלית ידועה במורכבותה. אני מנהלת עבורכם את הקשר מול הרשויות, הוועדות לתכנון ובנייה והגורמים המקצועיים, כדי שהדרך להיתר תהיה חלקה ומהירה ככל האפשר.
                </p>
              </div>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  הגשה מקוונת וניהול תיק רישוי
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  תיאום יועצים (חשמל, אינסטלציה, קונסטרוקציה)
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  ייצוג מול ועדות תכנון ובנייה
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 03 */}
      <section className="py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-6 flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <span className="font-headline text-7xl md:text-8xl font-black text-outline/20">03</span>
                <div className="h-px w-24 bg-primary"></div>
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-black leading-tight text-primary">הבנייה - פיקוח אישי</h2>
              <p className="text-secondary leading-relaxed text-lg">
                כשהטרקטורים עולים על הקרקע, אני שם. פיקוח עליון הדוק מבטיח שכל מה שתוכנן על הנייר מבוצע בדייקנות בשטח. אני מלווה את הקבלנים ומוודאת שאיכות הבנייה עומדת בסטנדרטים הגבוהים ביותר.
              </p>
              <div className="grid grid-cols-2 gap-0 mt-4">
                <div className="p-8 bg-surface-container">
                  <span className="material-symbols-outlined text-3xl mb-4 block text-primary">engineering</span>
                  <h4 className="font-headline font-black text-sm uppercase mb-2 tracking-wide">דיוק הנדסי</h4>
                  <p className="text-xs text-secondary leading-relaxed">מעקב שבועי אחר התקדמות השלד והגמר.</p>
                </div>
                <div className="p-8 bg-surface-container-low">
                  <span className="material-symbols-outlined text-3xl mb-4 block text-primary">visibility</span>
                  <h4 className="font-headline font-black text-sm uppercase mb-2 tracking-wide">פיקוח עליון</h4>
                  <p className="text-xs text-secondary leading-relaxed">וידוא התאמה מלאה לתוכניות האדריכליות.</p>
                </div>
                <div className="p-8 bg-surface-container-low">
                  <span className="material-symbols-outlined text-3xl mb-4 block text-primary">handshake</span>
                  <h4 className="font-headline font-black text-sm uppercase mb-2 tracking-wide">תיאום קבלנים</h4>
                  <p className="text-xs text-secondary leading-relaxed">ניהול ממשקים בין כל בעלי המקצוע.</p>
                </div>
                <div className="p-8 bg-surface-container">
                  <span className="material-symbols-outlined text-3xl mb-4 block text-primary">verified</span>
                  <h4 className="font-headline font-black text-sm uppercase mb-2 tracking-wide">בקרת איכות</h4>
                  <p className="text-xs text-secondary leading-relaxed">בדיקות מקיפות בכל שלב בנייה.</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-6 relative">
              <div className="relative group">
                <img
                  alt="פיקוח בנייה באתר"
                  className="w-full img-grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf0cs6HzWDKnrtVb_nUaEll4ZKq5yybZuJyfgg-mOn4RFZNNtxqtYlQx2YqIhXMBPNhGwPTQN22vvf3XGb181SwJKQignh_plDaMI2oPryV7Fpqp_V2_e4_Ovhfps6uC10heQ-2MihV5dEnCeF-XxouD1_Um1PshBypzb-g70dAMy4IEHa7sWIxfwv9G1d0GNfmmVtjrd3eKzLdKjmSnINGuX8CFSvssBkx6G44j9cypOCAhs2qiAympwEru1tV1K3c8QMAksuGGzP"
                />
                <div className="absolute inset-0 border-[20px] border-surface/20 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 04 */}
      <section className="relative bg-primary text-white py-32 md:py-40 px-8 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col gap-8">
              <span className="font-headline text-8xl md:text-9xl font-black text-white/10">04</span>
              <h2 className="font-headline text-5xl md:text-6xl font-black leading-none text-white">כניסה הביתה</h2>
              <p className="text-white/60 text-xl leading-relaxed">
                הרגע שבו המפתח מסתובב והחלל מתעורר לחיים. בית יעיל, מרווח, מואר ומותאם אישית לצרכים שלכם. הבית הוא לא רק מבנה, הוא הביטחון והשקט שלכם לשנים קדימה.
              </p>
              <div className="bg-white/5 p-8 border-r-4 border-white/30 mt-4">
                <p className="text-white/80 text-lg leading-relaxed">
                  &quot;הרגע הכי מרגש בעבודה שלי הוא לראות את הפנים של המשפחה כשהם נכנסים לבית המוגמר לראשונה.&quot;
                </p>
                <p className="text-white/40 font-headline font-bold text-sm mt-4">- טל גורן</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="p-4 bg-white/5">
                <img
                  alt="בית מוגמר - כניסה הביתה"
                  className="w-full aspect-video object-cover img-grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz2YKhr1SHRHa5aJmBmEmxlE9_xOmFQyWWa-ntQ9_G2W1vMuu3MEJYT61V-Jcrmy8m2pt7Mi5OwZFZrHdxx7m1xvBxXQLoLJxy7eScNvtCXDEqYCz4TlqM7P-NKp5UrmvzuoafLaZmjmrHQgXxs2AfwVMeop5EsD4ugrZZprOTqvSALC27-RH2Pol-pmUgQxcOLYAJHjDx1cTN5EFPpIj8ZPbKryBhzHRP65aRyGwTEo9fIg37FbAVv5FFNKeZ7Nvqhc9eU0nGSofi"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 md:py-40 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto text-center">
          <span className="material-symbols-outlined text-7xl text-primary/15 mb-10 block">format_quote</span>
          <blockquote className="font-headline text-3xl md:text-5xl font-black leading-tight mb-12 tracking-tight text-primary">
            &quot;תהליך הבנייה עם טל היה פשוט אחרת. השקט הנפשי שקיבלנו לאורך כל הדרך הבירוקרטית והליווי בשטח הפכו את החוויה למרגשת במקום מלחיצה.&quot;
          </blockquote>
          <cite className="not-italic flex flex-col items-center gap-2">
            <span className="font-headline font-black text-xl text-primary">משפחת לוי, גבעת עדה</span>
            <span className="font-label text-xs text-secondary uppercase tracking-[0.3em]">פרויקט מגורים 2023</span>
          </cite>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">הצעד הבא</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tight leading-[0.95] text-white">
            בואו נתחיל את המסע
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            כל בית גדול מתחיל בשיחה קטנה. ספרו לי על החלום שלכם ונגשים יחד לעבודה.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 mt-6">
            <Link href="/contact" className="inline-flex items-center justify-center gap-4 bg-white text-primary px-12 py-5 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors group">
              דברו איתי
              <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
            </Link>
            <Link href="/projects" className="inline-flex items-center justify-center gap-4 bg-white/10 text-white px-12 py-5 font-headline font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-colors">
              צפו בפרויקטים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
