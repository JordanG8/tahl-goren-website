import React from 'react';

const steps = [
  {
    id: 1,
    title: 'בירורים מקדימים',
    stepDuration: 'חודש אחד',
    cumulativeTotal: 'חודש 1',
    description: "'מתכננים מה לתכנן'. בודקים סינכרון בין 3 דברים פשוטים:",
    bullets: ['מה רוצים לבנות?', 'מה מותר לבנות?', 'מה התקציב, והאם הוא מספיק?'],
    meetings: ['פגישת היכרות ותיאום ציפיות', 'סגירת תוכנית ודרישות'],
  },
  {
    id: 2,
    title: 'תכנון מוקדם',
    stepDuration: 'כ-3 חודשים',
    cumulativeTotal: '4 חודשים',
    description: 'יושבים יחד ומתחילים לצייר את הבית. בוחרים את התוכנית הכי טובה ורואים אותה בתלת מימד.',
    bullets: [],
    meetings: ['בחינת חלופות לתוכנית הקומות', 'ליטוש ושיפור התוכנית הנבחרת', 'אישור תוכנית סופית', 'הדמיות תלת מימד וחזיתות', 'אישור סופי של הסימולציה'],
  },
  {
    id: 3,
    title: 'רישוי',
    stepDuration: 'כ-5 חודשים',
    cumulativeTotal: '9 חודשים',
    description: 'מכינים את כל הניירת ומגישים לוועדה המקומית. אנחנו מטפלים בכל הביורוקרטיה, אתם רק חותמים.',
    bullets: [],
    meetings: ['איסוף מסמכים מהמשפחה', 'תיקונים לפי הערות הרשויות'],
  },
  {
    id: 4,
    title: 'תכניות מפורטות',
    stepDuration: 'כ-3 חודשים',
    cumulativeTotal: 'שנה',
    description: 'מתכננים כל פרט קטן בבית: כל שקע חשמל, כל ברז, כל ארון. הכל ביחד, צעד אחרי צעד.',
    bullets: [],
    meetings: [
      'הסברים כלליים ותכנון מערכות',
      'אינסטלציה ואלומיניום',
      'חשמל ותקשורת',
      'חדרי רחצה',
      'מטבח',
      'עיצוב פנים - חללים ציבוריים',
      'עיצוב פנים - חדרי שינה',
      'נגרות והכנה לימי בחירות',
    ],
  },
  {
    id: 5,
    title: 'מכרזים ובניה',
    stepDuration: 'כ-8 חודשים',
    cumulativeTotal: 'שנה ו-8 חודשים',
    description: 'הטרקטורים נכנסים! אנחנו מפקחים על הבנייה ומלווים אתכם גם בבחירת החומרים.',
    bullets: [],
    meetings: [
      'אישור חלוקת קירות בלוקים',
      'סימון נקודות אינסטלציה וחשמל',
      'הנחיית רצף ומטבח',
      'סיור מסירה לפני תעודת גמר',
    ],
  },
  {
    id: 6,
    title: 'סיום ותעודת גמר',
    stepDuration: 'שבועות ספורים',
    cumulativeTotal: 'כשנתיים',
    description: "אוספים את כל האישורים ומשיגים 'תעודת גמר' מהרשויות. אנחנו מטפלים בהכל — אתם רק נכנסים הביתה.",
    bullets: [],
    meetings: [],
  }
];

export default function ProcessSteps() {
  return (
    <>
      {/* ======== CTA: START NOW ======== */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 sm:px-12 bg-primary relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        
        <div className="relative z-10 max-w-3xl space-y-8">
          <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            זה יכול להתחיל<br />ממש עכשיו
          </h2>
          <p className="font-body text-xl sm:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            אתם שיחת טלפון אחת מלהתחיל לבנות את הבית שתגדלו בו את הילדים שלכם.
          </p>
          <a 
            href="tel:0528345799" 
            className="inline-flex items-center gap-3 bg-white text-primary px-12 py-5 font-headline font-bold text-lg uppercase tracking-widest hover:bg-white/90 transition-colors group"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
            התקשרו עכשיו
          </a>
          <p className="font-label text-sm text-white/40 tracking-wide">052-8345799 · טל גורן</p>
        </div>
      </section>

      {/* ======== TRANSITION: What happens after the call? ======== */}
      <section className="bg-surface-container-low relative">
        <div className="min-h-[60dvh] flex flex-col items-center justify-center text-center px-6">
          <div className="space-y-4">
            <span className="font-label text-xs tracking-[0.3em] text-secondary uppercase block">6 שלבים פשוטים</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight max-w-3xl">
              מה קורה אחרי השיחה?
            </h2>
            <p className="font-body text-lg sm:text-xl text-secondary max-w-xl mx-auto">
              הנה בדיוק מה שקורה, שלב אחרי שלב. בלי הפתעות.
            </p>
          </div>
        </div>

        {/* ======== THE 6 STEPS ======== */}
        <div className="w-full relative pb-24 lg:pb-32">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="w-full min-h-[100dvh] flex items-center justify-center px-6 sm:px-12 lg:px-24 py-16"
            >
              <div className="w-full max-w-2xl">
                <div className="bg-surface p-8 sm:p-12 lg:p-16 text-center space-y-8 border border-outline/10">
                  {/* Step number + Title together */}
                  <div className="space-y-2">
                    <span className="font-headline font-black text-7xl sm:text-8xl lg:text-9xl text-primary/20 leading-none block select-none">
                      {String(step.id).padStart(2, '0')}
                    </span>
                    <h3 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-[1.1]">
                      {step.title}
                    </h3>
                  </div>

                  {/* Time info — dark box, side by side */}
                  <div className="inline-flex items-center bg-primary overflow-hidden mx-auto">
                    <div className="px-5 py-3 text-center">
                      <span className="font-label text-[10px] text-white/50 uppercase tracking-wider block">שלב זה</span>
                      <span className="font-headline font-bold text-sm sm:text-base text-white block mt-0.5">{step.stepDuration}</span>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="px-5 py-3 text-center">
                      <span className="font-label text-[10px] text-white/50 uppercase tracking-wider block">סה״כ מתחילת התהליך</span>
                      <span className="font-headline font-bold text-sm sm:text-base text-white block mt-0.5">{step.cumulativeTotal}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="font-body text-lg sm:text-xl text-secondary leading-relaxed max-w-lg mx-auto">
                    {step.description}
                  </p>

                  {/* Bullets if any */}
                  {step.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {step.bullets.map((b, i) => (
                        <li 
                          key={i}
                          className="font-headline font-bold text-lg sm:text-xl text-primary"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Meetings */}
                  {step.meetings.length > 0 && (
                    <div className="pt-6 border-t border-outline/10 space-y-4">
                      <span className="font-label text-[10px] tracking-[0.2em] text-secondary/60 uppercase block">פגישות בשלב הזה</span>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {step.meetings.map((m, i) => (
                          <span
                            key={i}
                            className="font-label text-xs text-secondary bg-surface-container-low border border-outline/10 px-4 py-2 rounded-full"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
