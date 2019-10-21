
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


/**
 * Method used to toggle the sidebar 
 */
function toggleNavbar() {
    $("#sidebar").toggleClass("sidebar toggle-width-open");
}

$("#listName").val("Tasks");
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
    listName(getListById(listId));
}

/**
 * Method used to return the list object in the particular id
 */
function getListById(id) {
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
    let p = $(document.createElement("p"));
    div.attr("class", "subtask-div");
    div.click(function(e){toggleStep()});
    let inputDiv = $(document.createElement("div"));
    inputDiv.attr("class", "task-checkbox");
    let image = $(document.createElement("img"));
    if(task.status) {
        image.attr("src", "images/circle-unchecked.svg");
        p.attr("class", "taskText-div");
    } else {
        image.attr("src", "images/circle-checked.svg");
        p.attr("class", "taskText-div-p");
    }
    image.attr("task", task);
    image.click(function(e){checkStatus(task)});
    inputDiv.append(image);
    div.append(inputDiv);
    let text = $(document.createElement("div"));
    text.attr("id", "taskNameList");
    p.attr("id", task.subTaskId);
    p.attr("name", "taskNameList");
    p.click(function(e){getTaskId(task.subTaskId)});
    p.text(task.name);
    text.append(p);
    div.append(text);
    let i = $(document.createElement("i"));
    i.attr("class" ,"ms-Icon ms-Icon--FavoriteStar iconSize-20");
    div.append(i);
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
    }
};

function taskName (taskObject) {
    if(taskObject.status) {
        $("#taskName").attr("class", "task-name");
        $("#taskNameCheckBox").attr("src" ,"images/circle-unchecked.svg");
    } else {
        $("#taskName").attr("class", "task-name t-n-l");
        $("#taskNameCheckBox").attr("src" ,"images/circle-checked.svg");
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
    let image = $(document.createElement("img"));
    if(step.status) {
        div.attr("class", "steps");
        image.attr("src", "images/circle.svg");
    } else {
        div.attr("class", "steps-line-through");
        image.attr("src", "images/step-checked.svg");
    }
    div.attr("id", step.id);
    let span = $(document.createElement("div"));
    span.attr("class", "p-t-10");
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
    let cancel = $(document.createElement("div"));
    cancel.attr("class", "p-t-14");
    let i = $(document.createElement("i"));
    i.attr("class", "icon fontIcon ms-Icon ms-Icon--Cancel iconSize-16");
    cancel.append(i);
    div.append(cancel);
    $("#steps").append(div);
}

/**
 * Method used to update the taskName
 */
function updateTaskName() {
    let updatedTaskName = $("#taskName").val();
    if(event.keyCode === 13) {
        taskInfo.name = updatedTaskName;
        $("#subtasklist").empty();
        displayTask(listInfo.subTask);
    }
}

/**
 * Method used to check the status 
 * @param {object} task 
 */
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

/**
 * To line-through  the taskName by using the 
 * @param {object} task 
 */
function strikeTaskName(task) {
    if($("#taskName").val() == task.name) {
        if(!taskInfo.status) {
            $("#taskName").addClass("t-n-l");
            $("#taskNameCheckBox").attr("src" ,"images/circle-checked.svg");
        }  else {
            $("#taskName").removeClass("t-n-l");
            $("#taskNameCheckBox").attr("src" ,"images/circle-unchecked.svg");
        }
    } else {
        if(!taskInfo.status) {
            $("#taskName").addClass("t-n-l");
            $("#taskNameCheckBox").attr("src" ,"images/circle-checked.svg");
        }  else {
            $("#taskName").removeClass("t-n-l");
            $("#taskNameCheckBox").attr("src" ,"images/circle-unchecked.svg");
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
    $("#step-aside").addClass("w-360");
    $("page").addClass("w-651");
}

function closeToggle() {
    $("#step-aside").removeClass("w-360");
    $("page").removeClass("w-651");
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
