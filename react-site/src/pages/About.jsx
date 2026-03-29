import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumb from '../components/Breadcrumb';

export default function About() {
  useScrollReveal();

  return (
    <>

        {/* Page Header with Breadcrumb */}
        <section className="py-16 px-8 bg-surface reveal">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb current="אודות" />
            <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
              טל גורן<br/>אדריכלית ומעצבת פנים
            </h1>
            <div className="w-16 h-[2px] bg-secondary mt-10"></div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-20 md:py-32 px-8 bg-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Photo */}
            <div className="lg:col-span-5 reveal">
              <div className="relative">
                <div className="aspect-[3/4] bg-surface-container overflow-hidden img-reveal">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACbE9Cnfjo1iORbficNIsPOn91AeTraXJqWJf0MFabjk-dFJEYfX6xONs5bxxv8KXm3EteJHeyOnm-hsfMq4h3sfF83LfTCt4XY09VoCkKEE-U2_E10hKB9wuzb2WP7xtruIXkyW6WAy5VdO0m9j5YJpAGArZS-mqdzVgty0sk4OrFy2oe6OX-C9EmklPUU-Fs2zPuwJ9UzIXH10pD0TQpqbpYf79La6XBQZ2EUII7-r-81jitIdTo7gmw6Da24Y9gzm5l_EX0w8gx"
                    alt="טל גורן - אדריכלית"
                    className="w-full h-full object-cover img-grayscale"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-outline/10 blueprint-grid hidden md:block -z-10"></div>
              </div>
            </div>
            {/* Text */}
            <div className="lg:col-span-7 flex flex-col gap-8 reveal">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">מי אני</span>
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">
                שלום, שמי טל גורן ואני עוסקת באדריכלות כבר משנת 1998.
              </h2>
              <div className="space-y-6 text-secondary text-lg leading-relaxed">
                <p>
                  כיום אני אדריכלית רשויה וחברה בארגון האדריכלים ובוני ערים בישראל, וכן גם בארגון המהנדסים והאדריכלים העצמאיים בישראל.
                </p>
                <p>
                  חשוב לי מאד שהבתים שאני מתכננת יהיו לא רק יפים ומעוצבים, אלא גם גמישים, יעילים ופרקטיים.
                </p>
                <p>
                  בשנים האחרונות תכננתי עשרות בתים, וצברתי ניסיון רב. אשמח להעמיד לשירותכם את הניסיון הזה, ולתכנן גם עבורכם את בית החלומות שלכם.
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-[2px] bg-secondary"></div>
                <span className="font-headline font-bold text-sm text-primary">טל גורן, אדריכלית</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="py-20 px-8 bg-surface-container-low">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 stagger">
            {/* Stat 1 */}
            <div className="text-center reveal p-12 bg-surface">
              <div className="font-headline font-black text-7xl md:text-8xl text-primary mb-4">
                <span data-count="25" data-suffix="+">0</span>
              </div>
              <div className="w-8 h-[2px] bg-secondary mx-auto mb-4"></div>
              <p className="font-headline font-bold text-sm uppercase tracking-[0.15em] text-secondary">שנות ניסיון</p>
            </div>
            {/* Stat 2 */}
            <div className="text-center reveal p-12 bg-surface">
              <div className="font-headline font-black text-7xl md:text-8xl text-primary mb-4">
                <span data-count="100" data-suffix="+">0</span>
              </div>
              <div className="w-8 h-[2px] bg-secondary mx-auto mb-4"></div>
              <p className="font-headline font-bold text-sm uppercase tracking-[0.15em] text-secondary">פרויקטים שהושלמו</p>
            </div>
            {/* Stat 3 */}
            <div className="text-center reveal p-12 bg-surface">
              <div className="font-headline font-black text-7xl md:text-8xl text-primary mb-4">
                <span data-count="98" data-suffix="%">0</span>
              </div>
              <div className="w-8 h-[2px] bg-secondary mx-auto mb-4"></div>
              <p className="font-headline font-bold text-sm uppercase tracking-[0.15em] text-secondary">שביעות רצון לקוחות</p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 md:py-32 px-8 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 reveal">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">הגישה שלי</span>
              <h2 className="font-headline font-black text-5xl md:text-6xl tracking-tight leading-tight text-primary mt-4">הפילוסופיה שלי</h2>
              <p className="text-secondary text-lg leading-relaxed max-w-2xl mt-6">
                כל פרויקט מתחיל בהקשבה ומסתיים בבית שמרגיש כמו הארכה טבעית של החיים שלכם.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 stagger">
              {/* Value 1 */}
              <div className="reveal p-12 bg-surface-container group card-hover relative">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-white text-3xl">person</span>
                </div>
                <h3 className="font-headline font-black text-2xl text-primary mb-4">תשומת לב אישית</h3>
                <p className="text-secondary leading-relaxed">
                  כל לקוח מקבל את מלוא תשומת הלב שלי. אני מקפידה לא לקחת פרויקטים רבים מדי בו-זמנית, כדי שכל משפחה תרגיש שהיא במרכז. הקשר האישי הוא הבסיס לתכנון מוצלח.
                </p>
                <div className="w-full h-[2px] bg-outline/10 absolute bottom-0 left-0 group-hover:bg-primary transition-colors duration-500"></div>
              </div>
              {/* Value 2 */}
              <div className="reveal p-12 bg-surface-container-low group card-hover relative">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-white text-3xl">straighten</span>
                </div>
                <h3 className="font-headline font-black text-2xl text-primary mb-4">תכנון פרקטי</h3>
                <p className="text-secondary leading-relaxed">
                  בית יפה הוא חשוב, אבל בית שעובד נכון הוא קריטי. אני מתכננת כל חדר ופינה כך שישרתו את החיים היומיומיים שלכם, עם פתרונות אחסון חכמים ומעברים נוחים.
                </p>
                <div className="w-full h-[2px] bg-outline/10 absolute bottom-0 left-0 group-hover:bg-primary transition-colors duration-500"></div>
              </div>
              {/* Value 3 */}
              <div className="reveal p-12 bg-surface-container group card-hover relative">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-white text-3xl">forum</span>
                </div>
                <h3 className="font-headline font-black text-2xl text-primary mb-4">תקשורת כנה</h3>
                <p className="text-secondary leading-relaxed">
                  אני מאמינה בשקיפות מלאה. תמיד תדעו איפה הפרויקט עומד, מה התקציב המעודכן, ומה האתגרים שעלו. ללא הפתעות, ללא עלויות נסתרות.
                </p>
                <div className="w-full h-[2px] bg-outline/10 absolute bottom-0 left-0 group-hover:bg-primary transition-colors duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-6xl mx-auto reveal">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">השתייכות מקצועית</span>
                <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary mt-4">חברויות וארגונים</h2>
                <p className="text-secondary text-lg leading-relaxed mt-6">
                  אני גאה להיות חלק מהגופים המקצועיים המובילים בישראל בתחום האדריכלות והבנייה.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  <div className="p-10 bg-surface flex items-start gap-6 group card-hover">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-base text-primary mb-2">ארגון האדריכלים ובוני ערים בישראל</h4>
                      <p className="font-label text-sm text-secondary leading-relaxed">חברה פעילה ורשומה בארגון המקצועי המוביל.</p>
                    </div>
                  </div>
                  <div className="p-10 bg-surface-container flex items-start gap-6 group card-hover">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-base text-primary mb-2">ארגון המהנדסים והאדריכלים העצמאיים</h4>
                      <p className="font-label text-sm text-secondary leading-relaxed">חברה בארגון המייצג אנשי מקצוע עצמאיים.</p>
                    </div>
                  </div>
                  <div className="p-10 bg-surface-container flex items-start gap-6 group card-hover">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl">school</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-base text-primary mb-2">אדריכלית רשויה</h4>
                      <p className="font-label text-sm text-secondary leading-relaxed">בעלת רישיון אדריכלות מאז 1998.</p>
                    </div>
                  </div>
                  <div className="p-10 bg-surface flex items-start gap-6 group card-hover">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-base text-primary mb-2">התמחות בבתים פרטיים</h4>
                      <p className="font-label text-sm text-secondary leading-relaxed">עשרות בתים פרטיים שתוכננו ונבנו ברחבי הארץ.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden reveal">
          <div className="absolute inset-0 bg-primary/95"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">בואו נדבר</span>
            <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tight leading-[0.95] text-white">
              מוכנים להתחיל?<br/>בואו נדבר.
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              אשמח לשמוע על הפרויקט שלכם ולבחון איך אוכל לעזור לכם להגשים את החזון.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-4 bg-white text-primary px-12 py-5 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors group">
              צרו קשר עכשיו
              <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
            </Link>
          </div>
        </section>

    </>
  );
}
