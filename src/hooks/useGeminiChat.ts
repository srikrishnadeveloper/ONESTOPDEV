
import { useState, useCallback, useRef } from "react";
import { geminiService } from "@/services/gemini-service";
import { StreamingChatMessage, DEV_TOOLS, AI_TOOLS } from "@/types/chat";
import { useToast } from "@/hooks/use-toast";

export const useGeminiChat = () => {
  const [messages, setMessages] = useState<StreamingChatMessage[]>([
    { 
      type: "system", 
      text: "Hi there! I'm the One Stop Dev assistant. How can I help you find developer tools, AI resources, or answer questions about our platform?",
      id: "welcome-message"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const lastUserMessageRef = useRef<string>("");
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addMessage = useCallback((message: Omit<StreamingChatMessage, "id">) => {
    const newMessage = { ...message, id: generateUniqueId() };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const updateStreamingMessage = useCallback((id: string, text: string, isStreaming = true) => {
    setMessages((prev) => 
      prev.map((message) => 
        message.id === id ? { ...message, text, isStreaming } : message
      )
    );
  }, []);

  const sendMessage = useCallback(async (userMessage: string, isRegenerate = false) => {
    if ((!userMessage.trim() && !isRegenerate) || isLoading) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    // Use last message if regenerating, otherwise use the new message
    const messageToSend = isRegenerate ? lastUserMessageRef.current : userMessage;
    
    if (!isRegenerate) {
      // Only add user message if not regenerating
      addMessage({ type: "user", text: messageToSend });
      lastUserMessageRef.current = messageToSend;
    } else {
      // If regenerating, remove the last AI message
      setMessages((prev) => prev.filter((message) => 
        !(message.type === "ai" && message.id === prev[prev.length - 1].id))
      );
    }

    setIsLoading(true);

    try {
      // First, add an empty AI message that will be updated with the streaming response
      const aiMessageId = addMessage({ type: "ai", text: "", isStreaming: true });
      
      // Format the conversation history for the API
      const formattedHistory = geminiService.formatChatHistory(
        messages
          .filter((msg) => msg.type !== "system")
          .concat({ type: "user", text: messageToSend, id: "temp" })
      );

      // Get streaming response
      await geminiService.getStreamingResponse(
        messageToSend,
        formattedHistory,
        (text, done) => {
          updateStreamingMessage(aiMessageId, text, !done);
          if (done) {
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Chat error:", error);
      
      toast({
        title: "⚠️ Something went wrong",
        description: error instanceof Error 
          ? error.message 
          : "Unable to get a response. Please try again later.",
        variant: "destructive",
      });
      
      addMessage({ 
        type: "system", 
        text: "Sorry, I encountered an error connecting to the Gemini API. Please try again or check your internet connection." 
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading, addMessage, updateStreamingMessage, toast]);

  const regenerateLastResponse = useCallback(() => {
    if (lastUserMessageRef.current) {
      sendMessage(lastUserMessageRef.current, true);
    } else {
      toast({
        title: "No message to regenerate",
        description: "Send a message first before trying to regenerate a response.",
        variant: "destructive",
      });
    }
  }, [sendMessage, toast]);

  const clearHistory = useCallback(() => {
    setMessages([
      { 
        type: "system", 
        text: "Chat history cleared. How can I help you find developer tools or AI resources?",
        id: generateUniqueId()
      }
    ]);
    lastUserMessageRef.current = "";
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    regenerateLastResponse,
    clearHistory,
    devTools: DEV_TOOLS,
    aiTools: AI_TOOLS
  };
};
