let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1);
        running = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
}

function resetTimer() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.textContent = '00:00:00.000';
    lapsContainer.innerHTML = '';
    lapCounter = 1;
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        lapCounter++;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));
    display.textContent = 
        (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' +
        (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
        (seconds > 9 ? seconds : '0' + seconds) + '.' +
        (milliseconds > 99 ? milliseconds : milliseconds > 9 ? '0' + milliseconds : '00' + milliseconds);
}
