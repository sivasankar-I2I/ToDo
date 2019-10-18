
let LIST = [];
let listInfo;
let taskInfo;
let numberOfList = 0;
let subId = 0;
let newList = getElementById("newlist");
let tasks = getElementById("new-tasks");
let steps = getElementById("newStep");
let list = getElementById("list");
let stepId = 0;

init();

function init() {
    addEventListeners(newList, "keyup", createList);
    addEventListeners(tasks, "keyup", createTask);
    addEventListeners(steps, "keyup", createStep);
    addEventListeners(getElementById("listName"), "keyup", updateListName);
    addEventListeners(getElementById("taskName"), "keyup", updateTaskName);
    addEventListeners(getElementById("closetask"), "click", closeToggle);
}

function addEventListeners(element, action, method) {
    element.addEventListener(action, method);
}

function getElementById(id) {
    return document.getElementById(id);
}

/**
 * Method used to toggle the sidebar 
 */
function toggleNavbar() {
    if (getElementById("sidebar").className == "sidebar toggle-width") {
        getElementById("sidebar").className = "sidebar toggle-width-open"; 
    } else {
        getElementById("sidebar").className = "sidebar toggle-width";
    }
}

/**
 *  Method used to display the list Name in the sidebar
 * @param {*} list 
 * @param {*} id 
 */
function displayLists(list, id) {
    var div = document.createElement("div");
    div.className = "list";
    div.setAttribute("id", id);
    div.onclick = function(e){getId(id)};
    var i = document.createElement("i");
    i.setAttribute("class", "ms-Icon ms-Icon--BulletedList2 iconSize-24 listcolor");
    div.appendChild(i);
    var p = document.createElement("p");
    p.setAttribute("id", id);
    p.textContent = list;
    div.appendChild(p);
    getElementById("list").appendChild(div);
}
    
/**
 * Method used to create the new list and push it in the array
 */
function createList() {
    getElementById("subtasklist").innerHTML = "";
    subTask = [];
    if(event.keyCode == 13) {
        let listObject = {
            name: newList.value,
            status: true,
            id: "li" + ++numberOfList,
            subTask: subTask
        };
        if(listObject.name) {
            LIST.push(listObject);
            displayLists(listObject.name, listObject.id);
        }
        newList.value = "";
        listName(listObject);
    }
};

/**
 * Method used to update the list Name
 */
function updateListName() {
    let updatedListName = getElementById("listName").value;
    if(event.keyCode === 13) {
        listInfo.name = updatedListName;
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        for(var i=0; i<LIST.length; i++) {
            displayLists(LIST[i].name, LIST[i].id);
        }
    }
}

/**
 * Method used to get the list by using the listId
 */
function getId(listId) {
    for(let i=0; i<LIST.length; i++) {
        if(LIST[i].id == listId) {
            listName(LIST[i]);
        }
    }
}

function listName (listObject) {
    getElementById("listName").value = listObject.name;
    listInfo = listObject;
    getSublist(listObject.subTask);    
}

/**
 * Method used to create the list of tasks for the specific list by using the taskId
 */
function createTask() {
    if(event.keyCode === 13) {
        taskId = ++subId;
        stepList = [];
        let newTask = {
            name: tasks.value,
            subTaskId: "task" + taskId,
            status: true,
            stepList: stepList
        };
        listInfo.subTask.push(newTask);
        displaySubTasks(newTask);
        tasks.value = "";
        taskName(newTask);
    }
};

function taskName (taskObject) {
    if(taskObject.status) {
        getElementById("taskName").className = "task-name";
    } else {
        getElementById("taskName").className = "task-name t-n-l";
    }
    getElementById("taskName").value = taskObject.name;
    taskInfo = taskObject;
    getStepsOfTask(taskObject.stepList);
}

function updateTaskName() {
    let updatedTaskName = getElementById("taskName").value;
    if(event.keyCode === 13) {
        taskInfo.name = updatedTaskName;
        while (subtasklist.firstChild) {
            subtasklist.removeChild(subtasklist.firstChild);
        }
        for(let j=0; j<listInfo.subTask.length; j++) {
            displaySubTasks(subTask[j]);
        }
    }
}
/**
 * Method used to display the taskList for the given list
 * @param {get the value of taskName} subTaskName 
 * @param {get the value of task ID} id 
 */
function displaySubTasks(task) {
    let div = document.createElement("div");
    div.className = "subtask-div";
    div.setAttribute("onclick", `toggleStep()`);
    let inputDiv = document.createElement("div");
    inputDiv.className = "task-checkbox";
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("task", task);
    checkbox.onclick = function(e){checkStatus(task)};
    inputDiv.appendChild(checkbox);
    div.appendChild(inputDiv);
    let text = document.createElement("div");
    text.setAttribute("id", "taskNameList");
    let p = document.createElement("p");
    if(task.status) {
        p.className = "taskText-div";
    } else {
        p.className = "taskText-div-p";
    }
    p.setAttribute("id", task.subTaskId);
    p.setAttribute("name", "taskNameList");
    p.onclick = function(e){getTaskId(task.subTaskId)};
    p.textContent = task.name;
    text.appendChild(p);
    div.appendChild(text);
    getElementById("subtasklist").appendChild(div); 
}

function checkStatus(task) {
    console.log(task);
    if(!task.status) {
        task.status = true;
    } else {
        task.status = false;
    }
    while (subtasklist.firstChild) {
        subtasklist.removeChild(subtasklist.firstChild);
    }
    for(let i=0; i<listInfo.subTask.length; i++) {
        displaySubTasks(listInfo.subTask[i]);
    }
}

function strikeTaskName(task) {
    if(document.getElementById("taskName").value == task.name) {
        document.getElementById("taskName").className = "task-name t-n-l";
    } else {
        document.getElementById("taskName").className = "task-name";
    }
}

/**
 * Method used to get the Task by using the taskId
 * @param {Get the value of Id} id 
 */
function getTaskId(id) {
    for(var index = 0; index<listInfo.subTask.length; index++) {
        if(id == listInfo.subTask[index].subTaskId) {
            taskName(listInfo.subTask[index]);
        }
    }
}

/**
 * Method used to display the set of steps for the given list
 * @param {*} steps 
 */
function getStepsOfTask(steps) {
    getElementById("steps").textContent = "";
    for(let j=0; j<steps.length; j++) {
        displaySteps(steps[j]);
    }
}

/**
 * Method used to toggle the div for the specific tasks
 * @param {} subId 
 */
function toggleStep(){
    if(getElementById("step-aside").className == "finalDiv w-0") {
        getElementById("step-aside").className = "finalDiv w-360"
    } else {
        getElementById("step-aside").className = "finalDiv w-360"
    }
}

function closeToggle() {
    if(getElementById("step-aside").className == "finalDiv w-360") {
        getElementById("step-aside").className = "finalDiv w-0"
    } else {
        getElementById("step-aside").className = "finalDiv w-0"
    }
}

/**
 * Method used to get the steps by using the step Id
 * @param {*} id 
 */
function getSteps(id) {
    for(let l=0; l<listInfo.subtasks.length; l++) {
        if(listInfo.subTask[l].subTaskId == id) {
            getElementById("subtask").textContent = listInfo.subtask.name;
        }
    }
}

/**
 * Method used to get the list of Task for the given list
 * @param {} subTasks 
 */
function getSublist(subTasks) {
    let subTaskList = getElementById("subtasklist");
    subTaskList.innerHTML = "";
    for(let j=0; j<subTasks.length; j++) {
        displaySubTasks(subTasks[j]);
    }
}

/* Method used to create the steps for the particular task  */
function createStep() {
    if(event.keyCode == 13) {
        let newStep = {
            name: steps.value,
            status: true,
            id: ++stepId + "step"
        };
        taskInfo.stepList.push(newStep);
        displaySteps(newStep);
        steps.value="";
    }
};

/**
 * Method used to display the list of steps for the specific task in the list
 * @param {*} stepName 
 * @param {*} id 
 */
function displaySteps(step) {
    let div = document.createElement("div");
    if(step.status) {
        div.className = "steps";
    } else {
        div.className = "steps-line-through";
    }
    div.setAttribute("id", step.id);
    let span = document.createElement("span");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.onclick = function(e){strikeOutStep(step.id)};
    span.appendChild(input);
    div.appendChild(span);
    let text = document.createElement("input");
    text.setAttribute("type", "text");
    text.value = step.name;
    text.setAttribute("id", step.id);
    div.appendChild(text);
    let i = document.createElement("i");
    i.setAttribute("class", "icon fontIcon ms-Icon ms-Icon--Cancel iconSize-16");
    div.appendChild(i);
    getElementById("steps").appendChild(div);
}

function strikeOutStep(id) {
    let currentStep;
    for(let step of taskInfo.stepList) {
        if(id === step.id) {
            currentStep = step;
        }
    }
    if(currentStep.status) {
        currentStep.status = false;
    } else {
        currentStep.status = true;
    }
    strikeTask(currentStep.status, currentStep.id);
}

function strikeTask(status, id) {
    if(status) {
        document.getElementById(id).className = "steps";
    } else {
        document.getElementById(id).className = "steps-line-through";
    }
}
