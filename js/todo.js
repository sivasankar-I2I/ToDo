

document.getElementById("open-side-bar").addEventListener("click", openNav);

function openNav() {
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
    const text = `<li>
                    <p id=${id} onclick="getId(id)">
                    <i class="ms-Icon ms-Icon--BulletedList2 iconSize-24 listcolor" aria-hidden="true" ></i>
                    ${list} </p>
                  </li>`;
    const position = "beforeend";
    document.getElementById("list").insertAdjacentHTML(position, text, id);
}

/**
 * Method used to create the new list 
 */
const input = document.getElementById("newlist");
input.addEventListener("keyup", function(){
    if(event.keyCode == 13) {
        var listObject = {
            name: "",
            status: "",
            id: "",
            subtask: []
        };
        listObject.name = input.value;
        listObject.id = ++numberOfList;
        listObject.status = true;
        if(listObject.name) {
            displayLists(listObject.name, listObject.id);
            LIST.push(listObject);
        }
        input.value = "";
        document.getElementById("listName").textContent = listObject.name;
        listInfo = listObject;
    }
});

/**
 * Method used to get the list by click 
 */
function getId(listId) {
    for(var i=0, iLen=LIST.length; i<iLen; i++) {
        if(LIST[i].id == listId) {
            document.getElementById("listName").textContent = LIST[i].name;
            getSublist(LIST[i].subtask);
            listInfo = LIST[i];        }
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


/*document.getElementById("updateListName").addEventListener("click", toggleEditor);

function toggleEditor() {
   var theText = document.getElementById('updateListName');
   var theEditor = document.getElementById('ta1');
   var editorArea = document.getElementById('editor');
   var subject = theText.innerHTML;
   theEditor.value = subject;
   theText.style.display = 'none';
   editorArea.style.display = 'inline';
}

function doEdit() {
    var theText = document.getElementById('updateListName');
    var theEditor = document.getElementById('ta1');
    var editorArea = document.getElementById('editor');
    var subject = theEditor.value;
    theText.innerHTML= subject;
    theText.style.display = 'inline';
    editorArea.style.display = 'none';
 }*/

 /**
  * Method to add subtasks
  */
 
const tasks = document.getElementById("tasks");
let subId = 0;
tasks.addEventListener("keyup", function(event) {
    if(event.keyCode === 13) {
        subtaskname = tasks.value;
        addsubtasks(subtaskname);
        listInfo.subtask.push({
            name: subtaskname,
            subTaskId: ++subId
        })
        tasks.value = "";
    }
});

function addsubtasks(subtaskname) {
    const text = `<li>
                    <p id=${id}>
                    ${subtaskname} </p>
                  </li>`;
    const position = "beforeend";
    let subTaskList = document.getElementById("subtasklist");
    subTaskList.insertAdjacentHTML(position, text);
}
