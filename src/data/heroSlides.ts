/**
 * The homepage hero rotation.
 *
 * Hand-picked from the project galleries for one quality: they have to carry a
 * room on their own, at full-bleed, with type over them. That rules out most of
 * the archive — detail shots and bright interiors go flat behind a scrim. What
 * survives is wide exteriors with sky, and evenings where the house is lit from
 * inside.
 *
 * Each slide names the project it came from, so the hero can credit the house
 * and link through to it. Keep `projectId` in sync with `siteData.projects`;
 * a slide whose project is missing simply renders without the credit link.
 */
export type HeroSlide = {
  /** Path into /public — URL-encoded, exactly as stored in projectGalleries.json. */
  src: string;
  /** Project id in siteData.projects, used for the credit link. */
  projectId: string;
  /** Family/house name, shown in the credit. */
  title: string;
  location: string;
  /** Describes the photograph for anyone who cannot see it. */
  alt: string;
  /**
   * Focal point for `object-position`. Wide crops on a phone cut the sides off,
   * so each slide says which part of the frame must survive.
   */
  focus?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/images/projects/n-gan-shomron/optimized/%D7%91%D7%99%D7%AA%20%D7%97%D7%A7%D7%9C%D7%90%D7%99%20%D7%98%D7%9C%20%D7%92%D7%95%D7%A8%D7%9F.webp",
    projectId: "n-gan-shomron",
    title: "בית משפחת נכ׳",
    location: "גן שומרון",
    alt: "בין ערביים בגן שומרון: משפחה על המדשאה מול הבית, עם נדנדה וגינה צעירה",
    focus: "50% 60%",
  },
  {
    src: "/images/projects/e-mishmarot/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%98%D7%9C%20%D7%92%D7%95%D7%A8%D7%9F%20%D7%9E%D7%95%D7%93%D7%A8%D7%A0%D7%99.webp",
    projectId: "e-mishmarot",
    title: "בית משפחת ע׳",
    location: "קיבוץ משמרות",
    alt: "נפח מפוסל בטיח בהיר וחיפוי אנכי כהה, על רקע שמיים פתוחים",
    focus: "50% 45%",
  },
  {
    src: "/images/projects/n-gan-shomron/optimized/%D7%92%D7%99%D7%A0%D7%94%20%D7%91%D7%91%D7%99%D7%AA%20%D7%92%D7%9F%20%D7%A9%D7%95%D7%9E%D7%A8%D7%95%D7%9F.webp",
    projectId: "n-gan-shomron",
    title: "בית משפחת נכ׳",
    location: "גן שומרון",
    alt: "שעת ערב: הבית מואר מבפנים, מרפסת מקורה לאורך החזית ומדשאה משפחתית",
    focus: "50% 55%",
  },
  {
    src: "/images/projects/v-givat-ada/optimized/IMG_1555_1.webp",
    projectId: "v-givat-ada",
    title: "בית משפחת וו׳",
    location: "גבעת עדה",
    alt: "כניסה לבית בגבעת עדה: דלת עץ רחבה, טיח בגוון אדמה וצמחייה מטפסת מתחת לגג רעפים",
    focus: "50% 50%",
  },
  {
    src: "/images/projects/s-binyamina/optimized/%D7%98%D7%91%D7%AA-%D7%90%D7%A1%D7%A0%D7%AA-%D7%98%D7%9C-%D7%A7%D7%91%D7%A6%D7%99%D7%9D%20%D7%A7%D7%98%D7%A0%D7%99%D7%9D%20(27).webp",
    projectId: "s-binyamina",
    title: "בית משפחת ס׳",
    location: "בנימינה",
    alt: "בית דו-קומתי בבנימינה בחיפוי אבן, עם גג רעפים, מרפסת וחצר מרוצפת",
    focus: "50% 45%",
  },
];
