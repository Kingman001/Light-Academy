
import { GoogleGenAI, Type } from "@google/genai";

// Always use the required initialization pattern with process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPerformanceInsight = async (studentData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following student performance data and provide a concise summary with 3 actionable tips for improvement: ${JSON.stringify(studentData)}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    // Access response text using the .text property as per guidelines
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Error connecting to AI advisor. Please try again later.";
  }
};

export const generateQuizQuestions = async (subject: string, topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3 multiple choice questions for ${subject} on the topic of ${topic}. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctOption: { type: Type.INTEGER }
            },
            required: ["text", "options", "correctOption"]
          }
        }
      }
    });
    // Access response text using the .text property
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
};
