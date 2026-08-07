// ============================================================
// TOOLYARD — shared site behaviour (Bootstrap 5)
// ============================================================

(function () {
  "use strict";

  /* ---------- toast for tool pages not yet built (Bootstrap Toast) ---------- */
  var toastEl = document.getElementById("toast");
  var bsToast = toastEl && window.bootstrap ? new bootstrap.Toast(toastEl, { delay: 2600 }) : null;

  function showToast(msg) {
    if (!toastEl) return;
    var body = toastEl.querySelector("[data-toast-text]");
    if (body) body.textContent = msg;
    if (bsToast) bsToast.show();
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-unbuilt]");
    if (!link) return;
    e.preventDefault();
    showToast("This tool page hasn't been built yet — try Age Calculator or JSON Formatter.");
  });

  /* ---------- homepage: live search filter ---------- */
  var searchInputs = document.querySelectorAll("[data-tool-search]");
  var toolCards = document.querySelectorAll("[data-tool-card]");
  var noResults = document.getElementById("noResults");

  function filterTools(query) {
    if (!toolCards.length) return;
    var q = query.trim().toLowerCase();
    var visibleCount = 0;

    toolCards.forEach(function (card) {
      var name = (card.getAttribute("data-name") || "").toLowerCase();
      var cat = (card.getAttribute("data-category") || "").toLowerCase();
      var match = q === "" || name.indexOf(q) !== -1 || cat.indexOf(q) !== -1;
      var col = card.closest(".col") || card;
      col.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = q !== "" && visibleCount === 0 ? "block" : "none";
    }

    if (q !== "") {
      var latest = document.getElementById("latest");
      if (latest) latest.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  searchInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      searchInputs.forEach(function (other) {
        if (other !== input) other.value = input.value;
      });
      filterTools(input.value);
    });
  });

  var searchForm = document.getElementById("heroSearchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      filterTools(searchForm.querySelector("input").value);
    });
  }

  /* ---------- category chip -> filter by category ---------- */
  document.querySelectorAll("[data-filter-category]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var cat = el.getAttribute("data-filter-category");
      searchInputs.forEach(function (input) {
        input.value = cat;
      });
      filterTools(cat);
    });
  });

  /* ---------- header search focuses/redirects to homepage on tool pages ---------- */
  document.querySelectorAll("[data-search-redirect]").forEach(function (input) {
    input.addEventListener("focus", function () {
      window.location.href = "index.html";
    });
  });
})();
