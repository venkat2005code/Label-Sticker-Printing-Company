# Page Structure

All pages live in `pages/` and share `assets/css/style.css`, `assets/css/dark-mode.css`, `assets/css/rtl.css` and `assets/js/main.js`. Paths inside each page are relative (`../assets/...` for assets, plain filenames for other pages).

| Page | File | Purpose |
|---|---|---|
| Home 1 | `index.html` | Primary landing page — general printing services, materials, process, testimonials. |
| Home 2 | `home-2.html` | Editorial landing page targeted at product brands (food, cosmetics, candles, beverage). |
| About | `about.html` | Company story, mission/vision, timeline, production capabilities, team, testimonials. |
| Services | `services.html` | Grid of all 8 core services, each linking to details or a filtered product view. |
| Service Details | `service-details.html` | Full product/service detail example: Waterproof Vinyl Labels, with pricing table and FAQ. |
| Products | `products.html` | Full catalogue with search, category/material/finish filters, sort, and a material comparison table. |
| Custom Design | `custom-design.html` | 8-step guided quote request wizard with drag-and-drop artwork upload. |
| Bulk Pricing | `bulk-pricing.html` | Quantity-break pricing table plus an interactive live pricing calculator. |
| Pricing | `pricing.html` | Explains the pricing model (starting prices, material/finish adders, quantity breaks, quote process). |
| Blog | `blog.html` | Article grid with search, category filters and pagination. |
| Blog Details | `blog-details.html` | Single full article template with table of contents, sidebar and related posts. |
| Contact | `contact.html` | Contact details, map placeholder, and the main "Request a Quote" form. |
| Login | `login.html` | Authentication UI with password visibility toggle and social login placeholders. |
| Register | `register.html` | Account creation with password strength meter and terms agreement. |
| Admin Dashboard | `admin-dashboard.html` | Internal single-page dashboard: Overview, Analytics, Orders, Quotes, Products, Users, Messages, Settings. |
| 404 | `404.html` | Print-themed not-found page. |
| Coming Soon | `coming-soon.html` | Countdown + email capture maintenance page. |
| Legal | `legal.html` | Combined Privacy Policy / Terms of Service / Cookie Policy (tabbed, deep-linkable via `#privacy`, `#terms`, `#cookies`). |

## Shared components (defined once in `assets/css/style.css`, reused everywhere)

- **Header** — topbar + main nav + mobile drawer. The mobile `<nav id="mobile-nav">` is intentionally placed as a **sibling** of `<header>`, not a descendant — the header's `backdrop-filter` would otherwise become the nav's `position: fixed` containing block and clip it to the header's own height. Keep this structure if you duplicate the header markup into a new page.
- **Footer** — 5-column layout (Company, Products, Resources, Support + brand column), newsletter form, legal links, payment badges.
- **Cards** — `.card`, `.product-card`, `.service-card`, `.testimonial-card`, `.blog-card` share the base `.card` styles.
- **Forms** — `.field` / `.input` / `.select` / `.textarea` with a consistent validation pattern (see `assets/js/main.js`).

## Page-specific JavaScript

| File | Used on |
|---|---|
| `assets/js/main.js` | Every page (nav, theme, dropdowns, accordions, tabs, modals, toasts, form validation). |
| `assets/js/products.js` | `products.html` (search/filter/sort). |
| `assets/js/pricing.js` | `bulk-pricing.html` (calculator + quantity-table highlight). |
| `assets/js/upload.js` | `custom-design.html` (stepper + drag-and-drop upload). |
| `assets/js/blog.js` | `blog.html` (search/filter/pagination). |
| `assets/js/dashboard.js` | `admin-dashboard.html` (sidebar, section switching, charts, table search/filter). |
