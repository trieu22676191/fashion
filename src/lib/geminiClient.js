import { GoogleGenAI } from "@google/genai";

const apiKeys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_2].filter(
  Boolean
);

if (apiKeys.length === 0) {
  console.warn("No GEMINI_API_KEY configured — chat API will fail.");
}

const clients = apiKeys.map((apiKey) => new GoogleGenAI({ apiKey }));

// Tries each configured API key in order, falling back to the next one when
// the current key hits the free-tier rate limit.
export async function generateContent(params) {
  let lastError;

  for (const ai of clients) {
    try {
      return await ai.models.generateContent(params);
    } catch (error) {
      lastError = error;
      const status = error?.status ?? error?.error?.code;
      if (status === 429 || status === 401 || status === 403) {
        continue;
      }
      throw error;
    }
  }

  throw lastError ?? new Error("No Gemini API key configured");
}
