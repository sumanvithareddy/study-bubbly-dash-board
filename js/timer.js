// ================================
// STUDY BUDDY - FOCUS TIMER
// ================================

let time = 25 * 60;
let totalTime = 25 * 60;

let timerInterval = null;
let isPaused = false;


// --------------------------------
// TIMER DISPLAY
// --------------------------------

function updateTimerDisplay() {

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    document.getElementById("timerDisplay").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    updateProgressCircle();
}


// --------------------------------
// START TIMER
// --------------------------------

function startTimer() {

    // Prevent multiple timers
    if (timerInterval !== null) {
        return;
    }

    isPaused = false;

    const pauseBtn =
        document.getElementById("pauseBtn");

    pauseBtn.textContent = "⏸";


    timerInterval = setInterval(() => {

        if (time > 0) {

            time--;

            updateTimerDisplay();

        } else {

            completeSession();

        }

    }, 1000);
}


// --------------------------------
// PAUSE / RESUME TIMER
// --------------------------------

function pauseTimer() {

    const pauseBtn =
        document.getElementById("pauseBtn");

    if (!isPaused) {

        clearInterval(timerInterval);

        timerInterval = null;

        isPaused = true;

        pauseBtn.textContent = "▶";

    } else {

        isPaused = false;

        pauseBtn.textContent = "⏸";

        startTimer();

    }

}


// --------------------------------
// RESET / FINISH SESSION
// --------------------------------

function finishSession() {

    clearInterval(timerInterval);

    timerInterval = null;

    isPaused = false;

    // Calculate completed minutes
    const completedSeconds =
        totalTime - time;

    const completedMinutes =
        Math.max(
            1,
            Math.round(completedSeconds / 60)
        );

    saveSession(completedMinutes);

    showCompleteScreen();

}


// --------------------------------
// COMPLETE SESSION AUTOMATICALLY
// --------------------------------

function completeSession() {

    clearInterval(timerInterval);

    timerInterval = null;

    isPaused = false;

    const completedMinutes =
        selectedMinutes;

    saveSession(completedMinutes);

    showCompleteScreen();

}


// --------------------------------
// SAVE SESSION
// --------------------------------

function saveSession(minutes) {

    let totalMinutes =
        parseInt(
            localStorage.getItem(
                "studyBuddyMinutes"
            )
        ) || 0;

    let sessions =
        parseInt(
            localStorage.getItem(
                "studyBuddySessions"
            )
        ) || 0;


    totalMinutes += minutes;

    sessions++;


    localStorage.setItem(
        "studyBuddyMinutes",
        totalMinutes
    );

    localStorage.setItem(
        "studyBuddySessions",
        sessions
    );


    // Update dashboard

    document.getElementById(
        "totalMinutes"
    ).textContent =
        totalMinutes;

    document.getElementById(
        "sessionCount"
    ).textContent =
        sessions;

}


// --------------------------------
// SHOW COMPLETE SCREEN
// --------------------------------

function showCompleteScreen() {

    document.getElementById(
        "completedMinutes"
    ).textContent =
        selectedMinutes;


    document.getElementById(
        "completedActivity"
    ).textContent =
        selectedActivity;


    showScreen("completeScreen");

}


// --------------------------------
// CIRCULAR PROGRESS
// --------------------------------

function updateProgressCircle() {

    const progressCircle =
        document.getElementById(
            "progressCircle"
        );

    const circumference = 754;

    const progress =
        time / totalTime;

    const offset =
        circumference -
        (progress * circumference);

    progressCircle.style.strokeDashoffset =
        offset;

}


// --------------------------------
// INITIAL TIMER DISPLAY
// --------------------------------

updateTimerDisplay();
