/* animations.js — GSAP + ScrollTrigger, editorial slow reveal.
   PENTING: tidak menyembunyikan konten via CSS. Semua initial state
   diatur lewat GSAP, sehingga jika GSAP gagal dimuat konten tetap terlihat. */
(function () {
  function reduced() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (reduced()) return; // hormati prefers-reduced-motion
    if (typeof gsap === "undefined") return; // konten tetap terlihat tanpa animasi
    // ScrollTrigger opsional: jika CDN-nya gagal, animasi scroll
    // menjadi reveal biasa — gambar/konten tetap terlihat normal.
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

    var D = 0.85; // duration 0.7–1 dtk
    var EASE = "power2.out";
    var START = "top 85%";
    // Mobile: animasi lebih ringan, tanpa movement horizontal besar
    var isMobile = false;
    try { isMobile = window.matchMedia("(max-width: 768px)").matches; } catch (e) {}

    /* ---------- HERO entrance: heading → image → details (stagger ringan) ---------- */
    if (document.querySelector(".hero-grid")) {
      var heroTl = gsap.timeline({ defaults: { duration: D, ease: EASE } });
      heroTl
        .from(".hero-heading .kicker", { y: isMobile ? 24 : 40, opacity: 0 })
        .from(".hero-heading .hero-title", { y: isMobile ? 28 : 50, opacity: 0 }, "-=0.55")
        .from(".hero-media", { opacity: 0, scale: isMobile ? 0.97 : 0.94, y: isMobile ? 24 : 30, duration: 1 }, "-=0.45")
        .from(".hero-details .hero-sub", { y: isMobile ? 24 : 40, opacity: 0 }, "-=0.6")
        .from(".hero-details .hero-desc", { y: isMobile ? 20 : 30, opacity: 0 }, "-=0.55")
        .from(".hero-details .hero-btns", { y: isMobile ? 20 : 30, opacity: 0 }, "-=0.55")
        .from(".hero-details .hero-meta", { y: isMobile ? 16 : 20, opacity: 0 }, "-=0.6");
      // stamp hanya jika ada (aksen kecil, bukan foto)
      if (document.querySelector(".photo-stamp")) {
        heroTl.from(".photo-stamp", { opacity: 0, scale: 0.7, duration: 0.7 }, "-=0.6");
      }
    }

    /* page-hero untuk subpages */
    gsap.from(".page-hero .kicker, .page-hero h1, .page-hero p", {
      y: 40, opacity: 0, duration: D, ease: EASE, stagger: 0.12,
      scrollTrigger: { trigger: ".page-hero", start: "top 90%" }
    });

    /* ---------- Section titles ---------- */
    gsap.utils.toArray(".section-title, .section-head").forEach(function (el) {
      gsap.from(el, {
        y: 45, opacity: 0, duration: D, ease: EASE,
        scrollTrigger: { trigger: el, start: START }
      });
    });

    /* ---------- Focus blocks stagger ---------- */
    gsap.utils.toArray(".focus-grid").forEach(function (grid) {
      gsap.from(grid.querySelectorAll(".focus-block"), {
        y: 50, opacity: 0, duration: D, ease: EASE, stagger: 0.14,
        scrollTrigger: { trigger: grid, start: START }
      });
    });

    /* ---------- About preview: left/right (desktop) / fade-up (mobile) ---------- */
    gsap.utils.toArray(".about-preview-grid > *").forEach(function (el, i) {
      if (isMobile) {
        gsap.from(el, { y: 28, opacity: 0, duration: D, ease: EASE, scrollTrigger: { trigger: el, start: START } });
      } else {
        gsap.from(el, { x: i === 0 ? -45 : 45, opacity: 0, duration: D, ease: EASE, scrollTrigger: { trigger: el, start: START } });
      }
    });

    /* ---------- Topics stagger + slight scale ---------- */
    gsap.utils.toArray(".topics-grid").forEach(function (grid) {
      gsap.from(grid.querySelectorAll(".topic"), {
        y: 40, opacity: 0, scale: 0.97, duration: D, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: grid, start: START }
      });
    });

    /* ---------- Projects alternating (desktop) / fade-up ringan (mobile) ---------- */
    gsap.utils.toArray(".project-row").forEach(function (row) {
      var media = row.querySelector(".p-media");
      var content = row.querySelector(".p-content");
      var isReverse = row.classList.contains("reverse");
      if (media) {
        if (isMobile) {
          gsap.from(media, { y: 28, opacity: 0, duration: D, ease: EASE, scrollTrigger: { trigger: row, start: START } });
        } else {
          gsap.from(media, { x: isReverse ? 55 : -55, opacity: 0, duration: D, ease: EASE, scrollTrigger: { trigger: row, start: START } });
        }
      }
      if (content) {
        if (isMobile) {
          gsap.from(content, { y: 28, opacity: 0, duration: D, ease: EASE, scrollTrigger: { trigger: row, start: START } });
        } else {
          gsap.from(content, { x: isReverse ? -55 : 55, opacity: 0, duration: D, ease: EASE, scrollTrigger: { trigger: row, start: START } });
        }
      }
    });

    /* ---------- Blog: featured scale + rows stagger ---------- */
    gsap.utils.toArray(".featured-post").forEach(function (el) {
      gsap.from(el, {
        scale: 0.95, opacity: 0, duration: 1, ease: EASE,
        scrollTrigger: { trigger: el, start: START }
      });
    });
    gsap.utils.toArray(".post-rows, .latest-grid").forEach(function (wrap) {
      var items = wrap.querySelectorAll(".post-row, .latest-card");
      if (!items.length) return;
      gsap.from(items, {
        y: 40, opacity: 0, duration: D, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: wrap, start: START }
      });
    });

    /* ---------- Contact cards stagger ---------- */
    gsap.utils.toArray(".contact-grid").forEach(function (grid) {
      gsap.from(grid.querySelectorAll(".contact-card"), {
        y: 45, opacity: 0, duration: D, ease: EASE, stagger: 0.12,
        scrollTrigger: { trigger: grid, start: START }
      });
    });

    /* ---------- Timeline stagger ---------- */
    gsap.utils.toArray(".timeline").forEach(function (tl) {
      gsap.from(tl.querySelectorAll("li"), {
        y: 40, opacity: 0, duration: D, ease: EASE, stagger: 0.14,
        scrollTrigger: { trigger: tl, start: START }
      });
    });

    /* ---------- Skills grid stagger ---------- */
    gsap.utils.toArray(".skills-grid").forEach(function (grid) {
      var cards = grid.querySelectorAll(".skill-card");
      if (!cards.length) return;
      gsap.from(cards, {
        y: isMobile ? 24 : 36, opacity: 0, duration: D, ease: EASE, stagger: 0.07,
        clearProps: "transform",
        scrollTrigger: { trigger: grid, start: START }
      });
    });

    /* ---------- Generic reveal untuk about/dual/article ---------- */
    gsap.utils.toArray(".dual, .article-body, .article-cover").forEach(function (el) {
      gsap.from(el, {
        y: 40, opacity: 0, duration: D, ease: EASE,
        scrollTrigger: { trigger: el, start: START }
      });
    });
  });
})();
