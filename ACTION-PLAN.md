# Action Plan — Tahl Goren Website Rebuild

---

## Phase 1: Content Alignment
**Goal:** Make the site say exactly what Tahl wants it to say.

- [ ] **1.1** Read all prepared texts from `טקסטים לאתר.docx` and diff against current `siteData.js` content
- [ ] **1.2** Update hero section copy to match Tahl's approved text
- [ ] **1.3** Update About page — bio, credentials, philosophy, office description
- [ ] **1.4** Update Services page — new homes, additions & renovations, additional services
- [ ] **1.5** Update FAQ page with expanded Q&A content from `שאלות ותשובות עם מאמרים.docx`
- [ ] **1.6** Update contact info — confirmed address: **האלה 22, גבעת עדה**
- [ ] **1.7** Update CTA text throughout the site to match prepared copy

## Phase 2: Articles & Educational Content
**Goal:** Replace stale 2020 blog content with Tahl's substantial new articles.

- [ ] **2.1** Integrate "Flexible and Efficient Homes" article (~4,500 words)
- [ ] **2.2** Integrate "Construction Methods" multi-part article series
- [ ] **2.3** Set up internal linking between FAQ answers and full articles (as specified in Tahl's docs)
- [ ] **2.4** Review article formatting — headings, paragraphs, images — for readability

## Phase 3: Visual Assets
**Goal:** Replace external image links with Tahl's curated project photography.

- [ ] **3.1** Audit all ~121 images from the materials folder — identify web-optimized versions
- [ ] **3.2** Compress all images to web-appropriate sizes (target <1MB each, ideally <200KB)
- [ ] **3.3** Organize images by project in the repo's public folder
- [ ] **3.4** Update project data to use local images instead of Google Photos / old site URLs
- [ ] **3.5** Add any new projects from the materials that aren't in the current 20
- [ ] **3.6** Evaluate Manor video content for integration (walkthrough videos)

## Phase 4: Projects Restructure
**Goal:** Split projects into the hierarchy Tahl specified.

- [ ] **4.1** Create projects landing page (`/projects`) with 3 equal sub-page cards:
  1. **בתים מאוכלסים** — completed homes with photography
  2. **בתים בתכנון** — homes in design phase with renders/visualizations
  3. **מפת הפרויקטים** — Google Map with all projects pinned (past & present)
- [ ] **4.2** Create `/projects/completed` page (migrate current projects content here)
- [ ] **4.3** Create `/projects/in-design` page (populate with renders from materials)
- [ ] **4.4** Create `/projects/map` page with interactive Google Map
- [ ] **4.5** Update navbar/routing to reflect new hierarchy

## Phase 5: Missing Pages & Features
**Goal:** Fill the functional gaps.

- [ ] **5.1** Create Terms & Privacy Policy page from `תקנון אתר.docx`
- [ ] **5.2** Add footer link to legal page
- [ ] **5.3** Wire up contact form to actually send submissions (email service or webhook)
- [ ] **5.4** Add Google Maps embed for office location on contact page

## Phase 6: SEO & Meta
**Goal:** Match or exceed the WordPress site's SEO foundations.

- [ ] **6.1** Add per-page title tags and meta descriptions (React Helmet or equivalent)
- [ ] **6.2** Add Open Graph tags for social sharing
- [ ] **6.3** Add structured data (Schema.org — LocalBusiness, BreadcrumbList, FAQPage)
- [ ] **6.4** Ensure all images have descriptive alt text in Hebrew
- [ ] **6.5** Submit sitemap to Google Search Console
- [ ] **6.6** Set up 301 redirects from old WordPress URL paths to new routes

## Phase 7: Polish & Review
**Goal:** Make it perfect for Tahl's eyes.

- [ ] **7.1** Full cross-device review (mobile, tablet, desktop)
- [ ] **7.2** Typography and spacing audit — consistency across all pages
- [ ] **7.3** Test all links, buttons, and navigation flows
- [ ] **7.4** Performance audit (Lighthouse) — optimize load times
- [ ] **7.5** Accessibility check — contrast ratios, screen reader compatibility
- [ ] **7.6** Prepare staging URL for Tahl to review before go-live

## Phase 8: Launch
**Goal:** Smooth cutover from WordPress to the new site.

- [ ] **8.1** Point talgoren.co.il domain to Vercel
- [ ] **8.2** Verify SSL certificate
- [ ] **8.3** Confirm 301 redirects are working (old URLs → new routes)
- [ ] **8.4** Add analytics (Google Analytics or Vercel Analytics)
- [ ] **8.5** Cancel WordPress hosting subscription (1,100 NIS/month savings)
- [ ] **8.6** Monitor for 404s and fix any missed redirects

---

## Notes
- **Never improvise copy** — only use text Tahl has explicitly approved
- **Compress everything** — images under 200KB, videos under 1MB where possible
- **Hebrew first** — all content, alt text, meta descriptions in Hebrew
- **Check with Tahl** before any design changes that alter layout or visual hierarchy
