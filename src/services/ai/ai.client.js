import { GoogleGenAI } from "@google/genai";

if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.error("CRITICAL ERROR: VITE_GEMINI_KEY is missing in .env");
}

const  aiClient = new GoogleGenAI({
    apiKey : import.meta.env.VITE_GEMINI_API_KEY
})

export default aiClient;