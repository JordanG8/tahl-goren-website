import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const phases = [
  {
    id: 'phase-1',
    title: 'התחלה ומידע',
    subtitle: 'איסוף נתוני קו אפס',
    description: 'לפני שרטוט הקו הראשון, אנו אוספים ומנתחים בשקיפות מלאה את כל נתוני הקרקע והרישוי.',
    fields: [
      { label: 'שם הפרויקט', value: '...' },
      { label: 'גוש', value: '...' },
      { label: 'חלקה', value: '...' },
      { label: 'מגרש', value: '...' },
      { label: 'שטח החלקה / מגרש', value: '...' },
    ]
  },
  {
    id: 'phase-2',
    title: 'רישוי ובירוקרטיה',
    subtitle: 'ניהול מלא של חזית הרשויות',
    description: 'אנו לוקחים על עצמנו את כל ההתנהלות מול הועדות והרשויות המקומיות - משלב המידע ועד להיתר.',
    fields: [
      { label: "מס' בקשה למידע רישוי זמין", value: 'בקשה נשלחה' },
      { label: "מס' בקשה להיתר בועדה", value: 'אונליין' },
      { label: "מס' תיק בניין בועדה", value: 'נפתח' },
      { label: 'היתר מוכן', value: 'אושר' },
    ]
  },
  {
    id: 'phase-3',
    title: 'צוות מומחים ויועצים',
    subtitle: 'ניצוח על תזמורת שלמה',
    description: 'פרויקט אדריכלי דורש תיאום מופתי. אנו מנהלים ומסנכרנים את כל יועצי הפרויקט תחת קורת גג אחת.',
    fields: [
      { label: 'אדריכלית אחראית', value: 'V' },
      { label: 'קונסטרוקציה', value: 'V' },
      { label: 'אינסטלציה', value: 'V' },
      { label: 'עיצוב פנים', value: 'V' },
      { label: 'יועץ קרקע וביסוס', value: 'V' },
      { label: 'אגרונום', value: 'V' },
      { label: 'מיגון ופיקוד העורף', value: 'V' },
      { label: 'תנועה ותחבורה', value: 'V' },
    ]
  },
  {
    id: 'phase-4',
    title: 'מסע לקוח עד למפתח',
    subtitle: 'ביצוע וליווי צמוד',
    description: 'עם כל האישורים והתוכניות, אנחנו מלווים אתכם גם בשלב הביצוע, עד לרגע קבלת המפתח לבית חלומותיכם.',
  }
];

export default function ProcessScroll() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase 1 (0 to 0.25)
  const o1 = useTransform(scrollYProgress, [0, 0.20, 0.24], [1, 1, 0]);
  
  // Phase 2 (0.25 to 0.50)
  const o2 = useTransform(scrollYProgress, [0.26, 0.30, 0.45, 0.49], [0, 1, 1, 0]);

  // Phase 3 (0.50 to 0.75)
  const o3 = useTransform(scrollYProgress, [0.51, 0.55, 0.70, 0.74], [0, 1, 1, 0]);

  // Phase 4 (0.75 to 1)
  const o4 = useTransform(scrollYProgress, [0.76, 0.80], [0, 1]);


  const getAnimatedProps = (index) => {
    switch(index) {
      case 0: return { opacity: o1 };
      case 1: return { opacity: o2 };
      case 2: return { opacity: o3 };
      case 3: return { opacity: o4 };
      default: return { opacity: 0 };
    }
  };

  const currentPhaseTitleColor = useTransform(scrollYProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]
  );

  return (
    <div ref={containerRef} className="relative bg-zinc-950 w-full h-[400vh]">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center py-20 bg-zinc-950">
        
        {/* Background Grid Pattern for architectural feel */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="text-center absolute top-24 left-0 w-full z-20 px-6">
          <span className="font-label text-xs tracking-[0.3em] text-white/50 uppercase block mb-4">מסע לקוח</span>
          <motion.h2 style={{ color: currentPhaseTitleColor }} className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            מרעיון ועד מפתח
          </motion.h2>
          <p className="mt-4 font-body text-white/70 max-w-2xl mx-auto text-lg">
            אנו מנהלים מאחורי הקלעים מערכת שלמה ומורכבת, כדי שאתם תוכלו לישון בשקט.
          </p>
        </div>

        {/* Content Layers */}
        <div className="relative w-full max-w-6xl mx-auto px-6 h-[60vh] mt-16 z-10 flex items-center justify-center">
          
          {phases.map((phase, i) => (
            <motion.div 
              key={phase.id}
              style={getAnimatedProps(i)}
              className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-12 pt-10"
            >
              
              {/* Text side */}
              <div className="flex-1 lg:max-w-lg space-y-6 text-right w-full">
                <span className="font-headline text-primary font-bold text-lg border border-primary/30 rounded-full px-4 py-1 inline-block bg-primary/10">0{i+1}</span>
                <h3 className="font-headline font-black text-3xl sm:text-4xl text-white">{phase.title}</h3>
                <p className="font-headline font-bold text-xl text-white/90">{phase.subtitle}</p>
                <p className="font-body text-base text-white/60 leading-relaxed max-w-md">{phase.description}</p>
              </div>

              {/* Data Cards Side */}
              <div className="flex-1 w-full relative h-[300px] sm:h-[400px]">
                {phase.fields && (
                  <div className="absolute inset-0 grid grid-cols-2 gap-4 auto-rows-max items-center align-middle content-center">
                    {phase.fields.map((field, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                        key={idx} 
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex flex-col gap-2"
                      >
                        <span className="font-body text-xs text-white/50">{field.label}</span>
                        <div className="flex justify-between items-center">
                          <div className="h-1 w-12 bg-white/20 rounded"></div>
                          {field.value === 'V' ? (
                             <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                          ) : (
                             <span className="font-label text-[10px] text-white/80 whitespace-nowrap">{field.value}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {i === 3 && (
                   <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="w-48 h-48 rounded-full border-4 border-primary/30 flex items-center justify-center relative bg-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(var(--color-primary),0.3)]"
                      >
                        <span className="material-symbols-outlined text-white text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>key</span>
                      </motion.div>
                   </div>
                )}
              </div>

            </motion.div>
          ))}

        </div>

      </div>
      
    </div>
  );
}
