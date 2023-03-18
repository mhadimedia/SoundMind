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

// Add animations to elements with the "animated" class
const animatedElements = document.querySelectorAll('.animated');
animatedElements.forEach(element => {
  element.style.opacity = 0;
  element.style.transform = 'translateY(-50%)';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__animated', 'animate__slideInUp');
    } else {
      entry.target.classList.remove('animate__animated', 'animate__slideInUp');
    }
  });
});

animatedElements.forEach(element => {
  observer.observe(element);
});

// Toggle dark mode based on system preferences
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
  document.body.classList.add('dark-mode');
}

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
}

const darkModeButton = document.querySelector('#dark-mode-toggle');
darkModeButton.addEventListener('click', toggleDarkMode);
