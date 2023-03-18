const sounds = document.querySelectorAll('.sound-button');
const sliders = document.querySelectorAll('.sound-slider');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const volumeSlider = document.getElementById('volume-slider');

let activeSounds = [];

function stopAllSounds() {
activeSounds.forEach(sound => sound.pause());
activeSounds = [];
}

function playSound(soundUrl, volume) {
const sound = new Audio(soundUrl);
sound.volume = volume / 100;
sound.play();
activeSounds.push(sound);
}

function updateVolume(volume) {
activeSounds.forEach(sound => sound.volume = volume / 100);
}

sounds.forEach((sound, index) => {
sound.addEventListener('click', () => {
const soundUrl = sound.getAttribute('data-sound');
const volume = sliders[index].value;
playSound(soundUrl, volume);
});
});

sliders.forEach((slider, index) => {
slider.addEventListener('input', () => {
const volume = slider.value;
updateVolume(volume);
});
});

playBtn.addEventListener('click', () => {
stopAllSounds();
sounds.forEach((sound, index) => {
if (sliders[index].value > 0) {
const soundUrl = sound.getAttribute('data-sound');
const volume = sliders[index].value;
playSound(soundUrl, volume);
}
});
});

stopBtn.addEventListener('click', stopAllSounds);

volumeSlider.addEventListener('input', () => {
const volume = volumeSlider.value;
updateVolume(volume);
});

window.addEventListener('beforeunload', stopAllSounds);

// Check if system prefers dark mode
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Toggle dark mode
function toggleDarkMode() {
  const body = document.querySelector('body');
  body.classList.toggle('dark-mode');
}

// Set initial mode based on system preference
if (prefersDark) {
  toggleDarkMode();
}

// Watch for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (event.matches) {
    toggleDarkMode();
  } else {
    toggleDarkMode();
  }
});
