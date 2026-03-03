static styles = css`
  :host {
    display: block;
    background: var(--owf-surface-card, #ffffff);
    border-radius: var(--owf-radius-card, 22px);
    padding: var(--owf-card-padding, 18px);
    box-shadow:
      var(--owf-shadow-card, 0 2px 12px rgba(0,0,0,0.06)),
      var(--owf-glow-neutral);
    transition:
      box-shadow 0.25s ease,
      transform 0.25s ease,
      filter 0.25s ease;
  }

  /* ============================
     Glow Variants
     ============================ */

  :host([variant="warm"]) {
    box-shadow:
      var(--owf-shadow-card),
      var(--owf-glow-warm);
  }

  :host([variant="neutral"]) {
    box-shadow:
      var(--owf-shadow-card),
      var(--owf-glow-neutral);
  }

  :host([variant="cool"]) {
    box-shadow:
      var(--owf-shadow-card),
      var(--owf-glow-cool);
  }

  /* ============================
     Hover / Focus
     ============================ */

  :host(:hover),
  :host(:focus-within) {
    transform: translateY(-1px);
    box-shadow:
      var(--owf-shadow-card),
      var(--owf-glow-intensity-150) rgba(0,0,0,0);
  }

  /* ============================
     Live / Active
     ============================ */

  :host([live]),
  :host([active]) {
    box-shadow:
      var(--owf-shadow-card),
      var(--owf-glow-intensity-200) rgba(0,0,0,0);
  }

  /* ============================
     Mood Modifiers
     ============================ */

  :host([mood="hopeful"]) {
    filter: brightness(var(--owf-glow-mood-hopeful));
  }

  :host([mood="reflective"]) {
    filter: brightness(var(--owf-glow-mood-reflective));
  }

  :host([mood="urgent"]) {
    animation: owf-urgent-pulse 2.4s ease-in-out infinite;
  }

  @keyframes owf-urgent-pulse {
    0% { filter: brightness(1); }
    50% { filter: brightness(var(--owf-glow-mood-urgent)); }
    100% { filter: brightness(1); }
  }

  /* ============================
     Time-of-Day Adaptation
     ============================ */

  :host([time="morning"]) {
    filter: brightness(var(--owf-glow-time-morning));
  }

  :host([time="afternoon"]) {
    filter: brightness(var(--owf-glow-time-afternoon));
  }

  :host([time="evening"]) {
    filter: brightness(var(--owf-glow-time-evening));
  }

  :host([time="night"]) {
    filter: brightness(var(--owf-glow-time-night));
  }
`;