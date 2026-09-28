# Changelog


## 2.2.0 — 2026-09-28

Home menu, requirements review and integration points.

- Home and Services dropdowns: Escape now dismisses the open menu (WCAG 1.4.13), and the mobile menu's expandable rows report their open/closed state (`aria-expanded`).
- Contact page: “Book a 15-minute call” block with a calendar integration point (`data-booking-url`).
- Blog: the featured article no longer repeats as a grid card in the “All” view (it still appears under its category and in search); the article page sidebar no longer repeats images from the related-posts grid.
- Meta descriptions on six pages rewritten to 150–160 characters.
- `assets/js/plugins/` and `assets/fonts/` now contain README notes so the required folder structure survives zipping.

## 2.1.0 — 2026-09-28

Navigation, direction toggle, imagery and CTA update.

- Direction control is now a single **LTR** toggle button (header, mobile drawer, dashboard and Coming Soon): it shows the current direction, switches to RTL on click (label changes to “RTL”), and the choice persists across pages. The two-button LTR | RTL switch was removed.

## 2.0.0 — 2026-09-27

Design, imagery and UX revision.

- Replaced flat SVG scenes with 48 section-specific photographs (WebP, explicit dimensions, lazy-loaded below the fold); no photo repeats within a page.
- New logomark, favicon and horizontal logo: an ink "P" on a peeling die-cut label with CMY registration dots.
- Visible LTR | RTL switch in every header, the mobile drawer, Coming Soon and the dashboard; direction and theme are applied before first paint and persist across pages.
- Fixed the Home 1 hero collage overlapping the headline below 1024px (aspect-ratio sizing); hero text now leads on single-column layouts.
- Home 1: icon card grid replaced by a photo bento; "Why us" rebuilt as a press photo + feature list; final CTA now shows artwork, concrete benefits and two actions.
- Home 2: editorial two-column hero with the product-photo strip above the fold; full-bleed ink CTA.
- Services: added "What you get on every print run", a four-step process and an FAQ.
- Contact: interactive Google Maps embed (keyless) with a documented Maps Embed API option (`YOUR_GOOGLE_MAPS_API_KEY`).
- Coming Soon: split layout with production photo, theme + direction controls and contact details.
- SEO: raster Open Graph image (`og-image.jpg`), canonical/OG/Twitter tags and JSON-LD on every public page, fixed short meta descriptions and an over-length title, admin dashboard set to `noindex`.
- Accessibility: fixed heading-level skips (footer, feature lists, filters, TOC), phone/email links isolated as LTR inside RTL layouts, admin dashboard link removed from the public footer.

## 1.0.0 — 2026-02-19

Initial release.

- 17 pages: Home 1, Home 2, About, Services, Service Details, Products, Custom Design Upload, Bulk Pricing, Pricing, Blog, Blog Details, Contact, Login, Register, Admin Dashboard, 404, Coming Soon (plus a supporting Legal page).
- Full design system in `assets/css/style.css` with CSS custom properties, a 4px spacing scale, and a reusable component library (buttons, cards, forms, tables, modals, toasts, tabs, accordions, pagination, breadcrumbs).
- Light/dark theme with system-preference detection, manual override and `localStorage` persistence.
- RTL support via logical CSS properties plus a dedicated `rtl.css` patch layer.
- Working interactivity: product/blog filtering and search, an 8-step upload wizard with drag-and-drop, a live pricing calculator, a single-page admin dashboard with CSS-driven charts, client-side form validation with accessible error messaging.
- SEO: unique titles/descriptions per page, Open Graph + Twitter cards, JSON-LD (`Organization`, `WebSite`, `BreadcrumbList`, `Product`, `Article`, `LocalBusiness`), `robots.txt`, `sitemap.xml`.
- WCAG 2.1 AA-oriented markup: skip link, single `<h1>` per page, visible focus states, `prefers-reduced-motion` support, accessible form labeling.
