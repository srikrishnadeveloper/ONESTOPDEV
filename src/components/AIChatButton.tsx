
import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGeminiChat } from "@/hooks/useGeminiChat";
import ChatHeader from "./chat/ChatHeader";
import ChatMessageList from "./chat/ChatMessageList";
import ChatInput from "./chat/ChatInput";

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    regenerateLastResponse, 
    clearHistory 
  } = useGeminiChat();
  
  // Check if we should show the regenerate button (when there's at least one user message and one AI response)
  const showRegenerateButton = messages.some(m => m.type === "user") && 
                              messages.some(m => m.type === "ai");

  // Close chat when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <Button
        className={cn(
          "fixed bottom-6 right-6 rounded-full p-3 shadow-lg hover:shadow-xl z-50",
          "transition-all duration-300",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "primary-gradient"
        )}
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>

      <div
        className={cn(
          "fixed bottom-20 right-6 w-80 sm:w-96 bg-background border rounded-xl shadow-xl z-50",
          "flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        <ChatHeader 
          clearHistory={clearHistory} 
          onClose={() => setIsOpen(false)}
        />
        
        <ChatMessageList 
          messages={messages} 
        />
        
        <ChatInput 
          onSendMessage={sendMessage} 
          onRegenerateResponse={regenerateLastResponse}
          isLoading={isLoading} 
          showRegenerateButton={showRegenerateButton}
        />
      </div>
    </>
  );
};

export default AIChatButton;
