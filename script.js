(() => {
  const GTM_ID = window.ESTIMULAR_GTM_ID || "";
  const gtmReady = Boolean(GTM_ID) && !GTM_ID.includes("XXXX");

  window.dataLayer = window.dataLayer || [];

  function loadGoogleTagManager(id) {
    if (document.getElementById("gtm-js")) return;

    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.id = "gtm-js";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);

    if (!document.getElementById("gtm-noscript")) {
      const iframe = document.createElement("iframe");
      iframe.id = "gtm-noscript";
      iframe.src =
        "https://www.googletagmanager.com/ns.html?id=" + encodeURIComponent(id);
      iframe.height = 0;
      iframe.width = 0;
      iframe.setAttribute("title", "Google Tag Manager");
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      document.body.prepend(iframe);
    }
  }

  if (gtmReady) {
    loadGoogleTagManager(GTM_ID);
  }

  function trackWhatsAppClick(link) {
    const payload = {
      event: "whatsapp_click",
      event_category: "conversion",
      event_label: link.getAttribute("data-wa-location") || "whatsapp",
      link_url: link.href || "https://wa.me/5565996672711",
      link_text: (link.textContent || "").trim().slice(0, 80),
    };

    window.dataLayer.push(payload);

    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", {
        event_category: payload.event_category,
        event_label: payload.event_label,
        link_url: payload.link_url,
      });
    }
  }

  document.addEventListener(
    "click",
    (event) => {
      const link = event.target.closest(
        'a[href*="wa.me"], a[href*="whatsapp.com"], a[href*="api.whatsapp.com"]'
      );
      if (!link) return;
      trackWhatsAppClick(link);
    },
    true
  );

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
