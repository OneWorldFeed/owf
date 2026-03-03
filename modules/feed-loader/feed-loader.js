/* ============================================================
   FEED LOADER — PHASE 4.4.4
   Loads feed.json and appends cards into #feed inside the view.
   Only runs if #feed exists (i.e. home view is loaded).
   Does NOT wipe the view — appends after existing static cards.
   ============================================================ */

import { createFeedCard } from "/components/feed-card/feed-cards.js";

export async function loadInitialFeed() {
  // Target #feed inside the loaded view, not #owf-page itself
  const feedEl = document.querySelector("#feed");
  if (!feedEl) return; // not on home view, skip silently

  try {
    const res = await fetch("/data/feed.json");
    const cards = await res.json();

    // Append to existing static cards rather than replacing them
    cards.forEach(card => {
      const el = createFeedCard(card);
      feedEl.appendChild(el);
    });

  } catch (err) {
    console.error("Feed load error:", err);
  }
}
