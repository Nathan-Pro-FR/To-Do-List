import { API_URL } from './config.js';

export async function getTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors de la récupération des tâches");
  return await res.json();
}

export async function createTask(text, priority) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, priority })
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return await res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return await res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
}