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

let LIST = [];
let id;
var numberOfList = 0;
const input = document.getElementById("newlist");
const list = document.getElementById("list");
function addTodo(text, id){
    const task = `<li>
                    <p>${text} </p>
                  </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position,task);
}
input.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        id = ++numberOfList;
        if(toDo){
            addTodo(toDo, id);
            LIST.push(
                {
                name: toDo,
                id: id
                }
            );
        }
        input.value = "";
    }
});