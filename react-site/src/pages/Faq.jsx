import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumb from '../components/Breadcrumb';
import { siteData } from '../data/siteData';

export default function Faq() {
  useScrollReveal();

  return (
    <>

        {/* Page Header */}
        <section className="py-16 px-8 bg-surface reveal">
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

        {/* FAQ Content */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-4xl mx-auto stagger" id="full-faq-container">
            {siteData.faq.map((item, index) => (
              <details key={index} className="faq-item reveal bg-surface mb-4">
                <summary>
                  <span className="font-headline font-bold text-xl text-primary leading-relaxed pl-4">{item.question}</span>
                  <span className="material-symbols-outlined faq-chevron text-2xl">expand_more</span>
                </summary>
                <div className="faq-answer">
                  <p className="font-body text-base text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}

            <div className="mt-12 p-10 bg-primary text-white reveal text-center">
              <h3 className="font-headline font-black text-3xl mb-4">יש לכם שאלה נוספת?</h3>
              <p className="text-white/70 mb-8">אני זמינה לכל שאלה והתייעצות. בואו נדבר.</p>
              <Link to="/contact" className="inline-block bg-white text-primary px-12 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
                צרו קשר עכשיו
              </Link>
            </div>
          </div>
        </section>

    </>
  );
}
