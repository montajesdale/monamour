const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttons = document.querySelector(".buttons");
const schedule = document.getElementById("schedule");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const scheduleNote = document.getElementById("scheduleNote");
const mobileQuery = window.matchMedia("(max-width: 900px)");

let escapeCount = 0;

function moveNoButton() {
  if (mobileQuery.matches) {
    noBtn.style.position = "relative";
    noBtn.style.left = "0";
    noBtn.style.top = "0";
    noBtn.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 6 - 3}deg)`;
    noBtn.style.transition = "transform 0.16s ease";

    escapeCount += 1;

    if (escapeCount > 2) {
      noBtn.textContent = "Nope";
    }

    return;
  }

  const area = buttons.getBoundingClientRect();
  const button = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, area.width - button.width);
  const maxY = Math.max(0, area.height - button.height);

  const x = Math.min(maxX, Math.max(0, Math.random() * maxX));
  const y = Math.min(maxY, Math.max(0, Math.random() * maxY));

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) rotate(${Math.random() * 8 - 4}deg)`;
  noBtn.style.transition = "transform 0.16s ease, left 0.16s ease, top 0.16s ease";

  escapeCount += 1;

  if (escapeCount > 2) {
    noBtn.textContent = "Nope";
  }
}

function resetNoButton() {
  if (mobileQuery.matches) {
    noBtn.style.position = "relative";
    noBtn.style.left = "auto";
    noBtn.style.top = "auto";
    noBtn.style.transform = "none";
    noBtn.style.transition = "transform 0.2s ease";
    return;
  }

  const buttonsRect = buttons.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const gap = 18;
  const centeredX = yesRect.width + gap;
  const topOffset = (buttonsRect.height - noRect.height) / 2;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.max(centeredX, (buttonsRect.width - centeredX) / 2 + yesRect.width / 2 + gap)}px`;
  noBtn.style.top = `${topOffset}px`;
  noBtn.style.transform = "none";
  noBtn.style.transition = "transform 0.2s ease";
}

yesBtn.addEventListener("click", () => {
  yesBtn.textContent = "Yay! See you soon, Fullerine 💖";
  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.style.transform = "scale(1.06)";
  document.querySelector(".copy").textContent = "That's the answer Dale Angelo Montajes was hoping to hear in his own little handwritten note.";
  document.querySelector(".hint").textContent = "Date confirmed.";
  schedule.hidden = false;

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  dateInput.valueAsDate = nextWeek;
  timeInput.value = "19:00";
  scheduleNote.textContent = "Perfect, Fullerine. Pick a day and time, then Dale Angelo can plan the rest around it.";
});

["pointerenter", "pointerdown", "focus", "mouseenter"].forEach((eventName) => {
  noBtn.addEventListener(eventName, moveNoButton);
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

window.addEventListener("resize", resetNoButton);
window.addEventListener("load", resetNoButton);
mobileQuery.addEventListener("change", resetNoButton);
resetNoButton();
