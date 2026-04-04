# Tahl Goren Website — Situation Report
**Date:** 2026-04-04

---

## The Big Picture

Tahl Goren runs a boutique architecture firm in Givat Ada, specializing in private residential homes in the Northern Sharon region (Netanya–Haifa). She's currently paying ~1,100 NIS/month for a dated WordPress site at [talgoren.co.il](http://talgoren.co.il). Her son is building a replacement React site to cut that cost and modernize. A separate website builder was hired, produced a PDF and gathered useful content from Tahl, but hasn't delivered. That gathered content is now being funneled into this React project.

---

## Source 1: The Current Live Site (talgoren.co.il)

**Platform:** WordPress, Hebrew-only, RTL  
**Pages:** Home, About, Projects (~20), Services (3 sub-pages), Q&A (6 questions), Articles (3, stale since 2020), Testimonials, Contact  
**Design:** Functional but dated. Standard WordPress business theme, no modern SPA feel.  
**SEO:** Decent fundamentals — title tags, meta descriptions, Schema.org markup, breadcrumbs all present.  

**Problems:**
- Stale content (articles/testimonials last updated 2020)
- Broken URL: nav links to `/פרויקט/` but menu text implies `/פרויקטים/` → 404
- No embedded map on contact page
- Conservative design that doesn't reflect the quality of Tahl's architectural work
- 1,100 NIS/month hosting/maintenance cost

---

## Source 2: The New React Site (this repo)

**Stack:** React 18 + Vite + Tailwind CSS 4 + React Router 7, deployed on Vercel  
**Pages (11 routes):** Home, About, Projects, Process, Services, Contact, Articles, FAQ, Testimonials, Social, Videos  
**Design:** Modern, polished, animation-rich (scroll reveals, stagger effects, counter animations). Custom earthy color palette, Heebo/Work Sans/Inter fonts, blueprint grid overlays.

**What's done well:**
- Full RTL Hebrew support
- 20 projects with images, titles, locations, descriptions
- Complete about/bio, services, FAQ (8 items), testimonials, social links
- Hero section with 3-video crossfading carousel
- Responsive design (mobile/tablet/desktop)
- Scroll animations, lazy loading, hover effects
- Clean component architecture with custom hooks

**What needs attention:**
- All project images point to external URLs (Google Photos / old site) — need to be localized
- Contact form has no backend/submission handler
- No legal pages (terms/privacy — content exists in mom's materials)
- Content may not yet reflect the updated copy from mom's prepared materials
- No analytics/tracking

---

## Source 3: Mom's Prepared Materials (Downloads folder)

A comprehensive content package gathered for the other website builder:

### Text Content
| Document | Contents |
|----------|----------|
| טקסטים לאתר.docx | Full site copy: hero text, about bio, services descriptions, CTAs |
| מאמר בתים גמישים.docx | Long-form article (~4,500 words) on flexible/efficient home design |
| שיטות בניה מאמרים מעודכנים.docx | Multi-part article series on construction methods in Israel |
| שאלות ותשובות עם מאמרים.docx | Extended FAQ + article content with internal linking instructions |
| תקנון אתר.docx | Full legal terms & privacy policy (professionally prepared) |

### Visual Assets (~121 images)
Projects with photos ready for the site:
- Nabu Katzneelson (4 photos + drone shots)
- Menachem Barak (30 photos, 15 web-optimized)
- Nocham (23 interior photos)
- Ram (3), Presman (1), Shvayedel (3), Shacham (2), Shakshnik (9), Wild (3), Vanish (1)
- Manor project video walkthroughs (architecture visualizations, room tours)

### Key Business Info Updates
- **Address discrepancy:** Live site says "Ashkol St 13, Givatayim" / materials say "Haartzela St. 22, Givat Ada" — needs clarification
- **Email:** tahl.goren.arch@gmail.com (primary), office@talgoren.co.il (old site)
- **Service area emphasis:** Northern Sharon, between Netanya and Haifa, extending east to Afula

---

## Gap Analysis: What the React Site Needs

### Content Gaps (material exists, not yet integrated)
1. **Updated site copy** — Mom's prepared texts (hero, about, services) may differ from what's currently in the React site
2. **New articles** — 3 substantial long-form articles ready to replace the stale 2020 blog posts
3. **Legal pages** — Terms & privacy policy document ready, no page for it yet
4. **New project photos** — ~121 images across 10+ projects, many web-optimized, not yet in the site
5. **Video content** — Manor project walkthrough videos not yet integrated

### Functional Gaps
6. **Contact form backend** — Form renders but doesn't submit anywhere
7. **Analytics** — No tracking in place
8. **Image hosting** — All project images are external links, need to be self-hosted
9. **SEO meta tags** — Current site has them, React site likely needs React Helmet or equivalent

### Design/UX Considerations
10. **Address/contact info** — Verify correct address with Tahl
11. **Service area map** — Could strengthen local SEO
12. **Article internal linking** — Mom's FAQ doc specifies links between FAQ answers and full articles

---

## Understanding Tahl's Expectations

Based on the materials and the fact she has "OCD about this stuff":

- **Professional above all** — She's an architect; the site IS her portfolio. Design quality = credibility.
- **Content-rich & educational** — She invested heavily in long-form articles. These matter to her for authority and SEO.
- **Personal & warm tone** — Not corporate. "Walking alongside the client." "A house that grows with the family."
- **Locally rooted** — Northern Sharon identity is central. Not trying to be Tel Aviv trendy.
- **Detail-oriented** — Exact copy, exact photos, exact layout will matter. Don't improvise text she hasn't approved.
- **Credential-proud** — Technion with distinction, 25+ years, 100+ homes, licensed + permit-authorized. These should be visible.
- **Family-oriented philosophy** — Her design ethos centers on families and life-cycle adaptability. The site should breathe this.

---

## Recommended Priority Order

1. **Sync content** — Diff mom's prepared texts against what's in the React site. Update to match her approved copy.
2. **Integrate new photos** — Compress and add the ~121 images from the materials folder.
3. **Add new articles** — Replace stale blog content with the 3 prepared long-form articles.
4. **Add legal page** — Terms & privacy from the prepared document.
5. **Fix contact form** — Add actual submission (email/webhook).
6. **SEO setup** — Meta tags, Open Graph, structured data matching or exceeding the WordPress site.
7. **Verify business details** — Confirm address, phone, email with Tahl before launch.
8. **Analytics** — Add tracking before go-live.
