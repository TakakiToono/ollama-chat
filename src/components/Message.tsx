
import React, { useState } from "react";
import { Message as MessageType } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const isUser = message.role === "user";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    toast.success("Message copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { 
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} group`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} max-w-[85%] gap-3`}>
        <div className="flex-shrink-0 mt-1">
          <Avatar className={`h-8 w-8 ring-2 ring-background shadow-md transition-all duration-300 hover:scale-110 ${isUser ? "animate-slide-in-right" : "animate-slide-in-left"}`}>
            <AvatarImage src={isUser ? "/user-avatar.png" : "/assistant-avatar.png"} />
            <AvatarFallback className={isUser ? "bg-chat-user text-primary-foreground" : ""}>
              {isUser ? "U" : "A"}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex flex-col">
          <div 
            className={`
              relative px-4 py-3 rounded-2xl shadow-sm 
              ${isUser 
                ? "bg-chat-user text-primary-foreground rounded-tr-none animate-slide-in-right" 
                : "bg-chat-assistant rounded-tl-none animate-slide-in-left"
              }
              transition-all duration-300 ease-in-out hover:shadow-md
              hover:-translate-y-1
            `}
          >
            <div className="chat-message-markdown">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>
            
            <button 
              className={`
                absolute top-2 ${isUser ? "left-2" : "right-2"} 
                opacity-0 group-hover:opacity-100 transition-opacity
                hover:bg-black/10 p-1 rounded-full
                transform transition-transform duration-200 hover:scale-110
              `}
              onClick={copyToClipboard}
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
          
          <span className={`text-xs text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"} opacity-80 hover:opacity-100 transition-opacity`}>
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};
