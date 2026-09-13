# Axis

A clean personal projects hub — a single page listing my apps, services, tools, and side-projects.

Built with vanilla HTML, CSS, and JavaScript. No build step, no dependencies, no framework.

## Structure

```
axis/
├── index.html      # Page markup
├── styles.css      # All styling (dark, modern theme)
├── app.js          # Projects data + render + filters + nav
├── .nojekyll       # Tells GitHub Pages to serve files as-is
└── README.md
```

## Adding or updating a project

Open `app.js` and edit the `PROJECTS` array at the top of the file.
Each project is a plain object:

```js
{
  name: 'Project Name',
  type: 'App',          // App | Service | Web | Tool | (anything you want)
  description: 'One short line about what it is.',
  url: 'https://...',   // external link opens in new tab; '#' for placeholders
  status: 'live',       // live | wip | archived
  icon: 'XX',           // 2-char short code shown in the card icon (optional)
}
```

Filters, project counts, and the "last updated" date are generated automatically.

## Run locally

```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

## Deploy

Push to GitHub. The repo is already wired to GitHub Pages (main / root).

© Naitik Maladkar
