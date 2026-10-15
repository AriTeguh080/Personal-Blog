/* script.js — theme toggle, navbar, active link, image fallback, renderers */
(function () {
  var root = document.documentElement;

  // ---------- Theme: load saved, default light ----------
  try {
    var saved = localStorage.getItem("ari-teguh-theme");
    if (saved === "dark" || saved === "light") {
      root.setAttribute("data-theme", saved);
    } else {
      root.setAttribute("data-theme", "light");
    }
  } catch (e) {
    root.setAttribute("data-theme", "light");
  }

  function syncToggleIcon() {
    var btns = document.querySelectorAll(".theme-toggle");
    var isDark = root.getAttribute("data-theme") === "dark";
    btns.forEach(function (b) {
      b.setAttribute("aria-pressed", isDark ? "true" : "false");
      b.setAttribute("aria-label", isDark ? "Aktifkan light mode" : "Aktifkan dark mode");
      var icon = b.querySelector(".toggle-icon");
      if (icon) icon.textContent = isDark ? "☾" : "☼";
    });
  }

  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("ari-teguh-theme", next); } catch (e) {}
    syncToggleIcon();
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncToggleIcon();
    document.querySelectorAll(".theme-toggle").forEach(function (b) {
      b.addEventListener("click", toggleTheme);
    });

    // ---------- Navbar: scrolled state + hamburger ----------
    var header = document.querySelector(".site-header");
    var onScroll = function () {
      if (!header) return;
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Ukur tinggi header aktual untuk posisi menu mobile fixed.
    // Menu memakai top:var(--header-h) agar selalu tepat di bawah header
    // pada posisi scroll mana pun, tanpa menggeser scroll user.
    function syncHeaderH() {
      if (!header) return;
      try {
        document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
      } catch (e) {}
    }
    syncHeaderH();
    window.addEventListener("load", syncHeaderH);

    var burger = document.querySelector(".hamburger");
    var mobileNav = document.getElementById("mobileNav");
    if (burger && mobileNav) {
      var setOpen = function (open) {
        // Posisi scroll user tidak pernah diubah saat buka/tutup menu.
        document.body.classList.toggle("menu-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.textContent = open ? "✕" : "☰";
        mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
      };
      var closeMenu = function () { setOpen(false); };
      burger.addEventListener("click", function () {
        syncHeaderH(); // ukur ulang sebelum tampil, tanpa mengubah scroll
        setOpen(!document.body.classList.contains("menu-open"));
      });
      mobileNav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
      // klik backdrop (di luar panel) menutup menu
      mobileNav.addEventListener("click", function (e) {
        if (e.target === mobileNav) closeMenu();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
      });
      // tutup otomatis saat kembali ke desktop agar tidak nyangkut
      window.addEventListener("resize", function () {
        syncHeaderH();
        if (window.innerWidth > 768) closeMenu();
      });
    }

    // ---------- Active nav link ----------
    try {
      var path = window.location.pathname.split("/").pop() || "index.html";
      document.querySelectorAll(".nav-links a, .mobile-nav-panel a, .footer-links a").forEach(function (a) {
        var href = a.getAttribute("href");
        if (!href) return;
        var file = href.split("/").pop();
        if (file === path || (path === "" && file === "index.html")) a.classList.add("active");
      });
    } catch (e) {}

    // ---------- Image fallback: HANYA saat event "error" benar-benar terjadi ----------
    // Aturan keras:
    // - Placeholder/fallback TIDAK BOLEH dipicu oleh img.complete / naturalWidth
    //   sesaat setelah render, karena gambar lazy di bawah fold memang belum
    //   diunduh pada saat itu (complete=false) dan itu BUKAN kegagalan.
    // - Satu-satunya kondisi gagal yang valid: event "error", atau
    //   complete===true DAN naturalWidth===0 (fetch selesai tapi gagal —
    //   menutup kasus error yang terlewat sebelum listener dipasang).
    function editorialPlaceholder(label) {
      var t = (label || "ARI TEGUH").slice(0, 28);
      var svg =
        "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>" +
        "<rect width='800' height='500' fill='#E2DCC2'/>" +
        "<rect x='24' y='24' width='752' height='452' fill='none' stroke='#2D0000' stroke-width='3'/>" +
        "<rect x='36' y='36' width='728' height='428' fill='none' stroke='#6D0808' stroke-width='1.5' stroke-dasharray='10 8'/>" +
        "<text x='400' y='225' text-anchor='middle' font-family='Georgia,serif' font-size='44' fill='#6D0808'>" + "Personal Blog" + "</text>" +
        "<text x='400' y='275' text-anchor='middle' font-family='monospace' font-size='20' letter-spacing='4' fill='#5E443F'>" + t.toUpperCase().replace(/&/g, "AND") + "</text>" +
        "<text x='400' y='315' text-anchor='middle' font-family='monospace' font-size='15' letter-spacing='3' fill='#757D6F'>SOC • NOC • NETWORKING</text>" +
        "</svg>";
      return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    }

    function guard(img) {
      if (!img || img.dataset.fbk === "1") return;
      img.dataset.fbk = "1";
      var label = img.getAttribute("alt") || img.getAttribute("data-label") || "Ari Teguh";
      img.src = editorialPlaceholder(label);
      img.style.filter = "sepia(.15) saturate(.9)";
    }

    function frameOf(img) { return (img && img.closest) ? img.closest(".img-frame") : null; }

    // Foto asli tampil: pastikan img terlihat dan fallback tersembunyi.
    // Ini menjamin placeholder tidak pernah menutupi gambar yang berhasil dimuat.
    function showReal(img) {
      img.style.display = "";
      var fr = frameOf(img);
      var fb = fr ? fr.querySelector(".img-fallback") : null;
      if (fb) fb.style.display = "none";
    }

    function showFallback(img) {
      img.style.display = "none";
      var fr = frameOf(img);
      var fb = fr ? fr.querySelector(".img-fallback") : null;
      if (fb) fb.style.display = "flex";
    }

    function onImgError(img) {
      if (frameOf(img)) showFallback(img);
      else guard(img);
    }

    // Pasang load + error pada satu img. Aman untuk lazy: selama
    // complete===false kita tidak melakukan apa-apa selain menunggu event.
    function wireImg(img) {
      if (!img || img.dataset.wired === "1") return;
      img.dataset.wired = "1";
      img.addEventListener("load", function () { showReal(img); });
      img.addEventListener("error", function () { onImgError(img); });
      if (!img.getAttribute("src")) { onImgError(img); return; }
      try {
        if (img.complete && img.naturalWidth === 0) onImgError(img);
      } catch (e) {}
    }

    // Semua img statis: cukup pasang listener. SENGAJA tidak ada sapuan
    // naturalWidth saat window load — sapuan itu menukar src gambar lazy
    // yang belum diunduh menjadi placeholder SVG permanen.
    document.querySelectorAll("img").forEach(wireImg);

    // ---------- Render home latest (3 TERBARU) ----------
    var latestWrap = document.getElementById("latest-articles");
    if (latestWrap && window.posts) {
      var latest = window.posts.slice(-3).reverse();
      latestWrap.innerHTML = latest.map(function (p) {
        return (
          '<a class="latest-card" href="' + p.link + '">' +
            '<img src="' + p.image + '" alt="' + p.title + '" loading="eager" decoding="async">' +
            '<div class="latest-body">' +
              '<span class="post-meta">' + p.category + " • " + p.date + "</span>" +
              "<h3>" + p.title + "</h3>" +
              '<span class="text-link">Baca artikel <span class="arrow">→</span></span>' +
            "</div>" +
          "</a>"
        );
      }).join("");
      // wire hasil render (error saja yang memicu placeholder)
      latestWrap.querySelectorAll("img").forEach(wireImg);
    }

    // ---------- Render home featured projects (3 pilihan) ----------
    var featWrap = document.getElementById("home-projects");
    if (featWrap && window.posts) {
      var picks = ["vlan-dhcp", "proxmox-virtualization", "ioc-threat-intelligence"];
      var items = picks.map(function (id) { return window.posts.find(function (p) { return p.id === id; }); }).filter(Boolean);
      featWrap.innerHTML = items.map(function (p, i) {
        var rev = i % 2 === 1 ? " reverse" : "";
        return (
          '<div class="project-row' + rev + '">' +
            '<div class="p-media"><div class="img-frame">' +
              '<img src="' + p.image + '" alt="' + p.title + '" loading="eager" decoding="async">' +
              '<div class="img-fallback"><span>Editorial Plate • ' + p.num + '</span><strong>' + p.title + "</strong></div>" +
            "</div></div>" +
            '<div class="p-content">' +
              '<div class="p-num">' + p.num + "</div>" +
              '<div class="p-cat">' + p.category + "</div>" +
              "<h3>" + p.title + "</h3>" +
              '<div class="p-date">' + p.date + "</div>" +
              "<p>" + p.description + "</p>" +
              '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("") + "</div>" +
              '<a class="text-link" href="' + p.link + '">Baca artikel <span class="arrow">→</span></a>' +
            "</div>" +
          "</div>"
        );
      }).join("");
      // Bingkai picks homepage: load → foto tampil, error → fallback.
      featWrap.querySelectorAll("img").forEach(wireImg);
    }

    // ---------- Render blog page list ----------
    var blogFeatured = document.getElementById("blog-featured");
    var blogRows = document.getElementById("blog-rows");
    if ((blogFeatured || blogRows) && window.posts) {
      // featured = artikel terbaru (item terakhir posts)
      var f = window.posts[window.posts.length - 1];
      if (blogFeatured && f) {
        blogFeatured.innerHTML =
          '<div class="featured-post">' +
            '<div class="featured-media"><img src="' + f.image + '" alt="' + f.title + '" loading="eager" decoding="async"></div>' +
            '<div class="featured-body">' +
              '<span class="post-meta">Featured • ' + f.category + "</span>" +
              "<h3>" + f.title + "</h3>" +
              '<div class="p-date">' + f.date + "</div>" +
              "<p>" + f.description + "</p>" +
              '<div><a class="btn btn-primary" href="' + f.link + '">Baca Artikel</a></div>' +
            "</div>" +
          "</div>";
        var fi = blogFeatured.querySelector("img");
        if (fi) wireImg(fi);
      }
      if (blogRows) {
        var rest = window.posts.slice(0, -1); // semua kecuali terbaru, tetap terlama->terbaru
        blogRows.innerHTML = rest.map(function (p) {
          return (
            '<a class="post-row" href="' + p.link + '">' +
              '<span class="post-thumb"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy" decoding="async"></span>' +
              "<span><span class='post-meta'>" + p.num + " • " + p.category + " • " + p.date + "</span><h3>" + p.title + "</h3><span style='color:var(--text-secondary);font-size:.94rem'>" + p.description + "</span></span>" +
              '<span class="go" aria-hidden="true">→</span>' +
            "</a>"
          );
        }).join("");
        blogRows.querySelectorAll("img").forEach(wireImg);
      }
    }

    // ---------- Render projects page ----------
    var projWrap = document.getElementById("all-projects");
    if (projWrap && window.posts) {
      projWrap.innerHTML = window.posts.map(function (p, i) {
        var rev = i % 2 === 1 ? " reverse" : "";
        // 2 project pertama dekat viewport awal → eager; sisanya lazy.
        var loading = i < 2 ? "eager" : "lazy";
        return (
          '<div class="project-row' + rev + '">' +
            '<div class="p-media"><div class="img-frame">' +
              '<img src="' + p.image + '" alt="' + p.title + '" loading="' + loading + '" decoding="async">' +
              '<div class="img-fallback"><span>Editorial Plate • ' + p.num + '</span><strong>' + p.title + "</strong></div>" +
            "</div></div>" +
            '<div class="p-content">' +
              '<div class="p-num">' + p.num + "</div>" +
              '<div class="p-cat">' + p.category + "</div>" +
              "<h3>" + p.title + "</h3>" +
              '<div class="p-date">' + p.date + "</div>" +
              "<p>" + p.description + "</p>" +
              '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("") + "</div>" +
              '<a class="text-link" href="' + p.link + '">Baca artikel <span class="arrow">→</span></a>' +
            "</div>" +
          "</div>"
        );
      }).join("");
      projWrap.querySelectorAll("img").forEach(wireImg);
    }
  });
})();
