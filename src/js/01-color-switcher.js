const btnElStart = document.querySelector('button[data-start]');
const btnElStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body')
btnElStart.classList.add('btn');
btnElStop.classList.add('btn')
let timerId = null;

btnElStart.addEventListener('click', onStartClick)
btnElStop.addEventListener('click', onStopClick)

function onStartClick() {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000)

    if (!btnElStart.disabled) {
        btnElStart.setAttribute('disabled', true)
        btnElStop.removeAttribute('disabled', false)
    }
};

function onStopClick() {
    clearInterval(timerId)

    if (!btnElStop.disabled) {
        btnElStop.setAttribute('disabled', true)
        btnElStart.removeAttribute('disabled', false)
    }
};



function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}