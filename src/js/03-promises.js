import Notiflix from 'notiflix';
const form = document.querySelector('.form')
form.addEventListener('submit', test)

function test(e) {
    e.preventDefault();
    let delay = Number(e.target.elements.delay.value);
    let step = Number(e.target.elements.step.value);
    let amount = Number(e.target.elements.amount.value);

    for (let position = 1; position <= amount; position += 1) {
        createPromise(position, delay)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
                console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            }, delay)
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
                console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            }, delay);
        delay += step;
    };
    e.target.reset();
};


function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
            } else {
                reject({ position, delay })
            };
        }, delay);
    });
};