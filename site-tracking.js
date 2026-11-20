(function () {
  const path = window.location.pathname;
  const attributionKey = "mkh_attribution_v1";
  const attributionFields = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function captureAttribution() {
    const params = new URLSearchParams(window.location.search);
    const campaign = Object.fromEntries(attributionFields.map(function (field) {
      return [field, (params.get(field) || "").slice(0, 200)];
    }));
    const hasCampaign = attributionFields.some(function (field) { return campaign[field]; });
    let stored = {};
    try { stored = JSON.parse(localStorage.getItem(attributionKey) || "{}"); } catch (_) { stored = {}; }

    if (hasCampaign) {
      const touch = {
        ...campaign,
        landing_page: window.location.href,
        referrer: document.referrer,
        captured_at: new Date().toISOString()
      };
      stored = {
        first_touch: stored.first_touch || touch,
        last_touch: touch
      };
      try { localStorage.setItem(attributionKey, JSON.stringify(stored)); } catch (_) {}
    }

    window.mkhAttribution = stored;
  }

  function sendEvent(name, parameters) {
    const details = { page_path: window.location.pathname, ...parameters };
    if (typeof window.gtag === "function") {
      window.gtag("event", name, details);
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...details });
  }

  function addStickyCalculatorAction() {
    if (document.querySelector(".sticky-city-cta, .sticky-funnel-cta")) return;

    const shouldShow = [
      /^\/food-truck-/,
      /^\/equipment\//,
      /^\/builders\//,
      /^\/directory\/?$/,
      /^\/cities\/?$/,
      /^\/resources\//,
      /^\/tools\//
    ].some(function (pattern) { return pattern.test(path); });

    if (!shouldShow) return;

    const style = document.createElement("style");
    style.textContent = ".sticky-funnel-cta{position:fixed;right:20px;bottom:20px;z-index:50;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:999px;color:#fff!important;background:#ee7b31;box-shadow:0 14px 34px rgba(23,79,53,.25);font:900 15px/1.2 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-decoration:none!important}@media(max-width:760px){.sticky-funnel-cta{right:12px;bottom:12px;left:12px}body{padding-bottom:76px}}";
    document.head.appendChild(style);

    const link = document.createElement("a");
    link.className = "sticky-funnel-cta";
    link.href = "/#calculator";
    link.textContent = "Calculate my equipment load";
    link.setAttribute("aria-label", "Open the food truck power calculator");
    document.body.appendChild(link);
  }

  function enhanceNavigation() {
    const nav = document.querySelector(".site-header .links");
    if (nav) nav.innerHTML = '<a href="/#calculator">Calculators</a><a href="/cities/">City Hubs</a><a href="/guides/food-truck-equipment-checklist/">Equipment Guides</a><a href="/partners/">For Builders</a>';
    document.querySelectorAll("a").forEach(function (link) {
      if (link.textContent.trim().toLowerCase().includes("add a fryer")) link.href = "/?preselect=fryer#calculator";
    });
  }

  function addCityQuickSpec() {
    if (!/^\/cities\/.+/.test(path) || document.querySelector(".quick-spec")) return;
    const heroWrap = document.querySelector(".hero .wrap");
    if (!heroWrap) return;
    const heading = document.querySelector("h1");
    const fallback = path.split("/").filter(Boolean).pop().replace(/-/g, " ");
    const city = (heading ? heading.textContent.split(/food truck|mobile kitchen/i)[0] : fallback).trim() || fallback;
    const box = document.createElement("form");
    box.className = "quick-spec";
    box.innerHTML = '<div class="eyebrow">Quick project brief</div><h2>Start with your local requirements</h2><p>Carry these basics into the calculator, then add equipment and contact details only when you are ready.</p><div class="quick-spec-grid"><label>City or region<input name="city" maxlength="80" value=""></label><label>Project stage<select name="projectStage"><option>Researching options</option><option>Ready for quotations</option><option>Vehicle selected</option><option>Build already underway</option></select></label><label>Mobile kitchen type<select name="vehicle"><option>Food truck</option><option>Food trailer</option><option>Catering van</option><option>Mobile coffee unit</option><option>Temporary kitchen</option></select></label></div><button class="button" type="submit">Continue to calculator</button>';
    box.elements.city.value = city.slice(0, 80);
    box.addEventListener("submit", function (event) {
      event.preventDefault();
      const params = new URLSearchParams({city:box.elements.city.value,projectStage:box.elements.projectStage.value,vehicle:box.elements.vehicle.value});
      sendEvent("city_quick_brief_started", {city:box.elements.city.value,project_stage:box.elements.projectStage.value,vehicle_type:box.elements.vehicle.value});
      window.location.href = "/?" + params.toString() + "#calculator";
    });
    heroWrap.appendChild(box);
  }

  function addNewResourceCards() {
    if (path !== "/" && path !== "/index.html") return;
    const grid = document.querySelector("#guides .resources");
    if (!grid || document.querySelector('[href="/calculators/propane-tank-and-btu-calculator/"]')) return;
    const cards = [
      ["Gas planning","Propane tank and BTU calculator","Estimate connected gas load, design BTU per hour and approximate fuel used per shift.","/calculators/propane-tank-and-btu-calculator/","Estimate propane demand"],
      ["Health permits","Commissary and inspection checklist","Print a jurisdiction-first checklist for plan review, sinks, water, food safety and inspection documents.","/guides/commissary-and-health-permit-checklist/","Open the permit checklist"],
      ["Zero-emission builds","All-electric food truck planning","Coordinate appliance loads, battery energy, inverter output, charging, payload and operating resilience.","/builds/all-electric-zero-emission-food-trucks/","Plan an all-electric build"]
    ];
    cards.forEach(function (item) {
      const article = document.createElement("article");
      article.className = "resource";
      article.innerHTML = '<div class="eyebrow"></div><h3></h3><p></p><a></a>';
      article.querySelector(".eyebrow").textContent = item[0];
      article.querySelector("h3").textContent = item[1];
      article.querySelector("p").textContent = item[2];
      article.querySelector("a").href = item[3];
      article.querySelector("a").textContent = item[4] + " →";
      grid.appendChild(article);
    });
  }

  function init() {
    captureAttribution();
    enhanceNavigation();
    addCityQuickSpec();
    addNewResourceCards();
    addStickyCalculatorAction();
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    const isExternal = /^https?:/i.test(href) && !href.includes("mobilekitchenhub.com");
    const isBuilderLink = isExternal && Boolean(link.closest(".card, .quick-card, .directory-card"));

    sendEvent(isBuilderLink ? "builder_link_clicked" : "cta_clicked", {
      cta_text: link.textContent.trim().slice(0, 100),
      destination: href,
      link_domain: isExternal ? new URL(link.href).hostname : window.location.hostname
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
