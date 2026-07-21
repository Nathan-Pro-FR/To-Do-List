const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  description: {
    type: String,
    default: ''
  },
  dueDate: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true // Génère automatiquement createdAt et updatedAt !
});

module.exports = mongoose.model('Task', taskSchema);