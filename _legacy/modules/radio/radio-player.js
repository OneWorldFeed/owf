/* ============================================================
   OWF RADIO PLAYER — PHASE 4.4.4 (LEFT PANEL)
   Global station selector • Now Playing • Play/Pause
   ============================================================ */

const stations = [
  {
    id: "owf-global",
    name: "OWF Global Radio",
    stream: "https://stream.owf.global/stream"
  },
  {
    id: "owf-lofi",
    name: "OWF Lofi",
    stream: "https://stream.owf.global/lofi"
  }
];

let current = null;
let audio = null;

function createRadioUI() {
  const wrap = document.createElement("div");
  wrap.className = "radio-ui";

  wrap.innerHTML = `
    <div class="radio-header">Radio</div>

    <select class="radio-select">
      ${stations.map(s => `<option value="${s.id}">${s.name}</option>`).join("")}
    </select>

    <button class="radio-play">Play</button>
    <div class="radio-status">Stopped</div>
  `;

  return wrap;
}

export function renderRadioPlayer() {
  const mount = document.querySelector(".left-radio-player");
  if (!mount) return;

  mount.innerHTML = "";
  const ui = createRadioUI();
  mount.appendChild(ui);

  const select = ui.querySelector(".radio-select");
  const playBtn = ui.querySelector(".radio-play");
  const status = ui.querySelector(".radio-status");

  audio = new Audio();

  function loadStation(id) {
    const station = stations.find(s => s.id === id);
    if (!station) return;

    current = station;
    audio.src = station.stream;
    status.textContent = `Selected: ${station.name}`;
  }

  select.addEventListener("change", () => loadStation(select.value));

  playBtn.addEventListener("click", () => {
    if (!current) loadStation(select.value);

    if (audio.paused) {
      audio.play();
      playBtn.textContent = "Pause";
      status.textContent = `Playing: ${current.name}`;
    } else {
      audio.pause();
      playBtn.textContent = "Play";
      status.textContent = "Paused";
    }
  });

  loadStation(select.value);
}
