let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editIndex = -1;
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todo-list");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos(filteredTodos = null) {
  const todosToRender = filteredTodos || todos;
  todoList.innerHTML = "";

  todosToRender.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodoCompleted(index));

    const spanText = document.createElement("span");
    spanText.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => deleteTodo(index));

    li.appendChild(checkbox);
    li.appendChild(spanText);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });
}

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    const currentDate = new Date();

    if (editIndex === -1) {
      todos.push({
        text: todoText,
        completed: false,
        date: currentDate.toLocaleString(),
      });
    } else {
      todos[editIndex].text = todoText;
      todos[editIndex].date = currentDate.toLocaleString();
      editIndex = -1;
      document.getElementById("addBtn").style.display = "inline";
      document.getElementById("update-button").style.display = "none";
    }

    saveTodos();
    renderTodos();
    todoInput.value = "";
  }

  return false;
}

function toggleTodoCompleted(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function searchTodo() {
  const searchQuery = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery)
  );
  renderTodos(filteredTodos);
}

renderTodos();
function filterIncomplete() {
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  renderTodos(incompleteTodos);
}

function showAll() {
  renderTodos();
}
