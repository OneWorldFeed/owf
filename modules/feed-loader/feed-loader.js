/* ============================================================
   FEED LOADER — PHASE 4.4.4
   Loads feed.json and renders cards into #feed
   ============================================================ */

import { createFeedCard } from "../../components/feed-card/feed-card.js";

export async function loadInitialFeed() {
  const feedEl = document.querySelector("#feed");
  if (!feedEl) {
    console.warn("No #feed element found on this view.");
    return;
  }

  try {
    const res = await fetch("./data/feed.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const cards = await res.json();

    feedEl.innerHTML = "";
    cards.forEach(card => {
      const el = createFeedCard(card);
      feedEl.appendChild(el);
    });
  } catch (err) {
    console.error("Feed load error:", err);
  }
}
