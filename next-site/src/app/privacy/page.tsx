import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | טל גורן אדריכלות",
  description: "מדיניות הפרטיות של אתר טל גורן אדריכלות.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-28 space-y-8 text-right" dir="rtl">
      <header className="space-y-3">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">משפטי</span>
        <h1 className="font-headline font-black text-4xl lg:text-5xl text-primary tracking-tight">מדיניות פרטיות</h1>
        <p className="font-label text-xs text-secondary">עודכן לאחרונה: אפריל 2026</p>
      </header>

      <section className="space-y-4 font-body text-secondary leading-relaxed">
        <p>
          אנו במשרד טל גורן אדריכלות (להלן: &quot;המשרד&quot;, &quot;אנחנו&quot;) מכבדים את פרטיות הגולשים באתר ופועלים בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981 ולתקנותיו. מדיניות זו מסבירה אילו נתונים נאספים, כיצד הם נאספים ולאילו מטרות נעשה בהם שימוש.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">1. איזה מידע אנו אוספים</h2>
        <p>
          המשרד אוסף מידע אישי שאתם מוסרים מרצון בעת מילוי טופס יצירת קשר באתר, לרבות שם, מספר טלפון, כתובת דוא&quot;ל ופרטי הפנייה. בנוסף, נאסף מידע סטטיסטי אנונימי באמצעות עוגיות (Cookies) וכלי אנליטיקה.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">2. מטרות השימוש במידע</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>מענה על פניות, ייעוץ ראשוני ויצירת קשר חוזר.</li>
          <li>שיפור חוויית הגלישה באתר וייעול שירותי המשרד.</li>
          <li>שמירה על דרישות הדין וניהול תקין של פעילות המשרד.</li>
        </ul>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">3. מסירת מידע לצדדים שלישיים</h2>
        <p>
          המשרד לא יעביר את פרטיכם לצדדים שלישיים אלא בהסכמתכם, או אם יידרש לכך על פי דין או הוראת רשות מוסמכת.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">4. עוגיות (Cookies)</h2>
        <p>
          האתר עושה שימוש בעוגיות לצורך תפעול שוטף, מדידת תעבורה ושיפור חוויית המשתמש. ניתן לחסום עוגיות בהגדרות הדפדפן, אך הדבר עלול לפגוע בחלק מהפונקציונליות.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">5. אבטחת מידע</h2>
        <p>
          המשרד נוקט באמצעי אבטחה סבירים ומקובלים לשמירה על המידע מפני גישה לא מורשית. יחד עם זאת, אין באפשרותנו להבטיח חסינות מוחלטת מפני חדירות.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">6. זכויות בעל המידע</h2>
        <p>
          על פי חוק, אתם רשאים לבקש לעיין במידע השמור עליכם, לתקן אותו או להסירו. ניתן לפנות בנושא זה לכתובת:{" "}
          <a href="mailto:tahl.goren.arch@gmail.com" className="text-primary underline">tahl.goren.arch@gmail.com</a>.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">7. שינויים במדיניות</h2>
        <p>
          המשרד רשאי לעדכן מדיניות זו מעת לעת. הנוסח המעודכן יפורסם בעמוד זה ויחול ממועד פרסומו.
        </p>

        <h2 className="font-headline font-bold text-xl text-primary pt-4">8. יצירת קשר</h2>
        <p>
          לכל שאלה בנוגע למדיניות זו, ניתן לפנות אלינו בטלפון <a href="tel:0528345799" className="text-primary underline">052-8345799</a> או בדוא&quot;ל <a href="mailto:tahl.goren.arch@gmail.com" className="text-primary underline">tahl.goren.arch@gmail.com</a>.
        </p>
      </section>
    </article>
  );
}
