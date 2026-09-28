/* ==========================================================================
   DASHBOARD.JS — Admin dashboard interactions (pages/admin-dashboard.html)
   Sidebar drawer, section switching, lightweight CSS-driven charts,
   order/user table search, and skeleton-loading simulation.
   ========================================================================== */

(function () {
  "use strict";

  function initSidebar() {
    const toggle = document.querySelector("[data-dash-sidebar-toggle]");
    const sidebar = document.querySelector(".dash-sidebar");
    const overlay = document.querySelector("[data-dash-overlay]");
    if (!toggle || !sidebar) return;

    function close() {
      sidebar.classList.remove("is-open");
      if (overlay) overlay.hidden = true;
    }
    function open() {
      sidebar.classList.add("is-open");
      if (overlay) overlay.hidden = false;
    }
    toggle.addEventListener("click", () => {
      sidebar.classList.contains("is-open") ? close() : open();
    });
    if (overlay) overlay.addEventListener("click", close);
  }

  /* Section switching for the single-page dashboard demo */
  function initSectionSwitch() {
    const navLinks = document.querySelectorAll("[data-dash-section-link]");
    const sections = document.querySelectorAll("[data-dash-section]");
    if (!navLinks.length || !sections.length) return;

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-dash-section-link");

        sections.forEach((sec) => {
          sec.hidden = sec.getAttribute("data-dash-section") !== target;
        });

        // Keep the sidebar's own active-state markers in sync (dropdown shortcuts
        // like "My Profile" can also jump to a section without owning the highlight)
        navLinks.forEach((l) => {
          if (l.closest(".dash-nav")) {
            l.classList.toggle("is-active", l.getAttribute("data-dash-section-link") === target);
          }
        });

        const sidebar = document.querySelector(".dash-sidebar");
        const overlay = document.querySelector("[data-dash-overlay]");
        if (sidebar && window.innerWidth <= 1024) {
          sidebar.classList.remove("is-open");
          if (overlay) overlay.hidden = true;
        }
      });
    });
  }

  /* Animate bar chart heights from data-value attributes (0-100 scale) */
  function initBarChart() {
    document.querySelectorAll("[data-bar-value]").forEach((bar) => {
      const value = parseFloat(bar.getAttribute("data-bar-value")) || 0;
      requestAnimationFrame(() => {
        bar.style.height = value + "%";
      });
    });
  }

  /* Build a donut chart via conic-gradient from data on the container */
  function initDonutChart() {
    document.querySelectorAll("[data-donut]").forEach((donut) => {
      const segments = donut.querySelectorAll("[data-donut-value]");
      let cursor = 0;
      const stops = [];
      segments.forEach((seg) => {
        const value = parseFloat(seg.getAttribute("data-donut-value")) || 0;
        const color = seg.getAttribute("data-donut-color") || "#ff4b3e";
        stops.push(color + " " + cursor + "% " + (cursor + value) + "%");
        cursor += value;
      });
      donut.style.background = "conic-gradient(" + stops.join(", ") + ")";
    });
  }

  /* Search/filter within dashboard tables: orders, users, quotes, messages */
  function initTableSearch() {
    document.querySelectorAll("[data-table-search]").forEach((input) => {
      const targetSelector = input.getAttribute("data-table-search");
      const table = document.querySelector(targetSelector);
      if (!table) return;
      const rows = table.querySelectorAll("tbody tr");

      input.addEventListener("input", () => {
        const term = input.value.toLowerCase();
        rows.forEach((row) => {
          row.style.display = row.textContent.toLowerCase().includes(term) ? "" : "none";
        });
      });
    });
  }

  /* Status filter chips above a table */
  function initStatusFilter() {
    document.querySelectorAll("[data-status-filter-group]").forEach((group) => {
      const targetSelector = group.getAttribute("data-status-filter-group");
      const table = document.querySelector(targetSelector);
      if (!table) return;
      const rows = table.querySelectorAll("tbody tr");
      const chips = group.querySelectorAll("button");

      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((c) => c.setAttribute("aria-selected", "false"));
          chip.setAttribute("aria-selected", "true");
          const status = chip.getAttribute("data-status");
          rows.forEach((row) => {
            row.style.display = status === "all" || row.getAttribute("data-status") === status ? "" : "none";
          });
        });
      });
    });
  }

  /* Simulated skeleton -> content loading state on first paint */
  function initSkeletonLoad() {
    const skeletons = document.querySelectorAll("[data-skeleton-wrap]");
    if (!skeletons.length) return;
    setTimeout(() => {
      skeletons.forEach((wrap) => {
        wrap.querySelectorAll(".skeleton").forEach((s) => (s.style.display = "none"));
        wrap.querySelectorAll("[data-skeleton-content]").forEach((c) => (c.hidden = false));
      });
    }, 700);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSidebar();
    initSectionSwitch();
    initBarChart();
    initDonutChart();
    initTableSearch();
    initStatusFilter();
    initSkeletonLoad();
  });
})();
