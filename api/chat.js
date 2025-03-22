const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ text: "Method not allowed" });
  }

  try {
    const { message = '', attachments = [] } = req.body;

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

    const result = await model.generateContent(prompt);
    const geminiReply = result?.response?.text() ?? "No response from Gemini.";

    return res.status(200).json({ text: geminiReply });
  } catch (error) {
    console.error("❗ Serverless error:", error);
    return res.status(500).json({
      text: "Sorry, there was an error processing your request.",
      error: error.message,
    });
  }
};
