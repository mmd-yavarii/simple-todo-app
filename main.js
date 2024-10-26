const taskInput = document.querySelector("#task-input");
const dateInput = document.querySelector("#date-input");
const addBtn = document.querySelector("#add-btn");
const alertMessage = document.querySelector("#alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllBtn = document.querySelector("#delete-all-btn");
const editBtn = document.querySelector("#edit-btn");
const filterBtns = document.querySelectorAll(".filter-todos");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// message
const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");

  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.appendChild(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 1000);
};

// save todos on local storage
const saveToLocalStorage = (data) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// filter
const filtersHandeler = (event) => {
  if (event.target.innerText != "All") {
    const status = event.target.innerText === "Compeleted" ? true : false;
    const filtered = todos.filter((i) => i.completed == status);
    displayTodos(filtered);
    return;
  }
  displayTodos();
};

// delete one todo
const deleteTodoHandeler = (id) => {
  todos = todos.filter((i) => i.id != id);
  saveToLocalStorage();
  displayTodos();
  showAlert("todo deleted successfuy", "success");
};

// set edits on todo
const applyEditHandeler = (event) => {
  const todo = todos.find((i) => i.id == event.target.dataset.id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  saveToLocalStorage();
  showAlert("item edited successfully", "success");
  displayTodos();
  addBtn.style.display = "inline-block";
  editBtn.style.display = "none";
};

// edit a todo
const editHandeler = (id) => {
  const theItem = todos.find((i) => i.id == id);
  taskInput.value = theItem.task;
  dateInput.value = theItem.date;
  addBtn.style.display = "none";
  editBtn.style.display = "inline-block";
  editBtn.dataset.id = id;
};

// do or undo a todo
const doOrUndoHandeler = (id) => {
  const theItem = todos.find((i) => i.id == id);
  theItem.completed = !theItem.completed;
  saveToLocalStorage();
  showAlert(`${theItem.completed ? "do" : "undo"} successfuly`, "success");
  displayTodos();
};

// show todo
const displayTodos = (refrence = todos) => {
  todosBody.innerHTML = "";
  if (!refrence.length) {
    todosBody.innerHTML = `<tr> <td colspan="4">no task founf</td> </tr>`;
    return;
  }
  refrence.forEach((item) => {
    todosBody.innerHTML += `  
    <tr>
      <td>${item.task}</td>
      <td>${item.date || "no date"}</td>
      <td>${item.completed ? "done" : "pending"}</td>
    <td>
      <button onclick="editHandeler(${item.id})">Edit</button>
      <button onclick="doOrUndoHandeler(${item.id})">${
      item.completed ? "pending" : "do"
    }</button>
      <button onclick="deleteTodoHandeler(${item.id})">Delete</button>
    </td>
  </tr>`;
  });
};

// delete all
const deleteAllHandeler = () => {
  if (todos) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("all todos cleared successfuly", "success");
  }
  showAlert("there is no todo to clear", "error");
};

// create id for each todo
const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

// get a task
const addHandeler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage(todo);
    taskInput.value = "";
    dateInput.value = "";
    showAlert("add successfilly", "success");
    displayTodos();
  } else {
    showAlert("please fill input task ...", "error");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", addHandeler);
  displayTodos();
  deleteAllBtn.addEventListener("click", deleteAllHandeler);
  editBtn.addEventListener("click", applyEditHandeler);
  filterBtns.forEach((i) => i.addEventListener("click", filtersHandeler));
});
