/******************************************************
 * server.js (Node/Express server)
 *****************************************************/

require('dotenv').config();  // Loads .env
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * 1. Setup Express
 */
const app = express();
app.use(cors());           // Allow cross-origin from React dev server
app.use(express.json());   // Parse JSON in request bodies

/**
 * 2. Initialize Gemini client
 */
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env!");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * 3. Define an endpoint to handle chat requests
 */
app.post('/api/chat', async (req, res) => {
  try {
    // Expecting { message, attachments } in request body
    const { message = '', attachments = [] } = req.body;

    // For demonstration, just append the attachment names to the prompt
    // If you want to pass images inline, see the official docs on how
    // to do "fileToGenerativePart" with base64 data, etc.
    const attachmentNames = attachments.map(a => a.name).join(', ');
    let prompt = message;
    if (attachments.length > 0) {
      prompt += `\n\n[User attached files: ${attachmentNames}]`;
    }

    // Call the Gemini model using the official library
    const result = await model.generateContent(prompt);
    // Retrieve the text from Gemini's response
    const geminiReply = result?.response?.text() ?? "No text returned from Gemini.";

    // Return JSON to the front end
    return res.json({ text: geminiReply });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({
      text: "I'm sorry, I encountered an error processing your request on the server."
    });
  }
});

/**
 * 4. Start the server
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
