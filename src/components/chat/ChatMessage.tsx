
import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { StreamingChatMessage } from "@/types/chat";

interface ChatMessageProps {
  message: StreamingChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  // Format text with links, code blocks, and normal text
  const formatText = (text: string) => {
    if (!text) return text;
    
    // First replace URLs with actual links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const partsWithLinks = text.split(urlRegex);
    
    return partsWithLinks.map((part, index) => {
      if (part.match(urlRegex)) {
        // It's a URL, so render as a link
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80"
          >
            {part}
          </a>
        );
      }
      
      // For the non-link parts, handle code blocks
      const codeBlockParts = part.split(/(```[^`]*```)/g);
      
      return codeBlockParts.map((codePart, codeIndex) => {
        if (codePart.startsWith('```') && codePart.endsWith('```')) {
          // Extract language and code
          const codeContent = codePart.slice(3, -3);
          const firstLineEnd = codeContent.indexOf('\n');
          const language = firstLineEnd > -1 ? codeContent.slice(0, firstLineEnd).trim() : '';
          const code = firstLineEnd > -1 ? codeContent.slice(firstLineEnd + 1) : codeContent;
          
          return (
            <pre key={`${index}-${codeIndex}`} className="bg-muted px-2 py-1 rounded text-xs overflow-x-auto my-2">
              {language && <div className="text-xs text-muted-foreground mb-1">{language}</div>}
              <code>{code}</code>
            </pre>
          );
        }
        
        // Handle normal text with line breaks
        return (
          <span key={`${index}-${codeIndex}`} style={{ whiteSpace: 'pre-wrap' }}>
            {codePart}
          </span>
        );
      });
    });
  };

  return (
    <div
      className={cn(
        "rounded-lg p-3",
        "animate-fade-in",
        message.type === "user"
          ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
          : message.type === "system"
          ? "bg-muted/80 border border-border max-w-[90%] mx-auto"
          : "bg-muted max-w-[80%]"
      )}
    >
      {message.isStreaming ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Loader size={14} className="animate-spin" />
            <span className="text-xs text-muted-foreground">Thinking...</span>
          </div>
          {message.text ? (
            <div className="text-sm">{formatText(message.text)}</div>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm">{formatText(message.text)}</div>
      )}
    </div>
  );
};

export default ChatMessage;
