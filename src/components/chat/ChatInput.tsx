import React, { useState, useRef, useEffect } from "react";
import { Send, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  onRegenerateResponse: () => void;
  isLoading: boolean;
  showRegenerateButton: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onRegenerateResponse,
  isLoading, 
  showRegenerateButton 
}) => {
  const [input, setInput] = useState("");
  const [isMultiline, setIsMultiline] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const message = input.trim();
    setInput("");
    await onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "Enter" && e.shiftKey && !isMultiline) {
      setIsMultiline(true);
    }
  };

  return (
    <div className="border-t p-3 bg-background">
      <div className="flex flex-col gap-2">
        {isMultiline ? (
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a longer message... (Shift+Enter for new line)"
            className={cn(
              "resize-none min-h-[80px] max-h-[160px] bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
            disabled={isLoading}
          />
        ) : (
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
            className={cn(
              "flex-1 py-2 px-3 rounded-md bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary text-sm",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
            disabled={isLoading}
            onClick={() => {
              if (input.length > 100) {
                setIsMultiline(true);
              }
            }}
          />
        )}
        
        <div className="flex justify-between">
          {isMultiline && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMultiline(false)}
              className="text-xs"
              disabled={isLoading}
            >
              Switch to single line
            </Button>
          )}
          
          <div className="flex gap-2 ml-auto">
            {showRegenerateButton && (
              <Button
                variant="outline"
                size="icon"
                onClick={onRegenerateResponse}
                disabled={isLoading}
                className="h-9 w-9 shrink-0"
                title="Regenerate response"
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              </Button>
            )}
            <Button 
              size="icon" 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="h-9 w-9 shrink-0"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
