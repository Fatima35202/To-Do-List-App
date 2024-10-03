// Get references to DOM elements
const addbutton = document.getElementById('addtask');
const taskinput = document.getElementById('taskinput');
const tasklist = document.getElementById('tasklist');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks or initialize to empty
    tasks.forEach(task => createtaskelement(task)); // Create task elements
}

// Function to add a task
function addtask() {
    const task = taskinput.value.trim(); // Get and trim input
    if (task) {
        createtaskelement(task); // Create task element
        saveTaskToLocal(task); // Save task to local storage
        taskinput.value = ''; // Clear input field
    } else {
        alert('Please enter a task!'); // Alert if input is empty
    }
}

// Function to create a task element
function createtaskelement(task) {
    const listitem = document.createElement('li'); // Create list item
    listitem.textContent = task; // Set the text content of the item

    // Create edit button
    const editButton = document.createElement('span');
    editButton.textContent = ' ✏️'; // Edit icon
    editButton.className = 'edit'; // Assign class for styling
    editButton.onclick = function() {
        const newTask = prompt('Edit your task:', task); // Prompt for new task text
        if (newTask) {
            listitem.firstChild.textContent = newTask; // Update text in the UI
            updateTaskInLocal(task, newTask); // Update task in local storage
        }
    };

    // Create delete button
    const deleteButton = document.createElement('span');
    deleteButton.textContent = ' ❌'; // Delete icon
    deleteButton.className = 'delete'; // Assign class for styling
    deleteButton.onclick = function() {
        listitem.remove(); // Remove from UI
        removeTaskFromLocal(task); // Remove from local storage
    };

    // Append buttons to the list item
    listitem.appendChild(editButton);
    listitem.appendChild(deleteButton);
    tasklist.appendChild(listitem); // Add list item to the task list
}

// Function to save a task to local storage
function saveTaskToLocal(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get existing tasks
    tasks.push(task); // Add new task
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save back to local storage
}

// Function to update a task in local storage
function updateTaskInLocal(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get existing tasks
    tasks = tasks.map(task => (task === oldTask ? newTask : task)); // Update the modified task
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks
}

// Function to remove a task from local storage
function removeTaskFromLocal(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get existing tasks
    tasks = tasks.filter(t => t !== task); // Filter out the deleted task
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks
}

// Event listener for the add button
addbutton.addEventListener('click', addtask); // Call addtask function on button click
