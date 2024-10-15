const inputForm = document.querySelector('.input-form'); 
const binBtn = document.querySelector('.bin-icon');

inputForm.addEventListener('submit', e => {
    e.preventDefault();

    let input = document.querySelector('#input-field');
    let newTask = input.value;
    validateTask(newTask);
    inputForm.reset();

    console.log(newTask);
})


function validateTask(task) {
    if (task === '') {
        return false;
    }
    else {
        const newTask = createTask(task);
        addTask(newTask);
        return true;
    }
}

function createTask(task) {
    const li = document.createElement('li');
    li.classList.add('list-item');

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
    parent.classList.toggle('completed');
}

function deleteTask(){
    const parent = this.parentElement;
    const grandparent = parent.parentElement;
    grandparent.removeChild(parent);
}

function addTask(newTask) {
    const toDoList = document.querySelector('.to-do-list');
    toDoList.appendChild(newTask);
}