let tasks = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");
/*function fetchTodos() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      tasks = data.slice(0, 10);
      renderList();
    })
    .catch(function (error) {
      console.log("error", error);
    });
}*/
console.log("Working");
function addTaskToDom(task) {
  const li = document.createElement("li");
  li.innerHTML = ` <input type="checkbox" id="${task.id}" ${
    task.completed ? "checked" : ""
  } data-id="12" class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}" />`;
  tasksList.append(li);
}
function renderList() {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDom(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id === Number(taskId);
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.completed = !currentTask.completed;
    renderList();
    showNotification("Task Toggled Successfully!");
    return;
  }
  showNotification("Could Not Toggled The Task!");
}

function deleteTask(taskId) {
  const newtasks = tasks.filter(function (task) {
    return task.id != taskId;
  });
  tasks = newtasks;
  renderList();
  showNotification("Task Deleted!");
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task Added Succesfully!");
    return;
  }
  showNotification("Task cannot be Added!");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key == "Enter") {
    const text = e.target.value;
    console.log("text", text);
    if (!text) {
      showNotification("Task Text cannot be Empty!");
      return;
    }
    const task = {
      title: text,
      id: Date.now(),
      completed: false,
    };
    e.target.value = "";
    addTask(task);
  }
}

function handleclickPress(e) {
  const target = e.target;
  if (target.className == "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className == "custom-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}
function InitializeApp() {
  //fetchTodos();
  addTaskInput.addEventListener("keyup", handleInputKeyPress);
  document.addEventListener("click", handleclickPress);
}
InitializeApp();
