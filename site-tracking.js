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

  function addProjectBriefBridge() {
    if (document.querySelector(".mkh-project-brief-bridge")) return;

    const shouldShow = [
      /^\/cities(?:\/|$)/,
      /^\/guides(?:\/|$)/,
      /^\/calculators(?:\/|$)/,
      /^\/builders(?:\/|$)/,
      /^\/builds(?:\/|$)/,
      /^\/equipment(?:\/|$)/,
      /^\/resources(?:\/|$)/,
      /^\/tools(?:\/|$)/,
      /^\/directory\/?$/,
      /^\/city-.*\.html$/,
      /(?:guide|calculator|checklist|planner|builders)\.html$/
    ].some(function (pattern) { return pattern.test(path); });

    if (!shouldShow || path === "/get-food-truck-build-quotes/") return;
    const main = document.querySelector("main");
    if (!main) return;

    const style = document.createElement("style");
    style.textContent = ".mkh-project-brief-bridge{margin:48px auto 28px;padding:clamp(24px,4vw,40px);width:min(1120px,calc(100% - 32px));border:1px solid #cfe0d5;border-radius:20px;background:linear-gradient(135deg,#f2f8f4,#fff8ef);box-shadow:0 16px 42px rgba(23,79,53,.08);color:#17221b}.mkh-project-brief-bridge .mkh-bridge-eyebrow{margin:0 0 8px;color:#174f35;font:800 .78rem/1.2 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:.11em;text-transform:uppercase}.mkh-project-brief-bridge h2{margin:0 0 10px!important;color:#17221b;font:800 clamp(1.65rem,3vw,2.35rem)/1.1 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:-.025em}.mkh-project-brief-bridge p{max-width:760px;margin:0 0 18px;color:#52645a}.mkh-bridge-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.mkh-bridge-primary,.mkh-bridge-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:999px;font:800 15px/1.2 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-decoration:none!important}.mkh-bridge-primary{background:#ee7b31;color:#fff!important}.mkh-bridge-secondary{border:1px solid #174f35;background:#fff;color:#174f35!important}.mkh-bridge-note{display:block;margin-top:14px;color:#687970;font:600 13px/1.5 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}@media(max-width:600px){.mkh-project-brief-bridge{margin-top:32px}.mkh-bridge-actions{display:grid}.mkh-bridge-primary,.mkh-bridge-secondary{width:100%}}";
    document.head.appendChild(style);

    const sourcePage = path.split("/").filter(Boolean).pop() || "home";
    const destination = new URL("/get-food-truck-build-quotes/", window.location.origin);
    destination.searchParams.set("utm_source", "internal_site");
    destination.searchParams.set("utm_medium", "cta");
    destination.searchParams.set("utm_campaign", "operator_quote_bridge");
    destination.searchParams.set("utm_content", sourcePage.slice(0, 100));

    const section = document.createElement("section");
    section.className = "mkh-project-brief-bridge";
    section.setAttribute("aria-labelledby", "mkh-project-brief-title");
    section.innerHTML = '<div class="mkh-bridge-eyebrow">Builder-ready next step</div><h2 id="mkh-project-brief-title">Turn your planning into a structured project brief</h2><p>Organize your menu, equipment, preliminary power requirement, budget and target date before speaking with regional fabricators.</p><div class="mkh-bridge-actions"><a class="mkh-bridge-primary" href="">Prepare my free project brief</a><a class="mkh-bridge-secondary" href="/#calculator">Continue with the calculator</a></div><small class="mkh-bridge-note">Free for operators. No obligation to buy. Builder availability and responses are not guaranteed.</small>';
    const primary = section.querySelector(".mkh-bridge-primary");
    primary.href = destination.pathname + destination.search;
    primary.addEventListener("click", function () {
      sendEvent("operator_quote_bridge_clicked", {source_page:path, destination:primary.href});
    });
    main.appendChild(section);
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
    addProjectBriefBridge();
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
