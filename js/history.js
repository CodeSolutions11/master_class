const date_title = document.querySelector(".date");
const welcome = document.querySelector(".welcome");
const task_input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");
const btn_app = document.querySelector(".app")


let task_list;
let id;


// Ir a la página de historial
btn_app.addEventListener("click", ()=>{
  window.location.href = "task.html"
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
welcome.textContent = `Hola ${user}, feliz ${date_actual.toLocaleDateString(
  "es-VE",
  {
    weekday: "long",
  }
)}!!`;


// Funcion para agregar la tarea del usuario

function taskAdd(id, task_content, task_complete, date) {

    if(task_complete){

        const task_html = `
              <li class="task_realized">
                  <p>${task_content}. ${date}</p>
              </li>
          `;
      
        list.insertAdjacentHTML("beforeend", task_html);
    }

}



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
      tasks.date
    );
  });
}
