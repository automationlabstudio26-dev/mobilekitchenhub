(function () {
  function sendEvent(name, parameters) {
    const details = { page_path: window.location.pathname, ...parameters };
    if (typeof window.gtag === "function") {
      window.gtag("event", name, details);
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...details });
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
})();
