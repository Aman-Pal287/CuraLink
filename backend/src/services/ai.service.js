const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Helper to extract Gemini text safely
function extractText(result) {
  return result?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

async function generateAISummary(text) {
  try {
    if (!text) return null;

    const systemInstruction = `
You are CuraLink AI — a medical research assistant.
Summarize research publications & clinical trials clearly and factually.
Rules:
- NO medical advice.
- Keep it 120–180 words.
- Bullet points allowed.
- Preserve medical terminology.
`;

    const prompt = `Summarize this medical content:\n${text}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\n${prompt}` }],
        },
      ],
    });

    const output = extractText(result);

    if (!output) {
      console.warn("No output returned by AI Summary");
      return null;
    }

    return output;
  } catch (err) {
    console.error("AI Summary Error:", err);
    return null;
  }
}

async function extractTags(text) {
  try {
    if (!text) return [];

    const prompt = `
Extract 5–10 relevant medical tags from this content.
Return ONLY a valid JSON array of strings. No extra words.

Content:
${text}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const output = extractText(result);

    if (!output) {
      console.warn("No output returned by AI for tag extraction");
      return [];
    }

    let tags = [];
    try {
      tags = JSON.parse(output);
    } catch {
      tags = output
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((t) => t.trim().replace(/"/g, ""));
    }

    return tags;
  } catch (err) {
    console.error("AI Tag Extraction Error:", err);
    return [];
  }
}

module.exports = { generateAISummary, extractTags };
