// assets/back-to-top.js
// Lightweight, accessible Back-to-top behavior.
// Shows after scrolling down, respects prefers-reduced-motion, keyboard accessible.
(function () {
  'use strict';
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    // Show/hide based on scroll position
    function onScroll() {
      if (window.scrollY > 300) btn.classList.add('show');
      else btn.classList.remove('show');
    }

    // Scroll-to-top, respecting reduced-motion
    function scrollToTop() {
      var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if ('scrollBehavior' in document.documentElement.style && !prefersReduced) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
      // move focus to top-most landmark for keyboard/screen reader users
      var firstFocusable = document.querySelector('header, nav, main, [role="main"], body');
      if (firstFocusable && typeof firstFocusable.focus === 'function') firstFocusable.focus();
    }

    btn.addEventListener('click', scrollToTop);
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToTop(); }
    });
    window.addEventListener('scroll', onScroll, { passive: true });

    // initialize
    onScroll();
  });
})();
