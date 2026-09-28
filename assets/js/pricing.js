/* ==========================================================================
   PRICING.JS — Interactive quote calculator + quantity price table
   Used on pages/bulk-pricing.html and pages/pricing.html
   All figures are illustrative estimates for template/demo purposes.
   ========================================================================== */

(function () {
  "use strict";

  const BASE_UNIT_PRICE = 0.42; // baseline: paper / matte / small size, per label

  const MATERIAL_MULTIPLIER = {
    paper: 1,
    vinyl: 1.25,
    waterproof: 1.45,
    transparent: 1.35,
  };

  const FINISH_MULTIPLIER = {
    matte: 1,
    gloss: 1.08,
    "soft-touch": 1.22,
  };

  const SIZE_MULTIPLIER = {
    small: 1,      // up to 2"
    medium: 1.15,  // 2"-4"
    large: 1.35,   // 4"-6"
    custom: 1.55,  // custom die-cut
  };

  // Quantity break points and the per-unit discount factor applied at/after them.
  const QTY_TIERS = [
    { qty: 100, factor: 1 },
    { qty: 500, factor: 0.82 },
    { qty: 1000, factor: 0.68 },
    { qty: 5000, factor: 0.52 },
    { qty: 10000, factor: 0.4 },
  ];

  function tierFactorForQuantity(qty) {
    let factor = QTY_TIERS[0].factor;
    for (const tier of QTY_TIERS) {
      if (qty >= tier.qty) factor = tier.factor;
    }
    return factor;
  }

  function formatCurrency(value) {
    return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculate({ material, finish, size, quantity }) {
    const mMult = MATERIAL_MULTIPLIER[material] ?? 1;
    const fMult = FINISH_MULTIPLIER[finish] ?? 1;
    const sMult = SIZE_MULTIPLIER[size] ?? 1;
    const tierFactor = tierFactorForQuantity(quantity);

    const unitPrice = BASE_UNIT_PRICE * mMult * fMult * sMult * tierFactor;
    const setupFee = quantity < 500 ? 25 : 0;
    const total = unitPrice * quantity + setupFee;

    return { unitPrice, total, setupFee, tierFactor };
  }

  function initCalculator() {
    const form = document.querySelector("[data-calculator]");
    if (!form) return;

    const productEl = form.querySelector("[name='product']");
    const materialEl = form.querySelector("[name='material']");
    const sizeEl = form.querySelector("[name='size']");
    const finishEl = form.querySelector("[name='finish']");
    const quantityEl = form.querySelector("[name='quantity']");

    const resultPrice = document.querySelector("[data-result-price]");
    const resultUnit = document.querySelector("[data-result-unit]");
    const rowUnit = document.querySelector("[data-row-unit]");
    const rowQty = document.querySelector("[data-row-qty]");
    const rowSetup = document.querySelector("[data-row-setup]");
    const rowSavings = document.querySelector("[data-row-savings]");

    function update() {
      const quantity = Math.max(50, parseInt(quantityEl.value, 10) || 100);
      const inputs = {
        material: materialEl.value,
        finish: finishEl.value,
        size: sizeEl.value,
        quantity,
      };
      const { unitPrice, total, setupFee, tierFactor } = calculate(inputs);
      const savingsPct = Math.round((1 - tierFactor) * 100);

      if (resultPrice) resultPrice.textContent = formatCurrency(total);
      if (resultUnit) resultUnit.textContent = formatCurrency(unitPrice) + " per label · " + quantity.toLocaleString("en-US") + " units";
      if (rowUnit) rowUnit.textContent = formatCurrency(unitPrice);
      if (rowQty) rowQty.textContent = quantity.toLocaleString("en-US");
      if (rowSetup) rowSetup.textContent = setupFee ? formatCurrency(setupFee) : "Waived";
      if (rowSavings) rowSavings.textContent = savingsPct > 0 ? savingsPct + "% off single-unit rate" : "—";
    }

    [productEl, materialEl, sizeEl, finishEl, quantityEl].forEach((el) => {
      if (el) el.addEventListener("input", update);
      if (el) el.addEventListener("change", update);
    });

    update();
  }

  /* Quantity price table — highlights the row closest to a "your quantity" input */
  function initQtyTableHighlight() {
    const input = document.querySelector("[data-qty-highlight-input]");
    const rows = document.querySelectorAll("[data-qty-row]");
    if (!input || !rows.length) return;

    function highlight() {
      const qty = parseInt(input.value, 10) || 0;
      let bestRow = null;
      let bestDiff = Infinity;
      rows.forEach((row) => {
        const rowQty = parseInt(row.getAttribute("data-qty-row"), 10);
        const diff = Math.abs(rowQty - qty);
        row.classList.remove("is-highlighted");
        if (diff < bestDiff) {
          bestDiff = diff;
          bestRow = row;
        }
      });
      if (bestRow) bestRow.classList.add("is-highlighted");
    }

    input.addEventListener("input", highlight);
    highlight();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCalculator();
    initQtyTableHighlight();
  });
})();
