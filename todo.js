let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")
let arrayOfTasks = []
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}
let completed = document.querySelector(".completed-task span")
let taskCount = document.querySelector(".task-count span")

getDataFromLocalStorage()
calculateTask()
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value)
        input.value = ""
    }
}
tasksDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains("del")) {
        deletTaskWithId(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains("task")) {
        toggleStatusWith(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed : false,
    }
    arrayOfTasks.push(task)
    calculateTask()
    addElementToPageFrom(arrayOfTasks)
    addDataToLocalStorageFrom(arrayOfTasks)
    
}
function addElementToPageFrom(arrayOfTask) {
    tasksDiv.innerHTML = ""
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div")
        div.className = "task"
        if (task.completed) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title))
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("delete"))
        div.appendChild(span)
        tasksDiv.appendChild(div)
    })
}
function addDataToLocalStorageFrom(arrayOfTask) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTask))
}

function getDataFromLocalStorage () {
    let data = localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        addElementToPageFrom(tasks)
    }
}
function deletTaskWithId(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks)
    calculateTask()
}
function toggleStatusWith (taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks)
}
function calculateTask() {
    taskCount.innerHTML =  document.querySelectorAll(".tasks .task").length
    completed.innerHTML =  document.querySelectorAll(".tasks .done").length
    
}