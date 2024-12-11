const todos = JSON.parse(localStorage.getItem("todos")) || [];

const main = document.querySelector("main");
const addBtn = document.querySelector("#add-btn");
const addTodoPage = document.querySelector("#add-todo-page");
const addTodoBtn = document.querySelector("#add-todo-btn");
const titleInput = document.querySelector("#title-inp");
const descriptionInput = document.querySelector("#placeholder-inp");

// show todos
const show = () => {
  todos.forEach((item) => {
    main.innerHTML += `
        <div class="task" data-status="${item.status}">
            <div>
              <div class="title">${item.title}</div>
              <div class="description">${item.description.slice(0, 10)}...</div>
            </div>
            <button class="task-btn"></button>
        </div>
        `;
  });
};

// add todo
const addTodo = () => {
  const result = {
    title: titleInput.value,
    description: descriptionInput.value,
    date: new Date().toLocaleDateString(),
    status: "pending",
    // done
  };
  todos.push(result);
  titleInput.value = "";
  descriptionInput.value = "";
  show();
};

// show add todo ppage
const showAddTodoPage = () => {
  addTodoPage.style.display = "flex";
  [...document.body.children].forEach((item) => {
    if (item != addTodoPage) {
      item.style.opacity = ".2";
    }
  });
};
// close add todo page
const hideAddTodoPage = (event) => {
  if (!addTodoPage.contains(event.target) && event.target !== addBtn) {
    addTodoPage.style.display = "none";
    [...document.body.children].forEach((item) => {
      if (item != addTodoPage) {
        item.style.opacity = "1";
      }
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", showAddTodoPage);
  document.addEventListener("click", hideAddTodoPage);
  addTodoBtn.addEventListener("click", addTodo);
});
