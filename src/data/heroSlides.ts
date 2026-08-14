/**
 * The homepage hero rotation — the three project covers the hero has always
 * used. Each names its project so the hero can credit the house and link to it.
 */
export type HeroSlide = {
  src: string;
  projectId: string;
  title: string;
  location: string;
  alt: string;
  focus?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/images/projects/m-maor/optimized/%D7%91%D7%99%D7%AA%20%D7%9E%D7%95%D7%93%D7%A8%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A6%D7%91.webp",
    projectId: "m-maor",
    title: "בית משפחת מנ׳",
    location: "מושב מאור",
    alt: "בית מודרני מעוצב במושב מאור",
  },
  {
    src: "/images/projects/shai-maor/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%91%D7%99%D7%AA%20%D7%9E%D7%95%D7%93%D7%A8%D7%A0%D7%99.webp",
    projectId: "shai-maor",
    title: "בית משפחת שי׳",
    location: "מושב מאור",
    alt: "אדריכלות בית מודרני במושב מאור",
  },
  {
    src: "/images/projects/n-gan-shomron/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%91%D7%99%D7%AA%20%D7%98%D7%9C%20%D7%92%D7%95%D7%A8%D7%9F.webp",
    projectId: "n-gan-shomron",
    title: "בית משפחת נכ׳",
    location: "גן שומרון",
    alt: "בית פרטי בגן שומרון בתכנון טל גורן",
  },
];
