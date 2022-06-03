const root = document.querySelector("#root");
const BASE_URI = "https://doable-api.herokuapp.com/";
const tokenKey = "doable_token";
const token = sessionStorage.getItem(tokenKey);
let taskContent = ``;

const pathName = window.location.pathname;
let listTask = [];

if (!token) {
  window.history.pushState("", "", "/login.html");
  window.location.reload();
}

const getTask = async (url) => {
  const response = await fetch(url, {
    headers: { Authorization: `Token token=${token}` },
  });
  const data = await response.json();
  listTask.push(data);
  return listTask[0];
};

getTask(`${BASE_URI}/tasks`).then((res) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskDiv");
  root.append(taskDiv);
  console.log(listTask[0]);
  listTask[0].forEach((task) => {
    const taskContainer = document.createElement("div");
    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    taskContainer.classList.add("taskContainer");
    const taskInfo = document.createElement("div");
    const text = document.createElement("p");
    const date = document.createElement("p");
    date.append(task.due_date);
    text.append(task.title);
    taskInfo.classList.add("taskInfo");
    taskInfo.append(text, date);
    taskContainer.append(inputCheck, taskInfo);
    console.log(taskContainer);
    taskDiv.append(taskContainer);
  });
});

const newTask = `
  <div class="wrapper">
    <form class="newTask">
    <div class="menuField">
      <input type="text" placeholder="do the dishes..." class="" />
    </div>
    <div class="menuField">
      <input type="date"/>
    </div>
    <button type="submit">Buscar</button>
  </form>
  </div>
`;

if (pathName == "/") {
  const menuTemplate = `
  <form class="menuContainer">
  <div class="menuField">
  <label>Sort</label>
  <input type="text" class="sort" />
  </div>
  <div class="menuField">
  <label>Show</label>
  <input type="radio"  name="show" /> Only pending
  <input type="radio"  name="show"/> Only important
  </div>
  </form>
  ${taskContent}
  ${newTask}
  `;
  // console.log()
  // <button type="submit">Buscar</button>

  root.innerHTML = menuTemplate;
  const btnSort = document.querySelector(".sort");
  btnSort.addEventListener("input", (e) => {
    const letterSort = e.target.value;
    console.log({
      letterSort,
      listTask: listTask[0],
    });
    const newArr = listTask[0].filter((task) =>
      task.title.includes(letterSort)
    );

    const taskDiv2 = document.createElement("div");
    taskDiv2.classList.add("taskDiv");
    root.append(taskDiv2);
    newArr.forEach((task) => {
      const taskContainer = document.createElement("div");
      const inputCheck = document.createElement("input");
      inputCheck.type = "checkbox";
      taskContainer.classList.add("taskContainer");
      const taskInfo = document.createElement("div");
      const text = document.createElement("p");
      const date = document.createElement("p");
      date.append(task.due_date);
      text.append(task.title);
      taskInfo.classList.add("taskInfo");
      taskInfo.append(text, date);
      taskContainer.append(inputCheck, taskInfo);
      taskDiv2.append(taskContainer);
    });
    const divTask = document.querySelector(".taskDiv");
    divTask.remove();

    // listTask[0] = newArr;
  });
  // root.append(`<h1>jiji</h1>`);
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {});
}

const createTask = async (task) => {
  const response = await fetch(`${BASE_URI}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${token}`,
    },
    body: JSON.stringify(task),
  });
  console.log(response);

  if (response.status > 200 && response.status < 300) {
    window.location.reload();
  }
  const data = await response.json();
  return data;
};

const formTask = document.querySelector("form.newTask");
formTask.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleTask = document.querySelector(".newTask input[type='text']");
  const dateTask = document.querySelector(".newTask input[type='date']");
  const newTaskForm = {
    title: titleTask.value,
    due_date: dateTask.value,
  };
  console.log(newTaskForm);
  createTask(newTaskForm).then((res) => console.log(res));
});
