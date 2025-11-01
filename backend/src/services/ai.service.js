// src/services/aiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
You are CuraLink AI — a medical research assistant.  
Your job:
- Summarize research publications & clinical trials in clear, medically accurate language.
- Never hallucinate. If unsure, say “Not enough information to summarize”.
- Maintain compliance with medical standards.  
- Follow these rules:
  • Keep summaries short, factual, and neutral.  
  • Avoid medical advice.  
  • Use bullet points where needed for readability.  
  • If input text contains key medical terms, preserve them.  
`,
});

async function generateAISummary(text) {
  try {
    if (!text) return null;

    const prompt = `
Summarize the following medical content in 120-180 words maximum.  
Avoid giving direct medical advice — focus on research insights only.

CONTENT:
${text}
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("AI Summary Error:", err);
    return null;
  }
}

async function extractTags(text) {
  try {
    if (!text) return [];

    const prompt = `
Extract 5–10 relevant medical tags from the content below.  
Return ONLY a JSON array of strings. No explanation.

CONTENT:
${text}
`;

    const result = await model.generateContent(prompt);

    // Parse JSON safely
    let tags = [];
    try {
      tags = JSON.parse(result.response.text());
    } catch {
      tags = result.response
        .text()
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((t) => t.trim().replace(/"/g, ""));
    }

    return tags;
  } catch (err) {
    console.error("AI Tagging Error:", err);
    return [];
  }
}

module.exports = { generateAISummary, extractTags };
