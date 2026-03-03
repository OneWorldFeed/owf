/* ============================================================
   OWF GLOBAL ENGINE — PHASE 4.4.4
   Handles global behaviours, accessibility modes, theme states.
   Self-starting DOMContentLoaded removed — app.js orchestrates.
   ============================================================ */

function applyReducedMotion() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.toggle("reduced-motion", prefersReduced);
}

function applyHighContrast() {
  const saved = localStorage.getItem("owf-high-contrast") === "true";
  document.documentElement.classList.toggle("high-contrast", saved);
}

export function toggleHighContrast() {
  const enabled = document.documentElement.classList.toggle("high-contrast");
  localStorage.setItem("owf-high-contrast", enabled);
}

function applyDarkMode() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", prefersDark);
}

export function initGlobal() {
  applyReducedMotion();
  applyHighContrast();
  applyDarkMode();

  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", applyReducedMotion);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyDarkMode);
}
