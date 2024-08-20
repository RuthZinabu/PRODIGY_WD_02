// script.js

let startTime, updatedTime, difference;
let timerInterval;
let isRunning = false;

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTimer, 1000 / 60);
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    difference = 0;
    timeDisplay.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeDisplay.textContent =
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;
}

function recordLap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = timeDisplay.textContent;
    lapsList.appendChild(lapTime);
}

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
