# Axis

A modern, fast static landing page for the Axis analytics platform.

Built with vanilla HTML, CSS, and JavaScript — no build step required.

## Structure

```
axis/
├── index.html      # Page markup
├── styles.css      # All styling (dark, modern theme)
├── app.js          # Mobile nav, smooth-scroll, reveal-on-scroll
└── README.md
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

## Features

- Responsive layout (desktop / tablet / mobile)
- Sticky blurred nav with mobile hamburger menu
- Reveal-on-scroll animations via IntersectionObserver
- Subtle parallax on the hero mockup
- Accessible FAQ with native `<details>`
- `prefers-reduced-motion` aware
- No external dependencies beyond Google Fonts

© 2026 Axis Labs, Inc.
