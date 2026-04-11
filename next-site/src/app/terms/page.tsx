import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תנאי שימוש | טל גורן אדריכלות",
  description: "תנאי השימוש באתר טל גורן אדריכלות.",
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-28 space-y-8 text-right" dir="rtl">
      <header className="space-y-3">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">משפטי</span>
        <h1 className="font-headline font-black text-4xl lg:text-5xl text-primary tracking-tight">תנאי שימוש</h1>
        <p className="font-label text-xs text-secondary">עודכן לאחרונה: אפריל 2026</p>
      </header>

      <section className="space-y-4 font-body text-secondary leading-relaxed">
        <p>
          ברוכים הבאים לאתר משרד טל גורן אדריכלות. השימוש באתר כפוף לתנאים המפורטים להלן. עצם הגלישה באתר מהווה הסכמה לתנאים אלה.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">1. כללי</h2>
        <p>
          האתר מספק מידע על שירותי המשרד, פרויקטים, מאמרים מקצועיים ואפשרות ליצירת קשר. המידע באתר הינו כללי בלבד ואינו מהווה תחליף לייעוץ אדריכלי מקצועי בכתב.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">2. קניין רוחני</h2>
        <p>
          כל הזכויות באתר, לרבות עיצוב, תוכן, צילומים, סרטונים, סימני מסחר ושמות מסחריים, שייכות למשרד טל גורן אדריכלות או לבעלי הזכויות בהתאמה. אין להעתיק, להפיץ, לפרסם או לעשות שימוש מסחרי בכל חלק מהאתר ללא אישור מראש ובכתב.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">3. הגבלת אחריות</h2>
        <p>
          המשרד עושה כל מאמץ להציג מידע מדויק ועדכני, אך אינו אחראי לכל נזק ישיר או עקיף שייגרם כתוצאה מהסתמכות על המידע באתר. השימוש באתר נעשה על אחריותו הבלעדית של המשתמש.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">4. קישורים חיצוניים</h2>
        <p>
          האתר עשוי להכיל קישורים לאתרים חיצוניים. המשרד אינו אחראי לתוכנם, לזמינותם או למדיניות הפרטיות של אתרים אלה.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">5. דין וסמכות שיפוט</h2>
        <p>
          על תנאי שימוש אלה יחול הדין הישראלי בלבד. סמכות השיפוט הבלעדית בכל מחלוקת תהיה נתונה לבתי המשפט המוסמכים במחוז חיפה.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">6. יצירת קשר</h2>
        <p>
          לכל שאלה או הבהרה ניתן לפנות אלינו בטלפון <a href="tel:0528345799" className="text-primary underline">052-8345799</a> או בדוא&quot;ל <a href="mailto:tahl.goren.arch@gmail.com" className="text-primary underline">tahl.goren.arch@gmail.com</a>.
        </p>
      </section>
    </article>
  );
}
