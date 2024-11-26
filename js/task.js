const date_title = document.querySelector(".date");
const welcome = document.querySelector(".welcome");
const task_input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");
const btn_history = document.querySelector(".history")
const check = "fa-check-circle";
const uncheck = "fa-circle";
const task_realized = "task_realized";

let task_list;
let id;


// Ir a la página de historial
btn_history.addEventListener("click", ()=>{
  window.location.href = "history.html"
})

// Agregar Fecha actualizada
const date_actual = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

date_title.textContent = date_actual.toLocaleDateString("es-VE", options);

const user = localStorage.getItem("user");

if (user) {
  welcome.textContent = `Hola ${user}, feliz ${date_actual.toLocaleDateString(
    "es-VE",
    {
      weekday: "long",
    }
  )}!!`;
} else {
  let new_user = prompt("Ingresar Nombre");
  welcome.textContent = `Hola ${new_user}, feliz ${date_actual.toLocaleDateString(
    "es-VE",
    {
      weekday: "long",
    }
  )}!!`;

  localStorage.setItem("user", new_user);
}

// Funcion para agregar la tarea del usuario

function taskAdd(id, task_content, task_complete, task_removed) {
  if (task_removed) {
    return;
  }

  const realized = task_complete ? check : uncheck;
  const task_realized = task_complete ? "task_realized" : "li";

  const task_html = `
        <li class="${task_realized}">
            <p>${task_content}</p>
            <div class="icons">
                <i class="fa-regular ${realized}" data="realized" id="${id}"></i>
                <i class="fa-solid fa-trash" data="removed" id="${id}"></i>
            </div>
        </li>
    `;

  list.insertAdjacentHTML("beforeend", task_html);
}

// Evento del click para el icono de agregar tarea

btn.addEventListener("click", () => {
  const task_content = task_input.value;

  const actual_date = date_actual.toLocaleDateString("es-VE", {
    month: "long",
    day: "numeric",
  });

  if (task_content && task_content.length > 3) {
    taskAdd(id, task_content, false, false);
    task_list.push({
      id: id,
      task_value: task_content,
      task_complete: false,
      task_removed: false,
      date: actual_date,
    });
  }
  localStorage.setItem("task_list", JSON.stringify(task_list));
  task_input.value = "";
  id++;
});

// Evento del teclado (enter) para el input de agregar tarea

task_input.addEventListener("keyup", (event) => {
  console.log(event);
  const task_content = task_input.value;

  const actual_date = date_actual.toLocaleDateString("es-VE", {
    month: "long",
    day: "numeric",
  });

  if (event.key == "Enter") {
    taskAdd(id, task_content, false, false);
    task_list.push({
      id: id,
      task_value: task_content,
      task_complete: false,
      task_removed: false,
      date: actual_date,
    });

    localStorage.setItem("task_list", JSON.stringify(task_list));
    task_input.value = "";
    id++;
  }
});

// completar Tarea
function taskRealized(element) {
  const li = element.parentNode.parentNode;

  element.classList.toggle(check);
  element.classList.toggle(uncheck);

  li.classList.toggle(task_realized);
  li.classList.toggle("li");

  task_list[element.id].task_complete = task_list[element.id].task_complete
    ? false
    : true;
}

// Eliminar tarea
function taskRemoved(element) {
  const li = element.parentNode.parentNode;

  task_list[element.id].task_removed = true;

  list.removeChild(li);
}

// evento para completar o eliminar tareas
list.addEventListener("click", (event) => {
  const element = event.target;
  const element_data = element.attributes.data.value;

  if (element_data == "realized") {
    taskRealized(element);
  } else if (element_data == "removed") {
    taskRemoved(element);
  }

  localStorage.setItem("task_list", JSON.stringify(task_list));
});

// Acceder a la data de las tareas en el localStorage
const data = localStorage.getItem("task_list");

if (data) {
  task_list = JSON.parse(data);
  id = task_list.length;
  loadTaskList(task_list);
} else {
  task_list = [];
  id = 0;
}

function loadTaskList(task_list) {
  task_list.forEach((tasks) => {
    taskAdd(
      tasks.id,
      tasks.task_value,
      tasks.task_complete,
      tasks.task_removed
    );
  });
}
