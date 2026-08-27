import type { Metadata } from "next";
import CalculatorWizard from "./CalculatorWizard";

export const metadata: Metadata = {
  title: "כמה יעלה לבנות את הבית שלכם? | טל גורן אדריכלית",
  description:
    "מחשבון עלויות בנייה חינמי מאת אדריכלית: בונים את הבית שאלה אחר שאלה — מיקום, סטנדרט גימור, גג ושיטת בנייה — ומקבלים הערכת עלות לפי מקדמי התכנון של המשרד.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "כמה יעלה לבנות את הבית שלכם?",
    description:
      "שאלון קצר עם הדמיה לכל בחירה, ובסופו הערכת עלות בנייה ומחשבון שאפשר לשחק בו.",
  },
};

export default function QuizPage() {
  return <CalculatorWizard />;
}
