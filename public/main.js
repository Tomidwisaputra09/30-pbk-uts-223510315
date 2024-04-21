let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onchange = function () {
      toggleTaskDone(index);
    };

    const label = document.createElement("label");
    label.textContent = task.text;
    if (task.done) {
      label.classList.add("task-done");
    }

    const button = document.createElement("button");
    button.textContent = "Batalkan";
    button.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(button);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text: text, done: false });
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTaskDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function filterTasks() {
  const filteredTasks = tasks.filter((task) => !task.done);
  tasks = filteredTasks;
  renderTasks();
}

function filterAllTasks() {
  renderTasks();
}

function toggleTaskDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
  const labels = document.querySelectorAll("label");
  labels.forEach((label, idx) => {
    if (tasks[idx].done) {
      label.classList.add("label-done");
      label.style.textDecoration = "line-through";
    } else {
      label.classList.notremove("label-done");
      if (idx !== index) {
        // Jika indeks tidak sama dengan yang baru saja dicentang, maka coretan tetap dipertahankan
        label.style.textDecoration = "none";
      }
    }
  });
}
