let todoItemsContainer = document.getElementById("todoItemsContainer");

let saveTodoButton = document.getElementById("saveTodoButton");

// localStorage.removeItem("todoList");

/*
let todoList = [{
        text: "Learn HTML",
        uniqueNo: 1,
    },
    {
        text: "Learn CSS",
        uniqueNo: 2,
    },
    {
        text: "Learn JAVA",
        uniqueNo: 3,
    }

];
*/


let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

function ontodoFunctionChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    /*
    if (checkboxElement.checked === true) {
        labelElement.classList.add("checked"); 
        }*/
    labelElement.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }



    /*else {
        labelElement.classList.remove("checked");
    }*/

}


function onDeleteToDo(todoList) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false
        }
    });
    /*console.log(deleteElementIndex);*/
    todoList.splice(deleteElementIndex, 1);
}


function createandAppendTodo(todo) {

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-items-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");

    inputElement.onclick = function() {
        ontodoFunctionChange(checkboxId, labelId, todoId);
    }

    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);



    let labelElement = document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = todo.text;

    labelElement.id = labelId;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    labelContainer.appendChild(labelElement);



    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteContainer.appendChild(deleteIcon);
    deleteIcon.onclick = function() {
        onDeleteToDo(todoId);
    }

}


/*
createandAppendTodo(todoList[0]);
createandAppendTodo(todoList[1]);
createandAppendTodo(todoList[2]);
*/

for (let todo of todoList) {
    createandAppendTodo(todo);
}


let addToDoButton = document.getElementById("addToDoButton");

function onAddToDo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false,
    };

    todoList.push(newTodo);

    createandAppendTodo(newTodo);
    userInputElement.value = " ";
}


addToDoButton.onclick = function() {
    onAddToDo();
};

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};
