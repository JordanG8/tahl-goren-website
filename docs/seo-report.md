# SEO Report — Tal Goren Architecture

**Source:** Google Search Console export `https___talgoren.co.il_-Performance-on-Search-2026-04-11.xlsx`
**Date:** 2026-04-11
**Goal:** migrate `talgoren.co.il` → new Next.js site without losing rankings, and expand topical coverage.

---

## 1. Current performance snapshot

### Top queries with clicks (brand + traction)
| Query | Clicks | Impr. | Avg pos |
|---|---|---|---|
| טל גורן | 72 | 401 | 1.6 |
| טל גורן אדריכלית | 41 | 187 | 2.0 |
| אדריכלית | 15 | 1,717 | 6.2 |
| אדריכלים בצפון | 9 | 620 | 9.9 |
| אדריכל מומלץ | 6 | 988 | 2.8 |
| תכנון בית פרטי | 4 | 1,506 | 4.5 |
| אדריכל בצפון | 4 | 77 | 6.4 |
| עלות אדריכל לבית פרטי | 3 | 393 | 3.2 |
| אדריכלית מומלצת | 3 | 332 | 1.6 |
| שאלון פרוגרמה עיצוב פנים | 3 | 21 | 10.4 |

**Read:** Brand is locked (position 1–2). Strong non-brand positioning for "אדריכל מומלץ", "אדריכלית מומלצת", "עלות אדריכל לבית פרטי". The site ranks but bleeds clicks on the long-tail — an article layer will capture it.

### High-impression, low-click opportunities (quick wins)
These queries already show up in the SERP with hundreds–thousands of impressions per 3 months but zero/negligible clicks. They're where new articles should focus:

| Query | Impr. | Pos | Strategy |
|---|---|---|---|
| אדריכלות בתים פרטיים | 6,362 | 38 | pillar article — improve from pos 38 |
| אדריכלות יוקרה | 4,404 | 22 | pillar — luxury homes portfolio + article |
| אדריכלות מודרנית | 3,648 | 9 | already close to top 10, rewrite + JSON-LD |
| מעצבת פנים | 1,668 | 56 | thin content, rewrite |
| איך לבחור אדריכלית | 1,564 | 23 | rewrite + FAQ schema |
| אדריכל מודרני | 738 | 4.4 | already ranking — defend with internal links |
| אדריכלי יוקרה | 706 | 22 | merge into luxury pillar |
| אדריכל בתים פרטיים | 689 | 38 | pillar |
| תכנון בתים פרטיים | 664 | 30 | pillar |
| אדריכל בתי יוקרה | 651 | 24 | merge into luxury pillar |
| אדריכלית פנים | 630 | 15 | new article |
| אדריכל לתכנון בית פרטי | 620 | 12 | service page anchor |
| אדריכלות בתים | 464 | 29 | pillar |
| אדריכלית רשויה | 434 | 3.8 | about/credentials page anchor |
| איך בוחרים אדריכל | 384 | 16 | article (close variant) |
| אדריכל בסגנון מודרני | 379 | 14 | modern-arch article |
| עלות אדריכל | 366 | 3.2 | pricing article — defend |
| תכנון בית פרטי מפלס אחד | 339 | 24 | new article |
| כמה עולה אדריכל לבית פרטי | 312 | 3.5 | pricing — defend |
| אדריכל זכרון יעקב | 272 | 7.0 | local landing page |

### Geographic long-tail (local SEO — already ranking, keep the URLs alive via 301)
`אדריכלים פרדס חנה כרכור`, `אדריכל חוף הכרמל`, `אדריכל בעתלית`, `אדריכל עמק חפר`, `אדריכל זכרון יעקב`, `אדריכלים בעמק חפר`, `אדריכל בנימינה`, `אדריכלים בחדרה`.

These are low-volume but high-intent and already rank on page 1. **Do not drop these URLs.** See redirect map below.

---

## 2. Target keyword clusters

Grouped for the content strategy. Each cluster maps to one pillar article + satellite links.

### Cluster A — Pricing & fees (HIGH intent, already converts)
Primary: `עלות אדריכל לבית פרטי`, `כמה עולה אדריכל`, `מחיר אדריכל לבית פרטי`, `שכר טרחה אדריכל`, `מחשבון שכר טרחה אדריכל`, `הצעת מחיר אדריכלות`.
→ Article: **עלויות בניה ומחיר אדריכלות** (`/articles/costs`).

### Cluster B — Planning a private house (pillar)
Primary: `תכנון בית פרטי`, `תכנון בתים פרטיים`, `תכנית אדריכלית בית פרטי`, `אדריכל לתכנון בית פרטי`, `תכנון בית פרטי מפלס אחד`.
→ Article: **המדריך לתכנון בית פרטי** (`/articles/planning-private-house`).

### Cluster C — Choosing an architect
Primary: `איך לבחור אדריכלית`, `איך בוחרים אדריכל`, `אדריכל מומלץ`, `אדריכלית מומלצת`, `אדריכלית רשויה`.
→ Article: **איך לבחור אדריכלית** (`/articles/choose-architect`).

### Cluster D — Modern architecture
Primary: `אדריכלות מודרנית`, `אדריכל מודרני`, `בית בסגנון מודרני`, `בנייה מודרנית`.
→ Article: **אדריכלות מודרנית: עקרונות וסגנון** (`/articles/modern-architecture`).

### Cluster E — Luxury homes
Primary: `אדריכלות יוקרה`, `אדריכלות בתי יוקרה`, `אדריכל בתי יוקרה`, `עיצוב בתי יוקרה`, `אדריכלים לבתי יוקרה`.
→ Article: **אדריכלות בתי יוקרה** (`/articles/luxury-homes`).

### Cluster F — Private house architecture (broad)
Primary: `אדריכלות בתים פרטיים`, `אדריכל בתים פרטיים`, `אדריכלות בתים`, `תכנון בתים`.
→ Article: **אדריכלות בתים פרטיים** (`/articles/private-house-architecture`).

### Cluster G — Interior design vs architecture
Primary: `מעצבת פנים`, `אדריכלית פנים`, `אדריכלי פנים מומלצים`, `אדריכל פנים מומלץ`.
→ Article: **ההבדל בין אדריכל למעצב פנים** (`/articles/architect-vs-interior-designer`).

### Cluster H — Program / briefing
Primary: `שאלון פרוגרמה עיצוב פנים`, `שאלון פרוגרמה לדוגמא`.
→ Article: **שאלון פרוגרמה לבית חדש** (`/articles/program-questionnaire`).

### Cluster I — Kitchen
Primary: `צ'קליסט לתכנון מטבח`, `תכנון מטבח`.
→ Article: **צ'קליסט לתכנון מטבח** (`/articles/kitchen-checklist`).

### Cluster J — Living room / room sizes
Primary: `גודל סלון`, `גודל סלון סטנדרטי`, `הסלון טיפים`.
→ Article: **תכנון הסלון — טיפים וגדלים סטנדרטיים** (`/articles/living-room-guide`).

### Cluster K — Remodel / extensions
Primary: `עלות אדריכל שיפוץ בית`, `עלות אדריכל שיפוץ דירה`, `עלות אדריכל לתוספת בנייה`.
→ Article: **שיפוץ ותוספת בנייה — עלויות ותהליך** (`/articles/renovation-and-additions`).

### Cluster L — Timeline
Primary: `שלבי התכנון והבניה`, `תהליך בניית בית`.
→ Article: **שלבי התכנון והבנייה על ציר הזמן** (`/articles/planning-timeline`).

---

## 3. On-page SEO checklist (for every article)

- [x] Unique `<title>` ≤ 60 chars including primary keyword in Hebrew
- [x] `<meta description>` 140–160 chars, with primary keyword near the start
- [x] Single `<h1>` per page; primary keyword in H1
- [x] H2/H3 cover semantic variants (LSI)
- [x] Canonical URL set
- [x] `og:*` + `twitter:*` metadata
- [x] JSON-LD `Article` schema (headline, author, datePublished, image)
- [x] JSON-LD `FAQPage` schema when article has a FAQ block
- [x] `BreadcrumbList` JSON-LD
- [x] `lang="he"`, `dir="rtl"` (already on `<html>`)
- [x] Internal links: every article links to services + contact + 2–3 sibling articles
- [x] Hero image with descriptive `alt`
- [x] Sitemap includes `/articles/[slug]`
- [x] Avg reading time ≥ 4 min (≥ 900 Hebrew words)

---

## 4. 301 redirect map (old → new)

All sources come from the GSC "Pages" sheet (ranked URLs to preserve). Applied via `next.config.ts` `redirects()` with `permanent: true` (Next emits 308, which search engines treat equivalently to 301 for ranking signal transfer).

### Articles
| Old path | New path |
|---|---|
| `/עלויות-בניה-ומחיר-אדריכלות/` | `/articles/costs` |
| `/תכנון-בית-פרטי/` | `/articles/planning-private-house` |
| `/הסלון-טיפים-וכלים-מעשיים-לתכנון/` | `/articles/living-room-guide` |
| `/איך-לבחור-אדריכלית/` | `/articles/choose-architect` |
| `/אדריכלות-בתים-פרטיים/` | `/articles/private-house-architecture` |
| `/אדריכלות-מודרנית/` | `/articles/modern-architecture` |
| `/אדריכלות-יוקרה/` | `/articles/luxury-homes` |
| `/מעצבת-פנים/` | `/articles/architect-vs-interior-designer` |
| `/guid/שאלון-פרוגרמה-לבית-חדש/` | `/articles/program-questionnaire` |
| `/guid/שאלון-פרוגרמה-לשיפוץ-ותוספת-בניה/` | `/articles/renovation-and-additions` |
| `/guid/צק-ליסט-לתכנון-מטבח/` | `/articles/kitchen-checklist` |
| `/guid/המדריך-להגשים-בית-ולבנות-חלום/` | `/articles/planning-private-house` |
| `/guid/שלבי-התכנון-והבניה-על-ציר-הזמן/` | `/articles/planning-timeline` |

### Local landing pages
| Old path | New path |
|---|---|
| `/אדריכלים-פרדס-חנה-כרכור/` | `/services` |
| `/אדריכל-חוף-הכרמל/` | `/services` |
| `/אדריכל-בעתלית/` | `/services` |
| `/אדריכל-עמק-חפר/` | `/services` |
| `/אדריכל-זכרון-יעקבֿ/` | `/services` |

> **Note:** long-term these should become dedicated `/services/[city]` pages to defend the local rankings — called out as a follow-up, not in this change.

### Site structure
| Old path | New path |
|---|---|
| `/פרויקט/` | `/projects` |
| `/מאמרים/` | `/articles` |
| `/שירותים/` | `/services` |
| `/אודות/` | `/about` |
| `/צור-קשר/` | `/contact` |
| `/לקוחות-מספרים/` | `/testimonials` |
| `/שות/` | `/faq` |
| `/תקנון-תנאי-שימוש-ומדיניות-פרטיות/` | `/terms` |

### Project pages (all to `/projects` — individual project routes can be added later)
`/בית-משפחת-*` → `/projects`

### WordPress taxonomy
| Old | New |
|---|---|
| `/author/tal-goren/` | `/about` |
| `/author/dror/` | `/about` |
| `/tag/*` | `/articles` |
| `/category/*` | `/articles` |
| `/guid/` | `/articles` |

---

## 5. Follow-ups (not in this change)

1. **Per-city service landing pages** to defend `אדריכל זכרון יעקב`, `אדריכל עמק חפר` etc. — currently redirected to `/services`, losing long-tail match.
2. **Project detail pages** (`/projects/[slug]`) instead of blanket redirect.
3. **Submit new sitemap.xml to GSC** once the site is live.
4. **GSC URL Inspection + Request Indexing** for the 10 new article URLs.
5. **Internal linking audit:** every article should link to ≥ 3 others. Home → pillars.
6. **Image `next/image` migration** — articles currently reference WP-hosted images; move to `public/articles/` or Sanity CDN and serve via `next/image` for CLS + LCP wins.
