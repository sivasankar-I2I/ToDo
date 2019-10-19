
let LIST = [];
let listInfo;
let taskInfo;
let numberOfList = 0;
let subId = 0;
let newList = $("#newlist");
let tasks = $("#new-tasks");
let steps = $("#newStep");
let list = $("#list");
let stepId = 0;

init();

function init() {
    addEventListeners($("#newlist"), "keyup", createList);
    addEventListeners($("#new-tasks"), "keyup", createTask);
    addEventListeners($("#newStep"), "keyup", createStep);
    addEventListeners($("#listName"), "keyup", updateListName);
    addEventListeners($("#taskName"), "keyup", updateTaskName);
    addEventListeners($("#closetask"), "click", closeToggle);
}

function addEventListeners(element, action, method) {
    element.on(action, method);
}

function getElementById(id) {
    return document.getElementById(id);
}

/**
 * Method used to toggle the sidebar 
 */
function toggleNavbar() {
    $("#sidebar").toggleClass("sidebar toggle-width-open");
}

/**
 *  Method used to display the list Name in the sidebar
 * @param {*} list 
 * @param {*} id 
 */
function displayLists(list, id) {
    var div = $(document.createElement("div"));
    div.attr("class", "list");
    div.attr("id", id);
    div.click(function(e) {getId(id)});
    var i = $(document.createElement("i"));
    i.attr("class", "ms-Icon ms-Icon--BulletedList2 iconSize-24 listcolor");
    div.append(i);
    var p = $(document.createElement("p"));
    p.attr("id", id);
    p.text(list);
    div.append(p);
    $("#list").append(div);
}
    
/**
 * Method used to create the new list and push it in the array
 */
function createList() {
    $("#subtasklist").empty();
    subTask = [];
    if(event.keyCode == 13) {
        let listObject = {
            name: newList.val(),
            status: true,
            id: "li" + ++numberOfList,
            subTask: subTask
        };
        if(listObject.name) {
            LIST.push(listObject);
            displayLists(listObject.name, listObject.id);
        }
        newList.val("");
        listName(listObject);
    }
};

/**
 * Method used to update the list Name
 */
function updateListName() {
    let updatedListName = $("#listName").val();
    if(event.keyCode === 13) {
        listInfo.name = updatedListName;
        list.empty();
        for(var i=0; i<LIST.length; i++) {
            displayLists(LIST[i].name, LIST[i].id);
        }
    }
}

/**
 * Method used to get the list by using the listId
 */
function getId(listId) {
    listName(getSelectedList(listId));
}

/**
 * Method used to return the list object in the particular id
 */
function getSelectedList(id) {
    for(let i=0; i<LIST.length; i++) {
        if(LIST[i].id == id) {
            return LIST[i];
        }
    }
}

function listName (listObject) {
    $("#listName").val(listObject.name);
    listInfo = listObject;
    getSublist(listObject.subTask);    
}

/**
 * Method used to get the list of Task for the given list
 * @param {} subTasks 
 */
function getSublist(subTasks) {
    $("#subtasklist").empty("");
    displayTask(subTasks);
}

function displayTask(subTasks) {
    for(let j=0; j<subTasks.length; j++) {
        displaySubTasks(subTasks[j]);
    }
}
/**
 * Method used to display the taskList for the given list
 * @param {get the value of taskName} subTaskName 
 * @param {get the value of task ID} id 
 */
function displaySubTasks(task) {
    let div = $(document.createElement("div"));
    div.attr("class", "subtask-div");
    div.click(function(e){toggleStep()});
    let inputDiv = $(document.createElement("div"));
    inputDiv.attr("class", "task-checkbox");
    let checkbox = $(document.createElement("input"));
    checkbox.attr("type", "checkbox");
    checkbox.attr("task", task);
    checkbox.click(function(e){checkStatus(task)});
    inputDiv.append(checkbox);
    div.append(inputDiv);
    let text = $(document.createElement("div"));
    text.attr("id", "taskNameList");
    let p = $(document.createElement("p"));
    if(task.status) {
        p.attr("class", "taskText-div");
    } else {
        p.attr("class", "taskText-div-p");
    }
    p.attr("id", task.subTaskId);
    p.attr("name", "taskNameList");
    p.click(function(e){getTaskId(task.subTaskId)});
    p.text(task.name);
    text.append(p);
    div.append(text);
    $("#subtasklist").append(div); 
}

/**
 * Method used to create the list of tasks for the specific list by using the taskId
 */
function createTask() {
    if(event.keyCode === 13) {
        taskId = ++subId;
        stepList = [];
        let newTask = {
            name: tasks.val(),
            subTaskId: "task" + taskId,
            status: true,
            stepList: stepList
        };
        listInfo.subTask.push(newTask);
        displaySubTasks(newTask);
        tasks.val("");
        taskName(newTask);
    }
};

function taskName (taskObject) {
    if(taskObject.status) {
        $("#taskName").attr("class", "task-name");
    } else {
        $("#taskName").attr("class", "task-name t-n-l");
    }
    $("#taskName").val(taskObject.name);
    taskInfo = taskObject;
    getStepsOfTask(taskObject.stepList);
}

/**
 * Method used to display the set of steps for the given list
 * @param {*} steps 
 */
function getStepsOfTask(steps) {
    $("#steps").text("");
    for(let j=0; j<steps.length; j++) {
        displaySteps(steps[j]);
    }
}

/**
 * Method used to display the list of steps for the specific task in the list
 * @param {*} stepName 
 * @param {*} id 
 */
function displaySteps(step) {
    let div = $(document.createElement("div"));
    if(step.status) {
        div.attr("class", "steps");
    } else {
        div.attr("class", "steps-line-through");
    }
    div.attr("id", step.id);
    let span = $(document.createElement("span"));
    let image = $(document.createElement("img"));
    image.attr("src", "images/circle.svg");
    image.attr("id", step.id);
    image.attr("name", "step-check");
    image.click(function(e){strikeOutStep(step.id)});
    span.append(image);
    div.append(span);
    let text = $(document.createElement("input"));
    text.attr("type", "text");
    text.val(step.name);
    text.attr("id", step.id);
    div.append(text);
    let i = $(document.createElement("i"));
    i.attr("class", "icon fontIcon ms-Icon ms-Icon--Cancel iconSize-16");
    div.append(i);
    $("#steps").append(div);
}

function updateTaskName() {
    let updatedTaskName = $("#taskName").val();
    if(event.keyCode === 13) {
        taskInfo.name = updatedTaskName;
        $("#subtasklist").empty();
        displayTask(listInfo.subTask);
    }
}

function checkStatus(task) {
    if(!task.status) {
        task.status = true;
    } else {
        task.status = false;
    }
    $("#subtasklist").empty();
    displayTask(listInfo.subTask);
    strikeTaskName(task);
}

function strikeTaskName(task) {
    if($("#taskName").val() == task.name) {
        if(!taskInfo.status) {
            $("#taskName").attr("class", "task-name t-n-l");
        }  else {
            $("#taskName").attr("class", "task-name");
        }
    } else {
        if(!taskInfo.status) {
            $("#taskName").attr("class", "task-name t-n-l");
        }  else {
            $("#taskName").attr("class", "task-name");
        }
    }
}

/**
 * Method used to get the Task by using the taskId
 * @param {Get the value of Id} id 
 */
function getTaskId(id) {
    taskName(getTaskById(id));
}

function getTaskById(id) {
    for(var index = 0; index<listInfo.subTask.length; index++) {
        if(id == listInfo.subTask[index].subTaskId) {
            return listInfo.subTask[index];
        }
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


/* Method used to create the steps for the particular task  */
function createStep() {
    if(event.keyCode == 13) {
        let newStep = {
            name: steps.val(),
            status: true,
            id: "step" + ++stepId 
        };
        taskInfo.stepList.push(newStep);
        displaySteps(newStep);
        steps.val("");
    }
};

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
    $("#steps").empty();
    displayStep(taskInfo.stepList);
    strikeTask(currentStep.status, currentStep.id);
}
function displayStep(stepLists) {
    for(let step of stepLists) {
        displaySteps(step);
    }
}

function strikeTask(status, id) {
    if(status) {
        $(id).attr("class", "steps");
    } else {
        $(id).attr("class", "steps-line-through");
    }
}
