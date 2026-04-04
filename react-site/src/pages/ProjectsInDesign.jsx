import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumb from '../components/Breadcrumb';

const designProjects = [
  // Placeholder — will be populated with actual renders from Tahl's materials
];

export default function ProjectsInDesign() {
  useScrollReveal();

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-8 lg:px-12 max-w-[1920px] mx-auto">
        <div className="reveal">
          <Breadcrumb items={[
            { label: 'ראשי', to: '/' },
            { label: 'פרויקטים', to: '/projects' },
            { label: 'בתים בתכנון' },
          ]} />
          <h1 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl text-primary leading-tight mb-4">בתים בתכנון</h1>
          <p className="font-body text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">כל בית היה פעם חלום של משפחה, והמשימה שלי היא לתרגם אותו לשרטוטים והדמיות. גלריה המציגה בתים שעדיין נמצאים על שולחן העבודה בשלבי תכנון וגיבוש. ההדמיות חושפות את התהליך שמאחורי הקלעים, וממחישות את החזון והפוטנציאל של כל פרויקט – רגע לפני שהוא הופך לאמיתי.</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="reveal px-8 lg:px-12 pb-24 max-w-[1920px] mx-auto">
        {designProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {designProjects.map((project) => (
              <div key={project.id} className="reveal group block relative overflow-hidden card-hover">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-primary px-4 py-3 flex justify-between items-center">
                  <div className="flex flex-col text-right">
                    <h3 className="font-headline font-light text-[10px] sm:text-[11px] text-white uppercase tracking-[0.15em] leading-tight">{project.title}</h3>
                    <span className="font-label text-white/50 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] mt-0.5">{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-low">
            <span className="material-symbols-outlined text-6xl text-secondary/30 mb-6 block">architecture</span>
            <h3 className="font-headline font-bold text-2xl text-primary mb-4">פרויקטים בתכנון</h3>
            <p className="text-secondary text-lg max-w-md mx-auto leading-relaxed">
              הדמיות של פרויקטים חדשים יעלו כאן בקרוב. בינתיים, מוזמנים לצפות בבתים המאוכלסים שלנו.
            </p>
            <Link to="/projects/completed" className="inline-flex items-center gap-2 mt-8 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>לבתים מאוכלסים</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="blueprint-grid bg-surface-container-low">
        <div className="px-8 lg:px-12 py-24 md:py-32 max-w-[1920px] mx-auto text-center reveal">
          <h2 className="font-headline font-black text-3xl md:text-5xl text-primary mb-6">רוצים לראות את הבית שלכם כאן?</h2>
          <p className="font-body text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">בואו נתחיל לתכנן יחד את הבית שאתם חולמים עליו.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
            <span>בואו נדבר</span>
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
        </div>
      </section>
    </>
  );
}
