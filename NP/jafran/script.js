// assets/script.js
document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Elements
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav'); // matches your HTML
  const contactForm = document.querySelector('.contact-form');

  // Helper to know if we are in "mobile" layout
  const isMobile = () => window.matchMedia('(max-width:900px)').matches;

  // Toggle mobile nav
  function toggleNav(open) {
    if (!nav) return;
    if (open === undefined) {
      // flip
      const showing = nav.style.display === 'flex' || nav.getAttribute('data-open') === 'true';
      open = !showing;
    }
    if (open && isMobile()) {
      nav.style.display = 'flex';
      nav.setAttribute('data-open', 'true');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      nav.style.display = 'none';
      nav.removeAttribute('data-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // Click handler for menu button
  if (menuBtn) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      // Only toggle mobile menu when breakpoint matches
      if (isMobile()) {
        toggleNav();
      }
    });
  }

  // Click outside to close mobile menu
  document.addEventListener('click', function (e) {
    if (!nav || !isMobile()) return;
    const target = e.target;
    if (nav.getAttribute('data-open') === 'true' && !nav.contains(target) && !menuBtn.contains(target)) {
      toggleNav(false);
    }
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.getAttribute('data-open') === 'true') {
      toggleNav(false);
    }
  });

  // Keep nav state consistent on resize
  window.addEventListener('resize', function () {
    if (!nav) return;
    if (!isMobile()) {
      // on desktop ensure nav is visible via CSS (clear inline styles)
      nav.style.display = '';
      nav.removeAttribute('data-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      // on mobile ensure collapsed by default
      nav.style.display = 'none';
      nav.removeAttribute('data-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Contact form handler
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const form = e.target;
      const name = (form.name && form.name.value) ? form.name.value.trim() : '';
      if (!name) { alert('Please enter name'); return; }
      alert('Thank you, ' + name + '! Message received.');
      form.reset();

      // If mobile menu was open for some reason, close it
      if (nav && isMobile()) toggleNav(false);
    });
  }
});

// Backwards-compatible helper used by onsubmit attribute (if still present)
function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const name = (form.name && form.name.value) ? form.name.value.trim() : '';
  if (!name) { alert('Please enter name'); return; }
  alert('Thank you, ' + name + '! Message received.');
  form.reset();
}
