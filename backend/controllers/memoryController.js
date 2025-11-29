const Memory = require('../models/Memory');

// @desc    Get all memories for logged in user
// @route   GET /api/memories
// @access  Private
const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single memory
// @route   GET /api/memories/:id
// @access  Private
const getMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    // Check if user owns the memory
    if (memory.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(memory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new memory
// @route   POST /api/memories
// @access  Private
const createMemory = async (req, res) => {
  try {
    const { title, description, type, content, tags } = req.body;

    const memory = await Memory.create({
      user: req.user._id,
      title,
      description,
      type,
      content,
      tags
    });

    res.status(201).json(memory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update memory
// @route   PUT /api/memories/:id
// @access  Private
const updateMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    // Check if user owns the memory
    if (memory.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedMemory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete memory
// @route   DELETE /api/memories/:id
// @access  Private
const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    // Check if user owns the memory
    if (memory.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await memory.deleteOne();

    res.json({ message: 'Memory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMemories,
  getMemory,
  createMemory,
  updateMemory,
  deleteMemory
};