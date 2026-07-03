/* ============================================================
   HOLKAM ADVISORY — main.js v2
   Vanilla JS, no dependencies.
   ============================================================ */

/* ============================================================
   MODULE 1 — Navigation scroll state
   ============================================================ */
(function initNav() {
  var nav = document.getElementById('site-nav');
  if (!nav) return;

  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ============================================================
   MODULE 2 — Mobile menu
   ============================================================ */
(function initMobileMenu() {
  var hamburger  = document.getElementById('hamburger');
  var menu       = document.getElementById('mobile-menu');
  var closeBtn   = document.getElementById('mobile-close');
  var overlay    = document.getElementById('mobile-overlay');
  var links      = document.querySelectorAll('.mobile-link');

  if (!hamburger || !menu) return;

  function open() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay)  overlay.addEventListener('click', close);

  links.forEach(function(link) { link.addEventListener('click', close); });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
      hamburger.focus();
    }
  });
})();


/* ============================================================
   MODULE 3 — IntersectionObserver scroll animations
   ============================================================ */
(function initScrollAnimations() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var selectors = ['.animate-on-scroll', '.animate-on-scroll-left'];
  var elements  = document.querySelectorAll(selectors.join(','));

  if (reducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(function(el) { el.classList.add('fade-in'); });
    return;
  }

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
  );

  elements.forEach(function(el) { observer.observe(el); });
})();


/* ============================================================
   MODULE 4 — Smooth scroll (anchor links)
   ============================================================ */
(function initSmoothScroll() {
  var NAV_OFFSET = 88;

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
        behavior: 'smooth'
      });
    });
  });
})();


/* ============================================================
   MODULE 5 — Staggered transition delays for grid children
   ============================================================ */
(function initStagger() {
  var groups = [
    { parent: '.services-preview__grid', child: '.services-preview__card' },
    { parent: '.about-values__grid',     child: '.about-value' },
    { parent: '.approach-process',       child: '.approach-step' },
    { parent: '.testimonials__grid',     child: '.testimonial-card' },
  ];

  groups.forEach(function(g) {
    var parent = document.querySelector(g.parent);
    if (!parent) return;
    parent.querySelectorAll(g.child).forEach(function(el, i) {
      el.style.transitionDelay = (i * 0.12) + 's';
    });
  });
})();


/* ============================================================
   MODULE 6 — Rotating badge (pauses on hover)
   ============================================================ */
(function initBadge() {
  document.querySelectorAll('.rotating-badge').forEach(function(badge) {
    var svg = badge.querySelector('.rotating-badge__svg');
    if (!svg) return;
    badge.addEventListener('mouseenter', function() {
      svg.style.animationPlayState = 'paused';
    });
    badge.addEventListener('mouseleave', function() {
      svg.style.animationPlayState = 'running';
    });
  });
})();




/* ============================================================
   MODULE 7 — Insights tag filter (articles.html)
   ============================================================ */
(function initArticleFilter() {
  var buttons = document.querySelectorAll('.articles-filter__btn');
  var cards   = document.querySelectorAll('.article-listing-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      buttons.forEach(function(b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var filter = btn.getAttribute('data-filter');
      cards.forEach(function(card) {
        var match = filter === 'all' || card.getAttribute('data-tag') === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });
})();


/* ============================================================
   MODULE 8 — Active nav link highlight
   Matches current page filename to nav links.
   ============================================================ */
(function initActiveNav() {
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


/* ============================================================
   MODULE 9 — Autoplay reliability for background videos
   The `autoplay` attribute alone can silently fail (data-saver
   mode, battery-saver mode, a slow connection racing the video's
   readiness, etc). This retries programmatically and, as a last
   resort, starts playback on the visitor's first tap/click —
   browsers that block attribute-based autoplay still allow
   play() from a real user gesture.
   ============================================================ */
(function initVideoAutoplay() {
  var videos = Array.prototype.slice.call(document.querySelectorAll('video[autoplay]'));
  if (!videos.length) return;

  function tryPlay(video) {
    if (!video.paused) return;
    var p = video.play();
    if (p && typeof p.catch === 'function') p.catch(function () { /* retried elsewhere */ });
  }

  videos.forEach(function (video) {
    tryPlay(video);
    video.addEventListener('loadedmetadata', function () { tryPlay(video); });
    video.addEventListener('canplay', function () { tryPlay(video); });
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') videos.forEach(tryPlay);
  });

  var resumeOnGesture = function () {
    videos.forEach(tryPlay);
    document.removeEventListener('touchstart', resumeOnGesture);
    document.removeEventListener('click', resumeOnGesture);
  };
  document.addEventListener('touchstart', resumeOnGesture, { passive: true, once: true });
  document.addEventListener('click', resumeOnGesture, { once: true });
})();
