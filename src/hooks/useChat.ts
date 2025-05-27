import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage, ConversationMode } from "@/types/chat";

// Use environment variable for API key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Missing Gemini API key. Please set VITE_GEMINI_API_KEY in your environment variables.');
}

// Customizable system prompts for different conversation modes
const modePrompts = {
  professional: "Respond in a detailed, professional manner with comprehensive explanations.",
  concise: "Provide brief, direct answers focusing only on key points.",
  natural: "Respond in a casual, conversational tone as if chatting with a friend."
};

// Helper function to generate unique IDs
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      type: "system", 
      text: "Hi there! I'm your AI assistant. How can I help you today?",
      id: generateUniqueId()
    }
  ]);
  const [mode, setMode] = useState<ConversationMode>("professional");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string>("");
  const { toast } = useToast();

  const sendMessage = async (userMessage: string, isRegenerate = false) => {
    if (!userMessage.trim() && !isRegenerate) return;

    // Use last message if regenerating, otherwise use the new message
    const messageToSend = isRegenerate ? lastUserMessage : userMessage;
    
    if (!isRegenerate) {
      // Only add user message if not regenerating
      setMessages(prev => [...prev, { 
        type: "user", 
        text: messageToSend,
        id: generateUniqueId()
      }]);
      setLastUserMessage(messageToSend);
    } else {
      // If regenerating, remove the last AI message
      setMessages(prev => prev.filter((_, index) => index !== prev.length - 1));
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${modePrompts[mode]}\n\nUser message: ${messageToSend}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: mode === "natural" ? 0.8 : mode === "professional" ? 0.4 : 0.6,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API error response:", errorData);
        throw new Error(
          errorData?.error?.message || 
          `Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      
      // Check if the response has the expected format
      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        console.error("Unexpected API response format:", data);
        throw new Error("Received an invalid response from the AI service");
      }
      
      const aiResponse = data.candidates[0].content.parts[0].text;

      setMessages(prev => [...prev, { 
        type: "ai", 
        text: aiResponse,
        id: generateUniqueId()
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      
      toast({
        title: "⚠️ Something went wrong",
        description: error instanceof Error 
          ? error.message 
          : "Unable to get a response. Please try again later.",
        variant: "destructive",
      });
      
      setMessages(prev => [
        ...prev,
        { 
          type: "system", 
          text: "Sorry, I encountered an error. Please try again.",
          id: generateUniqueId()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateLastResponse = () => {
    if (lastUserMessage) {
      sendMessage(lastUserMessage, true);
    } else {
      toast({
        title: "No message to regenerate",
        description: "Send a message first before trying to regenerate a response.",
        variant: "destructive",
      });
    }
  };

  const clearHistory = () => {
    setMessages([
      { 
        type: "system", 
        text: "Chat history cleared. How can I help you?",
        id: generateUniqueId()
      }
    ]);
    setLastUserMessage("");
  };

  return {
    messages,
    mode,
    isLoading,
    sendMessage,
    regenerateLastResponse,
    setMode,
    clearHistory
  };
};
