/* ============================================================
   OWF GLOBAL SIGNALS — LEFT PANEL
   Mounts time + online signals into .left-global-signals
   ============================================================ */

export function initGlobalSignals() {
  const mount = document.querySelector(".left-global-signals");
  if (!mount) return;

  mount.innerHTML = "";

  const title = document.createElement("div");
  title.className = "left-global-title";
  title.textContent = "Global Signals";
  mount.appendChild(title);

  function renderSignals() {
    const now = new Date();

    const signals = [
      {
        label: "UTC Time",
        value: now.toUTCString().split(" ")[4]
      },
      {
        label: "Your Local Time",
        value: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      },
      {
        label: "Active Feeds",
        value: "Live"
      }
    ];

    // Remove old items
    mount.querySelectorAll(".left-global-item").forEach(el => el.remove());

    signals.forEach(({ label, value }) => {
      const item = document.createElement("div");
      item.className = "left-global-item";
      item.textContent = `${label}: ${value}`;
      mount.appendChild(item);
    });
  }

  renderSignals();
  setInterval(renderSignals, 60000); // update every minute
}
