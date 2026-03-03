/* ============================================================
   OWF NAVIGATION ENGINE — ORIGINAL VERSION
   Uses <a href="#/route"> links
   ============================================================ */

function updateActiveNav() {
  const route = location.hash.replace("#/", "") || "home";

  document.querySelectorAll(".nav-item").forEach(link => {
    const href = link.getAttribute("href").replace("#/", "");
    link.classList.toggle("active", href === route);
  });
}

function handleNavClick(event) {
  const link = event.target.closest(".nav-item");
  if (!link) return;

  event.preventDefault();

  const route = link.getAttribute("href");
  location.hash = route;
}

window.addEventListener("hashchange", updateActiveNav);
window.addEventListener("owf:view-loaded", updateActiveNav);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-item").forEach(link => {
    link.addEventListener("click", handleNavClick);
  });

  updateActiveNav();
});
