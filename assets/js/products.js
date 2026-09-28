/* ==========================================================================
   PRODUCTS.JS — Catalogue search, category/material/finish filters, sorting
   Used on pages/products.html
   ========================================================================== */

(function () {
  "use strict";

  function initProductCatalogue() {
    const grid = document.querySelector("[data-product-grid]");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".product-card"));
    const searchInput = document.querySelector("[data-product-search]");
    const categoryChips = document.querySelectorAll("[data-filter-category]");
    const materialChecks = document.querySelectorAll("[data-filter-material]");
    const finishChecks = document.querySelectorAll("[data-filter-finish]");
    const sortSelect = document.querySelector("[data-product-sort]");
    const emptyState = document.querySelector("[data-product-empty]");
    const resultCount = document.querySelector("[data-result-count]");
    const clearBtn = document.querySelector("[data-clear-filters]");

    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get("category") || "all";

    let state = { search: "", category: initialCategory, materials: [], finishes: [], sort: "featured" };

    categoryChips.forEach((chip) => {
      chip.setAttribute("aria-selected", chip.getAttribute("data-filter-category") === initialCategory ? "true" : "false");
    });

    function readCheckedValues(nodeList) {
      return Array.from(nodeList)
        .filter((el) => el.checked)
        .map((el) => el.value);
    }

    function matches(card) {
      const name = (card.getAttribute("data-name") || "").toLowerCase();
      const category = card.getAttribute("data-category") || "";
      const material = card.getAttribute("data-material") || "";
      const finish = card.getAttribute("data-finish") || "";

      if (state.search && !name.includes(state.search.toLowerCase())) return false;
      if (state.category !== "all" && category !== state.category) return false;
      if (state.materials.length && !state.materials.includes(material)) return false;
      if (state.finishes.length && !state.finishes.includes(finish)) return false;
      return true;
    }

    function sortCards(list) {
      const sorted = list.slice();
      if (state.sort === "price-asc") {
        sorted.sort((a, b) => parseFloat(a.getAttribute("data-price")) - parseFloat(b.getAttribute("data-price")));
      } else if (state.sort === "price-desc") {
        sorted.sort((a, b) => parseFloat(b.getAttribute("data-price")) - parseFloat(a.getAttribute("data-price")));
      } else if (state.sort === "name-asc") {
        sorted.sort((a, b) => (a.getAttribute("data-name") || "").localeCompare(b.getAttribute("data-name") || ""));
      }
      return sorted;
    }

    function render() {
      let visibleCount = 0;
      const visible = [];
      cards.forEach((card) => {
        if (matches(card)) {
          visible.push(card);
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      sortCards(visible).forEach((card) => {
        card.style.display = "";
        grid.appendChild(card);
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
      if (resultCount) resultCount.textContent = String(visibleCount);
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.search = searchInput.value;
        render();
      });
    }

    categoryChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        categoryChips.forEach((c) => c.setAttribute("aria-selected", "false"));
        chip.setAttribute("aria-selected", "true");
        state.category = chip.getAttribute("data-filter-category");
        render();
      });
    });

    materialChecks.forEach((el) =>
      el.addEventListener("change", () => {
        state.materials = readCheckedValues(materialChecks);
        render();
      })
    );

    finishChecks.forEach((el) =>
      el.addEventListener("change", () => {
        state.finishes = readCheckedValues(finishChecks);
        render();
      })
    );

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        render();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        state = { search: "", category: "all", materials: [], finishes: [], sort: "featured" };
        if (searchInput) searchInput.value = "";
        materialChecks.forEach((el) => (el.checked = false));
        finishChecks.forEach((el) => (el.checked = false));
        if (sortSelect) sortSelect.value = "featured";
        categoryChips.forEach((c) => c.setAttribute("aria-selected", c.getAttribute("data-filter-category") === "all" ? "true" : "false"));
        render();
      });
    }

    render();
  }

  document.addEventListener("DOMContentLoaded", initProductCatalogue);
})();
