/* Axis — landing page interactivity */

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.hidden;
    mobileMenu.hidden = isOpen;
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.classList.toggle('is-open', !isOpen);
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('is-open');
    });
  });
}

// Smooth-scroll for in-page anchors (with sticky nav offset)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#' || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Reveal-on-scroll using IntersectionObserver
const revealTargets = [
  '.card',
  '.step',
  '.plan',
  '.faq__item',
  '.cta__inner',
  '.section__head',
  '.hero__copy',
  '.hero__visual',
];

const revealEls = document.querySelectorAll(revealTargets.join(','));
revealEls.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// Add a subtle parallax to the hero visual
const heroVisual = document.querySelector('.hero__visual');
if (heroVisual && window.matchMedia('(pointer: fine)').matches) {
  const panel = heroVisual.querySelector('.panel');
  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 8;
    const y = (e.clientY / innerHeight - 0.5) * 8;
    panel.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  panel.style.transition = 'transform 0.2s ease-out';
  panel.style.transformStyle = 'preserve-3d';
}

// Current year in footer
const yearEls = document.querySelectorAll('[data-year]');
yearEls.forEach((el) => (el.textContent = new Date().getFullYear()));
