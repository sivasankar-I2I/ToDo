
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
    addEventListeners(getElementById("open-side-bar"), "click", toggleNavbar);
    addEventListeners(newList, "keyup", createList);
    addEventListeners(tasks, "keyup", createTask);
    addEventListeners(steps, "keyup", createStep);
    addEventListeners(getElementById("listName"), "keyup", updateListName);
    addEventListeners(getElementById("taskName"), "keyup", updateTaskName);
    addEventListeners(getElementById("stepName"), "keyup", updateStepName);
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
    if (getElementById("sidebar").style.width=="290px") {
        getElementById("sidebar").style.width="48px";
    } else {
        getElementById("sidebar").style.width="290px";
    }
}

function myday() {
    if(getElementById("myday").style.fontSize="14px") {
        getElementById("myday").style.fontSize = '16px';
    } 
}
function important() {
    if(getElementById("important")){
        getElementById("important").style.fontSize = '16px';
        getElementById("important").style.color = '#0078d7';
    }
}

/**
 *  Method used to display the list Name in the sidebar
 * @param {*} list 
 * @param {*} id 
 */
function displayLists(list, id) {
    let text = `<li>
                    <p id=${id} onclick="getId(id)" class="list">
                    <i class="ms-Icon ms-Icon--BulletedList2 iconSize-24 listcolor" aria-hidden="true" ></i>
                    <span>${list}</span></p>
                  </li>`;
    var position = "beforeend";
    getElementById("list").insertAdjacentHTML(position, text);
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
            id: ++numberOfList,
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
            subTaskId: taskId,
            status: true,
            stepList: stepList
        };
        listInfo.subTask.push(newTask);
        displaySubTasks(newTask.name, taskId);
        tasks.value = "";
        taskName(newTask);
    }
};

function taskName (taskObject) {
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
            displaySubTasks(subTask[j].name, subTask[j].subTaskId);
        }
    }
}
/**
 * Method used to display the taskList for the given list
 * @param {get the value of taskName} subTaskName 
 * @param {get the value of task ID} id 
 */
function displaySubTasks(subTaskName, id) {
    let text = `<li>
                    <div id=${id} onclick = "toggleStep()">
                    <p id=${id} onclick="getTaskId(id)">
                    <input type="checkbox"/>
                    ${subTaskName}</p>
                    </div>
                 </li>`
    getElementById("subtasklist").insertAdjacentHTML("beforeend", text);
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
        displaySteps(steps[j].name, steps[j].id);
    }
}

/**
 * Method used to toggle the div for the specific tasks
 * @param {} subId 
 */
function toggleStep(){
    var x = getElementById("step-aside").style.width;
    if(x == "0px"){
        getElementById("step-aside").style.width ="360px";
    } else {
        getElementById("step-aside").style.width ="360px";  
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
        displaySubTasks(subTasks[j].name, subTasks[j].subTaskId);
    }
}

/* Method used to create the steps for the particular task  */
function createStep() {
    if(event.keyCode == 13) {
        let newStep = {
            name: steps.value,
            status: true,
            id: ++stepId
        };
        taskInfo.stepList.push(newStep);
        displaySteps(newStep.name, newStep.id);
        steps.value="";
    }
};

/**
 * Method used to display the list of steps for the specific task in the list
 * @param {*} stepName 
 * @param {*} id 
 */
function displaySteps(stepName, id) {
    let text = `<li>
                    <div id=${id} class="steps">
                    <span>
                    <input type="checkbox"/></span>
                    <span>
                    <input type="text" value=${stepName} id="stepName"></span>
                    </div>
                 </li>`
    getElementById("steps").insertAdjacentHTML("beforeend", text);
}

function updateStepName() {
    let updatedStepName = getElementById("stepName").value;
    if(event.keyCode === 13) {
       console.log(updateStepName);
    }
}

