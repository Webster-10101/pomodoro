const timerDisplay = document.getElementById('timer');
const phaseDisplay = document.getElementById('phase');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const completedDisplay = document.getElementById('completed');
const modeToggleButton = document.getElementById('modeToggle');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const REST_TIME = 5 * 60; // 5 minutes in seconds

let timeLeft = WORK_TIME;
let isRunning = false;
let isWorkMode = true;
let completedPomodoros = 0;
let timerInterval;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    const timeString = formatTime(timeLeft);
    timerDisplay.textContent = timeString;
    completedDisplay.textContent = `Completed Pomodoros: ${completedPomodoros}`;
    
    // Update the document title with the current timer and phase
    const phase = isWorkMode ? 'Work' : 'Rest';
    document.title = `${timeString} - ${phase} | Pomodoro Timer`;
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    stopTimer();
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    modeToggleButton.textContent = isWorkMode ? '😴' : '💻';
    phaseDisplay.textContent = isWorkMode ? 'Work Time' : 'Rest Time';
    updateDisplay();
}

function handlePhaseComplete() {
    if (isWorkMode) {
        completedPomodoros++;
    }
    toggleMode();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause';
        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                handlePhaseComplete();
            }
        }, 1000);
    } else {
        stopTimer();
    }
}

function stopTimer() {
    isRunning = false;
    startButton.textContent = 'Start';
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    timeLeft = WORK_TIME;
    completedPomodoros = 0;
    isWorkMode = true;
    phaseDisplay.textContent = 'Work Time';
    modeToggleButton.textContent = '😴';
    document.title = 'Pomodoro Timer'; // Reset the title
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);

// Initial display update
updateDisplay(); 