/******************************************************
 * server.js (Node/Express server for CFO chatbot)
 *****************************************************/

require('dotenv').config();  // Loads environment variables from .env
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * 1. Setup Express
 */
const app = express();
app.use(cors());             // Allow cross-origin from React frontend
app.use(express.json());     // Parse incoming JSON requests

/**
 * 2. Initialize Gemini client
 */
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * 3. Define an endpoint to handle chat requests
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message = '', attachments = [] } = req.body;

    // Format attachment names (for later extension if needed)
    const attachmentNames = attachments.map(a => a.name).join(', ');

    // CFO-specific prompt engineering
    let prompt = `
You are the CFO of a fast-growing tech startup. 
Respond to questions with clear, concise, and professional financial advice. 
Use startup-friendly financial language and provide only relevant details. 
Avoid rambling, and keep answers to 2-4 short paragraphs unless the user asks for more detail.
Use simple examples or basic numbers to illustrate points when needed.

User message: ${message}
`;

    if (attachments.length > 0) {
      prompt += `\n\n[Attached files: ${attachmentNames}]`;
    }

    // Generate response from Gemini
    const result = await model.generateContent(prompt);
    const geminiReply = result?.response?.text() ?? "No response from Gemini.";

    // Send result to frontend
    return res.json({ text: geminiReply });

  } catch (error) {
    console.error("❗ Error calling Gemini API:", error);
    return res.status(500).json({
      text: "Sorry, there was an error processing your request. Please try again later."
    });
  }
});

/**
 * 4. Start the server
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});