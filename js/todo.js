function openNav() {
    if (document.getElementById("titleDiv").style.width=="240px") {
        document.getElementById("titleDiv").style.width="0px";
    } else {
        document.getElementById("titleDiv").style.width="240px";
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
document.getElementById("open-side-bar").addEventListener("click", openNav);

let LIST = [];
let id;
var numberOfList = 0;
function addTodo(list, id) {
    const text = `<li>
                    <p id=${id} onclick="getId(id)">
                    <i class="icon fontIcon ms-Icon ms-Icon--BulletedList2 iconSize-24" aria-hidden="true"></i>
                    ${list} </p>
                  </li>`;
    const position = "beforeend";
    document.getElementById("list").insertAdjacentHTML(position, text, id);
}

const input = document.getElementById("newlist");
input.addEventListener("keyup", function(){
    if(event.keyCode == 13) {
        const todoList = input.value;
        id = ++numberOfList;
        status = true;
        if(todoList) {
            addTodo(todoList, id, status);
            LIST.push(
                {
                    name: todoList,
                    id: id,
                    status: status
                }
            );
        }
        input.value = "";
        document.getElementById("listName").textContent = todoList;
    }
});
const listName = document.getElementById("list");
listName.addEventListener("click", getId);

function getId(listId) {
    for(var i=0, iLen=LIST.length; i<iLen; i++) {
        if(LIST[i].id == listId) {
            document.getElementById("listName").textContent = LIST[i].name;
        }
    }
}

document.getElementById("listName").addEventListener("click", updateListName);

function updateListName() {

}

document.getElementById("updateListName").addEventListener("click", toggleEditor);

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
 }