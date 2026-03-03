/* ============================================================
   OWF APPLICATION ENTRY — PHASE 4.4.4
   Single controlled boot sequence.
   All module DOMContentLoaded self-starters have been removed
   from right-panel.js — app.js is the sole orchestrator.
   ============================================================ */

import { initGlobal }      from "/modules/global/global.js";
import { initLayout }      from "/modules/layout/layout.js";
import { initNav }         from "/modules/nav/nav.js";
import { handleRoute }     from "/modules/router/router.js";
import { renderRightPanel } from "/modules/right-panel/right-panel.js";
import { loadInitialFeed } from "/modules/feed-loader/feed-loader.js";
import { initLeftPanel }   from "/components/left-panel/left-panel.js";

/* ---------------------------------------------
   Boot sequence — strict order, single entry point
--------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {

  // 1. Global behaviours first (theme, a11y, dark mode)
  initGlobal();

  // 2. Layout signals ready
  initLayout();

  // 3. Nav active-state listeners
  initNav();

  // 4. Left panel (radio, glow, signals) — mounts into static HTML
  initLeftPanel();

  // 5. Router fetches the view and injects it into #owf-page
  //    awaiting ensures the DOM is populated before steps 6+
  await handleRoute();

  // 6. Now the view is in the DOM — safe to render dynamic panels
  renderRightPanel();
  loadInitialFeed();

});

/* ---------------------------------------------
   Re-render on route changes (nav clicks)
--------------------------------------------- */
window.addEventListener("hashchange", async () => {
  await handleRoute();
  renderRightPanel();
  loadInitialFeed();
});
