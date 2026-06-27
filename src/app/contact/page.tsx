import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "צור קשר ושיחת ייעוץ | טל גורן אדריכלית",
  description: "צרו קשר עם טל גורן אדריכלית לשיחת ייעוץ ראשונית ללא התחייבות לתכנון ביתכם הפרטי בשרון הצפוני, מועצת מנשה, חוף הכרמל והסביבה. השאירו פרטים ונחזור אליכם.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
