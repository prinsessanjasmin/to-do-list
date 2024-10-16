const inputForm = document.querySelector('.input-form'); 
const binBtn = document.querySelector('.bin-icon');
const tasks = [];
let numberOfTasks = 0; 

document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (storedTasks) {
        storedTasks.forEach(task => {
            tasks.push(task); // Add the task back into the tasks array
            const newTaskElement = createTask(task.title, task); // Create DOM element
            addTask(newTaskElement); // Add it to the DOM
        });
    }

    numberOfTasks = tasks.length;
});


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
        const taskObject = addToArray(numberOfTasks, task);
        const newTask = createTask(task, taskObject);
        addTask(newTask);
        
        
        return true;
    }
}

function addToArray(number, task) {

    const taskId = generateReadableId();
    todo = {
        id: taskId,
        title: task,
        completed: false
    };

    
    tasks.push(todo); 
    storeTasks();
    return todo;
}

function createTask(task, taskObject) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.setAttribute('id', taskObject.id);
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    checkbox.checked = taskObject.completed;

    if (taskObject.completed) {
        li.classList.add('completed');
    }  
    else {
        li.classList.remove('completed');
    }

    checkbox.addEventListener('change', function () {
        changeStatus(checkbox, taskObject.id);
    });

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

function addTask(newTask) {
    const toDoList = document.querySelector('.to-do-list');
    toDoList.appendChild(newTask);
}

function changeStatus(checkbox, taskId) {
    const parent = checkbox.parentElement; 

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = checkbox.checked;
        if (checkbox.checked) {
            parent.classList.add('completed');
        }
        else {
            parent.classList.remove('completed');
        }
        
        storeTasks();
    }
    
}

function deleteTask(){
    const parent = this.parentElement;
    const grandparent = parent.parentElement;
    const taskId = parent.getAttribute('id');

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1); // Remove the task from the array 
        storeTasks();
    }

    grandparent.removeChild(parent);
}



function storeTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function generateReadableId() {
    //Entire function written by ChatGPT
    const now = new Date();

    const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Format: YYMMDD-HHMMSS
    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}