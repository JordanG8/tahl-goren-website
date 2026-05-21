import projectGalleries from "./projectGalleries.json";

// Main site data source
export const siteData = {
  projects: [
  {
    "id": "m-maor",
    "title": "בית משפחת מנ' במושב מאור",
    "location": "מושב מאור",
    "image": "/images/projects/m-maor/optimized/%D7%91%D7%99%D7%AA%20%D7%9E%D7%95%D7%93%D7%A8%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A6%D7%91.webp",
    "description": "בית חדש, אשר נבנה בסמוך לגן ציבורי, כך שהוא פונה אל מרחבים פתוחים.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%9e%d7%a0-%d7%91%d7%9e%d7%95%d7%a9%d7%91-%d7%9e%d7%90%d7%95%d7%a8/",
    "status": "completed"
  },
  {
    "id": "g-binyamina",
    "title": "בית משפחת ג' בבנימינה",
    "location": "בנימינה",
    "image": "/images/projects/g-binyamina/optimized/%D7%97%D7%93%D7%A8%20%D7%9B%D7%91%D7%99%D7%A1%D7%94%20%D7%9E%D7%A2%D7%95%D7%A6%D7%91.webp",
    "description": "שיפוץ כולל של בית מגורים דו-קומתי בבנימינה.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%92-%d7%91%d7%91%d7%a0%d7%99%d7%9e%d7%99%d7%a0%d7%94/",
    "status": "completed"
  },
  {
    "id": "ma-maor",
    "title": "בית משפחת מ' במושב מאור",
    "location": "מושב מאור",
    "image": "/images/projects/ma-maor/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%97%D7%93%D7%A8%20%D7%A9%D7%99%D7%A0%D7%94%20%D7%94%D7%95%D7%A8%D7%99%D7%9D.webp",
    "description": "בית מגורים בסגנון כפרי מינימליסטי.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%9e-%d7%91%d7%9e%d7%95%d7%a9%d7%91-%d7%9e%d7%90%d7%95%d7%a8/",
    "status": "completed"
  },
  {
    "id": "v-zichron",
    "title": "בית משפחת ו' בזכרון יעקב",
    "location": "זכרון יעקב",
    "image": "/images/projects/v-zichron/optimized/%D7%90%D7%A8%D7%95%D7%9F%20%D7%91%D7%97%D7%93%D7%A8%20%D7%99%D7%9C%D7%93%D7%99%D7%9D.webp",
    "description": "בית מגורים שטוח בן קומה אחת.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%95-%d7%91%d7%96%d7%9b%d7%a8%d7%95%d7%9f-%d7%99%d7%a2%d7%a7%d7%91/",
    "status": "completed"
  },
  {
    "id": "sh-pardes-hanna",
    "title": "בית משפחת ש' בפרדס חנה",
    "location": "פרדס חנה",
    "image": "/images/projects/sh-pardes-hanna/optimized/%D7%97%D7%93%D7%A8%20%D7%9E%D7%92%D7%95%D7%A8%D7%99%D7%9D%20%D7%9E%D7%95%D7%90%D7%A8%20%D7%95%D7%9E%D7%A8%D7%95%D7%95%D7%97.webp",
    "description": "שיפוץ כולל בבית מגורים קיים.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a9-%d7%91%d7%a4%d7%a8%d7%93%d7%a1-%d7%97%d7%a0%d7%94/",
    "status": "completed"
  },
  {
    "id": "sh-maor",
    "title": "בית משפחת ש' במושב מאור",
    "location": "מושב מאור",
    "image": "/images/projects/sh-maor/optimized/%D7%90%D7%99%D7%97%D7%A1%D7%95%D7%9F%20%D7%90%D7%A8%D7%95%D7%9F%20%D7%A7%D7%99%D7%A8%20%D7%91%D7%97%D7%93%D7%A8%20%D7%A9%D7%99%D7%A0%D7%94.webp",
    "description": "בית מגורים בשטח של כ-190 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a9-%d7%91%d7%9e%d7%95%d7%a9%d7%91-%d7%9e%d7%90%d7%95%d7%a8/",
    "status": "completed"
  },
  {
    "id": "shak-maor",
    "title": "בית משפחת שק' במאור",
    "location": "מושב מאור",
    "image": "/images/projects/shak-maor/optimized/%D7%91%D7%95%D7%A6%D7%A8%20%D7%A2%D7%A5%20%D7%91%D7%9E%D7%98%D7%91%D7%97.webp",
    "description": "בית בן כ-240 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a9%d7%a7-%d7%91%d7%9e%d7%90%d7%95%d7%a8/",
    "status": "completed"
  },
  {
    "id": "s-binyamina",
    "title": "בית משפחת ס' בבנימינה",
    "location": "בנימינה",
    "image": "/images/projects/s-binyamina/optimized/20200617_113746.webp",
    "description": "בית בן כ-260 מ\"ר, ב-2 קומות.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a1-%d7%91%d7%91%d7%a0%d7%99%d7%9e%d7%99%d7%a0%d7%94/",
    "status": "completed"
  },
  {
    "id": "r-or-akiva",
    "title": "בית משפחת ר' באור עקיבא",
    "location": "אור עקיבא",
    "image": "/images/projects/r-or-akiva/optimized/%D7%91%D7%99%D7%AA%20%D7%91%D7%A2%D7%99%D7%A6%D7%95%D7%91%20%D7%9E%D7%99%D7%A0%D7%99%D7%9E%D7%9C%D7%99%D7%A1%D7%98%D7%99.webp",
    "description": "בית בן כ-270 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a8-%d7%91%d7%90%d7%95%d7%a8-%d7%a2%d7%a7%d7%99%d7%91%d7%90/",
    "status": "completed"
  },
  {
    "id": "t-maor",
    "title": "בית משפחת ט' במושב מאור",
    "location": "מושב מאור",
    "image": "/images/projects/t-maor/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%91%D7%99%D7%AA%20%D7%A4%D7%A8%D7%98%D7%99.webp",
    "description": "בית מגורים בן כ-200 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%98-%d7%91%d7%9e%d7%95%d7%a9%d7%91-%d7%9e%d7%90%d7%95%d7%a8/",
    "status": "completed"
  },
  {
    "id": "sh-katzir",
    "title": "בית משפחת ש' בקציר",
    "location": "קציר",
    "image": "/images/projects/sh-katzir/optimized/IMG_1728.webp",
    "description": "בית מגורים בן כ-200 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a9-%d7%91%d7%a7%d7%a6%d7%99%d7%a8/",
    "status": "completed"
  },
  {
    "id": "n-zichron-2",
    "title": "בית משפחת נו' בזכרון יעקב",
    "location": "זכרון יעקב",
    "image": "/images/projects/n-zichron-2/optimized/IMG_6047.webp",
    "description": "בית מגורים בן כ-230 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a0-%d7%91%d7%96%d7%9b%d7%a8%d7%95%d7%9f-%d7%99%d7%a2%d7%a7%d7%91-2/",
    "status": "completed"
  },
  {
    "id": "h-or-akiva",
    "title": "בית משפחת ה' באור עקיבא",
    "location": "אור עקיבא",
    "image": "/images/projects/h-or-akiva/optimized/IMG_4517-1.webp",
    "description": "בית מגורים בן כ-245 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%94-%d7%91%d7%90%d7%95%d7%a8-%d7%a2%d7%a7%d7%99%d7%91%d7%90/",
    "status": "completed"
  },
  {
    "id": "v-givat-ada-2",
    "title": "בית משפחת ו' בגבעת עדה",
    "location": "גבעת עדה",
    "image": "/images/projects/v-givat-ada-2/optimized/IMG_4288.webp",
    "description": "בית מגורים בן כ-360 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%95-%d7%91%d7%92%d7%91%d7%a2%d7%aa-%d7%a2%d7%93%d7%94-2/",
    "status": "completed"
  },
  {
    "id": "ni-zichron",
    "title": "בית משפחת ני' בזכרון יעקב",
    "location": "זכרון יעקב",
    "image": "/images/projects/ni-zichron/optimized/IMG_2115a%20-1.webp",
    "description": "בית מגורים בן כ-170 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a0-%d7%91%d7%96%d7%9b%d7%a8%d7%95%d7%9f-%d7%99%d7%a2%d7%a7%d7%91/",
    "status": "completed"
  },
  {
    "id": "v-givat-ada",
    "title": "בית משפחת וו' בגבעת עדה",
    "location": "גבעת עדה",
    "image": "/images/projects/v-givat-ada/optimized/IMG_1555_1.webp",
    "description": "בית מגורים בן כ-200 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%95-%d7%91%d7%92%d7%91%d7%a2%d7%aa-%d7%a2%d7%93%d7%94/",
    "status": "completed"
  },
  {
    "id": "p-pardes-hanna",
    "title": "בית משפחת פ' בפרדס חנה",
    "location": "פרדס חנה",
    "image": "/images/projects/p-pardes-hanna/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%91%D7%99%D7%AA%20%D7%97%D7%9D.webp",
    "description": "בית בן כ-200 מ\"ר.",
    "originalLink": "https://talgoren.co.il/%d7%91%d7%99%d7%aa-%d7%9e%d7%a9%d7%a4%d7%97%d7%aa-%d7%a4-%d7%91%d7%a4%d7%a8%d7%93%d7%a1-%d7%97%d7%a0%d7%94/",
    "status": "completed"
  },
  {
    "id": "e-mishmarot",
    "title": "בית משפחת ע' במשמרות",
    "location": "קיבוץ משמרות",
    "image": "/images/projects/e-mishmarot/optimized/IMG_20180815_125118.webp",
    "description": "בית מגורים כפרי במשמרות.",
    "originalLink": "",
    "status": "completed"
  },
  {
    "id": "z-zichron",
    "title": "בית משפחת ז' בזכרון יעקב",
    "location": "זכרון יעקב",
    "image": "/images/projects/z-zichron/optimized/%D7%98%D7%9C%D7%95%D7%99%D7%96%D7%99%D7%94%20%D7%91%D7%90%D7%99.webp",
    "description": "בית פרטי חמים ומזמין בזכרון יעקב, המשלב אסתטיקה מודרנית עם נגיעות כפריות.",
    "originalLink": "",
    "status": "completed"
  },
  {
    "id": "n-gan-shomron",
    "title": "בית משפחת נכ' בגן שומרון",
    "location": "גן שומרון",
    "image": "/images/projects/n-gan-shomron/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%91%D7%99%D7%AA%20%D7%98%D7%9C%20%D7%92%D7%95%D7%A8%D7%9F.webp",
    "description": "בית פרטי חד-קומתי מרווח בגן שומרון המעוצב בסגנון ישראלי כפרי וחם.",
    "originalLink": "",
    "status": "completed"
  },
  {
    "id": "p-binyamina",
    "title": "בית משפחת פ' בבנימינה",
    "location": "בנימינה",
    "image": "/images/projects/p-binyamina/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%98%D7%9C%20%D7%92%D7%95%D7%A8%D7%9F.webp",
    "description": "בית מגורים דו-קומתי בבנימינה המאופיין בעיצוב חם, צבעוניות נועזת ונגיעות כפריות.",
    "originalLink": "",
    "status": "completed"
  },
  {
    "id": "shai-maor",
    "title": "בית משפחת שי' במושב מאור",
    "location": "מושב מאור",
    "image": "/images/projects/shai-maor/optimized/%D7%90%D7%93%D7%A8%D7%99%D7%9B%D7%9C%D7%95%D7%AA%20%D7%91%D7%99%D7%AA%20%D7%9E%D7%95%D7%93%D7%A8%D7%A0%D7%99.webp",
    "description": "בית מגורים מודרני ויוקרתי במושב מאור הכולל אלמנטים אדריכליים מרהיבים כגון אקווריום מים מלוחים מובנה ומדרגות זיזיות.",
    "originalLink": "",
    "status": "completed"
  }
].filter(p => !!p.image && (projectGalleries as any)[p.id]?.length > 0),
  articles: [
    { id: "salon-tips", title: "הסלון – טיפים וכלים מעשיים לתכנון", image: "https://talgoren.co.il/wp-content/uploads/2021/01/טבת-אסנת-טל-קבצים-קטנים-22.jpg", description: "חדר המגורים, או בשמו הנפוץ – 'הסלון', הוא בדרך כלל המרחב הגדול ביותר בבית.", originalLink: "https://talgoren.co.il/%d7%94%d7%a1%d7%9c%d7%95%d7%9f-%d7%98%d7%99%d7%a4%d7%99%d7%9d-%d7%95%d7%9b%d7%9c%d7%99%d7%9d-%d7%9e%d7%a2%d7%a9%d7%99%d7%99%d7%9d-%d7%9c%d7%aa%d7%9b%d7%a0%d7%95%d7%9f/" },
    { id: "choose-architect", title: "איך לבחור אדריכלית?!", image: "https://talgoren.co.il/wp-content/uploads/2020/03/12496261_1550603918564055_4078115768814528292_o-1.jpg", description: "כאשר עומדים לפני פרויקט בניה של בית חדש, איזו אדריכלית לבחור?", originalLink: "https://talgoren.co.il/%d7%90%d7%99%d7%9a-%d7%9c%d7%91%d7%97%d7%95%d7%a8-%d7%90%d7%93%d7%a8%d7%99%d7%9b%d7%9c%d7%99%d7%aa/" },
    { id: "costs", title: "עלויות בניה ומחיר אדריכלות", image: "https://talgoren.co.il/wp-content/uploads/2020/03/כמה-עולה-לבנות-בית-ו-אדריכלות.jpg", description: "חוששים להכנס ל'בור' של הוצאות בלתי נגמרות?", originalLink: "https://talgoren.co.il/%d7%a2%d7%9c%d7%95%d7%99%d7%95%d7%aa-%d7%91%d7%a0%d7%99%d7%94-%d7%95%d7%9e%d7%97%d7%99%d7%a8-%d7%90%d7%93%d7%a8%d7%99%d7%9b%d7%9c%d7%95%d7%aa/" },
  ],
  mediaArticles: [],
  instagramReels: [
    { id: "DGdjBhOuxEy", url: "https://www.instagram.com/reels/DGdjBhOuxEy/", thumbnail: "https://talgoren.co.il/wp-content/uploads/2025/02/חזית-כניסה-בית-מודרני.jpg" },
    { id: "DF2dLO-OniH", url: "https://www.instagram.com/reels/DF2dLO-OniH/", thumbnail: "https://talgoren.co.il/wp-content/uploads/2023/08/שיפוץ-מטבח-ופינת-אוכל.jpg" },
    { id: "DFXtWgdMYJJ", url: "https://www.instagram.com/reels/DFXtWgdMYJJ/", thumbnail: "https://talgoren.co.il/wp-content/uploads/2023/08/מטבח-ופינת-אוכל.jpg" },
    { id: "DFFFD2nsPNR", url: "https://www.instagram.com/reels/DFFFD2nsPNR/", thumbnail: "https://talgoren.co.il/wp-content/uploads/2022/01/חדר-מגורים-מואר-ומרווח.jpg" },
    { id: "DEsY6PEt6eR", url: "https://www.instagram.com/reels/DEsY6PEt6eR/", thumbnail: "https://talgoren.co.il/wp-content/uploads/2022/01/עיצוב-סלון-נקי-ומודרני.jpg" },
  ],
  videos: [
    { id: "tour-maor", category: "סיור בפרויקט", title: "סיור בפרויקט - מושב מאור", description: "סיור וירטואלי בפרויקט מגורים פרטי במושב מאור.", thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL_iP4RlYy7YnuljA-GBtvmBY9t82wQG-PFlu2dX54J7sAyvVnPqbKzZrrENtMZnk6mUXgW-05ZVQ7nmXpSQWOEvjiycnWU6KbpR68BgXZSR_OrOv_52MofGoWAoQBLUJ0rVss-ohMQ9KfJSLgL0T4GqJpFzR9nuX0z2Bt1qhvqzieEzSK3Qf67F0b0W4wilLwwoHODvz07tX8g18zE4lz9fW3S0PI-jh_V_udKzSQUbTUcSNm047nz6pcrFkZfwJ9Logsjv87cgXP", url: "https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" },
    { id: "kitchen-tips", category: "טיפים", title: "טיפים לתכנון מטבח", description: "טיפים מעשיים לתכנון מטבח פונקציונלי ויפה.", thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvaT0heexuwGa78CwUm1oxlI4CJhtRgP7SzgLavMRlPU31frZgQZyFXu9GsVddjkWTrHXQ2ILN6fKcIGcAnHvGhuO7PxfsbUUQbmw6UHg0VXtTUesjRq6XFWroZ6o0ez9dFGkacfQoz62HUlnYPpvWdG85B_evxtlvSbrvDKi5LfZIe__bUHIcDWncTYL9eQmtYlpoFTgsvJvxE_ohb7Bk3fe2YfVFTBa0j1gOvs10YcweA1sZzk_ui5VllktXVKcU3jpF65JzI4RP", url: "https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" },
    { id: "choose-architect", category: "הדרכה", title: "איך בוחרים אדריכלית?", description: "המדריך המלא לבחירת אדריכלית לפרויקט הבנייה שלכם.", thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsUu98MRptNXCNkdOcWONRFgUZ4L4aUSwT6jjFfe5unsbZ7pLtRQFdcXOYdc75iiqu96RaxFaxjHlswQAYWhdPLiqndyC4gWfJgLJ3dT6vk9fVOP_WqEXz5RTVrhdpPrz6-xWDw4kVQ9hnRHZWSxC3EwOcbu6DxNOqUK3DiRIKo_EcD7IYLNJRxoTkFUd8ty8ACPOk_LV5LLafDMJpIRUG5AuF4I_uLmIihDu-n6psjJiikyb5qNI8FLF6vSe6ku_nxxsITPcgVWC3", url: "https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" },
    { id: "behind-scenes", category: "מאחורי הקלעים", title: "תהליך הבנייה - מאחורי הקלעים", description: "הצצה מאחורי הקלעים של תהליך בניית בית פרטי.", thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW2in0vQIvtMP0fxM7UfuB0QOwd5dgKtdQBaiz7Al2rIzmZJIM3plcfATfQ7AYvSeR8nMqjJIMZwhxG_w2aF4RO8czayL0UlNC-XSIw6RbNujz6HAL0upT8yucY073kdgTWhIrt6-sDQnDjJkp1GcOjp5vPg9d8Xqrwh9RvFk8YU6wtJ-Ly5jmjPCTyojWr5V7LDyuo1DOz0oDFkjvdoJFcok1-8Bf-sYXlaOfjOp4QkAvUs6THXbEMNpYuOBV6J_XVrEdVEzr2dvu", url: "https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" },
  ],
  faq: [
    { question: "כמה עולה תכנון אדריכלי לבית פרטי?", answer: "עלות התכנון האדריכלי תלויה בגודל הפרויקט, מורכבותו והשירותים הנדרשים. באופן כללי, שכר טרחת אדריכל נע בין 6%-10% מעלות הבנייה הכוללת. בפגישת הייעוץ הראשונית (ללא עלות) אני מציגה הצעת מחיר מפורטת." },
    { question: "כמה זמן לוקח לבנות בית מאפס?", answer: "תהליך בניית בית פרטי חדש אורך בדרך כלל בין 12-18 חודשים מרגע קבלת היתר הבנייה. שלב התכנון עצמו נמשך כ-3-6 חודשים." },
    { question: "מה ההבדל בין אדריכל למעצב פנים?", answer: "אדריכל מתמחה בתכנון המבנה כולו. מעצב פנים מתמקד בעיצוב הפנימי. במשרד שלי אני מציעה את שני השירותים תחת קורת גג אחת." },
    { question: "האם את מטפלת גם בהיתרי בנייה?", answer: "בהחלט. חלק מרכזי מהשירות שאני מעניקה הוא ליווי סטטוטורי מלא – כולל הכנת כל המסמכים הנדרשים, הגשת הבקשה לוועדה המקומית, תיאום עם היועצים." },
    { question: "מה כולל פיקוח עליון על הבנייה?", answer: "פיקוח עליון כולל ביקורות תקופתיות באתר הבנייה כדי לוודא שהביצוע תואם את התוכניות שאושרו." },
    { question: "האם אפשר לשפץ בית קיים במקום לבנות חדש?", answer: "בהחלט, ולעתים קרובות שיפוץ יסודי הוא הפתרון הכלכלי והנכון ביותר." },
    { question: "האם את עובדת רק באזור הצפון?", answer: "המשרד שלי ממוקם בגבעת עדה, ורוב הפרויקטים שלי מתרכזים באזור חיפה והצפון. אך אני פתוחה לפרויקטים מעניינים גם באזורים אחרים." },
    { question: "איך מתחילים תהליך של בניית בית חדש?", answer: "הצעד הראשון הוא תמיד פגישת היכרות וייעוץ – ללא עלות וללא התחייבות." },
  ],
};
