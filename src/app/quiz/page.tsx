import type { Metadata } from "next";
import QuizWizard from "./QuizWizard";

export const metadata: Metadata = {
  title: "כמה יעלה לבנות את הבית שלכם? | טל גורן אדריכלית",
  description:
    "שאלון קצר של שתי דקות שמסתיים בדוח אישי: הערכת עלויות לבניית בית פרטי, לוח זמנים ריאלי לכל שלב ומסלול הליווי שמתאים לכם. ללא עלות וללא התחייבות.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "בדיקת היתכנות לבניית בית פרטי | טל גורן אדריכלית",
    description:
      "תשע שאלות קצרות, ובסוף דוח אישי עם הערכת תקציב, לוח זמנים והמלצות — ישירות למייל.",
  },
};

export default function QuizPage() {
  return (
    <main className="bg-background min-h-screen">
      <QuizWizard />
    </main>
  );
}
