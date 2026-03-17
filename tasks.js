let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentUser = localStorage.getItem("currentUser");

window.onload = function () {
    renderTasks();
};

function addTask() {
    let textInput = document.getElementById("taskInput");
    let deadlineInput = document.getElementById("taskDeadline");
    let priorityInput = document.getElementById("taskPriority");

    let text = textInput.value.trim();
    let deadline = deadlineInput.value;
    let priority = priorityInput.value;

    if (text === "") return;

    tasks.push({
        text: text,
        status: "new",
        user: currentUser,
        deadline: deadline,
        priority: priority
    });

    textInput.value = "";
    deadlineInput.value = "";
    priorityInput.value = "low";

    saveTasks();
    renderTasks();
}

function renderTasks() {
    let container = document.getElementById("taskList");
    if (!container) return;

    container.innerHTML = "";

    tasks
        .filter(t => t.user === currentUser)
        .forEach((task, index) => {
            let card = document.createElement("div");
            card.className = "task-card";

            // Цвет по приоритету
            let color = task.priority === "high" ? "#ff6b6b" :
                        task.priority === "medium" ? "#ffa500" :
                        "#4caf50"; // low

            card.innerHTML = `
                <h3 style="color:${color}">${task.text}</h3>
                <p>Статус: ${task.status}</p>
                <p>Дедлайн: ${task.deadline || "нет"}</p>
                <p>Приоритет: ${task.priority}</p>
                <div class="card-buttons">
                    <button onclick="changeStatus(${index})">Статус</button>
                    <button onclick="editTask(${index})">Редактировать</button>
                    <button onclick="deleteTask(${index})">Удалить</button>
                </div>
            `;
            container.appendChild(card);
        });
}

function changeStatus(index) {
    let statuses = ["new", "in progress", "done"];
    let current = statuses.indexOf(tasks[index].status);
    tasks[index].status = statuses[(current + 1) % 3];
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    let task = tasks[index];
    let newText = prompt("Редактировать текст задачи:", task.text);
    if (newText !== null) task.text = newText;

    let newDeadline = prompt("Редактировать дедлайн (YYYY-MM-DD):", task.deadline || "");
    if (newDeadline !== null) task.deadline = newDeadline;

    let newPriority = prompt("Редактировать приоритет (low/medium/high):", task.priority);
    if (newPriority !== null) task.priority = newPriority;

    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function sortTasks(by) {
    if (by === "deadline") {
        tasks.sort((a, b) => (a.deadline || "") > (b.deadline || "") ? 1 : -1);
    } else if (by === "priority") {
        const order = { "high": 1, "medium": 2, "low": 3 };
        tasks.sort((a, b) => order[a.priority] - order[b.priority]);
    }
    renderTasks();
}