/* ============================================================
   OWF ROUTER — PHASE 4.4.4 (FINAL)
   Loads views into <section id="owf-page">
   Triggers hydration for feed + right panel
   ============================================================ */

const routes = {
  home: "/views/home.html",
  discover: "/views/discover.html",
  news: "/views/news.html",
  live: "/views/live.html",
  music: "/views/music.html",
  podcasts: "/views/podcasts.html",
  social: "/views/social.html",
  dm: "/views/dm.html",
  ai: "/views/ai.html",
  profile: "/views/profile.html",
  settings: "/views/settings.html",
  auth: "/views/auth.html"
};

/* ---------------------------------------------
   Load an HTML view into #owf-page
--------------------------------------------- */
async function loadView(route) {
  const mount = document.querySelector("#owf-page");
  if (!mount) return;

  const file = routes[route] || routes.home;

  try {
    const response = await fetch(file);
    const html = await response.text();
    mount.innerHTML = html;

    // Hydration event (critical)
    window.dispatchEvent(new CustomEvent("owf:view-loaded"));

  } catch (err) {
    mount.innerHTML = `<p style="padding:20px;">Error loading view.</p>`;
    console.error("Router error:", err);
  }
}

/* ---------------------------------------------
   Determine current route
--------------------------------------------- */
function getRoute() {
  const hash = location.hash.replace("#/", "").trim();
  return hash === "" ? "home" : hash;
}

/* ---------------------------------------------
   Handle route changes
--------------------------------------------- */
async function handleRoute() {
  const route = getRoute();
  await loadView(route);
}

/* ---------------------------------------------
   Boot router
--------------------------------------------- */
document.addEventListener("DOMContentLoaded", handleRoute);
window.addEventListener("hashchange", handleRoute);
