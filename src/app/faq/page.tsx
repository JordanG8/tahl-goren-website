import Link from 'next/link';
import { siteData } from '@/data/siteData';
import Breadcrumb from '@/components/Breadcrumb';

export default async function Faq() {
  const faq = siteData.faq;

  return (
    <>

        {/* Page Header */}
        <section className="py-16 px-8 bg-surface">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[
              { label: 'ראשי', to: '/' },
              { label: 'שאלות ותשובות' },
            ]} />
            <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
              שאלות<br/>נפוצות
            </h1>
            <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
              כל מה שרציתם לדעת על תהליך התכנון האדריכלי, עלויות וליווי הפרויקט.
            </p>
            <div className="w-16 h-[2px] bg-secondary mt-10"></div>
          </div>
        </section>

        {/* FAQ Content with Background Effect */}
        <section className="relative py-24 px-8 overflow-hidden">
          {/* Pretty Background Effect */}
          <div className="bg-mesh-container">
            <div className="mesh-blob mesh-blob-1"></div>
            <div className="mesh-blob mesh-blob-2"></div>
            <div className="mesh-blob mesh-blob-3"></div>
            <div className="noise-overlay"></div>
            <div className="absolute inset-0 blueprint-grid opacity-[0.03]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10" id="full-faq-container">
            <div className="faq-grid">
              {faq.map((item: any, index: number) => (
                <div key={index} className="faq-card">
                  <h3 className="font-headline font-bold text-2xl text-primary leading-tight">
                    {item.question}
                  </h3>
                  <p className="font-body text-base text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-24 p-12 bg-primary text-white text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
              <div className="relative z-10">
                <h3 className="font-headline font-black text-4xl md:text-5xl mb-6">יש לכם שאלה נוספת?</h3>
                <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">אני זמינה לכל שאלה והתייעצות. בואו נדבר ונבין איך אני יכולה לעזור לכם להגשים את החלום.</p>
                <Link href="/contact" className="inline-block bg-white text-primary px-16 py-5 font-headline font-bold text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-all hover:scale-105 active:scale-95">
                  צרו קשר עכשיו
                </Link>
              </div>
            </div>
          </div>
        </section>

    </>
  );
}
