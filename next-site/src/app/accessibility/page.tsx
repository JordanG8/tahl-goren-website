import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות | טל גורן אדריכלות",
  description: "הצהרת הנגישות של אתר טל גורן אדריכלות בהתאם לתקן ישראלי 5568.",
};

export default function AccessibilityPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-28 space-y-8 text-right" dir="rtl">
      <header className="space-y-3">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">משפטי</span>
        <h1 className="font-headline font-black text-4xl lg:text-5xl text-primary tracking-tight">הצהרת נגישות</h1>
        <p className="font-label text-xs text-secondary">עודכן לאחרונה: אפריל 2026</p>
      </header>

      <section className="space-y-4 font-body text-secondary leading-relaxed">
        <p>
          משרד טל גורן אדריכלות רואה חשיבות עליונה במתן שירות נגיש ושוויוני לכלל הציבור, לרבות אנשים עם מוגבלויות. אנו פועלים להנגשת האתר בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998, לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013, ולתקן הישראלי ת&quot;י 5568 ברמת AA, המבוסס על הנחיות WCAG 2.0.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">סטטוס הנגישות באתר</h2>
        <p>
          האתר תוכנן כך שיעמוד בדרישות הנגישות הבאות:
        </p>
        <ul className="list-disc pr-5 space-y-2">
          <li>תאימות לקוראי מסך (NVDA, JAWS, VoiceOver) באמצעות שימוש ב-HTML סמנטי ותגיות ARIA.</li>
          <li>ניווט מלא באמצעות מקלדת.</li>
          <li>ניגודיות צבעים תואמת רמה AA.</li>
          <li>טקסט חלופי לתמונות משמעותיות.</li>
          <li>מבנה כותרות היררכי וברור.</li>
          <li>תמיכה בהגדלת גופן באמצעות הדפדפן.</li>
          <li>תמיכה בכיוון כתיבה מימין לשמאל (RTL).</li>
        </ul>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">חלקים שטרם הונגשו</h2>
        <p>
          על אף מאמצינו להנגיש את כל דפי האתר, ייתכנו חלקים או רכיבים אשר טרם הונגשו במלואם או שטרם נמצא להם פתרון נגיש. אנו ממשיכים לפעול לשיפור הנגישות באופן שוטף.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">פניות בנושא נגישות</h2>
        <p>
          אם נתקלתם בבעיית נגישות באתר, או שיש לכם הצעות לשיפור, נשמח לקבל את פנייתכם. נעשה כל מאמץ לטפל בה בהקדם האפשרי.
        </p>
        <ul className="list-none space-y-1 pt-2">
          <li><strong className="text-primary">רכז/ת נגישות:</strong> טל גורן</li>
          <li><strong className="text-primary">טלפון:</strong> <a href="tel:0528345799" className="text-primary underline">052-8345799</a></li>
          <li><strong className="text-primary">דוא&quot;ל:</strong> <a href="mailto:tahl.goren.arch@gmail.com" className="text-primary underline">tahl.goren.arch@gmail.com</a></li>
          <li><strong className="text-primary">כתובת:</strong> רחוב האלה 22, גבעת עדה</li>
        </ul>

        <p className="pt-4 text-xs">
          הצהרה זו עודכנה בחודש אפריל 2026 ותיבחן מעת לעת בהתאם לעדכונים באתר ולשינויי החקיקה.
        </p>
      </section>
    </article>
  );
}
