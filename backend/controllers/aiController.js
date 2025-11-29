const Memory = require('../models/Memory');
const { generateAICapsule } = require('../services/aiService');

/**
 * @desc    Generate AI capsule from user's memories
 * @route   POST /api/ai/generate-capsule
 * @access  Private
 */
const generateCapsule = async (req, res) => {
  try {
    console.log('🔮 AI Capsule generation requested by user:', req.user.email);

    // Fetch all memories for the authenticated user
    const memories = await Memory.find({ user: req.user._id })
      .sort({ date: -1 })
      .lean();

    // Check if user has any memories
    if (!memories || memories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No memories found. Create some memories first to generate an AI capsule.'
      });
    }

    console.log(`📊 Found ${memories.length} memories to process`);

    // Generate AI capsule using Groq
    const aiCapsule = await generateAICapsule(memories);

    console.log('✅ AI Capsule generated successfully');

    // Return the AI-generated capsule
    res.status(200).json(aiCapsule);

  } catch (error) {
    console.error('❌ Generate Capsule Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate AI capsule'
    });
  }
};

/**
 * @desc    Get capsule generation status/info
 * @route   GET /api/ai/capsule-info
 * @access  Private
 */
const getCapsuleInfo = async (req, res) => {
  try {
    const memoryCount = await Memory.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      canGenerate: memoryCount > 0,
      memoryCount,
      message: memoryCount > 0 
        ? 'Ready to generate AI capsule' 
        : 'Add memories first to generate capsule'
    });
  } catch (error) {
    console.error('❌ Get Capsule Info Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  generateCapsule,
  getCapsuleInfo
};