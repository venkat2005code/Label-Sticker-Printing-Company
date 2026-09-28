# Customization Guide

## Brand colors

All colors are defined as CSS custom properties in [`assets/css/style.css`](../assets/css/style.css) under `:root`. Change the brand palette in one place:

```css
:root {
  --color-primary: #ff4b3e;   /* Primary CTA / accent color */
  --color-secondary: #14151a; /* Near-black ink */
  --color-ink-cyan: #00aeef;
  --color-ink-magenta: #ec0868;
  --color-ink-yellow: #ffc93c;
}
```

Dark-mode equivalents live in [`assets/css/dark-mode.css`](../assets/css/dark-mode.css) — update the tokens inside both the `@media (prefers-color-scheme: dark)` block and the `html[data-theme="dark"]` block (they must stay in sync).

## Fonts

Two Google Fonts are loaded per page: **Space Grotesk** (headings) and **Inter** (body). To swap either:

1. Update the `<link href="https://fonts.googleapis.com/css2?family=...">` tag in every page's `<head>`.
2. Update `--font-display` and `--font-body` in `assets/css/style.css`.

## Logo

The logomark is an inline SVG at `assets/images/logo-mark.svg` (and `favicon.svg` for the browser tab icon). Replace these files with your own SVG/PNG — keep the same filenames so no HTML needs to change, or update the `<img src>` references in every page's header/footer if you rename them.

## Replacing images

All product, material, hero and blog imagery lives in `assets/images/` as hand-drawn SVG illustrations (no external stock photography, so nothing to license). To swap in real photography:

1. Export your photos as `.webp` (preferred) or `.jpg`.
2. Replace the `src` attribute on the relevant `<img>` tag.
3. Keep the existing `alt` text pattern (specific, descriptive, no "image of…" prefix).

## Editing products

Product cards live directly in `pages/products.html` inside `<div data-product-grid>`. Each `<article class="product-card">` carries `data-name`, `data-category`, `data-material`, `data-finish` and `data-price` attributes — these power the search/filter/sort logic in `assets/js/products.js`. Keep the attributes in sync with the visible badges and price so filtering stays accurate.

Category slugs used across the site (`?category=` deep links, filter chips): `paper-labels`, `vinyl-labels`, `waterproof-labels`, `transparent-labels`, `die-cut-stickers`, `product-labels`, `packaging-stickers`, `roll-labels`.

## Editing services

Service cards live in `pages/services.html`. Each links out to either `service-details.html` (the single detailed example page) or a filtered `products.html` view.

## Editing pricing

- `pages/pricing.html` — static pricing tables and the material/finish price breakdown.
- `pages/bulk-pricing.html` — the quantity-break table and the interactive calculator.

The calculator's pricing model (base rate, material/finish/size multipliers, quantity discount tiers) is defined at the top of `assets/js/pricing.js`:

```js
const BASE_UNIT_PRICE = 0.42;
const MATERIAL_MULTIPLIER = { paper: 1, vinyl: 1.25, waterproof: 1.45, transparent: 1.35 };
const FINISH_MULTIPLIER = { matte: 1, gloss: 1.08, "soft-touch": 1.22 };
const SIZE_MULTIPLIER = { small: 1, medium: 1.15, large: 1.35, custom: 1.55 };
const QTY_TIERS = [ { qty: 100, factor: 1 }, { qty: 500, factor: 0.82 }, /* … */ ];
```

Adjust these constants to match your real cost structure.

## Editing testimonials

Testimonial cards are plain markup (`.testimonial-card`) inside `index.html`, `home-2.html` and `about.html`. Swap the quote, name, role and avatar image.

## Editing blog content

- `pages/blog.html` — the article grid. Each `.blog-card` needs `data-title` and `data-category` attributes for the search/filter in `assets/js/blog.js` to work, plus category slugs matching the filter chips (`printing-tips`, `label-design`, `packaging`, `materials`, `branding`, `small-business`).
- `pages/blog-details.html` — a single full article template. Duplicate this file per new post and update the `<title>`, meta tags, JSON-LD `Article` schema, and article body.

## Connecting forms

Every form uses `novalidate data-validate` and is intercepted by `assets/js/main.js`'s `initFormValidation()`, which currently **simulates** a submission (see the `TODO` comment inside `initFormValidation`). To connect a real backend:

1. **Formspree / Netlify Forms** — add `action="https://formspree.io/f/your-id"` (or a `netlify` attribute) to the `<form>` tag, remove the `e.preventDefault()` short-circuit in `main.js` for that form, or replace the `setTimeout` fake-submit block with a real `fetch(form.action, { method: "POST", body: new FormData(form) })` call.
2. **Newsletter (Mailchimp/ConvertKit)** — update the `<form class="newsletter-form">` markup with your provider's action URL and hidden fields, per their embed instructions.

Look for `<!-- TODO: -->` comments throughout the HTML for every integration point (Google Maps, Stripe/PayPal, Formspree, Mailchimp).

## Theme & RTL

- Theme toggling, persistence and system-preference detection live in `assets/js/main.js` (`initTheme`).
- An RTL preview toggle (`[data-dir-toggle]`) is wired up but not placed in the UI by default — add a button with that attribute anywhere to let users preview Arabic/Hebrew-style layout.
- Logical CSS properties (`margin-inline`, `inset-inline`, `text-align: start/end`) are used throughout `style.css` so most components mirror automatically; `assets/css/rtl.css` only patches the handful of rules that need a physical value (icon flips, table numeral direction, etc.).

## Photography

All photos live in `assets/images/photos/` as WebP. To replace one, save your image with the **same filename** (keep the
aspect ratio listed in `documentation/image-prompts.md`) — no HTML edits are needed. Every `<img>` already carries
`width`/`height` (prevents layout shift), `alt` text, and `loading="lazy"` below the fold. Update the `alt` text if the
new photo shows something different. Photo licences are listed in `documentation/credits.md`.

## Logo & favicon

- `assets/images/logo-mark.svg` — compact mark used in the header, footer and dashboard (48×48 viewBox).
- `assets/images/logo.svg` — horizontal lockup (mark + wordmark) for documents and partner use.
- `assets/images/favicon.svg` — browser tab icon.
- `assets/images/og-image.jpg` — 1200×630 social sharing image referenced by every page's `og:image` / `twitter:image`.

## Text direction (LTR / RTL)

Every header (and the mobile drawer) contains a single direction toggle that shows the current direction:

```html
<button type="button" class="dir-toggle" data-dir-toggle aria-pressed="false"
        aria-label="Switch to right-to-left layout" title="Switch text direction">LTR</button>
```

Clicking it switches between LTR and RTL. `main.js` sets `document.documentElement.dir`, relabels every toggle
(“LTR” / “RTL”), updates `aria-pressed` and `aria-label`, and stores the choice in `localStorage`
(`printora-dir`). A tiny inline script in each page's `<head>` re-applies the stored theme and direction before the page
paints. Layout mirrors through CSS logical properties; `rtl.css` holds the few explicit overrides (including keeping phone
numbers and email addresses left-to-right).

## Google Maps

The Contact page embeds an interactive map (zoom, pan, marker) with the keyless URL format:

```html
<iframe src="https://maps.google.com/maps?q=YOUR+ADDRESS&z=14&output=embed" ...></iframe>
```

To use the official Maps Embed API instead, replace the `src` with
`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=YOUR+ADDRESS` and restrict the key to your
domain in the Google Cloud console. Update the "Get directions" link to the same address.

## Integration points

Every third-party integration is placeholder-ready. Search the code for `TODO:` to find each hook.

| Integration | Where | What to change |
|---|---|---|
| Contact / quote form | `pages/contact.html`, `pages/custom-design.html` (`form[data-validate]`) | Point the form at a Formspree endpoint or add Netlify Forms attributes (see *Connecting forms*). |
| Newsletter | Footer `form.newsletter-form` | Replace with your Mailchimp or ConvertKit action URL and hidden fields. |
| Google Maps | `pages/contact.html` | Keyless embed by default; set `YOUR_GOOGLE_MAPS_API_KEY` for the Maps Embed API (see *Google Maps*). |
| Calendar / booking | `pages/contact.html` → `a[data-booking-link]` | Set `data-booking-url` and `href` to your Calendly, Cal.com or Google appointment page. |
| Payments | Footer payment row and pricing pages (`<!-- TODO: Stripe / PayPal checkout integration point -->`) | Add a Stripe Payment Link or PayPal button. |
