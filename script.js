const inputForm = document.querySelector('.input-form'); 
const binBtn = document.querySelector('.bin-icon');
const tasks = [];
let numberOfTasks = 0; 

inputForm.addEventListener('submit', e => {
    e.preventDefault();

    let input = document.querySelector('#input-field');
    let newTask = input.value;
    validateTask(newTask);
    inputForm.reset();

    console.log(newTask);
    console.log(tasks);
})


function validateTask(task) {
    if (task === '') {
        return false;
    }
    else {
        numberOfTasks++;
        addToArray(numberOfTasks, task);
        const newTask = createTask(task);
        addTask(newTask);
        
        return true;
    }
}

function addToArray(number, task) {
    todo = {
        id: ('task'+number),
        title: task,
        completed: false
    };

    tasks.push(todo); 
    return todo.id;
}

function createTask(task) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.setAttribute('id', 'task'+numberOfTasks);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('change', changeStatus);

    const span = document.createElement('span');
    span.classList.add('list-text');
    span.textContent = task;

    const binBtn = document.createElement('span');
    binBtn.classList.add('bin-btn');
    binBtn.addEventListener('click', deleteTask);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(binBtn);

    return li;
}

function changeStatus() {
    const parent = this.parentElement; 
    const taskId = parent.getAttribute('id');
    parent.classList.toggle('completed');

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed; // Toggle the completed status
    }
}

function deleteTask(){
    const parent = this.parentElement;
    const grandparent = parent.parentElement;
    const taskId = parent.getAttribute('id');

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1); // Remove the task from the array
    }

    grandparent.removeChild(parent);
}

function addTask(newTask) {
    const toDoList = document.querySelector('.to-do-list');
    toDoList.appendChild(newTask);
}