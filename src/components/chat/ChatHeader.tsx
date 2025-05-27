
import React from "react";
import { MessageSquare, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  clearHistory: () => void;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ clearHistory, onClose }) => {
  return (
    <div className="border-b p-4 flex items-center justify-between bg-muted/50">
      <div className="flex items-center gap-2">
        <div className="p-1 bg-primary rounded-full">
          <MessageSquare size={16} className="text-primary-foreground" />
        </div>
        <h3 className="font-semibold">One Stop Dev Assistant</h3>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={clearHistory} className="h-8 w-8" title="Clear history">
          <Trash2 size={16} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
