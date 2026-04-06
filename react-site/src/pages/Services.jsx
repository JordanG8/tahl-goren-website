import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

export default function Services() {
  return (
    <>
      {/* Page Header with Breadcrumb */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb current="שירותים" />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            שירותים
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-8">
            כדי להעניק לכם מעטפת מלאה וחוויה נוחה, אני מציעה ליווי אדריכלי מקיף מהצעד הראשון ועד לקבלת המפתח. כל שירות מותאם אישית לצרכים שלכם.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10"></div>
        </div>
      </section>

      {/* Service 1: תכנון בית פרטי */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Text (appears first in RTL = right side) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="w-16 h-16 bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>home</span>
              </div>
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">שירות מרכזי</span>
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">תכנון בית פרטי</h2>
              <div className="space-y-5 text-secondary text-lg leading-relaxed">
                <p>
                  בשעה טובה! בניית בית היא כנראה הפרויקט הגדול והיקר ביותר שתעשו כמשפחה, ולכן חשוב לבחור באדריכלית הנכונה שתלווה אתכם.
                </p>
                <p>
                  אני מציעה ליווי אדריכלי מקיף מהצעד הראשון, ועד לקבלת המפתח: החל מייעוץ וגיבוש פרוגרמה, דרך תכנון מלא, טיפול ברישוי להשגת היתר, תכניות עבודה מפורטות, עיצוב פנים ועד פיקוח עליון בשטח. יחד, נבטיח שהבית החדש שלכם יהיה יעיל, גמיש ומותאם בדיוק עבורכם.
                </p>
              </div>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  ניתוח מגרש ותכנון אב
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  תוכניות אדריכליות וחתכים
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  הדמיות תלת-ממד ומודלים
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  תוכניות ביצוע מפורטות
                </li>
              </ul>
            </div>
            {/* Image (left in RTL) */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[4/3] bg-surface-container overflow-hidden">
                <img
                  src="/images/projects/shacham-living.jpg"
                  alt="תכנון בית פרטי - חלל ציבורי מרווח ומואר"
                  className="w-full h-full object-cover img-grayscale"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-primary p-8 text-white hidden md:block max-w-xs">
                <p className="font-headline font-bold text-lg leading-snug">תכנון מדויק שהופך חלום למציאות.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: ליווי סטטוטורי ורישוי */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Image (right in RTL = appears first) */}
            <div className="lg:col-span-7 order-2 lg:order-1 relative">
              <div className="aspect-[4/3] bg-surface-container-highest overflow-hidden">
                <img
                  src="/images/projects/shacham-entrance.jpg"
                  alt="ליווי סטטוטורי ורישוי - כניסה לבית חדש"
                  className="w-full h-full object-cover img-grayscale"
                />
              </div>
            </div>
            {/* Text (left in RTL) */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-8">
              <div className="w-16 h-16 bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>gavel</span>
              </div>
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">ניווט בבירוקרטיה</span>
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">תוספות בניה ושיפוצים</h2>
              <div className="space-y-5 text-secondary text-lg leading-relaxed">
                <p>
                  המשפחה גדלה והצרכים השתנו? עיצוב הבית כבר לא מתאים לכם? אני מתמחה בחיבור הרמוני בין הישן והחדש, ליצירת בית פרטי שלם, ללא תחושת "טלאים".
                </p>
                <p>
                  הליווי האדריכלי המקיף שלי כולל הכל: תכנון אדריכלי, רישוי, תכניות עבודה, עיצוב פנים ופיקוח עליון. יחד נהפוך את ביתכם למרחב פונקציונלי, נוח ומעוצב בדיוק לטעמכם.
                </p>
              </div>
              <div className="bg-primary/5 p-8 border-r-4 border-primary">
                <p className="text-primary font-headline font-bold text-lg leading-snug">
                  "הבירוקרטיה? בשבילי זו שגרה. בשבילכם - שקט נפשי."
                </p>
              </div>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  תכנון אדריכלי ורישוי
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  תכניות עבודה ועיצוב פנים
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  פיקוח עליון בשטח
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: פיקוח עליון */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Text (right in RTL) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="w-16 h-16 bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>engineering</span>
              </div>
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">בקרת איכות</span>
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">פיקוח עליון</h2>
              <div className="space-y-5 text-secondary text-lg leading-relaxed">
                <p>
                  כשהבנייה מתחילה, אני נמצאת שם. פיקוח עליון משמעו ביקורים סדירים באתר הבנייה כדי לוודא שכל מה שתוכנן על הנייר מבוצע בדיוק בשטח. אני עוקבת אחרי כל שלב - משלד הבניין ועד גימורים.
                </p>
                <p>
                  הפיקוח כולל בדיקת התאמה לתוכניות האדריכליות, מעקב אחר לוחות זמנים, ותיאום עם הקבלנים ובעלי המקצוע בשטח. המטרה: לוודא שהתוצאה הסופית תואמת את החזון שלכם ושלי.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-0 mt-4">
                <div className="p-6 bg-surface-container">
                  <span className="material-symbols-outlined text-2xl mb-3 block text-primary">visibility</span>
                  <h4 className="font-headline font-black text-sm uppercase mb-1 tracking-wide">ביקורות שטח</h4>
                  <p className="text-xs text-secondary leading-relaxed">מעקב שבועי אחר ההתקדמות.</p>
                </div>
                <div className="p-6 bg-surface-container-low">
                  <span className="material-symbols-outlined text-2xl mb-3 block text-primary">verified</span>
                  <h4 className="font-headline font-black text-sm uppercase mb-1 tracking-wide">בקרת איכות</h4>
                  <p className="text-xs text-secondary leading-relaxed">בדיקות בכל שלב בנייה.</p>
                </div>
              </div>
            </div>
            {/* Image (left in RTL) */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[4/3] bg-surface-container overflow-hidden">
                <img
                  src="/images/projects/katznelson-aerial.jpg"
                  alt="פיקוח עליון על בנייה - מבט אווירי על פרויקט"
                  className="w-full h-full object-cover img-grayscale"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-outline/10 blueprint-grid hidden md:block -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: עיצוב פנים */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Image (right in RTL = appears first) */}
            <div className="lg:col-span-7 order-2 lg:order-1 relative">
              <div className="aspect-[4/3] bg-surface-container-highest overflow-hidden">
                <img
                  src="/images/projects/vanish-bedroom.jpg"
                  alt="עיצוב פנים - חדר שינה מעוצב"
                  className="w-full h-full object-cover img-grayscale"
                />
              </div>
              <div className="absolute -top-8 -right-8 bg-primary p-8 text-white hidden md:block max-w-xs">
                <p className="font-headline font-bold text-lg leading-snug">עיצוב שמרגיש כמו בבית.</p>
              </div>
            </div>
            {/* Text (left in RTL) */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-8">
              <div className="w-16 h-16 bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>palette</span>
              </div>
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">אסתטיקה ופונקציה</span>
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">שירותים נוספים</h2>
              <div className="space-y-5 text-secondary text-lg leading-relaxed">
                <p>
                  כדי להעניק לכם מעטפת מלאה וחוויה נוחה של ONE STOP SHOP, אני מציעה שירותים משלימים לתכנון האדריכלי.
                </p>
                <p>
                  שירותי המשרד כוללים ייעוץ ובדיקת נכסים לפני רכישה, והפקת דו"חות למיקסום הפוטנציאל של המגרש. במקרים שבהם רוצים להוסיף זכויות בנייה, אני עורכת תכנית בניין עיר (תב"ע) להשבחת הנכס. עיצוב פנים מלא או חלקי נותן את המגע הסופי והאישי לביתכם.
                </p>
              </div>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  ייעוץ ובדיקת נכסים לפני רכישה
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  תכנית בניין עיר (תב"ע) להשבחת נכס
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  עיצוב פנים מלא או חלקי
                </li>
                <li className="flex items-center gap-3 text-base text-primary">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  דו"חות למיקסום פוטנציאל המגרש
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Free Guide CTA */}
      <section className="py-24 md:py-32 px-8 bg-surface-container">
        <div className="max-w-5xl mx-auto">
          <div className="bg-surface p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full blueprint-grid opacity-30 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-5xl" style={{fontVariationSettings:"'FILL' 1"}}>menu_book</span>
                </div>
              </div>
              <div className="flex flex-col gap-6 text-center lg:text-right">
                <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">מתנה מהמשרד</span>
                <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">
                  כלים לתכנון חכם – להורדה בחינם
                </h2>
                <p className="text-secondary text-lg leading-relaxed max-w-xl">
                  מדריך מקיף שיעזור לכם להתכונן לתהליך בניית הבית - טיפים מקצועיים, רשימות בדיקה וכל מה שצריך לדעת לפני שמתחילים.
                </p>
                <div className="mt-4">
                  <a href="https://n.sendmsg.co.il/f29111/Guide1a" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 font-headline font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all group">
                    הורידו את המדריך חינם
                    <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">הצעד הבא</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tight leading-[0.95] text-white">
            בואו נתחיל לתכנן
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            כל פרויקט מתחיל בשיחה. ספרו לי על הבית שאתם חולמים עליו ונגשים יחד לעבודה.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 mt-6">
            <Link to="/contact" className="inline-flex items-center justify-center gap-4 bg-white text-primary px-12 py-5 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors group">
              דברו איתי
              <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
            </Link>
            <Link to="/projects" className="inline-flex items-center justify-center gap-4 bg-white/10 text-white px-12 py-5 font-headline font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-colors">
              צפו בפרויקטים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
