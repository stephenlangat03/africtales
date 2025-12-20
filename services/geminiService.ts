import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real production app, never expose API keys on the client. 
// This should be proxied through a backend.
// For this frontend-only demo, we assume the environment variable is available during build 
// or the user understands this limitation.

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.error("Failed to initialize Gemini client", error);
}

export const getCulturalInsight = async (productName: string, productContext?: string): Promise<string> => {
  if (!ai) {
    return "AI Assistant is currently unavailable. Please check configuration.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are an expert African Art Historian and Storyteller.
      Provide a fascinating, short (max 100 words), and culturally accurate insight about: ${productName}.
      Context: ${productContext || 'African Artifact'}.
      Focus on its origin, usage, or symbolic meaning.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    return response.text || "No insight available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not retrieve cultural insights at this time.";
  }
};