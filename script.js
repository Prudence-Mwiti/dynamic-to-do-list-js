// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Add Task Function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Create new <li>
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create Remove Button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn'); // ✅ Must use classList.add

    // Add remove function
    removeButton.onclick = function () {
      taskList.removeChild(li);
    };

    // Append button to li, and li to taskList
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';
  }
}

// Add Event Listener for button click
addButton.addEventListener('click', addTask);

// Add Event Listener for Enter key
taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    const addButton = document.getElementById('addButton');
    const taskInput = document.getElementById('taskInput');

    addButton.addEventListener('click', () => addTask(taskInput.value));
    
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});

// Function to load tasks from Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
}

// Add Task Function
function addTask(taskText, save = true) {
    if (taskText.trim() === '') return;

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = () => {
        taskList.removeChild(li);
        removeTaskFromStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    document.getElementById('taskInput').value = '';

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

// Remove Task from Local Storage
function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

