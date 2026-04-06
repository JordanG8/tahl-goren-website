import { motion } from 'framer-motion';

const phases = [
  {
    id: '01',
    title: 'דבר ראשון: מרימים טלפון לטל',
    time: 'פגישה וקונספט',
    duration: 'חודש - חודשיים',
    description: 'מתקשרים אלינו, אנחנו יושבים יחד על כוס קפה. אתם מספרים לנו מה החלום שלכם מהבית, כמה ילדים צריכים חדרים, ומה אתם פחות אוהבים. אנחנו מקשיבים להכל ומתחילים לחשוב יחד.',
    icon: 'call',
    gantt: { start: 0, width: 15 } // represents roughly 1-2 months out of 24
  },
  {
    id: '02',
    title: 'דבר שני: בודקים מה מותר',
    time: 'רישוי והיתרים',
    duration: '6-12 חודשים',
    description: 'אחרי שהבנו מה רוצים, אני בודקת אצל האנשים החשובים בעיריה בדיוק מה מותר ומה אסור לבנות על השטח שלכם, ומשיגה לנו את כל האישורים שאנחנו צריכים כדי שאף אחד לא יכעס.',
    icon: 'verified',
    gantt: { start: 15, width: 35 } // 6-12 months
  },
  {
    id: '03',
    title: 'דבר שלישי: מציירים את הבית',
    time: 'לרדת לפרטים',
    duration: '1-3 חודשים',
    description: 'אחרי שקיבלנו מהעיריה "כן", מתחילים לשרטט את הצורות הקטנות והקווים. אני מתכננת כל שקע בזהירות ובוחרים יחד קרמיקה לקלחת. פה הבית מתחיל להיות אמיתי.',
    icon: 'draw',
    gantt: { start: 50, width: 15 } // 1-3 months
  },
  {
    id: '04',
    title: 'דבר רביעי: בונים באמת!',
    time: 'בנייה וביצוע',
    duration: '12-18 חודשים',
    description: 'הטרקטורים עולים על השטח! בזמן שהפועלים בונים, אני מגיעה לשטח לוודא שהם שמים כל לבנה בדיוק איפה שציירנו. בסוף – מקבלים את המפתח לבית החדש!',
    icon: 'home',
    gantt: { start: 65, width: 35 } // 12-18 months
  }
];

export default function ProcessGantt() {
  return (
    <section className="py-24 lg:py-32 bg-surface-container-low overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4 max-w-3xl mx-auto">
          <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase block mb-4">הרבה מעבר לשרטוט</span>
          <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">
            איך זה עובד בעצם?
          </h2>
          <p className="font-body text-lg text-secondary leading-relaxed">
            לתכנן בית זה עסק מורכב, אז החלטנו להסביר אותו הכי פשוט שאפשר. ככה הדרך לבית נראית שלב אחרי שלב, בלי מושגים מפחידים.
          </p>
        </div>

        {/* Gantt Chart Section */}
        <div className="mb-24 lg:mb-32">
          <h3 className="font-headline font-bold text-2xl text-primary text-center mb-8">כמה זמן זה לוקח? ציר הזמן שלנו</h3>
          
          <div className="bg-surface p-6 sm:p-10 rounded-2xl border border-outline/10 shadow-sm relative w-full lg:max-w-4xl mx-auto">
            {/* Timeline ticks/grid lines - background */}
            <div className="absolute inset-0 top-[20px] bottom-[20px] left-10 right-10 flex justify-between px-1 pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-full w-px bg-outline/5 relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-label text-[10px] text-secondary/50">
                    {i === 0 ? 'התחלה' : i === 4 ? 'קבלת מפתח' : ''}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-6 relative z-10">
              {phases.map((phase, idx) => (
                <div key={phase.id} className="relative flex items-center h-12">
                   {/* Background track for the bar context */}
                   <div className="absolute inset-x-0 h-full bg-surface-container-highest/30 rounded-lg overflow-hidden">
                      <motion.div 
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: `${phase.gantt.width}%`, opacity: 1 }}
                        transition={{ 
                          duration: 1, 
                          delay: idx * 0.4, // Stagger waterfall effect
                          ease: "easeOut" 
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="absolute h-full rounded-lg bg-primary flex items-center px-4"
                        style={{ right: `${phase.gantt.start}%` }}
                      >
                         <span className="font-headline font-bold text-xs sm:text-sm text-white truncate drop-shadow-md">
                           {phase.time} <span className="opacity-70 text-[10px] sm:text-xs">({phase.duration})</span>
                         </span>
                      </motion.div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section - Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, idx) => (
            <motion.div 
              key={phase.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-surface p-8 relative card-hover border border-outline/5"
            >
              <div className="w-14 h-14 bg-surface-container-low flex items-center justify-center mb-6 rounded-full">
                <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{phase.icon}</span>
              </div>
              <h3 className="font-headline font-black text-xl text-primary mb-3 leading-tight">{phase.title}</h3>
              <p className="font-body text-sm sm:text-base text-secondary leading-relaxed">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
