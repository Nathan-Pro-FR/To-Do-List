// ==========================================
// 1. CONFIGURATION
// ==========================================
const API_URL = "https://to-do-list-backend-4qko.onrender.com/api/tasks";

// ==========================================
// 2. TEMPLATES (BANQUE DE MODÈLES)
// ==========================================
const TEMPLATES = {
  dev: [
    { text: "Créer la structure `index.html`", priority: "high", description: "Mettre en place la sémantique HTML5" },
    { text: "Configurer la feuille de style `style.css`", priority: "medium", description: "Design responsive avec effets néon" },
    { text: "Implémenter la logique JavaScript", priority: "high", description: "Connecter le frontend aux endpoints de l'API" },
    { text: "Tester l'API **Express** et **MongoDB**", priority: "medium", description: "Vérifier le bon fonctionnement des requêtes CRUD" },
    { text: "Publier le projet sur [GitHub](https://github.com)", priority: "low", description: "Deploy sur Render et GitHub Pages" }
  ],
  school: [
    { text: "Relire le cours de **STI2D / SIN**", priority: "high", description: "Révision des concepts clés" },
    { text: "Faire les exercices de `Maths`", priority: "medium", description: "Chapitre sur les suites" },
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

function renderDueDate(isoString) {
  if (!isoString) return '';
  
  const due = new Date(isoString);
  const now = new Date();
  const isOverdue = due < now;

  const formattedDate = due.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `<span class="due-badge ${isOverdue ? 'overdue' : ''}">
    ⏰ ${isOverdue ? 'En retard :' : 'Échéance :'} ${formattedDate}
  </span>`;
}

function sanitizeMarkdown(text) {
  if (!text) return '';
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

async function createTask(taskData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
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

function updateStats(todos) {
  const total = todos.length;

  if (total === 0) {
    document.getElementById('completion-ratio').textContent = "0% faites • 0% à faire";
    document.getElementById('bar-true').style.width = "0%";
    document.getElementById('bar-false').style.width = "100%";
    document.getElementById('priority-pie').style.background = "conic-gradient(#475569 0deg 360deg)";
    document.getElementById('pct-high').textContent = "0%";
    document.getElementById('pct-medium').textContent = "0%";
    document.getElementById('pct-low').textContent = "0%";
    return;
  }

  // 1. Calcul avancement (Faites / À faire)
  const completedCount = todos.filter(t => t.completed).length;
  const pctCompleted = Math.round((completedCount / total) * 100);
  const pctActive = 100 - pctCompleted;

  document.getElementById('completion-ratio').textContent = `${pctCompleted}% faites • ${pctActive}% à faire`;
  document.getElementById('bar-true').style.width = `${pctCompleted}%`;
  document.getElementById('bar-false').style.width = `${pctActive}%`;

  const barTrueLabel = document.querySelector('#bar-true .segment-label');
  const barFalseLabel = document.querySelector('#bar-false .segment-label');
  if (barTrueLabel) barTrueLabel.style.display = pctCompleted < 10 ? 'none' : 'inline';
  if (barFalseLabel) barFalseLabel.style.display = pctActive < 10 ? 'none' : 'inline';

  // 2. Calcul des priorités pour le camembert
  const highCount = todos.filter(t => t.priority === 'high').length;
  const medCount = todos.filter(t => t.priority === 'medium').length;

  const pctHigh = Math.round((highCount / total) * 100);
  const pctMed = Math.round((medCount / total) * 100);
  const pctLow = 100 - (pctHigh + pctMed);

  document.getElementById('pct-high').textContent = `${pctHigh}%`;
  document.getElementById('pct-medium').textContent = `${pctMed}%`;
  document.getElementById('pct-low').textContent = `${pctLow}%`;

  // Dynamic CSS variables pour le conic-gradient
  const angleHigh = (highCount / total) * 360;
  const angleMed = angleHigh + ((medCount / total) * 360);

  const pieChart = document.getElementById('priority-pie');
  pieChart.style.background = `conic-gradient(
    var(--priority-high) 0deg ${angleHigh}deg,
    var(--priority-medium) ${angleHigh}deg ${angleMed}deg,
    var(--priority-low) ${angleMed}deg 360deg
  )`;
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

    const descriptionMarkdown = typeof marked !== 'undefined'
      ? marked.parse(sanitizeMarkdown(todo.description))
      : sanitizeMarkdown(todo.description);

    const descriptionHtml = todo.description 
      ? `<div class="todo-description-text">${descriptionMarkdown}</div>` 
      : '';

    const dueDateHtml = renderDueDate(todo.dueDate);

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
          ${descriptionHtml}
          ${dueDateHtml}
          <span class="todo-dates">${dateText}</span>
        </div>
      </div>
      <button class="delete-btn" title="Supprimer">&times;</button>
    `;

    // Événements
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
const todoDesc = document.getElementById('todo-desc');
const todoDueDate = document.getElementById('todo-duedate');
const templateSelect = document.getElementById('template-select');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialisation de Marked.js
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

  updateStats(todos);
}

// Handlers d'actions
async function handleAdd(taskData) {
  try {
    const newTodo = await createTask(taskData);
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
  const newText = prompt("Modifier le titre de la tâche :", oldText);
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

// Soumission du formulaire
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    const taskData = {
      text,
      priority: prioritySelect.value,
      description: todoDesc ? todoDesc.value.trim() : '',
      dueDate: todoDueDate && todoDueDate.value ? new Date(todoDueDate.value).toISOString() : null
    };

    handleAdd(taskData);

    // Reset des champs
    todoInput.value = '';
    if (todoDesc) todoDesc.value = '';
    if (todoDueDate) todoDueDate.value = '';
    todoInput.focus();
  }
});

// Chargement de templates
templateSelect.addEventListener('change', async (e) => {
  const key = e.target.value;
  if (TEMPLATES[key]) {
    for (const item of TEMPLATES[key]) {
      await handleAdd({
        text: item.text,
        priority: item.priority,
        description: item.description || '',
        dueDate: null
      });
    }
    templateSelect.value = "";
  }
});

// Filtres
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
