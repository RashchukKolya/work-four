import flatpickr from "flatpickr";
import { Report } from 'notiflix/build/notiflix-report-aio';
import "flatpickr/dist/flatpickr.min.css";

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

let intervalID = null;
let currentDate = null;
let selectedDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates);
  },
};

function checkDate(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();
  if (selectedDate > currentDate) {
    startBtn.disabled = false;
  } else {
    Report.failure(
      '🥺 Ooops...',
      'Please, select a date in the future!!!',
      'Ok'
    )
  }
}

function startTimer() {
  intervalID = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate > 1000) {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      inputDate.disabled = true;
      currentDate += 1000;
      let remainingTime = Math.floor(selectedDate - currentDate);
      convertMs(remainingTime);
    } else {
      clearInterval(intervalID);
      inputDate.disabled = false;
      stopBtn.disabled = true;
      Report.info(
        '👏 Congratulation! Timer stopped!',
        'Please, if you want to start timer, choose a date and click on start or reload this page',
        'Okay'
      );
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalID);
  createMarkup({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  stopBtn.disabled = true;
  inputDate.disabled = false;
}

function addLeadingZero(value) {
  return `${value}`.padStart('2', '0');
}

function createMarkup({ days, hours, minutes, seconds }) {
  daysValue.textContent = days;
  hoursValue.textContent = hours;
  minutesValue.textContent = minutes;
  secondsValue.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  createMarkup({days, hours, minutes, seconds})
  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);