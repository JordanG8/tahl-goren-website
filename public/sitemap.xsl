<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="he" dir="rtl">
      <head>
        <title>מפת אתר | טל גורן - אדריכלות ועיצוב פנים</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=Assistant:wght@300;400;500;600;700&amp;display=swap');
          
          :root {
            --primary: #1a1a1a;
            --accent: #d4af37;
            --bg: #fafafa;
            --card-bg: #ffffff;
            --text: #333333;
            --text-muted: #666666;
            --border: #eeeeee;
            --shadow: 0 4px 20px rgba(0,0,0,0.05);
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --primary: #ffffff;
              --accent: #e5c158;
              --bg: #0a0a0a;
              --card-bg: #141414;
              --text: #eeeeee;
              --text-muted: #999999;
              --border: #222222;
              --shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
          }

          body {
            font-family: 'Assistant', 'Inter', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 40px 20px;
            line-height: 1.6;
            direction: rtl;
          }

          .container {
            max-width: 1000px;
            margin: 0 auto;
          }

          header {
            text-align: center;
            margin-bottom: 50px;
          }

          h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: -0.02em;
            color: var(--primary);
          }

          p.description {
            color: var(--text-muted);
            font-size: 1.1rem;
          }

          .stats {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 20px;
          }

          .stat-item {
            background: var(--card-bg);
            padding: 10px 20px;
            border-radius: 12px;
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
          }

          .stat-value {
            font-weight: 700;
            color: var(--accent);
          }

          .search-container {
            margin-bottom: 30px;
            position: relative;
          }

          #search-input {
            width: 100%;
            padding: 15px 25px;
            border-radius: 15px;
            border: 1px solid var(--border);
            background: var(--card-bg);
            color: var(--text);
            font-size: 1rem;
            outline: none;
            box-shadow: var(--shadow);
            transition: border-color 0.3s;
            box-sizing: border-box;
          }

          #search-input:focus {
            border-color: var(--accent);
          }

          .category-section {
            margin-bottom: 40px;
          }

          .category-title {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--accent);
            display: inline-block;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }

          .url-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            box-shadow: var(--shadow);
            transition: transform 0.3s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
            gap: 10px;
            text-decoration: none;
            color: inherit;
          }

          .url-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }

          .url-link {
            font-weight: 600;
            color: var(--primary);
            word-break: break-all;
            font-size: 1.05rem;
          }

          .url-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            font-size: 0.85rem;
            color: var(--text-muted);
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .badge {
            font-size: 0.75rem;
            padding: 3px 8px;
            border-radius: 6px;
            background: rgba(212, 175, 55, 0.1);
            color: var(--accent);
            font-weight: 600;
            text-transform: uppercase;
          }

          footer {
            text-align: center;
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid var(--border);
            color: var(--text-muted);
            font-size: 0.9rem;
          }

          @media (max-width: 600px) {
            .grid {
              grid-template-columns: 1fr;
            }
            h1 {
              font-size: 2rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <a href="https://talgoren.co.il" style="text-decoration: none; color: var(--accent); font-weight: 600; display: flex; align-items: center; gap: 8px;">
                <span>&#8594;</span> חזרה לאתר
              </a>
              <div class="badge">SITEMAP</div>
            </div>
            <h1>מפת אתר</h1>
            <p class="description">רשימה מלאה של כל הדפים והתוכן באתר של טל גורן.</p>
            <div class="stats">
              <div class="stat-item">
                סה"כ דפים: <span class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              </div>
            </div>
          </header>

          <div class="search-container">
            <input type="text" id="search-input" placeholder="חפש דפים (למשל: פרויקטים, צור קשר)..." onkeyup="filterUrls()"/>
          </div>

          <div id="sections-container">
            <!-- Pages -->
            <div class="category-section" id="section-pages">
              <h2 class="category-title">דפים ראשיים</h2>
              <div class="grid">
                <xsl:for-each select="sitemap:urlset/sitemap:url[not(contains(sitemap:loc, '/projects/')) and not(contains(sitemap:loc, '/articles/'))]">
                  <xsl:sort select="sitemap:priority" order="descending"/>
                  <xsl:call-template name="url-card"/>
                </xsl:for-each>
              </div>
            </div>

            <!-- Projects -->
            <xsl:if test="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/projects/')]">
              <div class="category-section" id="section-projects">
                <h2 class="category-title">פרויקטים</h2>
                <div class="grid">
                  <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/projects/')]">
                    <xsl:sort select="sitemap:loc"/>
                    <xsl:call-template name="url-card"/>
                  </xsl:for-each>
                </div>
              </div>
            </xsl:if>

            <!-- Articles -->
            <xsl:if test="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/articles/')]">
              <div class="category-section" id="section-articles">
                <h2 class="category-title">מאמרים ובלוג</h2>
                <div class="grid">
                  <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/articles/')]">
                    <xsl:sort select="sitemap:lastmod" order="descending"/>
                    <xsl:call-template name="url-card"/>
                  </xsl:for-each>
                </div>
              </div>
            </xsl:if>
          </div>

          <footer>
            &copy; <xsl:value-of select="substring(sitemap:urlset/sitemap:url[1]/sitemap:lastmod, 1, 4)"/> טל גורן - אדריכלות ועיצוב פנים. נוצר באופן אוטומטי.
          </footer>
        </div>

        <script><![CDATA[
          function filterUrls() {
            const input = document.getElementById('search-input');
            const filter = input.value.toLowerCase();
            const cards = document.querySelectorAll('.url-card');
            
            cards.forEach(card => {
              const text = card.textContent.toLowerCase();
              if (text.includes(filter)) {
                card.style.display = "";
              } else {
                card.style.display = "none";
              }
            });

            // Hide empty sections
            document.querySelectorAll('.category-section').forEach(section => {
              const visibleCards = section.querySelectorAll('.url-card[style="display: \"]');
              const allCards = section.querySelectorAll('.url-card');
              let hasVisible = false;
              allCards.forEach(c => { if(c.style.display !== "none") hasVisible = true; });
              section.style.display = hasVisible ? "" : "none";
            });
          }
        ]]></script>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="url-card">
    <a href="{sitemap:loc}" class="url-card">
      <div class="url-link">
        <xsl:variable name="clean-url">
          <xsl:choose>
            <xsl:when test="substring(sitemap:loc, string-length(sitemap:loc)) = '/'">
              <xsl:value-of select="substring(sitemap:loc, 1, string-length(sitemap:loc) - 1)"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="sitemap:loc"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>
        
        <xsl:variable name="slug">
          <xsl:call-template name="last-segment">
            <xsl:with-param name="path" select="$clean-url"/>
          </xsl:call-template>
        </xsl:variable>

        <xsl:choose>
          <xsl:when test="$slug = 'https:'">דף הבית</xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="translate($slug, '-', ' ')"/>
          </xsl:otherwise>
        </xsl:choose>
      </div>
      
      <div class="url-meta">
        <xsl:if test="sitemap:lastmod">
          <div class="meta-item">
            <span>עדכון אחרון:</span>
            <span><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></span>
          </div>
        </xsl:if>
        <xsl:if test="sitemap:priority">
          <div class="meta-item">
            <span class="badge">עדיפות: <xsl:value-of select="sitemap:priority"/></span>
          </div>
        </xsl:if>
      </div>
    </a>
  </xsl:template>

  <xsl:template name="last-segment">
    <xsl:param name="path"/>
    <xsl:choose>
      <xsl:when test="contains($path, '/')">
        <xsl:call-template name="last-segment">
          <xsl:with-param name="path" select="substring-after($path, '/')"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$path"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>
