/* ============================================================================
   PORTFOLIO NAVIGATION — SINGLE-PAGE + PROJECT DETAIL COMPATIBILITY
   Keep Cozy Kana's own gallery/accordion JavaScript in its HTML unchanged.
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('primary-nav');
  const menuButton = document.getElementById('menu-toggle');
  const sectionLinks = [...document.querySelectorAll('.nav-links .nav-item[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')]
    .filter(section => sectionLinks.some(link => link.hash === `#${section.id}`));

  // For detail pages, there are no homepage sections; no observer is required.
  if (!nav || !sectionLinks.length || !sections.length) return;

  const setActive = id => {
    sectionLinks.forEach(link => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const closeMenu = () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.setAttribute('aria-label', 'Open navigation menu');
    const icon = menuButton?.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-bars';
  };

  // Small-screen navigation is a proper toggle; links close it after selection.
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    const icon = menuButton.querySelector('i');
    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
  sectionLinks.forEach(link => link.addEventListener('click', () => {
    setActive(link.hash.slice(1));
    closeMenu();
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  // The active tab updates as visitors scroll, without rewriting the URL.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-22% 0px -48% 0px', threshold: [0, .1, .35, .65] });
    sections.forEach(section => observer.observe(section));
  }

  // Support direct links like index.html#projects.
  const initial = location.hash.slice(1);
  if (sections.some(section => section.id === initial)) setActive(initial);
});
