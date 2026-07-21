const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET : Récupérer toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST : Créer une tâche
router.post('/', async (req, res) => {
  const task = new Task({
    text: req.body.text,
    priority: req.body.priority,
    description: req.body.description || '',
    dueDate: req.body.dueDate || null
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH : Mettre à jour une tâche
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });

    if (req.body.completed !== undefined) task.completed = req.body.completed;
    if (req.body.text !== undefined) task.text = req.body.text;
    if (req.body.priority !== undefined) task.priority = req.body.priority;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE : Supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;