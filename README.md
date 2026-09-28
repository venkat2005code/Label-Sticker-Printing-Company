# Printora Labels — Label & Sticker Printing Website Template

A complete, production-quality, responsive multi-page website template for a custom label and sticker printing company. Built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step.

## Features

- **17 fully-built pages** — two distinct home pages, products catalogue, service details, an 8-step design upload wizard, bulk pricing calculator, pricing, blog + article detail, contact, auth (login/register), an admin dashboard, 404 and coming-soon.
- **A real design system** — CSS custom properties for color/spacing/radius/shadow, a 4px spacing scale, and a reusable component library (buttons, cards, badges, forms, tables, modals, toasts, tabs, accordions, breadcrumbs, pagination).
- **Light & dark mode** with system-preference detection, manual toggle and persistence.
- **RTL-ready** via logical CSS properties and a dedicated patch stylesheet.
- **Real interactivity, not dead buttons**: product/blog search & filtering, a live pricing calculator, drag-and-drop artwork upload with validation, an interactive admin dashboard with CSS-driven charts, accessible client-side form validation.
- **SEO-complete**: unique title/description per page, Open Graph + Twitter cards, JSON-LD structured data, `robots.txt`, `sitemap.xml`.
- **Accessible**: skip-to-content link, one `<h1>` per page, visible focus states, `prefers-reduced-motion` support, labeled form fields with inline errors.
- **Real, section-specific photography** — 48 royalty-free photos (WebP) matched to each product, material and article, with licences in `documentation/credits.md` and a ready-to-use AI prompt for every slot in `documentation/image-prompts.md`. Portraits, avatars, finish swatches and the 404 artwork remain original SVG.
- **Visible LTR direction toggle** (one button that flips to RTL and relabels itself) in every header and the mobile menu, persisted across pages and applied before first paint (no flash).

## Technology

HTML5 · CSS3 (custom properties, logical properties, Grid/Flexbox) · Vanilla JavaScript ES6+. No React/Vue/Angular, no Tailwind/Bootstrap build step, no npm dependencies required to run it.

## Folder Structure

```
label-sticker-printing/
├── assets/
│   ├── css/            style.css · dark-mode.css · rtl.css
│   ├── js/              main.js · products.js · pricing.js · upload.js · blog.js · dashboard.js
│   ├── images/          logo, favicon, OG image, SVG artwork · photos/ (WebP photography)
│   └── fonts/           (Google Fonts are loaded via <link>, this folder is for self-hosted alternatives)
├── pages/               all 17 pages + a supporting legal.html
├── documentation/        installation · customization · page-structure · credits · changelog · support
├── robots.txt
├── sitemap.xml
├── index.html            redirects to pages/index.html
└── README.md
```

## Quick Start

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/pages/index.html`. See [`documentation/installation.md`](documentation/installation.md) for more options and deployment instructions.

## Customizing

See [`documentation/customization.md`](documentation/customization.md) for brand colors, fonts, logo, product/service/pricing content, and connecting forms to a real backend (Formspree, Netlify Forms, Mailchimp).

## Page Reference

See [`documentation/page-structure.md`](documentation/page-structure.md) for what every page does and how the shared header/footer/JS are structured.

## Browser Support

Current and previous major versions of Chrome, Firefox, Safari and Edge.

## Integration Points

Search the codebase for `TODO:` comments — they mark every spot that needs a real backend connection: the Google Maps embed on the Contact page (works keyless today; swap in the Maps Embed API with `YOUR_GOOGLE_MAPS_API_KEY`), Stripe/PayPal placeholders, and Formspree/Netlify Forms/Mailchimp endpoints for every form.

## License

See [`LICENSE`](LICENSE). Third-party credits are listed in [`documentation/credits.md`](documentation/credits.md).
