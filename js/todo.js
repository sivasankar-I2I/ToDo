

document.getElementById("open-side-bar").addEventListener("click", toggleNavbar);

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
var numberOfList = 0;

/**
 *  Method used to display the list Name 
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
 * Method used to create the new list 
 */
const input = document.getElementById("newlist");
input.addEventListener("keyup", function(){
    let subTaskList = document.getElementById("subtasklist");
    subTaskList.innerHTML = "";
    if(event.keyCode == 13) {
        let listObject = {
            name: input.value,
            status: true,
            id: ++numberOfList,
            subtask: []
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
 * Method used to get the list by click 
 */
function getId(listId) {
    for(let i=0; i<LIST.length; i++) {
        if(LIST[i].id == listId) {
            document.getElementById("listName").textContent = LIST[i].name+'...';
            getSublist(LIST[i].subtask);
            listInfo = LIST[i];        }
    }
}

const tasks = document.getElementById("tasks");
let subId = 0;
let task;
tasks.addEventListener("keyup", function(event) {
    if(event.keyCode === 13) {
        subtaskname = tasks.value;
        taskId = ++subId;
        let taskInfo = {
            name: subtaskname,
            subTaskId: taskId,
            status: true,
            steps: []
        };
        listInfo.subtask.push(taskInfo);
        addsubtasks(subtaskname, taskId);
        document.getElementById("subtask").textContent = tasks.value;
        tasks.value = "";
        task = listInfo.subtask;
    }
});

function addsubtasks(subTaskName, id) {
    let text = `<li id=${id} onclick="toggleStep(id)">
                    <div  class ="disp-inline">
                    <input type="checkbox" id=${id} onclick="taskDone(id)"/>
                    <p id=${id} name="status" onclick="stepChild(id)">${subTaskName}</p>
                    </div>
                 </li>`
    let position = "beforeend";
    let subTaskList = document.getElementById("subtasklist");
    subTaskList.insertAdjacentHTML(position, text);
}

function toggleStep(subId){
    var x = document.getElementById("step-aside").style.width;
    if(x == "0px"){
        document.getElementById("step-aside").style.width ="360px";
    } else {
        document.getElementById("step-aside").style.width ="360px";
        for(var j = 0;j<LIST.length;j++) {
            for(var i = 0;i < LIST[j].subTask.length;i++){
                if(LIST[j].subTask[i].subTaskId == subId){
                    document.getElementById("stepAside").value =  LIST[j].subTask[i].name;
                    document.getElementById("subtask-title-id").textContent = LIST[j].subTask[i].subTaskId;
                }
            }
        }
    }
}

function getSteps(id) {
    
    for(let l=0; l<listInfo.subtask.length; l++) {
        console.log(listInfo);
        if(listInfo.subTask[l].subTaskId == id) {
            document.getElementById("subtask").textContent = listInfo.subtask.name;
        }
    }
}

function getSublist(subtasks) {
    let subTaskList = document.getElementById("subtasklist");
    subTaskList.innerHTML = "";
    for(let j=0; j<subtasks.length; j++) {
        console.log(subtasks[j].name); 
        addsubtasks(subtasks[j].name);
    }
}

/* Method used to create the steps for the particular task  
let stepId = 0;
let step = document.getElementById("newSteps");
input.addEventListener("keyup", function(){
    if(event.keyCode == 13) {
        let newStep = {
            name: step.value,
            status: true,
            id: ++stepId
        };
        task.steps.push(newStep);
        step.innerHTML="Next Step";
    }
});*/


