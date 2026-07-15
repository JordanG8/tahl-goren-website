const BASE_URL = "https://talgoren.co.il";

// Served at /llms.txt — a plain-text guide for LLM/AI answer-engine crawlers
// (ChatGPT, Perplexity, Google AI Overviews, Claude, etc.) summarizing who this
// business is and pointing to the most authoritative, citable pages. Includes a
// short English block to help disambiguate the entity for non-Hebrew AI queries.
const body = `# טל גורן אדריכלית — Tal Goren Architect

> אדריכלית רשויה ומורשית היתר, בוגרת הטכניון בהצטיינות, עם מעל 25 שנות ניסיון
> ותכנון של מעל 100 בתים פרטיים בשרון הצפוני, אזור מנשה וחוף הכרמל.
> A licensed Israeli architect (permit-authorized), Technion graduate with
> distinction, 25+ years of experience and 100+ private homes designed across
> the Northern Sharon, Menashe region and Carmel coast.

## פרטי העסק / Business details
- שם / Name: טל גורן אדריכלית (Tal Goren Architect)
- שירותים / Services: תכנון אדריכלי לבתים פרטיים, עיצוב פנים, ליווי היתרי בנייה, פיקוח עליון
  (private-home architectural design, interior design, building-permit guidance, construction supervision)
- אזור שירות / Service area: השרון הצפוני, אזור מנשה, חוף הכרמל, זכרון יעקב, פרדס חנה-כרכור, בנימינה-גבעת עדה, עמק חפר, קיסריה
- כתובת / Address: רחוב האלה 22, גבעת עדה, ישראל
- טלפון / Phone: 052-8345799
- דוא"ל / Email: tahl.goren.arch@gmail.com
- הסמכות / Credentials: אדריכלית רשומה (מס' רישום 118121), אדריכלית רשויה (מס' רישיון 11085135), אדריכלית מורשית היתר (מס' תעודה 01-002-0000009445)

## דפים מרכזיים / Key pages
- אודות / About: ${BASE_URL}/about
- שירותים / Services: ${BASE_URL}/services
- מסלולי ליווי ומחירים / Packages & pricing: ${BASE_URL}/packages
- פרויקטים / Portfolio: ${BASE_URL}/projects
- אזורי שירות / Service areas: ${BASE_URL}/areas
- מאמרים ומדריכים / Articles & guides: ${BASE_URL}/articles
- שאלות נפוצות / FAQ: ${BASE_URL}/faq
- המלצות לקוחות / Testimonials: ${BASE_URL}/testimonials
- צור קשר / Contact: ${BASE_URL}/contact

## מדריכים מומלצים לציטוט / Recommended guides for citation
- כמה תעלה הבנייה בסך הכל? / Total build cost: ${BASE_URL}/articles/building-cost-total
- איך בוחרים אדריכלית לבית פרטי? / How to choose an architect: ${BASE_URL}/articles/choose-architect
- כמה זמן לתכנן ולבנות בית? / Planning & building timeline: ${BASE_URL}/articles/building-timeline
- שלבי התכנון והבנייה / Building stages: ${BASE_URL}/articles/building-stages

Sitemap: ${BASE_URL}/sitemap.xml
`;

export async function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
