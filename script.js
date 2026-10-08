/* Saltmarsh Solar - interactions: theme toggle, hamburger menu, scroll reveal */
(function () {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js'); // lets CSS know JavaScript is running

  /* ---------- 1. LIGHT / DARK THEME ---------- */
  const themeBtn = document.getElementById('theme-toggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeBtn.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    try { localStorage.setItem('theme', theme); } catch (e) {} // remember choice
  }
  setTheme(root.getAttribute('data-theme') || 'light'); // sync label on load
  themeBtn.addEventListener('click', () =>
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* ---------- 2. MOBILE HAMBURGER MENU ---------- */
  const burger = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');

  function toggleMenu(open) {
    burger.classList.toggle('open', open);
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', () => toggleMenu(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.tagName === 'A') toggleMenu(false); }); // close after tap
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

  /* ---------- 3. SCROLL REVEAL ANIMATION ---------- */
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible')); // old browsers: just show
  }
})();
