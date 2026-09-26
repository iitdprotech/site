/* ============================================================
   ProTech site — shared behavior
   Header/footer are injected here so every page stays in sync
   without duplicating markup across 11 HTML files.
   ============================================================ */

const NAV = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "research.html", label: "Research", key: "research" },
  { href: "facilities.html", label: "Facilities", key: "facilities" },
  { href: "publications.html", label: "Publications", key: "publications" },
  { href: "awards.html", label: "Awards", key: "awards" },
  { href: "people.html", label: "People", key: "people" },
  { href: "gallery.html", label: "Gallery", key: "gallery" },
  { href: "history.html", label: "History", key: "history" },
  { href: "faq.html", label: "FAQ", key: "faq" },
];

const WEAVE_MARK = `
<svg class="weave-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 10 H14 V2" style="stroke:var(--kevlar)" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M2 20 H26 V2" style="stroke:var(--impact)" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
  <path d="M2 30 H38 V2" style="stroke:var(--kevlar)" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
  <path d="M38 38 H26 V38" style="stroke:var(--impact)" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M38 28 H14 V38" style="stroke:var(--kevlar)" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
  <path d="M38 18 H2 V38" style="stroke:var(--impact)" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
</svg>`;

function buildHeader(activeKey){
  const items = NAV.map(item => {
    const isActive = item.key === activeKey ? "active" : "";
    if(item.children){
      const childHtml = item.children.map(c => `<a href="${c.href}">${c.label}</a>`).join("");
      return `<li class="has-drop ${isActive}">
        <a class="top-link" href="${item.href}">${item.label}</a>
        <div class="drop">${childHtml}</div>
      </li>`;
    }
    return `<li class="${isActive}"><a class="top-link" href="${item.href}">${item.label}</a></li>`;
  }).join("");

  return `
  <div class="container nav-row">
    <a class="brand" href="index.html">
      ${WEAVE_MARK}
      <span class="brand-word">Pro<span>Tech</span></span>
    </a>
    <nav class="primary" id="primaryNav">
      <ul>${items}</ul>
    </nav>
    <div class="nav-cta">
      <button class="theme-toggle" id="themeToggle" aria-label="Switch to dark mode" aria-pressed="false">
        <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.5M12 19v2.5M4.5 12H2M22 12h-2.5M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
      </button>
      <a class="btn btn-primary" href="mailto:majumdar@iitd.ac.in">Get in touch</a>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>`;
}

function buildFooter(){
  const linkCols1 = NAV.slice(0,5).map(i=>`<li><a href="${i.href}">${i.label}</a></li>`).join("");
  const linkCols2 = NAV.slice(5).map(i=>`<li><a href="${i.href}">${i.label}</a></li>`).join("");
  return `
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="brand" style="margin-bottom:14px;">
          ${WEAVE_MARK}
          <span class="brand-word">Pro<span>Tech</span></span>
        </div>
        <p>Interdisciplinary research on protective textiles, intelligent materials, and sustainable systems — Department of Textile and Fibre Engineering, IIT Delhi.</p>
      </div>
      <div>
        <h5>Navigate</h5>
        <ul>${linkCols1}</ul>
      </div>
      <div>
        <h5>Navigate</h5>
        <ul>${linkCols2}</ul>
      </div>
    </div>
    <div class="footer-grid" style="grid-template-columns:1fr; margin-bottom:0;">
      <div>
        <h5>Contact</h5>
        <p style="max-width:none;">
          <a href="mailto:majumdar@iitd.ac.in">majumdar@iitd.ac.in</a> &nbsp;·&nbsp;
          Department of Textile and Fibre Engineering, IIT Delhi, Hauz Khas, New Delhi 110016
          <!-- TODO: add phone number here once available -->
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="yr"></span> ProTech Research Group, IIT Delhi</span>
      <span>Engineering Protection. Advancing Sustainability.</span>
    </div>
  </div>`;
}

/* ---- theme toggle (light / dark), persisted in localStorage ---- */
const THEME_KEY = "protech-theme";

function applyThemeToggleState(){
  const btn = document.getElementById("themeToggle");
  if(!btn) return;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.setAttribute("aria-pressed", String(isDark));
  btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function initThemeToggle(){
  applyThemeToggleState();
  const btn = document.getElementById("themeToggle");
  if(!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try{ localStorage.setItem(THEME_KEY, next); }catch(e){ /* storage unavailable — theme still applies for this session */ }
    applyThemeToggleState();
  });
}

function initHeaderFooter(){
  const activeKey = document.body.dataset.page || "";
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if(headerEl) headerEl.innerHTML = buildHeader(activeKey);
  if(footerEl) footerEl.innerHTML = buildFooter();
  const yr = document.getElementById("yr");
  if(yr) yr.textContent = new Date().getFullYear();

  initThemeToggle();

  // mobile menu toggle
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("primaryNav");
  if(toggle && nav){
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
    // mobile: tap "Research" opens submenu instead of navigating
    nav.querySelectorAll("li.has-drop > a.top-link").forEach(a => {
      a.addEventListener("click", (e) => {
        if(window.innerWidth <= 900){
          e.preventDefault();
          a.parentElement.classList.toggle("open");
        }
      });
    });
  }
}

/* ---- accordion (FAQ, publication groups) ---- */
function initAccordions(){
  document.querySelectorAll(".accordion-item").forEach(item => {
    const btn = item.querySelector(".accordion-btn");
    const panel = item.querySelector(".accordion-panel");
    if(!btn || !panel) return;
    // set correct initial height for items marked open by default
    if(item.classList.contains("open")){
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.closest(".accordion").querySelectorAll(".accordion-item.open").forEach(other => {
        if(other !== item){ other.classList.remove("open"); other.querySelector(".accordion-panel").style.maxHeight = null; }
      });
      item.classList.toggle("open", !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });
}

/* ---- decorative hero weave graphic ---- */
function heroWeaveSVG(){
  let paths = "";
  for(let i=0;i<7;i++){
    const y = 20 + i*46;
    paths += `<path d="M-20 ${y} H860" style="stroke:${i%2===0?'var(--kevlar)':'var(--impact)'}" stroke-width="1.2" opacity="${0.12 + (i%3)*0.05}"/>`;
  }
  for(let i=0;i<14;i++){
    const x = -20 + i*64;
    paths += `<path d="M${x} -20 V340" style="stroke:${i%2===0?'var(--impact)':'var(--kevlar)'}" stroke-width="1.2" opacity="${0.10 + (i%3)*0.04}"/>`;
  }
  return `<svg class="hero-weave" viewBox="0 0 840 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
}
function initHeroWeave(){
  const el = document.querySelector(".hero-bg");
  if(el) el.innerHTML = heroWeaveSVG();
}

/* ---- weave divider graphic used between sections ---- */
function weaveDividerSVG(){
  let paths = "";
  for(let i=0;i<40;i++){
    const x = i*30;
    paths += `<path d="M${x} 11 h20" style="stroke:${i%2===0?'var(--kevlar)':'var(--impact)'}" stroke-width="1.4" opacity=".35"/>`;
  }
  return `<svg viewBox="0 0 1200 22" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
}
function initWeaveDividers(){
  document.querySelectorAll(".weave-divider").forEach(el => { el.innerHTML = weaveDividerSVG(); });
}

/* ---- simple lightbox for gallery photos (once added) ---- */
function initGalleryLightbox(){
  const grid = document.querySelector(".gallery-grid");
  if(!grid) return;
  grid.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if(!img) return;
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(10,12,15,.92);display:flex;align-items:center;justify-content:center;z-index:999;cursor:zoom-out;padding:32px;";
    const big = document.createElement("img");
    big.src = img.src;
    big.style.cssText = "max-width:100%;max-height:100%;border-radius:6px;";
    overlay.appendChild(big);
    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  });
}

/* ---- carousel (Awards page ceremony photos) ---- */
function initCarousels(){
  document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const dotsWrap = carousel.querySelector(".carousel-dots");
    const counter = carousel.querySelector(".carousel-counter");
    if(!track || slides.length === 0) return;
    let index = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i+1}`);
      dot.addEventListener("click", () => goTo(i));
      if(dotsWrap) dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    const captionEl = carousel.querySelector(".carousel-caption");

    function render(){
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d,i) => d.classList.toggle("active", i === index));
      if(counter) counter.textContent = `${index+1} / ${slides.length}`;
      if(captionEl){
        const cap = slides[index].getAttribute("data-caption");
        if(cap) captionEl.innerHTML = cap;
      }
    }
    function goTo(i){
      index = (i + slides.length) % slides.length;
      render();
    }
    const prev = carousel.querySelector(".carousel-btn.prev");
    const next = carousel.querySelector(".carousel-btn.next");
    if(prev) prev.addEventListener("click", () => goTo(index - 1));
    if(next) next.addEventListener("click", () => goTo(index + 1));

    // swipe support
    let startX = null;
    track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener("touchend", e => {
      if(startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if(Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    render();
  });
}

/* ---- video modal (Home page click-to-play) ---- */
function initVideoModal(){
  document.querySelectorAll("[data-video-embed]").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const src = trigger.getAttribute("data-video-embed");
      const overlay = document.createElement("div");
      overlay.className = "video-modal-overlay";
      overlay.innerHTML = `
        <div class="video-modal-box">
          <button class="video-modal-close" aria-label="Close video">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <div class="video-modal-frame">
            <iframe src="${src}" allow="autoplay; fullscreen" allowfullscreen frameborder="0"></iframe>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      function close(){ overlay.remove(); document.body.style.overflow = ""; }
      overlay.addEventListener("click", (e) => { if(e.target === overlay) close(); });
      overlay.querySelector(".video-modal-close").addEventListener("click", close);
      document.addEventListener("keydown", function esc(e){ if(e.key === "Escape"){ close(); document.removeEventListener("keydown", esc); } });
    });
  });
}

/* ---- research domain accordion cards (research.html) ---- */
function initResearchAccordion(){
  const cards = document.querySelectorAll(".research-card");
  if(cards.length === 0) return;

  function openCard(card){
    cards.forEach(c => {
      if(c !== card){
        c.classList.remove("open");
        const d = c.querySelector(".research-card-detail");
        if(d) d.style.maxHeight = null;
      }
    });
    const detail = card.querySelector(".research-card-detail");
    const wasOpen = card.classList.contains("open");
    card.classList.toggle("open", !wasOpen);
    detail.style.maxHeight = !wasOpen ? detail.scrollHeight + "px" : null;
    if(!wasOpen){
      setTimeout(() => card.scrollIntoView({behavior:"smooth", block:"nearest"}), 150);
    }
  }

  cards.forEach(card => {
    const head = card.querySelector(".research-card-head");
    head.addEventListener("click", () => openCard(card));
  });

  // recalculate open card height once all images finish loading
  window.addEventListener("load", () => {
    const openCardEl = document.querySelector(".research-card.open");
    if(openCardEl){
      const d = openCardEl.querySelector(".research-card-detail");
      if(d) d.style.maxHeight = d.scrollHeight + "px";
    }
  });

  // auto-open a card if the URL has a matching hash
  const hash = window.location.hash.replace("#","");
  if(hash){
    const target = document.getElementById(hash);
    if(target && target.classList.contains("research-card")) openCard(target);
  }
}

/* ============================================================
   Pointer follower — a small dot + lagging ring that track the
   mouse, and grow when hovering anything clickable. Desktop
   (fine pointer, no touch) only; a no-op elsewhere.
   ============================================================ */
function initCursorFollower(){
  if(!window.matchMedia("(pointer: fine)").matches) return;

  document.body.classList.add("has-cursor");
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;
  let visible = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    if(!visible){ visible = true; dot.classList.remove("hidden"); ring.classList.remove("hidden"); }
  });
  document.addEventListener("mouseleave", () => { dot.classList.add("hidden"); ring.classList.add("hidden"); });
  document.addEventListener("mouseenter", () => { dot.classList.remove("hidden"); ring.classList.remove("hidden"); });

  function tick(){
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  const hoverables = "a, button, .card, .research-card-head, .accordion-btn, input, select, textarea, .carousel-btn, .carousel-dot";
  document.addEventListener("mouseover", (e) => {
    if(e.target.closest(hoverables)) ring.classList.add("hovering");
  });
  document.addEventListener("mouseout", (e) => {
    if(e.target.closest(hoverables)) ring.classList.remove("hovering");
  });
}

/* ============================================================
   Scroll reveal — tags common content blocks with .reveal (no
   HTML edits needed) and fades/rises them in as they enter the
   viewport.
   ============================================================ */
function initScrollReveal(){
  const selectors = [
    "section > .container > .section-head",
    ".hero-inner",
    ".grid > *",
    ".card",
    ".person-card",
    ".research-card",
    ".stat",
    ".facility-card",
    ".pub-group",
    ".tl-item",
    ".gallery-grid > *",
    ".carousel",
  ];
  const els = document.querySelectorAll(selectors.join(","));
  els.forEach(el => el.classList.add("reveal"));

  if(!("IntersectionObserver" in window) || els.length === 0){
    els.forEach(el => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  els.forEach(el => io.observe(el));
}

/* ============================================================
   Sticky nav shadow on scroll
   ============================================================ */
function initHeaderScrollState(){
  const header = document.querySelector("header.site");
  if(!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeaderFooter();
  initHeroWeave();
  initWeaveDividers();
  initAccordions();
  initGalleryLightbox();
  initCarousels();
  initVideoModal();
  initResearchAccordion();
  initCursorFollower();
  initScrollReveal();
  initHeaderScrollState();
});
