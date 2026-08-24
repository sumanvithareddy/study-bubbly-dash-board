// Display Current Date

const dateElement = document.getElementById("date");

const today = new Date();

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

dateElement.textContent = today.toLocaleDateString(
    "en-US",
    options
);


// Motivational Quotes

const quotes = [
    "Success is the sum of small efforts repeated every day.",
    "Believe you can and you're halfway there.",
    "The secret of getting ahead is getting started.",
    "Don't watch the clock; do what it does. Keep going.",
    "Dream big, work hard, stay focused.",
    "Small progress is still progress.",
    "Your future is created by what you do today."
];

const quoteElement = document.getElementById("quote");

const randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

quoteElement.textContent = `"${randomQuote}"`;


// Dark Mode

const themeToggle = document.getElementById("themeToggle");

// Check saved theme

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeToggle.textContent = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.textContent = "🌙 Dark Mode";
    }

});


// Update Dashboard Statistics

function updateDashboard() {

    const tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    const goals =
        JSON.parse(localStorage.getItem("goals")) || [];

    const sessions =
        parseInt(localStorage.getItem("sessions")) || 0;


    // Completed Tasks

    const completedTasks =
        tasks.filter(task => task.completed).length;

    document.getElementById("taskCount").textContent =
        completedTasks;


    // Completed Goals

    const completedGoals =
        goals.filter(goal => goal.completed).length;

    document.getElementById("goalCount").textContent =
        completedGoals;


    // Study Sessions

    document.getElementById("sessionCount").textContent =
        sessions;
}


// Run when page loads

updateDashboard();
