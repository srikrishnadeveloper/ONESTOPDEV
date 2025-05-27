
// Define chat message types
export type ChatMessageType = "user" | "ai" | "system";

// Define conversation modes
export type ConversationMode = "professional" | "concise" | "natural";

export interface ChatMessage {
  type: ChatMessageType;
  text: string;
  id: string;
}

export interface StreamingChatMessage extends ChatMessage {
  isStreaming?: boolean;
}

// One Stop Dev specific tools and links 
export interface DevTool {
  name: string;
  description: string;
  link: string;
  isExternal?: boolean;
}

export const DEV_TOOLS: DevTool[] = [
  { name: "HTML Formatter", description: "Clean and format your HTML code for better readability", link: "/tools/html-formatter" },
  { name: "CSS Beautifier", description: "Beautify and optimize your CSS code", link: "/tools/css-beautifier" },
  { name: "SEO Analyzer", description: "Analyze your website for SEO improvements", link: "/tools/seo-analyzer" },
  { name: "AI Tools Hub", description: "Discover and access the best AI tools for developers", link: "/ai-tools" }
];

export const AI_TOOLS: DevTool[] = [
  { name: "Jasper", description: "AI content creation assistant for marketing and content teams", link: "https://www.jasper.ai", isExternal: true },
  { name: "Lovable", description: "AI-powered web application builder using natural language", link: "https://www.lovable.dev", isExternal: true },
  { name: "Bolt", description: "No-code AI tool builder for creating custom AI solutions", link: "https://www.bolt.diy", isExternal: true },
  { name: "ChatGPT", description: "Conversational AI assistant from OpenAI", link: "https://chat.openai.com", isExternal: true },
  { name: "Claude", description: "Helpful, harmless, and honest AI assistant from Anthropic", link: "https://claude.ai", isExternal: true }
];
