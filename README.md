# Gilland.dev Portfolio

A dependency-free personal portfolio built with semantic HTML5, modular CSS3, and Vanilla JavaScript. This document is the project walkthrough for a repository presentation and records what was verified in the available environment.

**Live GitHub Pages URL:** <https://gilland09.github.io/portfolio/>  
This is the requested deployment URL; availability and deployment configuration were not independently checked during this audit.

## Project purpose and audience

The site presents Gilland Gilter S. Sabile’s computer science background, selected full-stack and applied-AI work, technical skills, certificates, and contact options. It is intended for recruiters, software engineering teams, academic evaluators, and potential collaborators who want to review project outcomes and implementation choices.

## Repository walkthrough

```text
portfolio/
├── index.html               Semantic page structure and portfolio content
├── README.md                Setup, architecture, accessibility, and test log
├── css/
│   ├── variables.css        Shared design tokens and light-theme overrides
│   ├── base.css             Reset, global type, focus, and reduced-motion baseline
│   ├── layout.css           Containers, macro layouts, and responsive breakpoints
│   ├── components.css       Navigation, buttons, cards, forms, and dialog
│   └── animations.css       Reveals, hover states, spotlights, and motion guard
├── js/
│   └── main.js              Theme, menu, filters, scroll spy, dialog, and contact flow
└── assets/
    └── images/
        └── .gitkeep         Placeholder directory for future portfolio media
```

### Architecture and code walkthrough

- `index.html` owns the landmarks, heading hierarchy, project content, accessible form labels, and native case-study dialog. Stylesheets load in dependency order, followed by deferred JavaScript.
- `variables.css` is the single source for palette, type, spacing, radii, shadows, and transition tokens. BEM-style component variants consume these custom properties so theme or scale changes do not duplicate values.
- `base.css` defines the global reset, typography, focus treatment, and reduced-motion defaults. Shared token references keep global defaults aligned with the component layers.
- `layout.css` owns page-wide composition and breakpoint behavior. Semantic/BEM class hooks identify layout roles; Grid handles 2D composition and Flexbox handles 1D alignment.
- `components.css` contains reusable interface styles. BEM-inspired names such as `.btn--primary` and `.project-card--featured` express variants while shared custom properties avoid repeating color, spacing, and motion values.
- `animations.css` contains motion and interactive states on reusable BEM component classes. It reuses design tokens and custom properties for consistent timing, accent colors, and pointer/stagger values.
- `main.js` progressively enhances the static document: it toggles BEM state classes, synchronizes UI state with ARIA, observes reveals and sections, sets CSS custom properties for visual effects, filters projects, and prepares email links without requiring a server.

### Run locally

Open `index.html` directly, or serve the project root using Python:

```powershell
python -m http.server 8000
```

Visit <http://localhost:8000>. Google Fonts are requested remotely; system sans-serif fallbacks remain available if the font service is unreachable.

## Design system

### Color palette and contrast

Contrast ratios below use WCAG relative-luminance calculations on the stated solid foreground/background pairs. All listed text pairs exceed the WCAG AA 4.5:1 threshold. Focus indicators are non-text UI, for which a 3:1 contrast threshold is the relevant benchmark.

| Theme / token | Hex | Example foreground/background pairing | Contrast |
|---|---|---|---:|
| Dark background `--color-bg` | `#0B0F19` | Primary text `#F8FAFC` on background | 18.30:1 |
| Dark card `--color-surface` | `#111827` | Primary text `#F8FAFC` on card | 16.96:1 |
| Dark muted text `--color-muted` | `#94A3B8` | Muted text on dark background | 7.47:1 |
| Dark primary accent `--color-accent` | `#38BDF8` | Focus ring on dark background | 8.94:1 |
| Dark accent text `--color-accent-strong` | `#7DD3FC` | Accent text on dark background | 11.49:1 |
| Dark live status `--color-secondary-strong` | `#34D399` | Status text on dark background | 9.96:1 |
| Light background `--color-bg` | `#F8FAFC` | Primary text `#0F172A` on background | 17.06:1 |
| Light card `--color-surface` | `#FFFFFF` | Primary text `#0F172A` on card | 17.85:1 |
| Light muted text `--color-muted` | `#475569` | Muted text on light background | 7.24:1 |
| Light primary accent `--color-accent` | `#0284C7` | Focus ring on light background | 3.91:1 |
| Light accent text `--color-accent-strong` | `#0369A1` | Accent text on light background | 5.67:1 |
| Light live status `--color-secondary-strong` | `#065F46` | Status text on light background | 7.34:1 |
| Border `--color-border` | Dark `#1E293B`; light `#D7E0EB` | Decorative/component boundary, not body copy | — |

Gradients and illustrations are decorative surfaces. Place text on the solid, high-contrast card and page surfaces rather than relying on an image or gradient for text contrast.

### Typography

| Role | Font | Size |
|---|---|---|
| Hero `h1` | Plus Jakarta Sans, 600/700 | `clamp(2.75rem, 6.2vw, 5.75rem)` |
| Section `h2` | Plus Jakarta Sans, 600/700 | `clamp(2.5rem, 5.7vw, 5rem)` |
| `h3` | Plus Jakarta Sans, 600/700 | `clamp(1.125rem, 1.8vw, 1.5rem)` |
| Body | Inter, 400/500 | `1rem` base; `0.875rem` small; `1.125rem` large |
| Tags and metrics | JetBrains Mono, 400/500 | Compact `rem` sizes, generally `0.68rem` to `0.75rem` |

Plus Jakarta Sans, Inter, and JetBrains Mono are loaded from Google Fonts in the HTML head. Fallbacks are declared in the design tokens.

### Spacing and shape tokens

Spacing uses `rem` custom properties: `--space-1: 0.25rem`, `--space-2: 0.5rem`, `--space-3: 1rem`, `--space-4: 1.5rem`, `--space-5: 2rem`, `--space-6: 2.5rem`, `--space-7: 3rem`, `--space-8: 3.5rem`, `--space-9: 4rem`, `--space-10: 4.5rem`, `--space-11: 5rem`, and `--space-12: 6rem`. This provides a compact half-step followed by a consistent 8px rhythm at the default 16px root size.

Cards use `--radius-lg: 1rem`; smaller controls use `--radius-sm` or `--radius-md`. Shadows and transitions are also tokenized in `variables.css`.

## Responsive layout

| Viewport | Layout behavior |
|---|---|
| Mobile, `< 768px` | Single-column project grid; stacked hero; collapsible navigation; no horizontal overflow |
| Tablet, `768px–1023px` | Two-column project grid; featured card spans both columns; hero stacks |
| Desktop, `>= 1024px` | Three-column project grid; featured Altruria card spans two columns; asymmetric two-column hero |

**Grid vs. Flexbox:** CSS Grid handles 2D macro compositions such as the hero, about content, project bento grid, skills, certificates, and contact. Flexbox handles 1D groups such as navbar contents, hero CTAs, metric cards, technology tags, filter controls, and footer bar. `minmax(0, ...)`, wrapping, and mobile single-column rules help prevent intrinsic content from forcing horizontal scroll.

## Rubric alignment

| Rubric area | Points | Evidence in this project |
|---|---:|---|
| Semantic HTML / CSS | 20 | Landmark structure, labeled sections and form, heading hierarchy, focus-visible styling, tokenized design system, and modular CSS layers |
| Responsive layout | 15 | Mobile/tablet/desktop breakpoints, Grid-based project composition, Flexbox component groups, and four viewport overflow checks |
| Code & repository walkthrough | 10 | File responsibility map, BEM-inspired component naming, CSS custom-property reuse, and local run instructions in this README |
| Testing & deployment | 10 | Documented local browser checks, cross-browser follow-up status, debugging log, and GitHub Pages target URL |

## Accessibility audit

Audited in the current HTML and browser session:

- Heading levels proceed from one `h1` to section `h2` headings and component `h3` headings without skipped levels.
- There are currently no `<img>` elements; portrait and project thumbnails are CSS placeholders. If images are added, provide meaningful `alt` text for informative images, empty `alt` for decorative images, and `loading="lazy"` for below-the-fold media.
- Icon-only controls (mobile menu and dialog close) have accessible names; the theme control has an accessible name and visible text. Other buttons have visible labels.
- The global `:focus-visible` outline and offset shadow were keyboard-checked in dark and light themes.
- Landmarks, skip link, labeled sections, explicit form labels, inline error descriptions, and dialog semantics are present.
- Reduced-motion users get visible reveal content without transform motion or View Transition animation.

## Testing & debugging log

### Viewport and interaction checks

Chrome/Chromium browser checks were run against the local static server during development. For each requested viewport, `document.documentElement.scrollWidth <= document.documentElement.clientWidth` evaluated true:

| Viewport width | Result |
|---:|---|
| 375px | Pass — no horizontal overflow |
| 768px | Pass — no horizontal overflow |
| 1024px | Pass — no horizontal overflow |
| 1440px | Pass — no horizontal overflow |

Other browser-session checks covered dark/light focus indicators, project filters, menu open/close and Escape behavior, dialog Escape dismissal, scroll spy, reduced-motion display, pointer spotlight updates, and invalid/valid contact-form states.

### Cross-browser status

Only the available Chrome/Chromium browser session was exercised for this audit. Firefox, Microsoft Edge, and Mobile Safari were **not available for verification here**; they are listed as follow-up smoke tests rather than reported as completed tests.

| Browser | Status | Suggested follow-up |
|---|---|---|
| Chrome / Chromium | Tested locally at requested widths and with key interactions | Repeat after deployment on GitHub Pages |
| Firefox | Not tested in this environment | Check Grid sizing, dialog backdrop/Escape, focus visibility, and reduced motion |
| Microsoft Edge | Not tested in this environment | Check Chromium behavior at requested widths, dialog, and clipboard fallback |
| Mobile Safari | Not tested in this environment | Check viewport sizing, sticky/backdrop blur, menu scroll lock, dialog, and mail links on an actual iOS device |

### Three development bugs caught and fixed

| Bug | Cause | Fix and verification |
|---|---|---|
| Desktop navigation was hidden while the menu button appeared outside mobile | A mobile-only nav visibility rule was placed outside its breakpoint and the menu button had a desktop display rule | Scoped the collapsed-menu behavior to the mobile media query and hid the toggle by default; checked desktop and mobile states in Chromium |
| Metric badges caused horizontal overflow on narrow screens | Flex wrapping retained a second row behavior when the cards were intended to stack | Set the narrow-screen metrics to `flex-flow: column nowrap`; rechecked the 390px mobile layout, then verified all rubric viewport widths |
| Dialog Escape dismissal was unreliable in browser automation | Native dialog Escape handling was not consistently observed in the test session | Added an explicit dialog keydown handler that closes on Escape; confirmed the dialog closes in Chromium |

### Re-run checks

```powershell
node --check js\main.js
python -m http.server 8000
```

Then manually repeat the viewport table, keyboard Tab traversal, reduced-motion preference, theme toggle, filters, dialog, and contact fallback checks. The contact form is client-side only: it prepares a `mailto:` link and copies the recipient address; no form content is submitted to or stored by a server.
