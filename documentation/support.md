# Support & Extending the Template

## Getting help

This is a self-contained static template with no backend dependencies, so most "support" questions are really customization questions — see [`customization.md`](customization.md) first.

## Common tasks

**Add a new page**
Copy the closest existing page (e.g. duplicate `services.html` for another listing-style page), update the `<title>`, meta description, canonical URL, breadcrumb, and `<h1>`. Keep the header/footer markup identical to the rest of the site — and remember the mobile nav (`<nav id="mobile-nav">`) must stay a **sibling** of `<header>`, not nested inside it (see `page-structure.md`).

**Add a new product category**
1. Add a filter chip in `products.html` (`data-filter-category="your-slug"`).
2. Add product cards with matching `data-category="your-slug"`.
3. Add the category to footer/nav links as `products.html?category=your-slug`.

**Add a new blog category**
Same pattern as products: add a chip with `data-blog-category="your-slug"` in `blog.html`, and tag article cards with `data-category="your-slug"`.

**Extend the admin dashboard**
Add a new `<a data-dash-section-link="your-key">` in the sidebar nav, and a matching `<section data-dash-section="your-key" hidden>` in `.dash-content`. `assets/js/dashboard.js`'s `initSectionSwitch()` handles the rest automatically.

**Change validation rules**
All client-side validation logic is centralized in `assets/js/main.js`'s `validateField()` function. Add new rules there rather than duplicating validation per-page.

## Known template limitations (by design)

- Forms simulate submission client-side — see [`customization.md#connecting-forms`](customization.md#connecting-forms) to wire up a real backend.
- The admin dashboard is a static front-end demo (no authentication, no real data source) — intended as a UI starting point for your own backend integration.
- Pricing figures are illustrative placeholders, not a real pricing engine.

## Reporting a template bug

If you find a genuine bug in the shared CSS/JS (not a customization question), check that it isn't caused by editing shared classes used across multiple pages — most "broken" pages after customization trace back to a shared component (`.card`, `.btn`, `.field`) being modified for one use case in a way that affects every other page using it.
