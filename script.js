const timerDisplay = document.querySelector("#timer");
const timerLabel = document.querySelector("#timer-label");
const timerButton = document.querySelector("#timer-button");
const analogClock = document.querySelector("#analog-clock");

let remainingSeconds = 60;
let intervalId;
let audioContext;

function playGong() {
  if (!audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.32;
  masterGain.connect(audioContext.destination);

  const partials = [
    { frequency: 110, amplitude: 0.38, decay: 4.5, type: "sine" },
    { frequency: 164, amplitude: 0.25, decay: 3.8, type: "sine" },
    { frequency: 220, amplitude: 0.17, decay: 3.1, type: "triangle" },
    { frequency: 294, amplitude: 0.11, decay: 2.5, type: "sine" },
    { frequency: 391, amplitude: 0.07, decay: 1.9, type: "sine" },
    { frequency: 523, amplitude: 0.035, decay: 1.4, type: "sine" },
  ];

  for (const partial of partials) {
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    oscillator.type = partial.type;
    oscillator.frequency.value = partial.frequency;
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.linearRampToValueAtTime(partial.amplitude, now + 0.02);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + partial.decay);
    oscillator.connect(envelope);
    envelope.connect(masterGain);
    oscillator.start(now);
    oscillator.stop(now + partial.decay);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function updateAnalogClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  analogClock.style.setProperty("--hour-angle", `${(hours + minutes / 60) * 30}deg`);
  analogClock.style.setProperty("--minute-angle", `${(minutes + seconds / 60) * 6}deg`);
  analogClock.style.setProperty("--second-angle", `${seconds * 6}deg`);
  analogClock.setAttribute(
    "aria-label",
    `Hora local: ${now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`,
  );
}

updateAnalogClock();
window.setInterval(updateAnalogClock, 1000);

timerButton.addEventListener("click", () => {
  if (intervalId) {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (AudioContextClass && !audioContext) {
    audioContext = new AudioContextClass();
  }
  if (audioContext?.state === "suspended") {
    void audioContext.resume();
  }

  timerButton.disabled = true;
  timerButton.innerHTML = '<span class="button-icon" aria-hidden="true">•</span>Respira despacio';
  timerLabel.textContent = "Este momento es tuyo";

  intervalId = window.setInterval(() => {
    remainingSeconds -= 1;
    timerDisplay.textContent = formatTime(remainingSeconds);
    timerDisplay.setAttribute("aria-label", `${remainingSeconds} segundos`);

    if (remainingSeconds === 0) {
      window.clearInterval(intervalId);
      intervalId = undefined;
      playGong();
      timerLabel.textContent = "Ya estás aquí";
      timerButton.disabled = false;
      timerButton.innerHTML = '<span class="button-icon" aria-hidden="true">↻</span>Repetir pausa';
      remainingSeconds = 60;
      timerDisplay.setAttribute("aria-label", "60 segundos");
    }
  }, 1000);
});