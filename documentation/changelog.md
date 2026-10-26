# Changelog


## 2.4.0 — 2026-10-22

Website review corrections (Sep slot 3, second correction).

- Header: the current page is highlighted (accent underline), including pages reached from the Home and Services dropdowns.
- Primary buttons are the same red on every page (five dark buttons switched); Home 2's final CTA is centred and its hero image strip has bottom padding.
- Standalone section headings are centred consistently (Home 1 and 2, Services, Service Details, About, Pricing, Bulk Pricing); FAQ questions no longer show browser button borders.
- Products: a 12th product (Waterproof Sauce Bottle Labels) completes the grid; card buttons line up and wrap instead of being cut off at 1024px.
- Services and Blog: "Learn More" / "Read More" links line up on one baseline.
- Waterproof Vinyl Labels: the gallery is no longer sticky on phones (option tiles slid over it at 360px); option tiles share one height.
- Mobile menu: the text-direction control and Log In button were removed (both are in the header), and "Get a Quote" is hidden wherever the header shows it.

## 2.3.1 — 2026-10-11

Follow-up fixes after the review corrections.

- Contact (and every page): the "Thanks — your request is in!" alert stayed visible before any submission because `.alert { display: flex }` overrode the `hidden` attribute; `.alert[hidden]` now hides it until a valid submit.
- Sticky header fixed: `body` used `height: 100%` and `overflow-x: hidden`, which confined the sticky header to the first screen; it now uses `overflow-x: clip` and grows with its content. In-page links land below the header (`scroll-padding-top`).
- Admin dashboard: the top bar no longer overflows 320px screens (the user's name stays as the button's accessible name; gaps tighten below 420px).
- Home 1: Barcode Labels, UV Coating and Foil Finishing are worded as enquiries ("ask a specialist to confirm availability") until the offers are confirmed — see *Content to confirm before publishing* in `customization.md`.
- Home 1: Custom Printing is now a numbered specification list beside its introduction and Industries uses captioned photo tiles, so the page no longer repeats the same card grid; Transparent Labels has its own photo (`lbl-clear-dropper.webp`).
- Primary button hover darkened to `#cf3a26` (white text 4.9:1, was 4.4:1).

## 2.3.0 — 2026-10-09

Website review corrections (Sep slot 3, first correction).

- Home 1 completed to the review outline: new **About Us**, **Printing & Finishing** (digital, matte, gloss, lamination, UV coating, foil), **Custom Printing** (size, shape, material, finish, quantity), **Industries We Serve**, **Gallery**, **FAQ** and **Contact Us** (quote form) sections.
- Products: added Barcode Labels and Transparent Labels; "Product Stickers" is now "Product Labels & Stickers".
- Why Choose Us now names affordable pricing; How It Works shows the quote and quality-check steps.

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
