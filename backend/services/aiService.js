const { Groq } = require('groq-sdk');

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Generate AI capsule from user memories
 * @param {Array} memories - Array of memory objects
 * @returns {Object} - AI-generated capsule data
 */
const generateAICapsule = async (memories) => {
  try {
    console.log('🤖 Generating AI capsule for', memories.length, 'memories');

    // Prepare memories data for AI processing
    const memoriesText = memories.map((memory, index) => {
      return `
Memory ${index + 1}:
Title: ${memory.title}
Type: ${memory.type}
Description: ${memory.description || 'No description'}
Content: ${memory.content}
Tags: ${memory.tags.join(', ') || 'No tags'}
Date: ${new Date(memory.date).toLocaleDateString()}
---`;
    }).join('\n');

    // Generate different AI capsules in parallel
    const [summary, emotionalTone, keyMoments, timeline, storytelling] = await Promise.all([
      generateSummary(memoriesText),
      generateEmotionalTone(memoriesText),
      generateKeyMoments(memoriesText),
      generateTimeline(memories),
      generateStorytelling(memories)
    ]);

    return {
      success: true,
      totalMemories: memories.length,
      capsules: {
        summary,
        emotionalTone,
        keyMoments,
        timeline,
        storytelling
      },
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ AI Service Error:', error);
    throw error;
  }
};

/**
 * Generate a concise summary of all memories
 */
const generateSummary = async (memoriesText) => {
  const prompt = `Analyze these personal memories and create a concise, meaningful summary (2-3 paragraphs) that captures the essence of the person's life experiences:

${memoriesText}

Focus on:
- Overall themes and patterns
- Most significant moments
- Personal growth journey
- Life highlights

Write in a warm, personal tone as if you're helping someone reflect on their life.`;

  const response = await callGroqAPI(prompt);
  return {
    type: 'summary',
    title: 'Your Life Summary',
    content: response,
    icon: '📖'
  };
};

/**
 * Analyze emotional tone across memories
 */
const generateEmotionalTone = async (memoriesText) => {
  const prompt = `Analyze the emotional tone of these memories and provide:

${memoriesText}

1. Overall emotional sentiment (positive, neutral, mixed, reflective)
2. Dominant emotions present (joy, nostalgia, growth, achievement, etc.)
3. Emotional journey arc
4. 3-5 specific emotional insights

Format as a structured analysis with clear sections.`;

  const response = await callGroqAPI(prompt);
  return {
    type: 'emotional',
    title: 'Emotional Tone Analysis',
    content: response,
    icon: '💭'
  };
};

/**
 * Detect and highlight key moments
 */
const generateKeyMoments = async (memoriesText) => {
  const prompt = `From these memories, identify and describe the TOP 5-7 KEY MOMENTS that stand out as most significant:

${memoriesText}

For each key moment:
- Give it a memorable title
- Explain why it's significant
- Note the emotional impact
- Connect it to personal growth

Present as a numbered list of key moments.`;

  const response = await callGroqAPI(prompt);
  return {
    type: 'keyMoments',
    title: 'Key Moments',
    content: response,
    icon: '⭐'
  };
};

/**
 * Generate chronological timeline view
 */
const generateTimeline = async (memories) => {
  // Sort memories by date
  const sortedMemories = memories.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const timelineText = sortedMemories.map((memory, index) => {
    const date = new Date(memory.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    return `${date} | ${memory.title} (${memory.type})`;
  }).join('\n');

  const prompt = `Create a narrative timeline from these chronological memories:

${timelineText}

Detailed memories for context:
${sortedMemories.slice(0, 10).map(m => `${m.title}: ${m.description || m.content}`).join('\n')}

Create a flowing timeline narrative that:
- Groups memories by time periods (if applicable)
- Shows progression and growth
- Highlights connections between events
- Makes the timeline feel like a story

Write in an engaging, chronological narrative style.`;

  const response = await callGroqAPI(prompt);
  return {
    type: 'timeline',
    title: 'Your Journey Timeline',
    content: response,
    icon: '📅'
  };
};

/**
 * Rewrite memories in storytelling format
 */
const generateStorytelling = async (memories) => {
  // Take top 5 most recent or significant memories
  const selectedMemories = memories.slice(0, 5);
  
  const memoriesForStory = selectedMemories.map((memory, index) => {
    return `
Memory ${index + 1}: ${memory.title}
Type: ${memory.type}
Description: ${memory.description || memory.content}
Date: ${new Date(memory.date).toLocaleDateString()}
Tags: ${memory.tags.join(', ')}
---`;
  }).join('\n');

  const prompt = `Transform these personal memories into compelling short stories. For each memory, create a vivid, engaging narrative:

${memoriesForStory}

For each memory:
1. Write a captivating short story (2-3 paragraphs)
2. Use vivid descriptions and sensory details
3. Capture the emotion and significance
4. Write in first-person perspective
5. Give each story a memorable title

Format: 
**[Story Title]**
[Story content]

(Repeat for each memory)`;

  const response = await callGroqAPI(prompt);
  return {
    type: 'storytelling',
    title: 'Your Memories as Stories',
    content: response,
    icon: '📚'
  };
};

/**
 * Helper function to call Groq API
 */
const callGroqAPI = async (prompt) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a thoughtful AI assistant helping people reflect on and understand their personal memories. You write in a warm, empathetic, and insightful tone."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_completion_tokens: 2048,
      top_p: 0.9,
      stream: false
    });

    return chatCompletion.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('❌ Groq API Error:', error);
    throw new Error('Failed to generate AI response');
  }
};

module.exports = { generateAICapsule };