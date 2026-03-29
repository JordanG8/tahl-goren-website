import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumb from '../components/Breadcrumb';

export default function Testimonials() {
  useScrollReveal();

  return (
    <>

        {/* Header */}
        <section className="py-20 md:py-28 px-8 bg-surface reveal">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[
              { label: 'ראשי', to: '/' },
              { label: 'לקוחות מספרים' },
            ]} />
            <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-5xl">
              סיפורי הצלחה ובתים<br/>שמתחילים באדם.
            </h1>
            <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-8">
              מאחורי כל בית עומדת משפחה עם חלום. הנה כמה מהסיפורים של משפחות שבחרו לבנות איתי ולהפוך את החזון שלהן למציאות.
            </p>
            <div className="w-16 h-[2px] bg-secondary mt-10"></div>
          </div>
        </section>

        {/* Testimonial Grid - Asymmetric Layout */}
        <section className="py-16 md:py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto space-y-0">

            {/* Card 1: Featured large card with image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 reveal">
              {/* Image side */}
              <div className="aspect-[4/3] lg:aspect-auto bg-surface-container overflow-hidden img-reveal">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvWg3UZ6dNKaXX9yYdrTyr-FgVOWgsI-B34lqaiTQMh8Dx0WPxjvO_2mnQcV73GQjBCjnG_1n-PA957A0llGDTBPCBtQdTp2AdoCsrO22x6XAR_RVBgbgWydhWczt2YA1f_s6i_xNDampRmtmWo1fJlJdXRVAxT599oDQJTsAnVw88EAxqNIV-Um06Zz2bOZwF2NuKe4Gk_gUlZM7LRKK7iytDeRkkow-Np4DnWpbMCF3AJc7bqDzxw7JghhTQ9BtBQf9avj7g9xDL"
                  alt="בית משפחת כהן - תכנון אדריכלי"
                  className="w-full h-full object-cover img-grayscale"
                />
              </div>
              {/* Quote side */}
              <div className="bg-surface-container p-12 md:p-16 lg:p-20 flex flex-col justify-center gap-8">
                <span className="material-symbols-outlined text-5xl text-primary/15">format_quote</span>
                <blockquote className="font-headline text-2xl md:text-3xl font-black leading-tight tracking-tight text-primary">
                  "טל ליוותה אותנו בתהליך הארוך והמורכב של הרישוי מול הוועדה המקומית. היא ידעה בדיוק מה צריך, טיפלה בכל הבירוקרטיה, ונתנה לנו שקט נפשי מוחלט. בלעדיה אנחנו לא יודעים איך היינו מתמודדים."
                </blockquote>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-12 h-[2px] bg-secondary"></div>
                  <div>
                    <cite className="not-italic font-headline font-black text-lg text-primary block">משפחת כהן</cite>
                    <span className="font-label text-xs text-secondary uppercase tracking-[0.2em]">ליווי סטטוטורי ותכנון</span>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
              </div>
            </div>

            {/* Cards 2 & 3: Two column row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 stagger">
              {/* Card 2: משפחת לוי */}
              <div className="bg-surface-container-low p-12 md:p-16 flex flex-col justify-between gap-8 reveal card-hover">
                <div>
                  <span className="material-symbols-outlined text-4xl text-primary/15 mb-6 block">format_quote</span>
                  <blockquote className="font-headline text-xl md:text-2xl font-black leading-tight tracking-tight text-primary">
                    "תהליך הבנייה עם טל היה פשוט אחרת. השקט הנפשי שקיבלנו לאורך כל הדרך הבירוקרטית והליווי בשטח הפכו את החוויה למרגשת במקום מלחיצה. הרגשנו בטוחים בכל שלב."
                  </blockquote>
                </div>
                <div>
                  <div className="flex gap-1 mb-4">
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-secondary"></div>
                    <div>
                      <cite className="not-italic font-headline font-black text-lg text-primary block">משפחת לוי, גבעת עדה</cite>
                      <span className="font-label text-xs text-secondary uppercase tracking-[0.2em]">פרויקט מגורים</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: משפחת מזרחי (with image) */}
              <div className="bg-surface-container relative overflow-hidden reveal card-hover">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNE2N2wdYhtDy6oImkEwwIPyL0xqxhk8l-phGy8pM2APN0jmorWalEvqvokpHGWL0uHmKA9m4fw6XXTzLSnU3RE-EQAp7BpL_bQwXjI4YM679LTTt8r2RYM0y6jAD0d3aDAOzBREl-jS6gb1Ir85vaMpn7Q9wFho5wz6YV-wtrb5I_XX_-vI7dwo8AylXrncauw6RMeqIUaw2pS3mSkZRA-q4yPzoF2YOT5HlyPkczQeC_fVpoBD4XgV7FhPsWar2wgNZejBGZ6gwE"
                    alt="בית משפחת מזרחי - עיצוב פנים"
                    className="w-full h-full object-cover img-grayscale"
                  />
                </div>
                <div className="p-12 md:p-14">
                  <span className="material-symbols-outlined text-4xl text-primary/15 mb-4 block">format_quote</span>
                  <blockquote className="font-headline text-xl md:text-2xl font-black leading-tight tracking-tight text-primary mb-6">
                    "הבית שטל תכננה לנו מרגיש כמו חיבוק. כל פינה חושבת, כל חלל נושם. היא הקשיבה לכל בקשה קטנה שלנו והפכה אותה למשהו גדול ומרגש."
                  </blockquote>
                  <div className="flex gap-1 mb-4">
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-secondary"></div>
                    <div>
                      <cite className="not-italic font-headline font-black text-lg text-primary block">משפחת מזרחי</cite>
                      <span className="font-label text-xs text-secondary uppercase tracking-[0.2em]">תכנון ועיצוב פנים</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Horizontal full-width card */}
            <div className="reveal">
              <div className="bg-surface-container-low p-12 md:p-16 lg:p-20 card-hover">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-8">
                    <span className="material-symbols-outlined text-5xl text-primary/15 mb-6 block">format_quote</span>
                    <blockquote className="font-headline text-2xl md:text-3xl font-black leading-tight tracking-tight text-primary">
                      "מה שמייחד את טל זו תשומת הלב לפרטים הקטנים. שקע במקום הנכון, מדף בגובה המושלם, חלון שתופס בדיוק את אור השקיעה. היא חושבת על דברים שאנחנו לא חשבנו עליהם."
                    </blockquote>
                  </div>
                  <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
                    <div className="flex gap-1">
                      <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-[2px] bg-secondary"></div>
                      <div>
                        <cite className="not-italic font-headline font-black text-lg text-primary block">משפחת גולדשטיין</cite>
                        <span className="font-label text-xs text-secondary uppercase tracking-[0.2em]">תכנון בית פרטי</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Full-width dark card */}
            <div className="reveal">
              <div className="bg-primary relative overflow-hidden">
                <div className="absolute inset-0 blueprint-grid opacity-5"></div>
                <div className="relative z-10 p-12 md:p-16 lg:p-24">
                  <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
                    <span className="material-symbols-outlined text-7xl text-white/15">format_quote</span>
                    <blockquote className="font-headline text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                      "בחרנו בטל בגלל הניסיון העשיר שלה, ומהר מאוד הבנו שקיבלנו הרבה יותר מאדריכלית. קיבלנו שותפה אמיתית שנלחמת עבורנו, שמנווטת את הדרך, ושלא מוותרת על שום פרט."
                    </blockquote>
                    <div className="flex gap-1 mt-2">
                      <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="w-12 h-[2px] bg-white/30"></div>
                      <div>
                        <cite className="not-italic font-headline font-black text-xl text-white block">משפחת רז</cite>
                        <span className="font-label text-xs text-white/50 uppercase tracking-[0.2em]">ליווי מלא מהיתר ועד מפתח</span>
                      </div>
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
            <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">הסיפור הבא</span>
            <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tight leading-[0.95] text-white">
              בואו נבנה גם את<br/>הסיפור שלכם.
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              כל בית שתכננתי התחיל בשיחה. ספרו לי על החלום שלכם ונהפוך אותו יחד למציאות.
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
