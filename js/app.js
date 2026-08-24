// ================================
// STUDY BUDDY APP
// Screen Navigation + App Controls
// ================================


// Current selected activity
let selectedActivity = "Study";

// Current selected study time
let selectedMinutes = 25;


// --------------------------------
// SHOW SCREEN
// --------------------------------

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    const selectedScreen =
        document.getElementById(screenId);

    selectedScreen.classList.add("active");

    window.scrollTo(0, 0);
}


// --------------------------------
// ACTIVITY SELECTION
// --------------------------------

const activityButtons =
    document.querySelectorAll(".activity-btn");

activityButtons.forEach((button) => {

    button.addEventListener("click", () => {

        activityButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedActivity =
            button.dataset.activity;

    });

});


// --------------------------------
// TIME SELECTION
// --------------------------------

const timeButtons =
    document.querySelectorAll(".time-btn");

const selectedTimeDisplay =
    document.getElementById("selectedTime");


timeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        timeButtons.forEach((btn) => {
            btn.classList.remove("active-time");
        });

        button.classList.add("active-time");

        selectedMinutes =
            parseInt(button.dataset.time);

        selectedTimeDisplay.textContent =
            selectedMinutes;

    });

});


// --------------------------------
// UPDATE ACTIVITY DISPLAY
// --------------------------------

function updateActivityDisplay() {

    const activityIcons = {

        Study: "📖",
        Assignment: "📝",
        Revision: "🧠"

    };

    const icon =
        activityIcons[selectedActivity];

    document.getElementById(
        "currentActivity"
    ).textContent =
        `${icon} ${selectedActivity} Session`;


    document.getElementById(
        "homeActivity"
    ).textContent =
        selectedActivity;

}


// --------------------------------
// START FOCUS SESSION
// --------------------------------

function startFocusSession() {

    updateActivityDisplay();

    // Set timer values
    time =
        selectedMinutes * 60;

    totalTime =
        selectedMinutes * 60;

    updateTimerDisplay();

    // Reset progress circle
    updateProgressCircle();

    // Open focus screen
    showScreen("focusScreen");

    // Start timer automatically
    startTimer();

}


// --------------------------------
// NAVIGATION ACTIVE STATE
// --------------------------------

const navItems =
    document.querySelectorAll(".nav-item");

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navItems.forEach((nav) => {
            nav.classList.remove("active-nav");
        });

        item.classList.add("active-nav");

    });

});


// --------------------------------
// LOAD SAVED PROGRESS
// --------------------------------

function loadProgress() {

    const savedMinutes =
        parseInt(
            localStorage.getItem(
                "studyBuddyMinutes"
            )
        ) || 0;


    const savedSessions =
        parseInt(
            localStorage.getItem(
                "studyBuddySessions"
            )
        ) || 0;


    document.getElementById(
        "totalMinutes"
    ).textContent =
        savedMinutes;


    document.getElementById(
        "sessionCount"
    ).textContent =
        savedSessions;

}


// Load dashboard data
loadProgress();
