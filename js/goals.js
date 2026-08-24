const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// Get goals from Local Storage
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// Save goals
function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
}

// Display goals
function renderGoals() {
    goalList.innerHTML = "";

    goals.forEach((goal, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${goal.completed ? "completed" : ""}">
                ${goal.text}
            </span>

            <div>
                <button onclick="toggleGoal(${index})">
                    ${goal.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="deleteGoal(${index})">
                    Delete
                </button>
            </div>
        `;

        goalList.appendChild(li);
    });

    updateProgress();
    updateDashboard();
}

// Add goal
function addGoal() {
    const goalText = goalInput.value.trim();

    if (goalText === "") {
        alert("Please enter a goal!");
        return;
    }

    goals.push({
        text: goalText,
        completed: false
    });

    saveGoals();
    renderGoals();

    goalInput.value = "";
}

// Complete or undo goal
function toggleGoal(index) {
    goals[index].completed = !goals[index].completed;

    saveGoals();
    renderGoals();
}

// Delete goal
function deleteGoal(index) {
    goals.splice(index, 1);

    saveGoals();
    renderGoals();
}

// Update progress bar
function updateProgress() {

    if (goals.length === 0) {
        progressBar.style.width = "0%";
        progressText.textContent = "0% Completed";
        return;
    }

    const completedGoals =
        goals.filter(goal => goal.completed).length;

    const percentage =
        Math.round((completedGoals / goals.length) * 100);

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        `${percentage}% Completed`;
}

// Button click
addGoalBtn.addEventListener("click", addGoal);

// Press Enter to add goal
goalInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addGoal();
    }
});

// Load goals
renderGoals();
