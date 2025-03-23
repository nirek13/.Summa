require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// In-memory session memory store. For production, use a database or Redis.
const sessions = {};

// -------------------------------------------------------
// /api/chat endpoint with conversation memory
// -------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { sessionId, message = '', attachments = [] } = req.body;
    if (!sessionId) {
      return res.status(400).json({ text: 'Session ID missing.' });
    }
    // Retrieve or initialize conversation history for the session:
    let conversationHistory = sessions[sessionId] || '';
    
    // Append the new user message to the conversation history
    conversationHistory += `\nUser: ${message}`;
    
    // Build the prompt with the full conversation context
    let prompt = `
    You are an AI assistant that provides clean, professional summaries and follow-up answers regarding venture capital firms and angel investors.
    The conversation so far:
    ${conversationHistory}

    User: ${message}
    `;
    if (attachments.length > 0) {
      const attachmentNames = attachments.map(a => a.name).join(', ');
      prompt += `\n\n[Attached files: ${attachmentNames}]`;
    }
    
    const result = await model.generateContent(prompt);
    const geminiReply = result?.response?.text() ?? "No response from Gemini.";
    
    // Update conversation history with assistant's reply
    conversationHistory += `\nAssistant: ${geminiReply}`;
    sessions[sessionId] = conversationHistory;
    
    return res.json({ text: geminiReply });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({
      text: "Sorry, there was an error processing your request. Please try again later."
    });
  }
});

// -------------------------------------------------------
// Start the server
// -------------------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
