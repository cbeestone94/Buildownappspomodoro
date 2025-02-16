let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const modeButton = document.getElementById('mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the document title
    document.title = `${timeString} - Pomodoro Timer`;
}

function toggleTimer() {
    if (timerId === null) {
        // Start the timer
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.add('active');
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                startPauseButton.textContent = 'Start';
                startPauseButton.classList.remove('active');
                alert('Pomodoro session completed!');
            }
        }, 1000);
    } else {
        // Pause the timer
        clearInterval(timerId);
        timerId = null;
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('active');
    }
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    modeButton.textContent = isWorkMode ? 'Rest' : 'Work';
    updateDisplay();
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
modeButton.addEventListener('click', toggleMode);

// Initialize display
updateDisplay();

// Add this line right after your modeButton declaration to set initial state
modeButton.classList.add('work-mode'); 