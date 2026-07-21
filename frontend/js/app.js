import * as api from './api.js';
import { TEMPLATES } from './templates.js';
import { renderTodos } from './ui.js';

let todos = [];
let currentFilter = 'all';

// Dom Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const templateSelect = document.getElementById('template-select');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialisation
if (typeof marked !== 'undefined') {
  marked.setOptions({ breaks: true, gfm: true });
}

async function init() {
  try {
    todos = await api.getTasks();
    refresh();
  } catch (err) {
    console.error("❌ Erreur au démarrage :", err);
  }
}

function refresh() {
  renderTodos(todos, currentFilter, {
    onToggle: handleToggle,
    onEdit: handleEdit,
    onDelete: handleDelete
  });
}

// Handlers d'actions
async function handleAdd(text, priority) {
  try {
    const newTodo = await api.createTask(text, priority);
    todos.unshift(newTodo);
    refresh();
  } catch (err) {
    console.error(err);
  }
}

async function handleToggle(id, completed) {
  try {
    const updated = await api.updateTask(id, { completed });
    todos = todos.map(t => t._id === id ? updated : t);
    refresh();
  } catch (err) {
    console.error(err);
  }
}

async function handleEdit(id, oldText) {
  const newText = prompt("Modifier la tâche :", oldText);
  if (newText && newText.trim() !== "" && newText !== oldText) {
    try {
      const updated = await api.updateTask(id, { text: newText.trim() });
      todos = todos.map(t => t._id === id ? updated : t);
      refresh();
    } catch (err) {
      console.error(err);
    }
  }
}

async function handleDelete(id) {
  try {
    await api.deleteTask(id);
    todos = todos.filter(t => t._id !== id);
    refresh();
  } catch (err) {
    console.error(err);
  }
}

// Événements
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    handleAdd(text, prioritySelect.value);
    todoInput.value = '';
    todoInput.focus();
  }
});

templateSelect.addEventListener('change', async (e) => {
  const key = e.target.value;
  if (TEMPLATES[key]) {
    for (const item of TEMPLATES[key]) {
      await handleAdd(item.text, item.priority);
    }
    templateSelect.value = "";
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    refresh();
  });
});

// Lancement de l'application
init();