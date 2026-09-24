// ================================
// CHECK LOGIN
// ================================

const loggedIn = localStorage.getItem("taskflowLoggedIn");

if (loggedIn !== "true") {
  window.location.href = "login.html";
}

// ================================
// GET USER
// ================================

const savedUser = localStorage.getItem("taskflowCurrentUser");

if (!savedUser) {
  window.location.href = "login.html";
}

const currentUser = JSON.parse(savedUser);

// ================================
// DISPLAY USER
// ================================

document.getElementById("userName").textContent = currentUser.name;

document.getElementById("welcomeName").textContent = currentUser.name;

// ================================
// TASK DATA
// ================================

let tasks = JSON.parse(localStorage.getItem("taskflowTasks")) || [
  {
    id: 1,
    title: "Finish project documentation",
    description: "Complete the project documentation.",
    completed: true,
  },

  {
    id: 2,
    title: "Study JavaScript",
    description: "Review JavaScript functions and arrays.",
    completed: false,
  },

  {
    id: 3,
    title: "Create database tables",
    description: "Set up the TaskFlow database.",
    completed: false,
  },
];

// ================================
// SAVE TASKS
// ================================

function saveTasks() {
  localStorage.setItem("taskflowTasks", JSON.stringify(tasks));
}

// ================================
// DISPLAY TASKS
// ================================

function displayTasks() {
  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `
            <div class="empty-tasks">
                <h3>No tasks yet</h3>
                <p>Add your first task to get started.</p>
            </div>
        `;
  }

  tasks.forEach(function (task) {
    const taskElement = document.createElement("div");

    taskElement.className = "dashboard-task";

    if (task.completed) {
      taskElement.classList.add("task-done");
    }

    taskElement.innerHTML = `

            <div class="task-check">

                <button
                    onclick="toggleTask(${task.id})"
                    class="check-btn"
                >
                    ${task.completed ? "✓" : "○"}
                </button>

            </div>


            <div class="task-info">

                <h3>
                    ${task.title}
                </h3>

                <p>
                    ${task.description}
                </p>

            </div>


            <div class="task-actions">

                <button
                    onclick="deleteTask(${task.id})"
                    class="delete-btn"
                >
                    Delete
                </button>

            </div>

        `;

    taskList.appendChild(taskElement);
  });

  updateStatistics();
}

// ================================
// STATISTICS
// ================================

function updateStatistics() {
  const total = tasks.length;

  const completed = tasks.filter(function (task) {
    return task.completed;
  }).length;

  const pending = total - completed;

  document.getElementById("totalTasks").textContent = total;

  document.getElementById("completedTasks").textContent = completed;

  document.getElementById("pendingTasks").textContent = pending;
}

// ================================
// COMPLETE / UNCOMPLETE TASK
// ================================

function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed,
      };
    }

    return task;
  });

  saveTasks();

  displayTasks();
}

// ================================
// DELETE TASK
// ================================

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();

  displayTasks();
}

// ================================
// ADD TASK MODAL
// ================================

const modal = document.getElementById("taskModal");

const addTaskBtn = document.getElementById("addTaskBtn");

const cancelTaskBtn = document.getElementById("cancelTaskBtn");

addTaskBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

cancelTaskBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
});

// ================================
// ADD TASK
// ================================

const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("taskTitle").value.trim();

  const description = document.getElementById("taskDescription").value.trim();

  const newTask = {
    id: Date.now(),

    title: title,

    description: description || "No description.",

    completed: false,
  };

  tasks.push(newTask);

  saveTasks();

  displayTasks();

  taskForm.reset();

  modal.classList.add("hidden");
});

// ================================
// LOGOUT
// ================================

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("taskflowLoggedIn");

  localStorage.removeItem("taskflowCurrentUser");

  window.location.href = "login.html";
});

// ================================
// INITIAL LOAD
// ================================

displayTasks();
