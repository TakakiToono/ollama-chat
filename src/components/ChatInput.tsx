
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset the height to auto to prevent the textarea from growing indefinitely
      textareaRef.current.style.height = "auto";
      // Set the height to the scroll height to fit the content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t bg-card p-4">
      <div className="flex gap-2 items-end max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            className="resize-none min-h-[60px] max-h-[200px] pr-10 py-3"
            rows={1}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 bottom-2 opacity-70 hover:opacity-100"
            disabled={disabled}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={!message.trim() || disabled}
          className="h-10 w-10"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-xs text-center text-muted-foreground mt-2">
        Press <kbd className="px-1 py-0.5 bg-secondary rounded text-xs">Enter</kbd> to send, 
        <kbd className="px-1 py-0.5 bg-secondary rounded text-xs ml-1">Shift+Enter</kbd> for new line
      </div>
    </div>
  );
};
