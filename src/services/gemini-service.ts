import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Missing Gemini API key. Please set VITE_GEMINI_API_KEY in your environment variables.');
}

const MODEL_NAME = "gemini-2.0-flash";

// The system prompt for One Stop Dev assistant
const SYSTEM_PROMPT = `You are the official AI assistant for One Stop Dev (https://onestopdev.vercel.app).

Your job is to help users:
1. Find and link to tools on the site, such as:
   - HTML Formatter → https://onestopdev.vercel.app/tools/html-formatter
   - CSS Beautifier → https://onestopdev.vercel.app/tools/css-beautifier
   - SEO Analyzer → https://onestopdev.vercel.app/tools/seo-analyzer
   - AI Tools Hub → https://onestopdev.vercel.app/ai-tools

2. Recommend top AI tools like Jasper, Lovable, Bolt, ChatGPT, Claude with direct external links.

3. Answer: "What is this site?" with:
   "One Stop Dev is a fast, ad-free website made for developers and students. It offers smart tools, AI apps, and developer resources — all free!"

When a user asks for any dev tool or AI platform, respond with:
- A friendly description
- The link (either from One Stop Dev or external if featured in AI Hub)`;

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private streamingEnabled: boolean = true;

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: MODEL_NAME,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
  }

  // Get a non-streaming response
  async getResponse(userMessage: string, chatHistory: { role: string; parts: { text: string }[] }[]) {
    try {
      // Add system prompt to the beginning if this is a new conversation
      const promptedHistory = this.addSystemPrompt(chatHistory);
      
      const result = await this.model.generateContent({
        contents: promptedHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      });
      
      return result.response.text();
    } catch (error) {
      console.error("Error fetching response:", error);
      throw error;
    }
  }

  // Get a streaming response and process it with a callback
  async getStreamingResponse(
    userMessage: string,
    chatHistory: { role: string; parts: { text: string }[] }[],
    onUpdate: (text: string, done: boolean) => void
  ) {
    try {
      // Add system prompt to the beginning if this is a new conversation
      const promptedHistory = this.addSystemPrompt(chatHistory);
      
      const result = await this.model.generateContentStream({
        contents: promptedHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      });

      let accumulatedText = "";
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        onUpdate(accumulatedText, false);
      }
      
      onUpdate(accumulatedText, true);
      return accumulatedText;
    } catch (error) {
      console.error("Error fetching streaming response:", error);
      throw error;
    }
  }

  // Format chat history into the format expected by the Gemini API
  formatChatHistory(messages: { type: string; text: string }[]) {
    return messages.map((message) => {
      return {
        role: message.type === "user" ? "user" : "model",
        parts: [{ text: message.text }],
      };
    });
  }

  // Add system prompt to chat history if it's a new conversation
  private addSystemPrompt(chatHistory: { role: string; parts: { text: string }[] }[]) {
    // Only add system prompt if it's a new conversation or there's only the user's first message
    if (chatHistory.length <= 1) {
      return [
        {
          role: "model",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        ...chatHistory,
      ];
    }
    return chatHistory;
  }
}

export const geminiService = new GeminiService();
