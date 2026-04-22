
export type FAQArticle = {
  id: string;
  slug: string;
  title: string;
  question: string;
  shortAnswer: string;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string[];
      list?: string[];
    }[];
    summary?: string;
  };
  seriesId: string;
  orderInSeries: number;
  image?: string;
};

export type FAQSeries = {
  id: string;
  title: string;
  description: string;
  articles: string[]; // slugs
};

export const faqSeries: FAQSeries[] = [
  {
    id: "getting-started",
    title: "מדריך למתחילים: בחירת אדריכלית וצעדים ראשונים",
    description: "כל מה שצריך לדעת לפני שיוצאים לדרך - איך בוחרים את אשת המקצוע הנכונה ומה עושים בפגישות הראשונות.",
    articles: [
      "why-architect",
      "choose-architect",
      "how-not-to-choose-architect",
      "when-to-involve-architect",
      "first-meeting-prep",
      "first-step",
      "professionals-credentials",
      "service-area"
    ]
  },
  {
    id: "process",
    title: "תהליך התכנון והבנייה: שלב אחר שלב",
    description: "צלילה לעומק שלבי העבודה - מהסקיצה הראשונה, דרך הרישוי והיתר הבנייה ועד למפתח.",
    articles: [
      "building-stages",
      "architect-role-stages",
      "building-timeline",
      "building-permit",
      "bureaucracy-difficulty",
      "authorities-and-bodies"
    ]
  },
  {
    id: "budget",
    title: "תקציב, עלויות ומיסים",
    description: "איך מתכננים תקציב ריאלי, מהן העלויות הנסתרות ואיך מוודאים שלא חורגים מהתקציב שקבענו.",
    articles: [
      "building-cost-total",
      "planning-cost",
      "real-building-cost",
      "budget-control",
      "hidden-costs",
      "taxes-and-fees"
    ]
  },
  {
    id: "design-and-methods",
    title: "תכנון, עיצוב ושיטות בנייה",
    description: "על עיצוב פנים, התאמת סגנון אישי וסקירת שיטות הבנייה המתקדמות והקונבנציונליות בישראל.",
    articles: [
      "interior-design-value",
      "construction-methods-overview",
      "design-style-match",
      "what-is-tba",
      "housing-unit-addition"
    ]
  }
];
