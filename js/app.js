const container = document.querySelector('.container');
const pointerContainer = document.querySelector('.pointer-container');
const text = document.querySelector('#text');
const button = document.querySelector('.button');

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

let startInterval, growTimeout, shrinkTimeout;
let appRunning = false;

button.addEventListener('click', () => {
    if (!appRunning) {
        appRunning = true;
        startApp();
    } else {
        appRunning = false;
        stopApp();
    }
});

function startApp() {
    startBreatheAnimation();
    startInterval = setInterval(startBreatheAnimation, totalTime);
}

function stopApp() {
    stopBreathAnimation();
    clearInterval(startInterval);
    clearTimeout(growTimeout);
    clearTimeout(shrinkTimeout);
}

function startBreatheAnimation() {
    // Start animation of the dot
    pointerContainer.style.animation = 'rotate 7.5s linear forwards infinite';
    // Change the button to pause the animation
    button.setAttribute('src', './assets/img/ic_pause_circle_outline_48px.svg');

    text.innerHTML = 'Breath In!';
    container.className = 'container grow';

    growTimeout = setTimeout(() => {
        text.innerHTML = 'Hold';

        shrinkTimeout = setTimeout(() => {
            text.innerHTML = 'Breathe Out!';
            container.className = 'container shrink';
        }, holdTime);

    }, breathTime);
}

function stopBreathAnimation() {
    container.className = 'container';
    pointerContainer.style.animation = 'none';
    text.innerHTML = '';
    button.setAttribute('src', './assets/img/ic_play_circle_outline_48px.svg');
}
