const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    startBtn.setAttribute('disabled', '');
    stopBtn.removeAttribute('disabled');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000)
})

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
