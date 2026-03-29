import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumb from '../components/Breadcrumb';

export default function Contact() {
  useScrollReveal();

  return (
    <>
        {/* Header */}
        <section className="py-20 px-8 bg-surface reveal">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[0.9] text-primary">
              בואו נדבר.
            </h1>
            <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-8">
              הבית הבא שלכם מתחיל בשיחה. אני כאן כדי להקשיב לחלומות שלכם, להבין את הצרכים ולצאת יחד למסע של תכנון ויצירה.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

              {/* Contact Info */}
              <div className="reveal space-y-16">
                <div className="space-y-12">
                  <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <span className="material-symbols-outlined text-3xl">call</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-xs uppercase tracking-[0.2em] text-secondary mb-2">טלפון</h3>
                      <a href="tel:0528345799" className="font-headline font-black text-2xl text-primary hover:text-secondary transition-colors">052-8345799</a>
                    </div>
                  </div>

                  <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <span className="material-symbols-outlined text-3xl">mail</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-xs uppercase tracking-[0.2em] text-secondary mb-2">אימייל</h3>
                      <a href="mailto:tahl.goren.arch@gmail.com" className="font-headline font-black text-2xl text-primary hover:text-secondary transition-colors break-all">tahl.goren.arch@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <span className="material-symbols-outlined text-3xl">location_on</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-xs uppercase tracking-[0.2em] text-secondary mb-2">המשרד</h3>
                      <p className="font-headline font-black text-2xl text-primary">רחוב האשכול 13, גבעת עדה</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="aspect-video bg-surface-container-low overflow-hidden relative">
                  <iframe
                    title="מיקום המשרד - רחוב האשכול 13, גבעת עדה"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.0!2d34.95!3d32.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z16jXl9eV15Eg15TXkNep15vXldecIDEzLCDXktteqdeqINei15PXlA!5e0!3m2!1siw!2sil!4v1700000000000"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div className="reveal bg-surface-container p-12 md:p-20">
                <h2 className="font-headline font-black text-4xl text-primary mb-12">שלחו הודעה</h2>
                <form className="space-y-8" action="#" method="POST">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">שם מלא</label>
                    <input type="text" id="name" name="name" required className="w-full bg-transparent border-0 border-b-2 border-primary/10 py-4 px-0 focus:ring-0 focus:border-primary transition-colors font-body text-primary placeholder:text-primary/20" placeholder="איך לקרוא לכם?" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">טלפון</label>
                    <input type="tel" id="phone" name="phone" required className="w-full bg-transparent border-0 border-b-2 border-primary/10 py-4 px-0 focus:ring-0 focus:border-primary transition-colors font-body text-primary placeholder:text-primary/20" placeholder="איפה אפשר להשיג אתכם?" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">אימייל</label>
                    <input type="email" id="email" name="email" required className="w-full bg-transparent border-0 border-b-2 border-primary/10 py-4 px-0 focus:ring-0 focus:border-primary transition-colors font-body text-primary placeholder:text-primary/20" placeholder="כתובת האימייל שלכם" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">הודעה</label>
                    <textarea id="message" name="message" rows="4" required className="w-full bg-transparent border-0 border-b-2 border-primary/10 py-4 px-0 focus:ring-0 focus:border-primary transition-colors font-body text-primary placeholder:text-primary/20 resize-none" placeholder="ספרו לי קצת על הפרויקט..." />
                  </div>

                  <div className="pt-8">
                    <button type="submit" className="w-full bg-primary text-white py-6 font-headline font-black text-sm uppercase tracking-[0.3em] hover:opacity-90 transition-all flex items-center justify-center gap-4 group">
                      שלחו הודעה
                      <span className="material-symbols-outlined group-hover:translate-x-[-8px] transition-transform">arrow_back</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>
    </>
  );
}
