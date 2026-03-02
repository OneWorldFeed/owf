/* ============================================================
   OWF APPLICATION ENTRY — PHASE 4.4.4 (STABLE + UPDATED)
   Boots global modules, router, layout, feed, right panel
   ============================================================ */

/* ---------------------------------------------
   Global modules (always loaded)
--------------------------------------------- */
import "./modules/global/global.js";
import "./modules/router/router.js";
import "./modules/nav/nav.js";

/* ---------------------------------------------
   Layout engine
   (Now handles global tokens, mood bar, spacing,
    but does NOT inject left/right/feed containers)
--------------------------------------------- */
import "./modules/layout/layout.js";

/* ---------------------------------------------
   UI modules (hydrated only when containers exist)
--------------------------------------------- */
import { renderRightPanel } from "./modules/right-panel/right-panel.js";
import { loadInitialFeed } from "./modules/feed-loader/feed-loader.js";

/* ---------------------------------------------
   Boot sequence
   Triggered when router finishes loading a view
--------------------------------------------- */
window.addEventListener("owf:view-loaded", () => {

  /* ------------------------------
     FEED HYDRATION
     Only runs on pages with #feed
  ------------------------------ */
  const feed = document.querySelector("#feed");
  if (feed) {
    loadInitialFeed();
  }

  /* ------------------------------
     RIGHT PANEL HYDRATION
     Works with new static layout:
     <aside class="owf-right-panel">
  ------------------------------ */
  const rightPanel = document.querySelector(".owf-right-panel");
  if (rightPanel) {
    renderRightPanel();
  }
});
