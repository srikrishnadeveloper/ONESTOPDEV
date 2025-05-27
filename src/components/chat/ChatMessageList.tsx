
import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import type { StreamingChatMessage } from "@/types/chat";

interface ChatMessageListProps {
  messages: StreamingChatMessage[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessageIsStreaming = messages.length > 0 && messages[messages.length - 1].isStreaming;

  // Scroll to bottom when messages change or streaming state changes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, lastMessageIsStreaming]);

  // Handle empty state
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-muted-foreground">
        No messages yet. Start a conversation!
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatMessageList;
