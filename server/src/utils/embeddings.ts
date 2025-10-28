import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("API key exists:", !!apiKey);
        console.log("API key first 10 chars:", apiKey?.substring(0, 10));
        
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not set in environment variables");
        }
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await model.embedContent(text);
        return result.embedding.values;
    } catch (error) {
        console.error("Error generating embedding - Full error details:", error);
        throw error;
    }
}