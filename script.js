// ==========================================
// 1. CONFIGURATION
// ==========================================
// Remplace par ton URL Render pour la prod : "https://ton-app.onrender.com/api/tasks"
const API_URL = "https://to-do-list-backend-4qko.onrender.com";


// ==========================================
// 2. TEMPLATES (BANQUE DE MODÈLES)
// ==========================================
const TEMPLATES = {
  dev: [
    { text: "Créer la structure `index.html`", priority: "high" },
    { text: "Configurer la feuille de style `style.css`", priority: "medium" },
    { text: "Implémenter la logique JavaScript", priority: "high" },
    { text: "Tester l'API **Express** et **MongoDB**", priority: "medium" },
    { text: "Publier le projet sur [GitHub](https://github.com)", priority: "low" }
  ],
  school: [
    { text: "Relire le cours de **STI2D / SIN**", priority: "high" },
    { text: "Faire les exercices de `Maths`", priority: "medium" },
    { text: "Fiche de synthèse : *Systèmes d'Information*", priority: "medium" },
    { text: "Préparer le sac pour demain", priority: "low" }
  ],
  routine: [
    { text: "Boire un grand verre d'eau 💧", priority: "low" },
    { text: "Vérifier la todo-list du jour 📝", priority: "high" },
    { text: "30 minutes de **code** ou de *lecture*", priority: "medium" }
  ]
};


// ==========================================
// 3. FONCTIONS UTILITAIRES (HELPERS)
// ==========================================
function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function sanitizeMarkdown(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


// ==========================================
// 4. APPELS API (BACKEND NODE/MONGODB)
// ==========================================
async function getTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors de la récupération des tâches");
  return await res.json();
}

async function createTask(text, priority) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, priority })
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return await res.json();
}

async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return await res.json();
}

async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
}


// ==========================================
// 5. GESTION DU DOM & INTERFACE UTILISATEUR
// ==========================================
const todoList = document.getElementById('todo-list');
const counter = document.getElementById('counter');

function updateCounter(todos) {
  const activeCount = todos.filter(t => !t.completed).length;
  counter.textContent = `${activeCount} tâche${activeCount > 1 ? 's' : ''} restante${activeCount > 1 ? 's' : ''}`;
}

function renderTodos(todos, currentFilter, callbacks) {
  todoList.innerHTML = '';
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    const markdownHtml = typeof marked !== 'undefined'
      ? marked.parse(sanitizeMarkdown(todo.text))
      : sanitizeMarkdown(todo.text);

    const createdStr = formatDate(todo.createdAt);
    const updatedStr = formatDate(todo.updatedAt);
    const showUpdated = todo.updatedAt && (new Date(todo.updatedAt) - new Date(todo.createdAt) > 1000);
    const dateText = `Créé le ${createdStr}${showUpdated ? ` • Modifié le ${updatedStr}` : ''}`;

    li.innerHTML = `
      <div class="todo-content">
        <span class="badge ${todo.priority}"></span>
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <div class="todo-body">
          <div class="todo-text">${markdownHtml}</div>
          <span class="todo-dates">${dateText}</span>
        </div>
      </div>
      <button class="delete-btn" title="Supprimer">&times;</button>
    `;

    // Événements sur les éléments créés
    li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
      callbacks.onToggle(todo._id, !todo.completed);
    });

    li.querySelector('.todo-text').addEventListener('dblclick', () => {
      callbacks.onEdit(todo._id, todo.text);
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
      callbacks.onDelete(todo._id);
    });

    todoList.appendChild(li);
  });

  updateCounter(todos);
}


// ==========================================
// 6. APPLI PRINCIPALE & ÉVÉNEMENTS
// ==========================================
let todos = [];
let currentFilter = 'all';

// Éléments du DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const templateSelect = document.getElementById('template-select');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialisation de Marked.js s'il est présent
if (typeof marked !== 'undefined') {
  marked.setOptions({ breaks: true, gfm: true });
}

async function init() {
  try {
    todos = await getTasks();
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
    const newTodo = await createTask(text, priority);
    todos.unshift(newTodo);
    refresh();
  } catch (err) {
    console.error(err);
  }
}

async function handleToggle(id, completed) {
  try {
    const updated = await updateTask(id, { completed });
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
      const updated = await updateTask(id, { text: newText.trim() });
      todos = todos.map(t => t._id === id ? updated : t);
      refresh();
    } catch (err) {
      console.error(err);
    }
  }
}

async function handleDelete(id) {
  try {
    await deleteTask(id);
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

// Lancement
init();
