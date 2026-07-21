import { formatDate, sanitizeMarkdown } from './utils.js';

const todoList = document.getElementById('todo-list');
const counter = document.getElementById('counter');

export function updateCounter(todos) {
  const activeCount = todos.filter(t => !t.completed).length;
  counter.textContent = `${activeCount} tâche${activeCount > 1 ? 's' : ''} restante${activeCount > 1 ? 's' : ''}`;
}

export function renderTodos(todos, currentFilter, callbacks) {
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

    // Attachement des événements passés depuis app.js
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