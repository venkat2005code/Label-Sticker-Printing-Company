/* ==========================================================================
   MAIN.JS — Global site behaviour shared by every page.
   Mobile navigation, theme toggle, RTL toggle, dropdowns, accordions, tabs,
   modals, toasts, password visibility, and reusable form validation helpers.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Theme toggle (light / dark / system) with localStorage persistence
     ------------------------------------------------------------------ */
  const THEME_KEY = "printora-theme";

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      const isDark =
        theme === "dark" ||
        (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    applyTheme(stored || "system");

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = localStorage.getItem(THEME_KEY) || "system";
        const isDark =
          current === "dark" ||
          (current === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
        const next = isDark ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    });
  }

  /* ------------------------------------------------------------------
     RTL demo toggle — lets visitors preview Arabic/Hebrew-style layout
     without a translation layer. Persists via localStorage.
     ------------------------------------------------------------------ */
  const DIR_KEY = "printora-dir";

  function readDir() {
    try { return localStorage.getItem(DIR_KEY); } catch (e) { return null; }
  }

  // One toggle button per location (header, mobile drawer, dashboard); its label shows the current direction.
  function applyDir(dir) {
    const rtl = dir === "rtl";
    document.documentElement.setAttribute("dir", dir);
    document.querySelectorAll("[data-dir-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(rtl));
      btn.setAttribute("aria-label", rtl ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
      btn.textContent = rtl ? "RTL" : "LTR";
    });
  }

  function initDirToggle() {
    const stored = readDir();
    applyDir(stored === "rtl" || stored === "ltr" ? stored : document.documentElement.getAttribute("dir") || "ltr");
    document.querySelectorAll("[data-dir-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
        try { localStorage.setItem(DIR_KEY, next); } catch (e) { /* storage unavailable */ }
        applyDir(next);
      });
    });
  }

  /* ------------------------------------------------------------------
     Mobile navigation drawer
     ------------------------------------------------------------------ */
  function initMobileNav() {
    const toggle = document.querySelector(".hamburger");
    const nav = document.querySelector(".mobile-nav");
    if (!toggle || !nav) return;

    function close() {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
    }
    function open() {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      document.body.classList.add("no-scroll");
    }

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? close() : open();
    });

    nav.querySelectorAll(".nav-item.has-children > .nav-link").forEach((link) => {
      link.setAttribute("role", "button");
      link.setAttribute("aria-expanded", "false");
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const item = link.closest(".nav-item");
        item.classList.toggle("is-open");
        link.setAttribute("aria-expanded", String(item.classList.contains("is-open")));
      });
    });

    nav.querySelectorAll("a[href]:not([href='#'])").forEach((a) => a.addEventListener("click", close));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ------------------------------------------------------------------
     Desktop hover/focus dropdowns (Home, Services): Escape dismisses the
     open menu until the pointer or focus leaves it
     ------------------------------------------------------------------ */
  function initNavDropdownDismiss() {
    document.querySelectorAll(".main-nav .nav-item.has-dropdown").forEach((item) => {
      item.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        item.classList.add("is-dismissed");
        const link = item.querySelector(".nav-link");
        if (link) link.focus();
      });
      item.addEventListener("mouseleave", () => item.classList.remove("is-dismissed"));
      item.addEventListener("focusout", (e) => {
        if (!item.contains(e.relatedTarget)) item.classList.remove("is-dismissed");
      });
    });
  }

  /* ------------------------------------------------------------------
     Header shadow-on-scroll (subtle, respects reduced motion by default)
     ------------------------------------------------------------------ */
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     Generic dropdown menus (user menu, sort menu, etc.)
     data-dropdown-trigger / data-dropdown-menu pairing
     ------------------------------------------------------------------ */
  function initDropdowns() {
    document.querySelectorAll("[data-dropdown]").forEach((wrap) => {
      const trigger = wrap.querySelector("[data-dropdown-trigger]");
      const menu = wrap.querySelector("[data-dropdown-menu]");
      if (!trigger || !menu) return;

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains("is-open");
        document.querySelectorAll(".dropdown-menu.is-open").forEach((m) => m.classList.remove("is-open"));
        menu.classList.toggle("is-open", !isOpen);
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-menu.is-open").forEach((m) => m.classList.remove("is-open"));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".dropdown-menu.is-open").forEach((m) => m.classList.remove("is-open"));
      }
    });
  }

  /* ------------------------------------------------------------------
     Accordion (FAQs, materials specs, dashboard help, etc.)
     ------------------------------------------------------------------ */
  function initAccordions() {
    document.querySelectorAll(".accordion-item").forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        const group = item.closest("[data-accordion-single]");

        if (group) {
          group.querySelectorAll(".accordion-trigger").forEach((t) => {
            t.setAttribute("aria-expanded", "false");
            t.closest(".accordion-item").querySelector(".accordion-panel").style.maxHeight = null;
          });
        }

        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });
  }

  /* ------------------------------------------------------------------
     Tabs (material showcase, product details, dashboard, pricing)
     ------------------------------------------------------------------ */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((group) => {
      const buttons = group.querySelectorAll("[role='tab']");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetId = btn.getAttribute("aria-controls");
          buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
          btn.setAttribute("aria-selected", "true");
          group.querySelectorAll("[role='tabpanel']").forEach((p) => {
            p.hidden = p.id !== targetId;
          });
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Modals
     ------------------------------------------------------------------ */
  function initModals() {
    document.querySelectorAll("[data-modal-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = document.getElementById(btn.getAttribute("data-modal-open"));
        if (modal) {
          modal.classList.add("is-open");
          document.body.classList.add("no-scroll");
          const focusable = modal.querySelector("input, button, [href]");
          if (focusable) focusable.focus();
        }
      });
    });
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay || e.target.closest("[data-modal-close]")) {
          overlay.classList.remove("is-open");
          document.body.classList.remove("no-scroll");
        }
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.is-open").forEach((m) => {
          m.classList.remove("is-open");
          document.body.classList.remove("no-scroll");
        });
      }
    });
  }

  /* ------------------------------------------------------------------
     Toast notifications — window.showToast(type, title, message)
     ------------------------------------------------------------------ */
  function ensureToastRegion() {
    let region = document.querySelector(".toast-region");
    if (!region) {
      region = document.createElement("div");
      region.className = "toast-region";
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      document.body.appendChild(region);
    }
    return region;
  }

  const ICONS = {
    success: '<svg viewBox="0 0 20 20" fill="none"><path d="M5 10.5l3 3 7-7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    error: '<svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    info: '<svg viewBox="0 0 20 20" fill="none"><path d="M10 9v5M10 6.5v.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
  };

  window.showToast = function showToast(type, title, message, duration) {
    const region = ensureToastRegion();
    const toast = document.createElement("div");
    toast.className = "toast toast-" + (type || "info");
    toast.innerHTML =
      '<span class="toast-icon">' + (ICONS[type] || ICONS.info) + "</span>" +
      '<span class="toast-text"><span class="toast-title">' + title + '</span>' +
      (message ? '<span class="toast-msg">' + message + "</span>" : "") +
      "</span>" +
      '<button class="toast-close" aria-label="Dismiss notification" type="button">&times;</button>';
    region.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("is-visible"));

    function dismiss() {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 300);
    }
    toast.querySelector(".toast-close").addEventListener("click", dismiss);
    setTimeout(dismiss, duration || 5000);
  };

  /* ------------------------------------------------------------------
     Copy-to-clipboard buttons — data-copy-link (copies current page URL)
     or data-copy-value="literal text"
     ------------------------------------------------------------------ */
  function initCopyLinks() {
    document.querySelectorAll("[data-copy-link], [data-copy-value]").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const text = btn.hasAttribute("data-copy-value")
          ? btn.getAttribute("data-copy-value")
          : window.location.href;
        try {
          await navigator.clipboard.writeText(text);
          window.showToast && window.showToast("success", "Link copied", "");
        } catch (err) {
          window.showToast && window.showToast("error", "Couldn't copy", "Please copy the link manually.");
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     Password visibility toggle
     ------------------------------------------------------------------ */
  function initPasswordToggles() {
    document.querySelectorAll("[data-password-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = document.getElementById(btn.getAttribute("data-password-toggle"));
        if (!input) return;
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
        btn.classList.toggle("is-visible", show);
      });
    });
  }

  /* ------------------------------------------------------------------
     Password strength meter — data-password-strength-for="inputId"
     ------------------------------------------------------------------ */
  function initPasswordStrength() {
    document.querySelectorAll("[data-password-strength-for]").forEach((meter) => {
      const input = document.getElementById(meter.getAttribute("data-password-strength-for"));
      if (!input) return;
      const bars = meter.querySelectorAll("span");
      input.addEventListener("input", () => {
        const val = input.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/\d/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;
        const colors = ["var(--color-error)", "var(--color-error)", "var(--color-warning)", "var(--color-success)", "var(--color-success)"];
        bars.forEach((bar, i) => {
          bar.style.background = i < score ? colors[score] : "var(--color-border)";
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Generic client-side form validation
     Applies to any <form novalidate data-validate>
     ------------------------------------------------------------------ */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[+]?[\d\s()-]{7,}$/;

  function validateField(field) {
    const wrap = field.closest(".field");
    if (!wrap) return true;
    const errorEl = wrap.querySelector(".error-msg");
    let message = "";

    if (field.hasAttribute("required")) {
      if (field.type === "checkbox" && !field.checked) {
        message = errorEl ? errorEl.getAttribute("data-required") || "This field is required." : "";
      } else if (field.value.trim() === "") {
        message = (errorEl && errorEl.getAttribute("data-required")) || "This field is required.";
      }
    }

    if (!message && field.type === "email" && field.value.trim() !== "" && !EMAIL_RE.test(field.value.trim())) {
      message = (errorEl && errorEl.getAttribute("data-invalid")) || "Please enter a valid email address.";
    }

    if (!message && field.type === "tel" && field.value.trim() !== "" && !PHONE_RE.test(field.value.trim())) {
      message = (errorEl && errorEl.getAttribute("data-invalid")) || "Please enter a valid phone number.";
    }

    if (!message && field.hasAttribute("data-match")) {
      const other = document.getElementById(field.getAttribute("data-match"));
      if (other && field.value !== other.value) {
        message = (errorEl && errorEl.getAttribute("data-mismatch")) || "Passwords do not match.";
      }
    }

    if (!message && field.type === "file" && field.hasAttribute("data-max-size-mb")) {
      const maxMb = parseFloat(field.getAttribute("data-max-size-mb"));
      const tooBig = Array.from(field.files || []).some((f) => f.size > maxMb * 1024 * 1024);
      if (tooBig) message = "File size must be below " + maxMb + " MB.";
    }

    if (message) {
      wrap.classList.add("is-invalid");
      if (errorEl) errorEl.textContent = message;
      field.setAttribute("aria-invalid", "true");
      return false;
    }

    wrap.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
    return true;
  }

  function initFormValidation() {
    document.querySelectorAll("form[data-validate]").forEach((form) => {
      const fields = form.querySelectorAll(".input[required], .textarea[required], .select[required], input[type='email'], input[type='tel'], input[data-match], input[type='file'][data-max-size-mb], input[type='checkbox'][required]");

      fields.forEach((field) => {
        field.addEventListener("blur", () => validateField(field));
        field.addEventListener("input", () => {
          if (field.closest(".field")?.classList.contains("is-invalid")) validateField(field);
        });
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;
        fields.forEach((field) => {
          if (!validateField(field)) valid = false;
        });

        if (!valid) {
          const firstInvalid = form.querySelector(".field.is-invalid .input, .field.is-invalid .select, .field.is-invalid .textarea, .field.is-invalid input");
          if (firstInvalid) firstInvalid.focus();
          window.showToast && window.showToast("error", "Please check the form", "Some fields need your attention.");
          return;
        }

        const submitBtn = form.querySelector("button[type='submit']");
        if (submitBtn) submitBtn.classList.add("is-loading");

        // TODO: Replace with actual Formspree / Netlify Forms endpoint.
        setTimeout(() => {
          if (submitBtn) submitBtn.classList.remove("is-loading");
          const successState = form.parentElement.querySelector("[data-form-success]");
          if (successState) {
            form.hidden = true;
            successState.hidden = false;
          } else {
            window.showToast && window.showToast("success", "Submitted", "We received your request and will be in touch shortly.");
            form.reset();
          }
        }, 900);
      });
    });
  }

  /* ------------------------------------------------------------------
     Active nav-link highlighting based on current file name
     ------------------------------------------------------------------ */
  function initActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link[href]").forEach((link) => {
      const href = link.getAttribute("href").split("/").pop();
      if (href === path) link.setAttribute("aria-current", "page");
    });
  }

  /* ------------------------------------------------------------------
     Year stamp for footer copyright
     ------------------------------------------------------------------ */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initDirToggle();
    initMobileNav();
    initNavDropdownDismiss();
    initHeaderScroll();
    initDropdowns();
    initAccordions();
    initTabs();
    initModals();
    initCopyLinks();
    initPasswordToggles();
    initPasswordStrength();
    initFormValidation();
    initActiveNav();
    initYear();
  });
})();
