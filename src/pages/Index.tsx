
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatInput } from "@/components/ChatInput";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { 
  saveMessagesToLocalStorage, 
  loadMessagesFromLocalStorage,
  sendMessageToOllama,
  generateId
} from "@/utils/chat-utils";
import { Trash2 } from "lucide-react";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = loadMessagesFromLocalStorage();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessageToOllama(content);
      
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const newMessages = [...prev, assistantMessage];
        saveMessagesToLocalStorage(newMessages);
        return newMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    saveMessagesToLocalStorage([]);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="border-b p-4 flex justify-between items-center bg-card/80 backdrop-blur-sm shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Ollama Chat</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleClearChat}
            variant="outline"
            size="icon"
            title="Clear chat"
            className="rounded-full"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden flex flex-col relative">
        <ChatWindow 
          messages={messages} 
          isLoading={isLoading} 
          messagesEndRef={messagesEndRef} 
        />
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
