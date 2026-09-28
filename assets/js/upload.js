/* ==========================================================================
   UPLOAD.JS — Custom design request wizard (pages/custom-design.html)
   Handles the 8-step flow, drag & drop artwork upload with validation,
   simulated progress, and a final order summary.
   ========================================================================== */

(function () {
  "use strict";

  const ALLOWED_TYPES = [".pdf", ".png", ".jpg", ".jpeg", ".svg", ".ai", ".eps"];
  const MAX_SIZE_MB = 25;

  function initStepper() {
    const wizard = document.querySelector("[data-wizard]");
    if (!wizard) return;

    const steps = Array.from(wizard.querySelectorAll(".stepper .step"));
    const panels = Array.from(wizard.querySelectorAll(".form-panel"));
    const nextButtons = wizard.querySelectorAll("[data-step-next]");
    const prevButtons = wizard.querySelectorAll("[data-step-prev]");
    let current = 0;

    function requiredFieldsValid(panel) {
      const requiredFields = panel.querySelectorAll("[required]");
      let valid = true;
      requiredFields.forEach((field) => {
        if (field.type === "radio") {
          const group = panel.querySelectorAll("input[name='" + field.name + "']");
          if (!Array.from(group).some((r) => r.checked)) valid = false;
        } else if (field.type === "checkbox" && !field.checked) {
          valid = false;
        } else if (field.value.trim() === "") {
          valid = false;
        }
      });
      return valid;
    }

    function goTo(index) {
      if (index < 0 || index >= panels.length) return;

      if (index > current && !requiredFieldsValid(panels[current])) {
        window.showToast && window.showToast("error", "Almost there", "Please complete this step before continuing.");
        return;
      }

      panels[current].classList.remove("is-active");
      panels[index].classList.add("is-active");

      steps.forEach((step, i) => {
        step.classList.toggle("is-active", i === index);
        step.classList.toggle("is-done", i < index);
      });

      if (index === panels.length - 1) buildSummary();

      current = index;
      wizard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    nextButtons.forEach((btn) => btn.addEventListener("click", () => goTo(current + 1)));
    prevButtons.forEach((btn) => btn.addEventListener("click", () => goTo(current - 1)));

    steps.forEach((step, i) => {
      step.addEventListener("click", () => {
        if (i <= current) goTo(i);
      });
    });

    function buildSummary() {
      const summary = document.querySelector("[data-order-summary]");
      if (!summary) return;
      const fields = {
        product: wizard.querySelector("[name='product']:checked"),
        material: wizard.querySelector("[name='material']:checked"),
        finish: wizard.querySelector("[name='finish']:checked"),
        width: wizard.querySelector("[name='width']"),
        height: wizard.querySelector("[name='height']"),
        quantity: wizard.querySelector("[name='quantity']"),
      };
      const rows = summary.querySelectorAll("[data-summary-field]");
      rows.forEach((row) => {
        const key = row.getAttribute("data-summary-field");
        const valueEl = row.querySelector(".v");
        if (!valueEl) return;
        if (key === "dimensions") {
          const w = fields.width ? fields.width.value : "";
          const h = fields.height ? fields.height.value : "";
          valueEl.textContent = w && h ? w + '" x ' + h + '"' : "Not specified";
        } else if (key === "quantity") {
          valueEl.textContent = fields.quantity && fields.quantity.value ? fields.quantity.value : "Not specified";
        } else {
          const el = fields[key];
          valueEl.textContent = el ? el.closest("label")?.querySelector(".tname")?.textContent || el.value : "Not selected";
        }
      });
    }
  }

  function fileIconLabel(name) {
    const ext = name.split(".").pop().toUpperCase();
    return ext.length > 4 ? "FILE" : ext;
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function initDropzone() {
    const dropzone = document.querySelector("[data-dropzone]");
    const fileInput = document.querySelector("[data-dropzone-input]");
    const fileList = document.querySelector("[data-file-list]");
    const browseBtn = document.querySelector("[data-dropzone-browse]");
    if (!dropzone || !fileInput || !fileList) return;

    function validate(file) {
      const ext = "." + file.name.split(".").pop().toLowerCase();
      if (!ALLOWED_TYPES.includes(ext)) {
        window.showToast && window.showToast("error", "Unsupported file type", file.name + " must be PDF, PNG, JPG, SVG, AI or EPS.");
        return false;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        window.showToast && window.showToast("error", "File too large", "File size must be below " + MAX_SIZE_MB + " MB.");
        return false;
      }
      return true;
    }

    function addFile(file) {
      if (!validate(file)) return;

      const row = document.createElement("div");
      row.className = "file-row";
      row.innerHTML =
        '<span class="f-icon">' + fileIconLabel(file.name) + "</span>" +
        '<span class="f-info">' +
        '<span class="f-name">' + file.name + "</span>" +
        '<span class="f-meta">' + formatBytes(file.size) + " · Uploading…</span>" +
        '<span class="f-progress"><span style="width:0%"></span></span>' +
        "</span>" +
        '<button type="button" class="f-remove" aria-label="Remove ' + file.name + '">&times;</button>';

      fileList.appendChild(row);

      const bar = row.querySelector(".f-progress span");
      const meta = row.querySelector(".f-meta");
      let progress = 0;
      const timer = setInterval(() => {
        progress += Math.random() * 28 + 12;
        if (progress >= 100) {
          progress = 100;
          clearInterval(timer);
          meta.textContent = formatBytes(file.size) + " · Ready for review";
        }
        bar.style.width = progress + "%";
      }, 220);

      row.querySelector(".f-remove").addEventListener("click", () => {
        clearInterval(timer);
        row.remove();
      });
    }

    function handleFiles(files) {
      Array.from(files).forEach(addFile);
    }

    if (browseBtn) browseBtn.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("click", (e) => {
      if (e.target === dropzone || dropzone.contains(e.target)) {
        if (!e.target.closest("button")) fileInput.click();
      }
    });

    fileInput.addEventListener("change", () => handleFiles(fileInput.files));

    ["dragenter", "dragover"].forEach((evt) =>
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.add("is-dragover");
      })
    );
    ["dragleave", "drop"].forEach((evt) =>
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.remove("is-dragover");
      })
    );
    dropzone.addEventListener("drop", (e) => {
      if (e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initStepper();
    initDropzone();
  });
})();
