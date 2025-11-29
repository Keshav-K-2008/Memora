const express = require('express');
const router = express.Router();
const { generateCapsule, getCapsuleInfo } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// @route   POST /api/ai/generate-capsule
// @desc    Generate AI capsule from user's memories
// @access  Private
router.post('/generate-capsule', generateCapsule);

// @route   GET /api/ai/capsule-info
// @desc    Get capsule generation info
// @access  Private
router.get('/capsule-info', getCapsuleInfo);

module.exports = router;