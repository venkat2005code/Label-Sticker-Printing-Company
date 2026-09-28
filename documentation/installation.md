# Installation Guide

Printora Labels is a static HTML/CSS/JavaScript template — there is no build step, package manager, or compiler required.

## 1. Get the files

Unzip or clone the project. You should see this structure at the root:

```
label-sticker-printing/
├── assets/
├── pages/
├── documentation/
├── robots.txt
├── sitemap.xml
├── index.html      ← redirects to pages/index.html
└── README.md
```

## 2. Run it locally

Because the pages use `fetch`-free relative paths and no server-side code, you can open `pages/index.html` directly in a browser. However, running a local static server is recommended so relative asset paths and the browser's dev tools behave exactly as they will in production.

**Option A — Python (already installed on most Macs/Linux machines):**

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/pages/index.html`.

**Option B — Node.js:**

```bash
npx serve .
```

**Option C — VS Code:**

Install the "Live Server" extension, right-click `pages/index.html`, and choose "Open with Live Server."

## 3. Deploy

Upload the entire project folder to any static host:

- **Netlify / Vercel** — drag-and-drop the folder, or connect a Git repo. Set the publish directory to the project root.
- **GitHub Pages** — push to a repo and enable Pages on the root or `/docs` branch.
- **Any traditional web host** — upload via FTP/SFTP to your public HTML directory.

No environment variables, database, or backend are required for the front-end template to function. Forms are wired to submit client-side with front-end validation only — see [customization.md](customization.md#connecting-forms) to connect them to a real backend.

## Browser Support

Chrome, Firefox, Safari and Edge (current and previous major version). The template uses modern CSS (`color-mix()`, `:has()`-free selectors, logical properties, `conic-gradient()`) supported in all evergreen browsers as of 2024+.
