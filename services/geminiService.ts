
import { GoogleGenAI } from "@google/genai";

// This check aligns with the user's plan to set GEMINI_API_KEY in Vercel.
if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY environment variable not set. Please set it in your Vercel deployment settings.");
}

// Initialize the AI client with the key from the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const systemInstruction = "أنت خبير سلامة ودود ومطلع. هدفك هو تقديم نصائح واضحة وموجزة ومفيدة حول معدات السلامة والوقاية من الحرائق. أجب باللغة العربية.";

export const askSafetyExpert = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "عذرًا، حدث خطأ أثناء محاولة التواصل مع خبير السلامة. يرجى المحاولة مرة أخرى لاحقًا.";
    }
};