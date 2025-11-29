const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['note', 'photo', 'audio', 'video'],
    required: true
  },
  content: {
    type: String, // For notes or file URLs
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Memory', memorySchema);