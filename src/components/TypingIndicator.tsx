
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      
      <div className="bg-chat-assistant px-4 py-3 rounded-lg rounded-tl-none">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full animate-typing-dot-1"></div>
          <div className="w-2 h-2 rounded-full animate-typing-dot-2"></div>
          <div className="w-2 h-2 rounded-full animate-typing-dot-3"></div>
        </div>
      </div>
    </div>
  );
};
