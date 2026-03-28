/* ========================================
   TAL GOREN ARCHITECTS - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal Animation ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Image Reveal Animation ----
  const imgReveals = document.querySelectorAll('.img-reveal');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        imgObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  imgReveals.forEach(el => imgObserver.observe(el));

  // ---- Nav Scroll Effect ----
  const nav = document.querySelector('nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 80) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ---- Mobile Menu Toggle ----
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('menu-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Close mobile menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = current + suffix;
        }, 30);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ---- Parallax on scroll ----
  const parallaxEls = document.querySelectorAll('.parallax');
  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.3;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
        }
      });
    }, { passive: true });
  }

  // ---- Lightbox for project images ----
  const lightboxImages = document.querySelectorAll('[data-lightbox]');
  if (lightboxImages.length > 0) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] bg-black/90 hidden items-center justify-center cursor-pointer';
    overlay.id = 'lightbox-overlay';
    overlay.innerHTML = '<img class="max-w-[90vw] max-h-[90vh] object-contain" id="lightbox-img" /><button class="absolute top-8 left-8 text-white text-4xl font-light">&times;</button>';
    document.body.appendChild(overlay);

    lightboxImages.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        const lbImg = document.getElementById('lightbox-img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });

    overlay.addEventListener('click', () => {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  // ---- Page enter animation ----
  document.body.classList.add('page-enter');

  // ---- Active nav link ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('nav-active');
    }
  });

  // ---- Dynamic Rendering from data.js ----
  if (typeof siteData !== 'undefined') {
    
    // Render Featured Projects on Index
    const featuredProjectsContainer = document.getElementById('index-featured-projects');
    if (featuredProjectsContainer && siteData.projects) {
      const featured = siteData.projects.slice(0, 3);
      featuredProjectsContainer.innerHTML = featured.map(project => `
        <a href="projects.html#${project.id}" class="reveal group block relative overflow-hidden card-hover">
          <div class="aspect-[4/3] overflow-hidden">
            <img
              src="${project.image}"
              alt="${project.title}"
              class="w-full h-full object-cover img-grayscale"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-right">
              <h3 class="font-headline font-bold text-xl text-white">${project.title}</h3>
              <span class="font-label text-xs text-white/70 tracking-wide">${project.location}</span>
            </div>
          </div>
        </a>
      `).join('');
      // Re-initialize reveal observer for new elements
      featuredProjectsContainer.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }

    // Render Instagram Reels
    const reelsContainer = document.getElementById('instagram-reels-gallery');
    if (reelsContainer && siteData.instagramReels) {
      reelsContainer.innerHTML = siteData.instagramReels.map(reel => `
        <a href="${reel.url}" target="_blank" class="reveal group block relative overflow-hidden">
          <div class="aspect-[9/16] bg-surface-container overflow-hidden">
            <img
              src="${reel.thumbnail}"
              alt="Instagram Reel"
              class="w-full h-full object-cover img-grayscale"
            />
          </div>
          <div class="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div class="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span class="material-symbols-outlined text-4xl mb-2" style="font-variation-settings:'FILL' 1">play_circle</span>
              <p class="font-headline font-bold text-sm">צפו באינסטגרם</p>
            </div>
          </div>
        </a>
      `).join('');
      reelsContainer.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }

    // Render Media Mentions
    const mediaContainer = document.getElementById('media-articles-grid');
    if (mediaContainer && siteData.mediaArticles) {
      mediaContainer.innerHTML = siteData.mediaArticles.map(article => `
        <a href="${article.url}" target="_blank" class="reveal group block p-8 bg-surface-container-low card-hover">
          <span class="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">${article.source}</span>
          <h3 class="font-headline font-bold text-xl text-primary mt-2 group-hover:text-secondary transition-colors">${article.title}</h3>
          <p class="text-secondary text-sm mt-4 leading-relaxed">${article.description}</p>
          <div class="mt-6 flex items-center gap-2 text-primary font-headline font-bold text-xs uppercase tracking-widest">
            <span>קראו את הכתבה</span>
            <span class="material-symbols-outlined text-sm">arrow_back</span>
          </div>
        </a>
      `).join('');
      mediaContainer.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }

    // Render Site Articles
    const siteArticlesContainer = document.getElementById('site-articles-grid');
    if (siteArticlesContainer && siteData.articles) {
      siteArticlesContainer.innerHTML = siteData.articles.map(article => `
        <a href="${article.originalLink}" target="_blank" class="reveal group block bg-surface card-hover overflow-hidden">
          <div class="aspect-video overflow-hidden">
            <img
              src="${article.image}"
              alt="${article.title}"
              class="w-full h-full object-cover img-grayscale"
            />
          </div>
          <div class="p-8">
            <span class="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">מאמר</span>
            <h3 class="font-headline font-bold text-2xl text-primary mt-2 group-hover:text-secondary transition-colors">${article.title}</h3>
            <p class="text-secondary text-base mt-4 leading-relaxed">${article.description}</p>
          </div>
        </a>
      `).join('');
      siteArticlesContainer.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }

    // Render All Projects
    const allProjectsContainer = document.getElementById('all-projects-grid');
    if (allProjectsContainer && siteData.projects) {
      allProjectsContainer.innerHTML = siteData.projects.map(project => `
        <a href="projects.html#${project.id}" class="reveal group relative overflow-hidden card-hover block">
          <div class="aspect-[4/3] overflow-hidden bg-surface-container">
            <img
              src="${project.image}"
              alt="${project.title}"
              class="w-full h-full object-cover img-grayscale"
              loading="lazy"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute bottom-0 right-0 left-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span class="inline-block bg-white/90 text-primary font-label text-[10px] uppercase tracking-[0.2em] px-3 py-1 mb-3">${project.location}</span>
            <h2 class="font-headline font-bold text-xl md:text-2xl text-white mb-2">${project.title}</h2>
            <p class="font-body text-white/80 text-sm mb-4 max-w-sm line-clamp-2">${project.description}</p>
            <span class="inline-flex items-center gap-2 text-white font-label text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <span>צפו בפרויקט</span>
              <span class="material-symbols-outlined text-base">arrow_back</span>
            </span>
          </div>
        </a>
      `).join('');
      allProjectsContainer.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }
  }


});
