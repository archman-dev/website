/*
  Injects the smarter.day ads script on every page load. Handles both the initial
  render and subsequent SPA navigations while avoiding duplicate script tags.
*/

function loadAdsScript() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const body = document.body;
  if (!body) {
    // Retry once the DOM is ready.
    window.addEventListener("DOMContentLoaded", loadAdsScript, { once: true });
    return;
  }

  const adsVersion = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  window.AD_CONFIG_URL =
    "https://static-ads.smarter.day/configs/archman.dev.config.js?v=" +
    adsVersion;

  const existing = document.querySelector('script[data-archman-ads="true"]');
  if (existing) {
    const currentVersion = existing.dataset.archmanAdsVersion;
    if (currentVersion === adsVersion) {
      return;
    }

    existing.remove();
  }

  const adsScript = document.createElement("script");
  adsScript.src =
    "https://static-ads.smarter.day/index.js?v=" + adsVersion;
  adsScript.async = true;
  adsScript.dataset.archmanAds = "true";
  adsScript.dataset.archmanAdsVersion = adsVersion;

  body.appendChild(adsScript);
}

if (typeof window !== "undefined") {
  loadAdsScript();
}

export function onRouteDidUpdate() {
  loadAdsScript();
}
