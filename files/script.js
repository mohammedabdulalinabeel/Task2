// ---- State ----
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// ---- DOM references ----
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const itemsLeft = document.getElementById('itemsLeft');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// ---- Save to localStorage ----
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ---- Render tasks based on current filter ----
function renderTasks() {
  taskList.innerHTML = '';

  let filtered = tasks;
  if (currentFilter === 'active') {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = tasks.filter(t => t.completed);
  }

  if (filtered.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'No tasks here.';
    taskList.appendChild(empty);
  } else {
    filtered.forEach(task => {
      const li = document.createElement('li');
      li.dataset.id = task.id;
      if (task.completed) li.classList.add('completed');

      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${escapeHtml(task.text)}</span>
        <button class="delete-btn">✕</button>
      `;

      taskList.appendChild(li);
    });
  }

  const remaining = tasks.filter(t => !t.completed).length;
  itemsLeft.textContent = `${remaining} item${remaining !== 1 ? 's' : ''} left`;
}

// Prevent basic HTML injection from task text
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- Add task ----
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now().toString(),
    text,
    completed: false
  });

  taskInput.value = '';
  saveTasks();
  renderTasks();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

// ---- Event delegation for checkbox toggle + delete ----
taskList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li || !li.dataset.id) return;
  const id = li.dataset.id;

  if (e.target.matches('input[type="checkbox"]')) {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }

  if (e.target.matches('.delete-btn')) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }
});

// ---- Filters ----
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// ---- Clear completed ----
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
});

// ---- Initial render ----
renderTasks();
