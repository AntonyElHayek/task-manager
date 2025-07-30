const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = [];

// Load saved tasks from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(addTaskToDOM);
  }
});

// Handle form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === '') return;

  const task = { text, completed: false };
  tasks.push(task);
  addTaskToDOM(task);
  saveTasks();
  input.value = '';
});

// Add a task to the DOM
function addTaskToDOM(task, index = tasks.length - 1) {
  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = task.text;
  span.addEventListener('click', () => {
    tasks[index].completed = !tasks[index].completed;
    li.classList.toggle('completed');
    saveTasks();
  });

  const del = document.createElement('button');
  del.textContent = 'X';
  del.classList.add('delete-btn');
  del.addEventListener('click', () => {
    tasks.splice(index, 1);
    renderAllTasks();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(del);
  list.appendChild(li);
}

// Clear and re-render the whole list (used after delete)
function renderAllTasks() {
  list.innerHTML = '';
  tasks.forEach(addTaskToDOM);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}