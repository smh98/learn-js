const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//toDos객체를 스트링으로 바꿔줌
}

let idNumbers = 1;// 삭제후 생성시 id가 같을때 같이삭제되는 버그수정을 위해만듦

function paintToDo(text){
    const li = document.createElement("li");//li라는 변수는 li요소를 만듦
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;//
    idNumbers += 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);//비어있는 배열인 toDos에 toDoObj를 넣어서 배열+객체 형식을만듦
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue); 
    toDoInput.value ="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);//객체로 묶어줌
        parsedToDos.forEach(function(toDo){//array에 있는 각각에 한번씩 함수를 실행시켜줌 ex){~,~,~}이면 3번
            paintToDo(toDo.text);
            console.log(toDo.text);
        });  
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);//제출(enter키 입력)시 발생하는 이벤트
}

init();