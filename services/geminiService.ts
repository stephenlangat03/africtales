import { GoogleGenAI } from "@google/genai";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Assume this variable is pre-configured, valid, and accessible in the execution context where the API client is initialized.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCulturalInsight = async (productName: string, productContext?: string): Promise<string> => {
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