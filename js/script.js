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

    var burger = document.querySelector(".hamburger");
    var nav = document.querySelector(".nav-links");
    if (burger && nav) {
      var closeMenu = function () {
        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
        burger.textContent = "☰";
      };
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        document.body.classList.toggle("menu-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.textContent = open ? "✕" : "☰";
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
      });
      // tutup otomatis saat kembali ke desktop agar tidak nyangkut
      window.addEventListener("resize", function () {
        if (window.innerWidth > 768) closeMenu();
      });
    }

    // ---------- Active nav link ----------
    try {
      var path = window.location.pathname.split("/").pop() || "index.html";
      document.querySelectorAll(".nav-links a, .footer-links a").forEach(function (a) {
        var href = a.getAttribute("href");
        if (!href) return;
        var file = href.split("/").pop();
        if (file === path || (path === "" && file === "index.html")) a.classList.add("active");
      });
    } catch (e) {}

    // ---------- Image fallback: jangan tampilkan broken image ----------
    // Jika file webp belum ada, ganti dengan placeholder editorial (SVG data URI, palette vintage).
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

    document.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () { guard(img); });
      // jika src kosong
      if (!img.getAttribute("src")) guard(img);
    });

    // cek naturalWidth setelah load (untuk file 0-byte / 404 cache)
    window.addEventListener("load", function () {
      document.querySelectorAll("img").forEach(function (img) {
        if (img.naturalWidth === 0 && img.src && !img.src.startsWith("data:")) guard(img);
      });
    });

    // ---------- Render home latest (3 TERBARU) ----------
    var latestWrap = document.getElementById("latest-articles");
    if (latestWrap && window.posts) {
      var latest = window.posts.slice(-3).reverse();
      latestWrap.innerHTML = latest.map(function (p) {
        return (
          '<a class="latest-card" href="' + p.link + '">' +
            '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + editorialPlaceholder(p.title).replace(/'/g, "%27") + '\'">' +
            '<div class="latest-body">' +
              '<span class="post-meta">' + p.category + " • " + p.date + "</span>" +
              "<h3>" + p.title + "</h3>" +
              '<span class="text-link">Baca artikel <span class="arrow">→</span></span>' +
            "</div>" +
          "</a>"
        );
      }).join("");
      // guard hasil render
      latestWrap.querySelectorAll("img").forEach(function (img) {
        img.addEventListener("error", function () { guard(img); });
      });
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
              '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
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
      featWrap.querySelectorAll("img").forEach(function (img) {
        img.addEventListener("error", function () {
          img.style.display = "none";
          var fb = img.parentElement.querySelector(".img-fallback");
          if (fb) fb.style.display = "flex";
        });
        if (img.complete && img.naturalWidth === 0) {
          img.style.display = "none";
          var fb2 = img.parentElement.querySelector(".img-fallback");
          if (fb2) fb2.style.display = "flex";
        }
      });
    }

    // ---------- Render blog page list ----------
    var blogFeatured = document.getElementById("blog-featured");
    var blogRows = document.getElementById("blog-rows");
    if ((blogFeatured || blogRows) && window.posts) {
      // featured = artikel terbaru (07)
      var f = window.posts[window.posts.length - 1];
      if (blogFeatured && f) {
        blogFeatured.innerHTML =
          '<div class="featured-post">' +
            '<div class="featured-media"><img src="' + f.image + '" alt="' + f.title + '"></div>' +
            '<div class="featured-body">' +
              '<span class="post-meta">Featured • ' + f.category + "</span>" +
              "<h3>" + f.title + "</h3>" +
              '<div class="p-date">' + f.date + "</div>" +
              "<p>" + f.description + "</p>" +
              '<div><a class="btn btn-primary" href="' + f.link + '">Baca Artikel</a></div>' +
            "</div>" +
          "</div>";
        var fi = blogFeatured.querySelector("img");
        if (fi) fi.addEventListener("error", function () { guard(fi); });
      }
      if (blogRows) {
        var rest = window.posts.slice(0, -1); // 01-06, tetap terlama->terbaru
        blogRows.innerHTML = rest.map(function (p) {
          return (
            '<a class="post-row" href="' + p.link + '">' +
              '<span class="post-thumb"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy"></span>' +
              "<span><span class='post-meta'>" + p.num + " • " + p.category + " • " + p.date + "</span><h3>" + p.title + "</h3><span style='color:var(--text-secondary);font-size:.94rem'>" + p.description + "</span></span>" +
              '<span class="go" aria-hidden="true">→</span>' +
            "</a>"
          );
        }).join("");
        blogRows.querySelectorAll("img").forEach(function (img) {
          img.addEventListener("error", function () { guard(img); });
        });
      }
    }

    // ---------- Render projects page ----------
    var projWrap = document.getElementById("all-projects");
    if (projWrap && window.posts) {
      projWrap.innerHTML = window.posts.map(function (p, i) {
        var rev = i % 2 === 1 ? " reverse" : "";
        return (
          '<div class="project-row' + rev + '">' +
            '<div class="p-media"><div class="img-frame">' +
              '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
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
      projWrap.querySelectorAll("img").forEach(function (img) {
        img.addEventListener("error", function () {
          img.style.display = "none";
          var fb = img.parentElement.querySelector(".img-fallback");
          if (fb) fb.style.display = "flex";
        });
      });
    }
  });
})();
