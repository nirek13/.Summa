// api/chat.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ text: "Method not allowed. Use POST." });
  }

  try {
    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ Missing GEMINI_API_KEY in environment variables.");
      return res.status(500).json({
        text: "Server misconfiguration: missing Gemini API key."
      });
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'text-bison-001' });

    // Extract message and attachments from request body
    const { message = '', attachments = [] } = req.body;

    // Construct prompt for Gemini
    const attachmentNames = attachments.map(a => a.name).join(', ');
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

    // Send prompt to Gemini
    const result = await model.generateContent(prompt);
    const geminiReply = result?.response?.text() ?? "No response from Gemini.";

    return res.status(200).json({ text: geminiReply });

  } catch (error) {
    console.error("❗ Gemini API Error:", error);
    return res.status(500).json({
      text: "Sorry, there was a server error while processing your request.",
      error: error.message || error.toString(),
    });
  }
};
