
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <Avatar className="h-8 w-8 mt-1 ring-2 ring-background shadow-md animate-pulse-slow">
        <AvatarImage src="/assistant-avatar.png" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      
      <div className="bg-chat-assistant px-4 py-3 rounded-2xl rounded-tl-none shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full animate-typing-dot-1 bg-foreground/70"></div>
          <div className="w-2 h-2 rounded-full animate-typing-dot-2 bg-foreground/70"></div>
          <div className="w-2 h-2 rounded-full animate-typing-dot-3 bg-foreground/70"></div>
        </div>
      </div>
    </div>
  );
};
