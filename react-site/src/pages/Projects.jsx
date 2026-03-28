import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { siteData } from '../data/siteData';
import Breadcrumb from '../components/Breadcrumb';

export default function Projects() {
  useScrollReveal();

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-8 lg:px-12 max-w-[1920px] mx-auto">
        <div className="reveal">
          <Breadcrumb current="פרויקטים" />
          <h1 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl text-primary leading-tight mb-4">פרויקטים נבחרים</h1>
          <p className="font-body text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">מבט על פרויקטים שתכננו ועיצבנו - בתים פרטיים, שיפוצים והרחבות באזור גבעת עדה, בנימינה, זכרון יעקב והסביבה.</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="reveal px-8 lg:px-12 pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {siteData.projects.map((project) => (
            <a
              key={project.id}
              href={project.originalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group block relative overflow-hidden card-hover"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover img-grayscale"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-primary px-4 py-3 flex justify-between items-center">
                <div className="flex flex-col text-right">
                  <h3 className="font-headline font-light text-[10px] sm:text-[11px] text-white uppercase tracking-[0.15em] leading-tight">{project.title}</h3>
                  <span className="font-label text-white/50 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] mt-0.5">{project.location}</span>
                </div>
                <span className="material-symbols-outlined text-white text-sm translate-x-0 group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="blueprint-grid bg-surface-container-low">
        <div className="px-8 lg:px-12 py-24 md:py-32 max-w-[1920px] mx-auto text-center reveal">
          <h2 className="font-headline font-black text-3xl md:text-5xl text-primary mb-6">יש לכם פרויקט?</h2>
          <p className="font-body text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">בואו נדבר על הבית שאתם חולמים עליו. נשמח להכיר, להקשיב ולהתחיל לתכנן יחד.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
            <span>בואו נדבר</span>
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
        </div>
      </section>
    </>
  );
}
