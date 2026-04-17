"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const steps = [
  { id: 1, title: "בירורים מקדימים", duration: "חודש", icon: "search", description: "בודקים סינכרון בין מה רוצים, מה מותר ומה התקציב." },
  { id: 2, title: "תכנון מוקדם", duration: "3 חודשים", icon: "draw", description: "יושבים יחד ומתחילים לצייר את הבית. בוחרים את התוכנית הכי טובה ורואים אותה בתלת מימד." },
  { id: 3, title: "רישוי", duration: "5 חודשים", icon: "gavel", description: "מכינים את כל הניירת ומגישים לוועדה. אנחנו מטפלים בכל הביורוקרטיה, אתם רק חותמים." },
  { id: 4, title: "תכניות מפורטות", duration: "3 חודשים", icon: "architecture", description: "מתכננים כל פרט: כל שקע חשמל, כל ברז, כל ארון. הכל ביחד, צעד אחרי צעד." },
  { id: 5, title: "מכרזים ובניה", duration: "8 חודשים", icon: "construction", description: "הטרקטורים נכנסים! אנחנו מפקחים על הבנייה ומלווים אתכם בבחירת החומרים." },
  { id: 6, title: "סיום ותעודת גמר", duration: "שבועות", icon: "home", description: "אוספים אישורים ומשיגים תעודת גמר. אנחנו מטפלים בהכל — אתם נכנסים הביתה." },
];

export default function ProcessSteps() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-surface-container-low" id="process">
      <div className="max-w-4xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16 space-y-4">
          <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">6 שלבים פשוטים</span>
          <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">מה קורה אחרי השיחה?</h2>
          <p className="font-body text-lg text-secondary max-w-xl mx-auto">הנה בדיוק מה שקורה, שלב אחרי שלב. בלי הפתעות.</p>
        </div>

        {/* Flowchart */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute right-8 md:right-1/2 top-0 bottom-0 w-px bg-outline/20 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-0">
            {steps.map((step, index) => {
              const isOpen = openStep === step.id;
              return (
                <div key={step.id} className="relative">
                  {/* Connector dot */}
                  <div className="absolute right-8 md:right-1/2 top-6 w-3 h-3 rounded-full bg-primary border-2 border-surface-container-low -translate-x-1/2 z-10 hidden sm:block" />

                  <button
                    onClick={() => setOpenStep(isOpen ? null : step.id)}
                    className="w-full text-right sm:pr-16 md:pr-0"
                  >
                    <div className={`flex items-center gap-4 p-5 sm:p-6 transition-colors ${isOpen ? "bg-primary text-white" : "bg-surface hover:bg-surface-container"} ${index === 0 ? "" : "border-t border-outline/10"}`}>
                      <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${isOpen ? "bg-white/15" : "bg-surface-container-low"}`}>
                        <span className={`material-symbols-outlined text-xl ${isOpen ? "text-white" : "text-primary"}`}>{step.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className={`font-headline font-black text-2xl leading-none ${isOpen ? "text-white/30" : "text-primary/20"}`}>{String(step.id).padStart(2, "0")}</span>
                          <h3 className={`font-headline font-bold text-base sm:text-lg ${isOpen ? "text-white" : "text-primary"}`}>{step.title}</h3>
                        </div>
                      </div>
                      <span className={`font-label text-xs tracking-wider ${isOpen ? "text-white/60" : "text-secondary"}`}>{step.duration}</span>
                      <span className={`material-symbols-outlined text-xl transition-transform ${isOpen ? "rotate-180 text-white" : "text-secondary"}`}>expand_more</span>
                    </div>
                  </button>

                  {/* Expandable content */}
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-5 sm:px-6 py-5 bg-surface border-x border-b border-outline/10 sm:pr-16 md:pr-6">
                      <p className="font-body text-secondary text-sm sm:text-base leading-relaxed pr-16">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total timeline */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-primary px-8 py-4 gap-6">
              <div className="text-center">
                <span className="font-label text-[10px] text-white/50 uppercase tracking-wider block">סה״כ מתחילת התהליך</span>
                <span className="font-headline font-bold text-lg text-white block mt-1">כשנתיים</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
