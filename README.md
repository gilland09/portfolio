# Gilland.dev Portfolio

A responsive personal developer portfolio built with semantic HTML5, modular CSS3, and dependency-free Vanilla JavaScript.

## Run locally

Open `index.html` in a browser, or start a local static server from the project root:

```powershell
python -m http.server 8000
```

Then visit <http://localhost:8000>. Google Fonts are loaded remotely; the site uses system sans-serif fallbacks when fonts cannot be reached.

## Project structure

```text
.
├── index.html
├── css/
│   ├── variables.css    Design tokens and theme overrides
│   ├── base.css         Reset, typography, and accessibility defaults
│   ├── layout.css       Containers, section layouts, and breakpoints
│   ├── components.css   Navigation, cards, forms, and dialog styles
│   └── animations.css   Reserved for the Phase 3 animation layer
├── js/
│   └── main.js          Theme, mobile navigation, filters, dialog, and form
└── assets/
    └── images/          Add profile, project, and certificate imagery here
```

## Interaction notes

- The theme toggle switches between dark and light design tokens.
- Project category buttons filter the project cards.
- The Altruria case study uses the native HTML `<dialog>` element.
- The mobile navigation button reports its state through `aria-expanded`.
- The contact form validates required fields, then prepares a message using the visitor's email application. It does not submit data to a server.

## Accessibility and responsive design

The page uses landmark elements, a skip link, labeled sections and form controls, visible keyboard focus, and reduced-motion preferences. Layouts use CSS Grid and Flexbox, with responsive breakpoints at 768px and 1024px.

The `assets/images/` directory is ready for real media. Until images are supplied, the hero portrait and project thumbnails are CSS illustrations/placeholders.
