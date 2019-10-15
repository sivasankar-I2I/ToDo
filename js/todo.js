

document.getElementById("open-side-bar").addEventListener("click", toggleNavbar);
/**
 * Method used to toggle the sidebar 
 */
function toggleNavbar() {
    if (document.getElementById("sidebar").style.width=="290px") {
        document.getElementById("sidebar").style.width="48px";
        document.getElementById("sidebar").style.width="48px";
    } else {
        document.getElementById("sidebar").style.width="290px";
    }
}

function myday() {
    if(document.getElementById("myday").style.fontSize="14px") {
        document.getElementById("myday").style.fontSize = '16px';
    } 
}
function important() {
    if(document.getElementById("important")){
        document.getElementById("important").style.fontSize = '16px';
        document.getElementById("important").style.color = '#0078d7';
    }
}

var LIST = [];
var id;
var listInfo;
var taskInfo;
var numberOfList = 0;

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
    let position = "beforeend";
    document.getElementById("list").insertAdjacentHTML(position, text, id);
}

/**
 * Method used to create the new list and push it in the array
 */
const input = document.getElementById("newlist");
input.addEventListener("keyup", function(){
    let subTaskList = document.getElementById("subtasklist");
    subTaskList.innerHTML = "";
    subTask = [];
    if(event.keyCode == 13) {
        let listObject = {
            name: input.value,
            status: true,
            id: ++numberOfList,
            subTask: subTask
        };
        if(listObject.name) {
            LIST.push(listObject);
            displayLists(listObject.name, listObject.id);
        }
        input.value = "";
        document.getElementById("listName").textContent = listObject.name+'...';
        listInfo = listObject;
    }
});

/**
 * Method used to get the list by using the listId
 */
function getId(listId) {
    for(let i=0; i<LIST.length; i++) {
        if(LIST[i].id == listId) {
            document.getElementById("listName").textContent = LIST[i].name+'...';
            getSublist(LIST[i].subTask);
            listInfo = LIST[i];      
        }
    }
}

/**
 * Method used to create the list of tasks for the specific list by using the taskId
 */
var tasks = document.getElementById("new-tasks");
let subId = 0;
tasks.addEventListener("keyup", function(event) {
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
        document.getElementById("taskName").textContent = tasks.value;
        taskInfo = newTask;
        toggleStep();
    }
});

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
    let position = "beforeend";
    let subTaskList = document.getElementById("subtasklist");
    subTaskList.insertAdjacentHTML(position, text);
}

/**
 * Method used to get the Task by using the taskId
 * @param {Get the value of Id} id 
 */
function getTaskId(id) {
    for(var index = 0; index<listInfo.subTask.length; index++) {
        if(id == listInfo.subTask[index].subTaskId) {
            taskInfo = listInfo.subTask[index];
            getStepsOfTask(taskInfo.stepList);
            document.getElementById("taskName").textContent = taskInfo.name;
        }
    }
}
/**
 * Method used to display the set of steps for the given list
 * @param {*} steps 
 */
function getStepsOfTask(steps) {
    document.getElementById("steps").textContent = "";
    for(let j=0; j<steps.length; j++) {
        displaySteps(steps[j].name, steps[j].id);
    }
}

/**
 * Method used to toggle the div for the specific tasks
 * @param {} subId 
 */
function toggleStep(){
    var x = document.getElementById("step-aside").style.width;
    if(x == "0px"){
        document.getElementById("step-aside").style.width ="360px";
    } else {
        document.getElementById("step-aside").style.width ="0px";  
    }
}

/**
 * Method used to get the steps by using the step Id
 * @param {*} id 
 */
function getSteps(id) {
    for(let l=0; l<listInfo.subtask.length; l++) {
        console.log(listInfo);
        if(listInfo.subTask[l].subTaskId == id) {
            document.getElementById("subtask").textContent = listInfo.subtask.name;
        }
    }
}

/**
 * Method used to get the list of Task for the given list
 * @param {} subTasks 
 */
function getSublist(subTasks) {
    let subTaskList = document.getElementById("subtasklist");
    subTaskList.innerHTML = "";
    for(let j=0; j<subTasks.length; j++) {
        displaySubTasks(subTasks[j].name, subTasks[j].subTaskId);
    }
}

/* Method used to create the steps for the particular task  */
let stepId = 0;
var stepInput = document.getElementById("newStep");
stepInput.addEventListener("keyup", function(){
    if(event.keyCode == 13) {
        let newStep = {
            name: stepInput.value,
            status: true,
            id: ++stepId
        };
        console.log(newStep);
        taskInfo.stepList.push(newStep);
        displaySteps(newStep.name, newStep.id);
        stepInput.value="";
    }
});

/**
 * Method used to display the list of steps for the specific task in the list
 * @param {*} stepName 
 * @param {*} id 
 */
function displaySteps(stepName, id) {
    let text = `<li>
                    <div id=${id}>
                    <p id=${id}>
                    ${stepName}</p>
                    </div>
                 </li>`
    let position = "beforeend";
    let subTaskList = document.getElementById("steps");
    subTaskList.insertAdjacentHTML(position, text);
}

