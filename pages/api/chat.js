/**
 * pages/api/chat.js
 * This route:
 *  - Reads a PaLM API key from Vercel env var
 *  - Lists available models
 *  - Uses "text-bison-001" to generate text
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ text: "Method not allowed. Use POST." });
  }

  // Get your PaLM API key from environment
  const apiKey = process.env.PALM_API_KEY; // or GEMINI_API_KEY, whichever name you set
  if (!apiKey) {
    console.error("❌ Missing PALM_API_KEY environment variable.");
    return res.status(500).json({ text: "Server error: missing API key." });
  }

  try {
    // Initialize the client
    const genAI = new GoogleGenerativeAI(apiKey);

    // DEBUG: List available models to confirm which ones you have
    const availableModels = await genAI.listModels();
    console.log("✅ Available models:", availableModels);

    // For a text completion model, use "models/text-bison-001"
    // NOTE: for Chat model, you'd use "models/chat-bison-001" with generateMessage()
    const model = genAI.getModel({ model: 'models/text-bison-001' });

    // Extract the user message from the request body
    const { message = '' } = req.body;

    // Generate text from "text-bison-001"
    const result = await model.generateText({
      prompt: message || 'Hello!',
    });

    // The bison result is typically in result.candidates[0].output
    const bisonReply = result?.candidates?.[0]?.output || "No reply from text-bison-001";

    // Send it back to the client
    return res.status(200).json({ text: bisonReply });

  } catch (error) {
    console.error("❗ PaLM API Error:", error);
    return res.status(500).json({
      text: "Sorry, an error occurred.",
      error: error.message || error.toString(),
    });
  }
};
