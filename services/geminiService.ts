
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceAdDescription = async (title: string, rawDescription: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un experto en marketing para un portal de anuncios clasificados 18+. Mejora el siguiente anuncio para que sea más atractivo, claro y profesional, manteniendo un tono respetuoso pero directo. 
      Título: ${title}
      Descripción actual: ${rawDescription}
      
      Devuélveme una versión mejorada del título y la descripción en formato JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            enhancedTitle: { type: Type.STRING },
            enhancedDescription: { type: Type.STRING }
          },
          required: ["enhancedTitle", "enhancedDescription"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error enhancing description:", error);
    return null;
  }
};

export const moderateContent = async (text: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza si el siguiente contenido para un portal de anuncios de adultos es apropiado. No permitimos contenido ilegal, odio, o violencia extrema.
      Contenido: ${text}
      
      Responde en JSON si es seguro o no y una breve razón si no lo es.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["isSafe", "reason"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error moderating content:", error);
    return { isSafe: true, reason: "" }; // Fallback to safe
  }
};
