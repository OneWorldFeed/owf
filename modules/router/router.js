/* ============================================================
   OWF ROUTER — PHASE 4.4.4 (FINAL)
   Loads views into <section id="owf-page">
   ============================================================ */

const routes = {
  home: "./views/home.html",
  discover: "./views/discover.html",
  news: "./views/news.html",
  live: "./views/live.html",
  music: "./views/music.html",
  podcasts: "./views/podcasts.html",
  social: "./views/social.html",
  dm: "./views/dm.html",
  ai: "./views/ai.html",
  profile: "./views/profile.html",
  settings: "./views/settings.html",
  auth: "./views/auth.html"
};

async function loadView(route) {
  const mount = document.querySelector("#owf-page");
  if (!mount) {
    console.error("❌ #owf-page not found — cannot mount view.");
    return;
  }

  const file = routes[route] || routes.home;

  try {
    const response = await fetch(file);
    const html = await response.text();
    mount.innerHTML = html;

    // CRITICAL: triggers app.js hydration
    window.dispatchEvent(new CustomEvent("owf:view-loaded"));

  } catch (err) {
    console.error("Router error:", err);
    mount.innerHTML = `<p style="padding:20px;">Error loading view.</p>`;
  }
}

function getRoute() {
  const hash = location.hash.replace("#/", "").trim();
  return hash === "" ? "home" : hash;
}

async function handleRoute() {
  const route = getRoute();
  await loadView(route);
}

document.addEventListener("DOMContentLoaded", handleRoute);
window.addEventListener("hashchange", handleRoute);
