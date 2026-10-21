(function () {
  const path = window.location.pathname;

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
    document.addEventListener("DOMContentLoaded", addStickyCalculatorAction);
  } else {
    addStickyCalculatorAction();
  }
})();
