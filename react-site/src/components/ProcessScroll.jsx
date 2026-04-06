import React from 'react';

const phases = [
  {
    title: "1. מה אתם חולמים?",
    description: "בשלב הראשון אנחנו פשוט מדברים. אני רוצה לשמוע הכל על הבית שאתם מדמיינים, איך אתם חיים, ומה הכי חשוב לכם.",
    fields: [
      { label: "פגישת היכרות", value: "תיאום ציפיות מלא" },
      { label: "גיבוש פרוגרמה", value: "מה הבית צריך להכיל" },
      { label: "בדיקת היתכנות", value: "מה מותר ומה אפשר" },
      { label: "לוחות זמנים", value: "מתי נכנסים הביתה" }
    ]
  },
  {
    title: "2. מתחילים לצייר",
    description: "כאן הקסם קורה. אני מתחילה לתרגם את המילים שלכם לקווים וצורות, עד שנגיע לתוכנית המושלמת עבורכם.",
    fields: [
      { label: "סקיצות ראשוניות", value: "בחינת חלופות" },
      { label: "הדמיות תלת-ממד", value: "לראות את הבית באמת" },
      { label: "בחירת חומרים", value: "לוח השראה" },
      { label: "אישור סופי", value: "יוצאים לדרך" }
    ]
  },
  {
    title: "3. ניירת ואישורים",
    description: "אני מטפלת בכל הביורוקרטיה מול הרשויות כדי להשיג את היתר הבנייה. אתם יכולים להיות רגועים.",
    fields: [
      { label: "הגשה להיתר", value: "ניהול מול הוועדה" },
      { label: "תיאום יועצים", value: "חשמל, אינסטלציה, קונסטרוקציה" },
      { label: "טיפול בהערות", value: "ניהול עד לאישור" },
      { label: "קבלת היתר", value: "אפשר להתחיל לבנות" }
    ]
  },
  {
    title: "4. בונים את החלום",
    description: "הטרקטורים עולים על השטח. אני מלווה את הבנייה מקרוב כדי לוודא שכל לבנה נמצאת בדיוק במקום הנכון.",
    fields: [
      { label: "תוכניות עבודה", value: "יורדים לפרטים הקטנים" },
      { label: "פיקוח עליון", value: "ביקורים בשטח" },
      { label: "בחירת גמרים", value: "ריצוף, מטבח, תאורה" },
      { label: "כניסה לבית", value: "מזל טוב!" }
    ]
  }
];

export default function ProcessScroll() {
  return (
    <div className="bg-primary py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-24 space-y-4">
          <span className="font-label text-xs tracking-[0.3em] text-white/40 uppercase block">התהליך שלנו</span>
          <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight">
            איך נראה המסע<br />המשותף שלנו?
          </h2>
          <p className="font-body text-xl text-white/60 max-w-2xl leading-relaxed">
            מהשיחה הראשונה ועד לקבלת המפתח – ליווי צמוד, מקצועי ואישי בכל שלב בדרך לבית שלכם.
          </p>
        </div>

        {/* Phases List - Static Vertical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {phases.map((phase, i) => (
            <div key={i} className="space-y-12">
              <div className="space-y-6">
                <h3 className="font-headline font-black text-3xl sm:text-4xl text-white tracking-tight">
                  {phase.title}
                </h3>
                <p className="font-body text-lg text-white/50 leading-relaxed max-w-lg">
                  {phase.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {phase.fields.map((field, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl flex flex-col gap-2"
                  >
                    <span className="font-label text-[10px] uppercase tracking-widest text-white/40">
                      {field.label}
                    </span>
                    <span className="font-headline font-bold text-sm text-white">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
              
              {i < phases.length - 1 && (
                <div className="w-12 h-px bg-white/20 lg:hidden" />
              )}
            </div>
          ))}
        </div>

        {/* Final CTA Marker */}
        <div className="mt-32 pt-24 border-t border-white/10 text-center">
            <div className="w-20 h-20 rounded-full border-4 border-white/10 flex items-center justify-center mx-auto mb-8 bg-white/5">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>key</span>
            </div>
            <h3 className="font-headline font-black text-3xl text-white mb-4">המפתח אצלכם ביד</h3>
            <p className="font-body text-white/50 text-lg">סוף התהליך הוא רק ההתחלה של החיים בבית החדש.</p>
        </div>

      </div>
    </div>
  );
}
