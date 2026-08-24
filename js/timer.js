const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimer");
const pauseTimerBtn = document.getElementById("pauseTimer");
const resetTimerBtn = document.getElementById("resetTimer");

let time = 25 * 60;
let timerInterval = null;
let sessionCompleted = false;

// Display timer
function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Start timer
function startTimer() {
    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {

        if (time > 0) {
            time--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;

            if (!sessionCompleted) {
                let sessions =
                    parseInt(localStorage.getItem("sessions")) || 0;

                sessions++;

                localStorage.setItem("sessions", sessions);

                sessionCompleted = true;

                updateDashboard();
            }

            alert("🎉 Study session completed!");
        }

    }, 1000);
}

// Pause timer
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    time = 25 * 60;
    sessionCompleted = false;

    updateTimerDisplay();
}

// Button events
startTimerBtn.addEventListener("click", startTimer);

pauseTimerBtn.addEventListener("click", pauseTimer);

resetTimerBtn.addEventListener("click", resetTimer);

// Initial display
updateTimerDisplay();
