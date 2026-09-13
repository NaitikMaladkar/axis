/* ============================================================
   Axis — projects hub
   Edit the PROJECTS array below to add/update your projects.
   Everything else (filters, grid, counts, dates) is generated.
   ============================================================ */

const PROJECTS = [
  {
    name: 'Axis',
    type: 'Web',
    description: 'This very site. A clean hub for everything I build, kept up to date as I ship.',
    url: 'https://github.com/NaitikMaladkar/Axis',
    status: 'live',
    icon: 'AX',
  },
  {
    name: 'Lumen',
    type: 'App',
    description: 'A minimal focus timer with ambient soundscapes. Built to stay out of your way.',
    url: '#',
    status: 'wip',
    icon: 'LU',
  },
  {
    name: 'Quanta',
    type: 'Service',
    description: 'Tiny API for turning spreadsheets into JSON. Self-hostable, no auth, fast.',
    url: '#',
    status: 'wip',
    icon: 'QU',
  },
  {
    name: 'Northwind CLI',
    type: 'Tool',
    description: 'Command-line companion for managing local dev environments. opinionated and fast.',
    url: '#',
    status: 'live',
    icon: 'NW',
  },
  {
    name: 'Vela',
    type: 'App',
    description: 'A weather app that shows you the forecast the way pilots actually read it.',
    url: '#',
    status: 'archived',
    icon: 'VE',
  },
  {
    name: 'Hyperloop Notes',
    type: 'Web',
    description: 'Markdown-first notes with bidirectional links and a 200ms global search.',
    url: '#',
    status: 'wip',
    icon: 'HL',
  },
];

// ────────────────────────────────────────────────────────────
// You usually don't need to edit anything below this line.
// ────────────────────────────────────────────────────────────

const STATUS_LABELS = {
  live: 'Live',
  wip: 'In progress',
  archived: 'Archived',
};

const TYPE_ORDER = ['App', 'Service', 'Web', 'Tool'];

// ---------- DOM refs ----------
const projectsEl = document.getElementById('projects');
const filtersEl = document.getElementById('filters');
const emptyStateEl = document.getElementById('emptyState');
const projectCountEl = document.getElementById('projectCount');
const lastUpdatedEl = document.getElementById('lastUpdated');

// ---------- Render filters ----------
function renderFilters(activeType) {
  const types = ['All', ...TYPE_ORDER.filter((t) => PROJECTS.some((p) => p.type === t))];
  // also include any types declared in projects that aren't in TYPE_ORDER
  PROJECTS.forEach((p) => {
    if (!types.includes(p.type)) types.push(p.type);
  });

  filtersEl.innerHTML = '';
  types.forEach((type) => {
    const count = type === 'All'
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.type === type).length;
    const btn = document.createElement('button');
    btn.className = 'filter' + (type === activeType ? ' is-active' : '');
    btn.dataset.type = type;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', type === activeType ? 'true' : 'false');
    btn.innerHTML = `${type}<span class="filter__count">${count}</span>`;
    btn.addEventListener('click', () => {
      renderFilters(type);
      renderProjects(type);
    });
    filtersEl.appendChild(btn);
  });
}

// ---------- Render projects ----------
function renderProjects(filterType = 'All') {
  const list = filterType === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === filterType);

  projectsEl.innerHTML = '';

  if (list.length === 0) {
    emptyStateEl.hidden = false;
    return;
  }
  emptyStateEl.hidden = true;

  list.forEach((p, i) => {
    const card = document.createElement('a');
    card.className = 'project reveal';
    card.href = p.url;
    if (p.url && p.url.startsWith('http')) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }
    card.style.transitionDelay = `${Math.min(i * 50, 300)}ms`;
    card.innerHTML = `
      <div class="project__top">
        <div class="project__icon" aria-hidden="true">${escapeHTML(p.icon || p.name.slice(0, 2).toUpperCase())}</div>
        <span class="project__type">${escapeHTML(p.type)}</span>
      </div>
      <h3 class="project__name">${escapeHTML(p.name)}</h3>
      <p class="project__desc">${escapeHTML(p.description)}</p>
      <div class="project__footer">
        <span class="project__status">
          <span class="status-pill status-pill--${p.status}" aria-hidden="true"></span>
          ${escapeHTML(STATUS_LABELS[p.status] || p.status)}
        </span>
        <span class="project__link">
          Open
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>
        </span>
      </div>
    `;
    projectsEl.appendChild(card);
  });

  // Re-observe newly added reveal elements
  observeReveals();
}

// ---------- Helpers ----------
function escapeHTML(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// ---------- Reveal on scroll ----------
let revealObserver = null;
function observeReveals() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
  }
  els.forEach((el) => revealObserver.observe(el));
}

// ---------- Mobile nav ----------
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.hidden;
    mobileMenu.hidden = isOpen;
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Smooth-scroll for in-page anchors ----------
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

// ---------- Footer year ----------
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ---------- Hero meta ----------
projectCountEl.textContent = PROJECTS.length;
lastUpdatedEl.textContent = formatDate(new Date());

// ---------- Initial render ----------
renderFilters('All');
renderProjects('All');
observeReveals();
