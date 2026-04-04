import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ArchFrame from '../components/ArchFrame';

export default function About() {
  useScrollReveal();

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
          <div className="relative z-10 space-y-8 reveal">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">אודות</span>
            <h1 className="font-headline font-black text-6xl md:text-7xl lg:text-8xl text-white leading-[0.88] tracking-tight">
              טל<br />גורן
            </h1>
            <p className="font-body text-lg text-white/60 max-w-sm leading-relaxed">
              אדריכלית מורשית היתר ומעצבת פנים — למעלה מ-25 שנות ניסיון בתכנון בתים פרטיים
            </p>
            <div className="flex gap-12 pt-8 border-t border-white/10">
              <div>
                <span className="font-headline font-black text-5xl text-white block leading-none">25+</span>
                <span className="font-label text-[10px] text-white/40 uppercase tracking-widest mt-2 block">שנות ניסיון</span>
              </div>
              <div>
                <span className="font-headline font-black text-5xl text-white block leading-none">100+</span>
                <span className="font-label text-[10px] text-white/40 uppercase tracking-widest mt-2 block">בתים</span>
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
        <div className="max-w-5xl mx-auto reveal">
          <span className="font-headline text-8xl text-surface-container-highest leading-none select-none block">&ldquo;</span>
          <blockquote className="font-headline font-black text-3xl md:text-4xl lg:text-5xl text-primary leading-tight tracking-tight -mt-6">
            אני מאמינה שבית טוב הוא כזה שגדל עם המשפחה — לא נגדה.
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
            <div className="lg:col-span-7 reveal space-y-8">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">הסיפור שלי</span>
              <div className="space-y-6 font-body text-secondary text-lg leading-relaxed">
                <p>
                  אני אדריכלית שמתמחה בתכנון בתים פרטיים למשפחות באזור השרון הצפוני. עם ניסיון של מעל 25 שנה ותכנון של למעלה ממאה בתים, אני מאמינה שבית הוא אחד המסעות המשמעותיים ביותר שמשפחה יכולה לעבור — והזכות ללוות אתכם בו היא מה שהופך את האדריכלות לתשוקה שלי.
                </p>
                <p>
                  כאמא לשלושה בנים בוגרים, חוויתי בעצמי שלבים רבים בחיי המשפחה. אני יודעת שהחיים הם דינמיים ושהצרכים שלנו משתנים כל הזמן — הבנה שעיצבה את כל הפילוסופיה התכנונית שלי.
                </p>
              </div>
            </div>

            {/* Credentials card */}
            <div className="lg:col-span-5 reveal">
              <div className="bg-surface-container-low p-10 space-y-2">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary block mb-6">השכלה ורישיונות</span>
                {[
                  { icon: 'workspace_premium', title: 'בוגרת הטכניון בהצטיינות', sub: 'פקולטה לאדריכלות, הנדסאית בהצטיינות יתרה' },
                  { icon: 'verified', title: 'אדריכלית רשויה ומורשית היתר', sub: 'הדרגה המקצועית הגבוהה ביותר בישראל' },
                  { icon: 'groups', title: 'ארגון האדריכלים ובוני ערים', sub: 'חברה פעילה ורשומה' },
                  { icon: 'business_center', title: 'ארגון המהנדסים העצמאיים', sub: 'חברה פעילה' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-5 border-b border-outline/10 last:border-0">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-headline font-bold text-sm text-primary">{item.title}</p>
                      <p className="font-label text-xs text-secondary mt-1 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ======== PHILOSOPHY ======== */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <div className="reveal mb-20">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">הגישה שלי</span>
            <h2 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.88] text-primary mt-4 max-w-2xl">
              בית שגדל<br />עם המשפחה
            </h2>
            <p className="font-body text-lg text-secondary leading-relaxed max-w-2xl mt-6">
              הגישה שלי מושתתת על עיקרון אחד מרכזי: לתכנן בית יעיל, פרקטי וגמיש שיודע להתאים את עצמו לשינויים בחיים. ניצול מקסימלי של שטח ותקציב, ללא "שטחים מתים".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 stagger">
            {[
              {
                n: '01',
                icon: 'person',
                title: 'ליווי אישי וסבלני',
                text: 'אני יודעת שתהליך בנייה יכול להיות מורכב ומלחיץ. התפקיד שלי הוא להפוך אותו עבורכם לחוויה חיובית, רגועה וברורה. כל משפחה מקבלת את מלוא תשומת הלב שלי.',
              },
              {
                n: '02',
                icon: 'straighten',
                title: 'הקשבה עמוקה',
                text: 'אני לא באה עם אג\'נדה עיצובית משלי. אני באה להקשיב לכם, ללמוד אתכם, ולתרגם את החלומות והצרכים הייחודיים שלכם לבית שתפור בדיוק למידותיכם.',
              },
              {
                n: '03',
                icon: 'forum',
                title: 'גמישות מלאה',
                text: 'הגמישות מלווה את כל העבודה שלי. אני מתאימה את עצמי לכל סגנון עיצובי שתבחרו, ויודעת לתכנן בכל שיטות הבניה הקיימות.',
              },
            ].map((v) => (
              <div key={v.n} className="reveal group relative bg-surface p-12 lg:p-16 card-hover overflow-hidden">
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
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden reveal">
        <div className="absolute inset-0 bg-primary/95" />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">בואו נדבר</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tight leading-[0.95] text-white">
            מוכנים להתחיל?<br />בואו נדבר.
          </h2>
          <p className="font-body text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
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
