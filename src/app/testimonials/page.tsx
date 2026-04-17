import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function Testimonials() {
  return (
    <>
      {/* Header */}
      <section className="py-20 md:py-28 px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: 'ראשי', to: '/' },
            { label: 'לקוחות מספרים' },
          ]} />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-5xl">
            מה אומרים עלינו
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-8">
            הביקורות של הלקוחות שלנו בגוגל מדברות בעד עצמן. מוזמנים לקרוא, ולהשאיר ביקורת משלכם.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10"></div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="py-16 md:py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="w-full aspect-[16/9] min-h-[600px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.8!2d34.89!3d32.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z15HXnCDXkteV16jXnyDXkNeT16jXmdeb15zXldeq!5e0!3m2!1siw!2sil!4v1700000000000!5m2!1siw!2sil"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="טל גורן אדריכלות - Google Maps"
            />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://www.google.com/maps/place/%D7%98%D7%9C+%D7%92%D7%95%D7%A8%D7%9F+%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors group"
            >
              <span>צפו בביקורות בגוגל</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </a>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJK0RFMitzHRURiLbVxpKnxyQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-primary text-primary px-10 py-4 font-headline font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors group"
            >
              <span>השאירו ביקורת</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">edit</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border-2 border-primary text-primary px-10 py-4 font-headline font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors group"
            >
              <span>סיום ותעודת גמר</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden">
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
