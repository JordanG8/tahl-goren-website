import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { siteData } from '../data/siteData';
import Breadcrumb from '../components/Breadcrumb';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsCompleted() {
  useScrollReveal();

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-8 lg:px-12 max-w-[1920px] mx-auto">
        <div className="reveal">
          <Breadcrumb items={[
            { label: 'ראשי', to: '/' },
            { label: 'פרויקטים', to: '/projects' },
            { label: 'בתים מאוכלסים' },
          ]} />
          <h1 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl text-primary leading-tight mb-4">בתים מאוכלסים</h1>
          <p className="font-body text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">מרגש אותי כל פעם מחדש לראות איך תכנון יעיל וגמיש הופך לבית אמיתי ומלא חיים. מוזמנים להתרשם בגלריה מבתים שכבר הפכו לקן חם ונעים, ולראות כיצד כל בית שונה לגמרי מהאחרים – כי הוא משקף את הסיפור, הטעם והאופי הייחודי של כל משפחה.</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="reveal px-8 lg:px-12 pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {siteData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
