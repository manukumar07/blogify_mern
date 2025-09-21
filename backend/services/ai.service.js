
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

/**
 * Generate a short summary based on a title
 */
async function generateSummary(title) {
    if (!title) throw new Error("Title is required for summary");

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize this: ${title}`,
    });

    return response.text;
}

/**
 * Generate full content based on a title
 */
async function generateContent(title) {
    if (!title) throw new Error("Title is required for content");

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a clear, SEO-friendly summary for the blog post titled: ${title}`,
    });

    return response.text;
}


module.exports = { generateSummary, generateContent };
