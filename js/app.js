// ==========================================
// STUDY BUDDY - MAIN APP
// ==========================================


// ------------------------------------------
// GLOBAL VARIABLES
// ------------------------------------------

let selectedActivity = "Study";
let selectedMinutes = 25;


// ------------------------------------------
// SCREEN NAVIGATION
// ------------------------------------------

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const selectedScreen =
        document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    updateNavigation(screenId);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateProgress();
}


// ------------------------------------------
// NAVIGATION ACTIVE STATE
// ------------------------------------------

function updateNavigation(screenId) {

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.classList.remove("active-nav");
    });

    navItems.forEach(item => {

        const onclickValue =
            item.getAttribute("onclick");

        if (!onclickValue) return;

        if (onclickValue.includes(screenId)) {
            item.classList.add("active-nav");
        }

    });

}


// ------------------------------------------
// ACTIVITY SELECTION
// ------------------------------------------

const activityButtons =
    document.querySelectorAll(".activity-btn");

activityButtons.forEach(button => {

    button.addEventListener("click", () => {

        activityButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedActivity =
            button.dataset.activity;

    });

});


// ------------------------------------------
// TIME SELECTION
// ------------------------------------------

const timeButtons =
    document.querySelectorAll(".time-btn");

timeButtons.forEach(button => {

    button.addEventListener("click", () => {

        timeButtons.forEach(btn => {
            btn.classList.remove("active-time");
        });

        button.classList.add("active-time");

        selectedMinutes =
            parseInt(button.dataset.time);

        document.getElementById(
            "selectedTime"
        ).textContent = selectedMinutes;

    });

});


// ------------------------------------------
// START FOCUS SESSION
// ------------------------------------------

function startFocusSession() {

    updateActivityDisplay();

    time =
        selectedMinutes * 60;

    totalTime =
        selectedMinutes * 60;

    updateTimerDisplay();

    updateProgressCircle();

    showScreen("focusScreen");

    startTimer();

}


// ------------------------------------------
// UPDATE ACTIVITY DISPLAY
// ------------------------------------------

function updateActivityDisplay() {

    const activityIcons = {

        Study: "📖",

        Assignment: "📝",

        Revision: "🧠"

    };

    const icon =
        activityIcons[selectedActivity] || "📖";


    const currentActivity =
        document.getElementById(
            "currentActivity"
        );

    if (currentActivity) {

        currentActivity.textContent =
            `${icon} ${selectedActivity} Session`;

    }


    const homeActivity =
        document.getElementById(
            "homeActivity"
        );

    if (homeActivity) {

        homeActivity.textContent =
            selectedActivity;

    }

}


// ------------------------------------------
// UPDATE ALL PROGRESS INFORMATION
// ------------------------------------------

function updateProgress() {

    const totalMinutes =
        parseInt(
            localStorage.getItem(
                "studyBuddyMinutes"
            )
        ) || 0;


    const sessions =
        parseInt(
            localStorage.getItem(
                "studyBuddySessions"
            )
        ) || 0;


    // Home

    const totalMinutesElement =
        document.getElementById(
            "totalMinutes"
        );

    if (totalMinutesElement) {

        totalMinutesElement.textContent =
            totalMinutes;

    }


    const sessionCountElement =
        document.getElementById(
            "sessionCount"
        );

    if (sessionCountElement) {

        sessionCountElement.textContent =
            sessions;

    }


    // Progress page

    const progressMinutes =
        document.getElementById(
            "progressMinutes"
        );

    if (progressMinutes) {

        progressMinutes.textContent =
            totalMinutes;

    }


    const progressSessions =
        document.getElementById(
            "progressSessions"
        );

    if (progressSessions) {

        progressSessions.textContent =
            sessions;

    }


    // Simple streak

    const progressStreak =
        document.getElementById(
            "progressStreak"
        );

    if (progressStreak) {

        progressStreak.textContent =
            sessions > 0 ? "🔥 1" : "0";

    }

}


// ------------------------------------------
// SAVE STUDY PROGRESS
// ------------------------------------------

function saveProgress(minutes) {

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


    updateProgress();

}


// ------------------------------------------
// DEFAULT FOCUS TIME
// ------------------------------------------

function changeDefaultTime() {

    const select =
        document.getElementById(
            "defaultTime"
        );

    if (!select) return;

    selectedMinutes =
        parseInt(select.value);


    localStorage.setItem(
        "defaultStudyTime",
        selectedMinutes
    );


    const selectedTime =
        document.getElementById(
            "selectedTime"
        );

    if (selectedTime) {

        selectedTime.textContent =
            selectedMinutes;

    }


    // Update time button selection

    const timeButtons =
        document.querySelectorAll(
            ".time-btn"
        );


    timeButtons.forEach(button => {

        button.classList.remove(
            "active-time"
        );


        if (
            parseInt(button.dataset.time) ===
            selectedMinutes
        ) {

            button.classList.add(
                "active-time"
            );

        }

    });

}


// ------------------------------------------
// LOAD DEFAULT TIME
// ------------------------------------------

function loadDefaultTime() {

    const savedTime =
        parseInt(
            localStorage.getItem(
                "defaultStudyTime"
            )
        );


    if (
        savedTime &&
        [15, 25, 45, 60].includes(savedTime)
    ) {

        selectedMinutes =
            savedTime;

    }


    const selectedTime =
        document.getElementById(
            "selectedTime"
        );


    if (selectedTime) {

        selectedTime.textContent =
            selectedMinutes;

    }


    const select =
        document.getElementById(
            "defaultTime"
        );


    if (select) {

        select.value =
            selectedMinutes;

    }


    const timeButtons =
        document.querySelectorAll(
            ".time-btn"
        );


    timeButtons.forEach(button => {

        button.classList.remove(
            "active-time"
        );


        if (
            parseInt(button.dataset.time) ===
            selectedMinutes
        ) {

            button.classList.add(
                "active-time"
            );

        }

    });

}


// ------------------------------------------
// DARK THEME TOGGLE
// ------------------------------------------

function toggleTheme() {

    const themeSwitch =
        document.getElementById(
            "themeSwitch"
        );


    document.body.classList.toggle(
        "light-mode"
    );


    const lightMode =
        document.body.classList.contains(
            "light-mode"
        );


    if (lightMode) {

        themeSwitch.classList.remove(
            "active-toggle"
        );

        localStorage.setItem(
            "studyBuddyTheme",
            "light"
        );

    } else {

        themeSwitch.classList.add(
            "active-toggle"
        );

        localStorage.setItem(
            "studyBuddyTheme",
            "dark"
        );

    }

}


// ------------------------------------------
// LOAD THEME
// ------------------------------------------

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "studyBuddyTheme"
        );


    const themeSwitch =
        document.getElementById(
            "themeSwitch"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );


        if (themeSwitch) {

            themeSwitch.classList.remove(
                "active-toggle"
            );

        }

    } else {

        document.body.classList.remove(
            "light-mode"
        );


        if (themeSwitch) {

            themeSwitch.classList.add(
                "active-toggle"
            );

        }

    }

}


// ------------------------------------------
// RESET PROGRESS
// ------------------------------------------

function resetProgress() {

    const confirmReset =
        confirm(
            "Are you sure you want to reset all your study progress?"
        );


    if (!confirmReset) {
        return;
    }


    localStorage.removeItem(
        "studyBuddyMinutes"
    );


    localStorage.removeItem(
        "studyBuddySessions"
    );


    updateProgress();


    alert(
        "Your study progress has been reset successfully! 💜"
    );

}


// ------------------------------------------
// INITIALIZE APP
// ------------------------------------------

function initializeApp() {

    loadTheme();

    loadDefaultTime();

    updateProgress();

    updateActivityDisplay();

}


// ------------------------------------------
// START APP
// ------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
