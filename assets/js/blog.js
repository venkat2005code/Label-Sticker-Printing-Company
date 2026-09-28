/* ==========================================================================
   BLOG.JS — Article search, category filtering, and client-side pagination
   Used on pages/blog.html
   ========================================================================== */

(function () {
  "use strict";

  const PAGE_SIZE = 6;

  function initBlog() {
    const grid = document.querySelector("[data-blog-grid]");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".blog-card"));
    const searchInput = document.querySelector("[data-blog-search]");
    const categoryChips = document.querySelectorAll("[data-blog-category]");
    const emptyState = document.querySelector("[data-blog-empty]");
    const pagination = document.querySelector("[data-blog-pagination]");

    let state = { search: "", category: "all", page: 1 };

    function matches(card) {
      const title = (card.getAttribute("data-title") || "").toLowerCase();
      const category = card.getAttribute("data-category") || "";
      if (state.search && !title.includes(state.search.toLowerCase())) return false;
      if (state.category !== "all" && category !== state.category) return false;
      // The featured article already leads the page, so the grid skips its card in the unfiltered "All" view.
      if (state.category === "all" && !state.search && card.hasAttribute("data-featured")) return false;
      return true;
    }

    function renderPagination(totalPages) {
      if (!pagination) return;
      pagination.innerHTML = "";
      if (totalPages <= 1) return;

      const prev = document.createElement("button");
      prev.type = "button";
      prev.textContent = "‹";
      prev.setAttribute("aria-label", "Previous page");
      prev.disabled = state.page === 1;
      prev.addEventListener("click", () => {
        state.page--;
        render();
      });
      pagination.appendChild(prev);

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = String(i);
        if (i === state.page) btn.setAttribute("aria-current", "page");
        btn.addEventListener("click", () => {
          state.page = i;
          render();
        });
        pagination.appendChild(btn);
      }

      const next = document.createElement("button");
      next.type = "button";
      next.textContent = "›";
      next.setAttribute("aria-label", "Next page");
      next.disabled = state.page === totalPages;
      next.addEventListener("click", () => {
        state.page++;
        render();
      });
      pagination.appendChild(next);
    }

    function render() {
      const filtered = cards.filter(matches);
      const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
      state.page = Math.min(state.page, totalPages);
      const start = (state.page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      cards.forEach((card) => (card.style.display = "none"));
      filtered.slice(start, end).forEach((card) => (card.style.display = ""));

      if (emptyState) emptyState.hidden = filtered.length !== 0;
      renderPagination(totalPages);
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.search = searchInput.value;
        state.page = 1;
        render();
      });
    }

    categoryChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        categoryChips.forEach((c) => c.setAttribute("aria-selected", "false"));
        chip.setAttribute("aria-selected", "true");
        state.category = chip.getAttribute("data-blog-category");
        state.page = 1;
        render();
      });
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", initBlog);
})();
