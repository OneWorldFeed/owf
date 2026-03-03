/* ============================================================
   OWF FEED CARDS — PHASE 4.4.4
   Card factory functions • Glow token integration
   Supports: hero, moment, text, image-text, news, music,
             weather, live, trending
   ============================================================ */

/* ------------------------------------------------------------
   HELPERS
   ------------------------------------------------------------ */

/**
 * Resolve current time-of-day attribute for glow adaptation.
 * Returns: "morning" | "afternoon" | "evening" | "night"
 */
function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

/**
 * Base card element factory.
 * Applies variant (warm/neutral/cool), mood, live/active,
 * and time-of-day attributes so the CSS glow tokens fire.
 *
 * @param {string}  type     - CSS class suffix, e.g. "hero", "news"
 * @param {object}  opts
 * @param {string}  [opts.glow]   - "warm" | "neutral" | "cool"
 * @param {string}  [opts.mood]   - "hopeful" | "reflective" | "urgent"
 * @param {boolean} [opts.live]
 * @param {boolean} [opts.active]
 * @returns {HTMLDivElement}
 */
function makeCard(type, { glow = "neutral", mood, live, active } = {}) {
  const el = document.createElement("div");
  el.classList.add("feed-card", `${type}-card`);

  // Glow variant → CSS :host([variant]) selector
  if (glow) el.dataset.variant = glow;

  // Mood modifier
  if (mood) el.dataset.mood = mood;

  // Live / active pulse
  if (live)   el.dataset.live   = "";
  if (active) el.dataset.active = "";

  // Time-of-day brightness adaptation
  el.dataset.time = getTimeOfDay();

  return el;
}

/* ------------------------------------------------------------
   HERO CARD
   Full-bleed image with title + subtitle overlay
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {string} opts.image
 * @param {string} [opts.title]
 * @param {string} [opts.subtitle]
 * @param {string} [opts.glow]
 * @param {string} [opts.mood]
 */
export function createHeroCard({ image, title, subtitle, glow = "warm", mood } = {}) {
  const card = makeCard("hero", { glow, mood });

  card.innerHTML = `
    <div class="hero-image-wrap">
      <img
        class="hero-image"
        src="${image || ""}"
        alt="${title || "Hero image"}"
        loading="lazy"
      />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        ${title    ? `<h1 class="hero-title">${title}</h1>`       : ""}
        ${subtitle ? `<p  class="hero-subtitle">${subtitle}</p>` : ""}
      </div>
    </div>
  `;

  return card;
}

/* ------------------------------------------------------------
   MOMENT CARD
   Image + caption — cinematic global moment
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {string} opts.image
 * @param {string} [opts.caption]
 * @param {string} [opts.glow]
 * @param {string} [opts.mood]
 */
export function createMomentCard({ image, caption, glow = "neutral", mood } = {}) {
  const card = makeCard("moment", { glow, mood });

  card.innerHTML = `
    <img
      class="moment-image"
      src="${image || ""}"
      alt="${caption || "Global moment"}"
      loading="lazy"
    />
    ${caption ? `<p class="moment-caption">${caption}</p>` : ""}
  `;

  return card;
}

/* ------------------------------------------------------------
   TEXT CARD
   Title + body copy — no image
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {string} [opts.title]
 * @param {string} opts.body
 * @param {string} [opts.author]
 * @param {string} [opts.time]
 * @param {string} [opts.glow]
 * @param {string} [opts.mood]
 */
export function createTextCard({ title, body, author, time, glow = "neutral", mood } = {}) {
  const card = makeCard("text", { glow, mood });

  card.innerHTML = `
    ${author || time ? `
      <div class="card-meta">
        ${author ? `<span class="card-author">${author}</span>` : ""}
        ${time   ? `<span class="card-time">${time}</span>`     : ""}
      </div>` : ""}
    ${title ? `<h2 class="card-title">${title}</h2>` : ""}
    ${body  ? `<p  class="card-body">${body}</p>`    : ""}
  `;

  return card;
}

/* ------------------------------------------------------------
   IMAGE + TEXT CARD
   Thumbnail image with text below
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {string} opts.image
 * @param {string} [opts.title]
 * @param {string} [opts.body]
 * @param {string} [opts.author]
 * @param {string} [opts.time]
 * @param {string} [opts.glow]
 * @param {string} [opts.mood]
 */
export function createImageTextCard({ image, title, body, author, time, glow = "cool", mood } = {}) {
  const card = makeCard("image-text", { glow, mood });

  card.innerHTML = `
    ${author || time ? `
      <div class="card-meta">
        ${author ? `<span class="card-author">${author}</span>` : ""}
        ${time   ? `<span class="card-time">${time}</span>`     : ""}
      </div>` : ""}
    ${title ? `<h2 class="card-title">${title}</h2>` : ""}
    <img
      class="card-image"
      src="${image || ""}"
      alt="${title || "Post image"}"
      loading="lazy"
    />
    ${body ? `<p class="card-body">${body}</p>` : ""}
  `;

  return card;
}

/* ------------------------------------------------------------
   NEWS CARD
   Headline + source line
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {string} opts.headline
 * @param {string} [opts.source]
 * @param {string} [opts.summary]
 * @param {string} [opts.glow]
 * @param {string} [opts.mood]
 */
export function createNewsCard({ headline, source, summary, glow = "neutral", mood } = {}) {
  const card = makeCard("news", { glow, mood });

  card.innerHTML = `
    ${source   ? `<p  class="news-source">${source}</p>`         : ""}
    ${headline ? `<h3 class="news-headline">${headline}</h3>`    : ""}
    ${summary  ? `<p  class="news-summary">${summary}</p>`       : ""}
  `;

  return card;
}

/* ------------------------------------------------------------
   MUSIC CARD
   Album art + track + artist
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {string} [opts.image]
 * @param {string} opts.track
 * @param {string} [opts.artist]
 * @param {string} [opts.author]
 * @param {string} [opts.time]
 * @param {string} [opts.glow]
 * @param {string} [opts.mood]
 */
export function createMusicCard({ image, track, artist, author, time, glow = "cool", mood } = {}) {
  const card = makeCard("music", { glow, mood });

  card.innerHTML = `
    ${image ? `<img class="music-art" src="${image}" alt="${track || "Album art"}" loading="lazy" />` : ""}
    <div class="music-info">
      ${author || time ? `
        <div class="card-meta">
          ${author ? `<span class="card-author">${author}</span>` : ""}
          ${time   ? `<span class="card-time">${time}</span>`     : ""}
        </div>` : ""}
      ${track  ? `<p class="track-title">${track}</p>`   : ""}
      ${artist ? `<p class="artist">${artist}</p>`       : ""}
    </div>
  `;

  return card;
}

/* ------------------------------------------------------------
   WEATHER CARD
   City + temperature
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {string} opts.city
 * @param {number} opts.temp
 * @param {string} [opts.glow]
 */
export function createWeatherCard({ city, temp, glow = "cool" } = {}) {
  const card = makeCard("weather", { glow });

  card.innerHTML = `
    <span class="city">${city || "—"}</span>
    <span class="temp">${temp != null ? `${temp}°` : "—"}</span>
  `;

  return card;
}

/* ------------------------------------------------------------
   LIVE CARD
   Red-accented live broadcast tile
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} [opts.description]
 * @param {string} [opts.glow]
 */
export function createLiveCard({ title, description, glow = "warm" } = {}) {
  const card = makeCard("live", { glow, live: true });

  card.innerHTML = `
    <p class="live-label">● LIVE</p>
    ${title       ? `<h3 class="live-title">${title}</h3>`              : ""}
    ${description ? `<p  class="live-desc">${description}</p>`          : ""}
  `;

  return card;
}

/* ------------------------------------------------------------
   TRENDING CARD
   List of trending tags
   ------------------------------------------------------------ */

/**
 * @param {object} opts
 * @param {Array<{tag:string, count:number}>} opts.items
 * @param {string} [opts.glow]
 */
export function createTrendingCard({ items = [], glow = "neutral" } = {}) {
  const card = makeCard("trending", { glow });

  const listItems = items
    .map(i => `<li class="trending-item">#${i.tag}</li>`)
    .join("");

  card.innerHTML = `
    <h3 class="trending-title">Trending</h3>
    <ul class="trending-list">${listItems}</ul>
  `;

  return card;
}

/* ------------------------------------------------------------
   UNIVERSAL FACTORY
   Used by feed-loader.js: createFeedCard(item)
   Dispatches to the correct factory based on item.type
   ------------------------------------------------------------ */

/**
 * @param {object} item  - Raw item from feed.json
 * @returns {HTMLElement}
 */
export function createFeedCard(item) {
  const glow = item.glow || "neutral";
  const mood = item.mood || undefined;

  switch (item.type) {
    case "hero":
      return createHeroCard({
        image:    item.hero || item.image,
        title:    item.title,
        subtitle: item.subtitle || item.text,
        glow,
        mood
      });

    case "moment":
      return createMomentCard({
        image:   item.image,
        caption: item.caption || item.text,
        glow,
        mood
      });

    case "text":
      return createTextCard({
        title:  item.title,
        body:   item.text,
        author: item.author,
        time:   item.time,
        glow,
        mood
      });

    case "image":
    case "mixed":
      return createImageTextCard({
        image:  item.image,
        title:  item.title,
        body:   item.text,
        author: item.author,
        time:   item.time,
        glow,
        mood
      });

    case "news":
      return createNewsCard({
        headline: item.newsTitle   || item.headline,
        source:   item.newsSource  || item.source || item.author,
        summary:  item.newsSummary || item.summary,
        glow,
        mood
      });

    case "music":
      return createMusicCard({
        image:  item.image,
        track:  item.track || item.text,
        artist: item.artist,
        author: item.author,
        time:   item.time,
        glow,
        mood
      });

    case "weather":
      return createWeatherCard({ city: item.city, temp: item.temp, glow });

    case "live":
      return createLiveCard({
        title:       item.title,
        description: item.description || item.text,
        glow
      });

    case "trending":
      return createTrendingCard({ items: item.items || [], glow });

    default:
      return createTextCard({ body: item.text || JSON.stringify(item), glow });
  }
}
