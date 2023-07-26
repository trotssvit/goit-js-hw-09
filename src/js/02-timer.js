import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.querySelector('#datetime-picker')
const btnElStart = document.querySelector('button[data-start]');
const btnElStop = document.querySelector('button[data-stop]');

const textAttributeSeconds = document.querySelector('[data-seconds]')
const textAttributeMinutes = document.querySelector('[data-minutes]')
const textAttributeHours = document.querySelector('[data-hours]')
const textAttributeDays = document.querySelector('[data-days]')

btnElStart.setAttribute('disabled', 'true');
let timerId = null;
let currentDate;
let selectDay;



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        const startTime = Date.now();
        selectDay = selectedDates[0]

        if (selectDay < startTime) {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        if (selectDay > startTime) {
            btnElStart.removeAttribute('disabled', 'true')
            Notiflix.Notify.success('Great, you choose a date in the future!');
        }

        currentDate = new Date(selectDay);
    },
};


btnElStop.addEventListener('click', () => {
    inputEl.removeAttribute('disabled');
    textAttributeSeconds.textContent = '00';
    textAttributeMinutes.textContent = '00';
    textAttributeHours.textContent = '00';
    textAttributeDays.textContent = '00';
    btnElStart.setAttribute('disabled', 'true')
    clearInterval(timerId)
});


btnElStart.addEventListener('click', onTimerStart);

function onTimerStart() {
    inputEl.setAttribute('disabled', 'true');
    btnElStart.setAttribute('disabled', 'true');
    timerId = setInterval(() => {
        const Currentstart = Date.now()
        const TIME = currentDate - Currentstart
        const getTime = convertMs(TIME)

        textAttributeSeconds.textContent = getTime.seconds;
        textAttributeMinutes.textContent = getTime.minutes;
        textAttributeHours.textContent = getTime.hours;
        textAttributeDays.textContent = getTime.days;

        if (TIME < 1000) {
            clearInterval(timerId)
        }

    }, 1000);

}

flatpickr(inputEl, options)

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
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

    return { days, hours, minutes, seconds };
}