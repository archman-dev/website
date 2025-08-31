/*
  Provides a resilient window.gtag stub during client navigation.
  Docusaurus plugin-google-gtag expects window.gtag to be a function.
  On SPA transitions, ad/script blockers or slow network may leave it undefined.
  This fallback ensures calls are buffered into dataLayer until gtag.js defines the real function.
*/
(function () {
  if (typeof window === 'undefined') return;
  // If GA is disabled via consent or explicitly, do nothing
  if (window.GA_DISABLED || window.DO_NOT_TRACK || navigator.doNotTrack === '1') return;

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  // If gtag is not a function, define a proxy that pushes to dataLayer
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      try {
        window.dataLayer.push(arguments);
      } catch (_) {
        // no-op
      }
    };
  }
})();
