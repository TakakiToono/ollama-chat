
import React from "react";
import { Message as MessageType } from "@/types/chat";
import { Message } from "@/components/Message";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ScrollToTop } from "@/components/ScrollToTop";

interface ChatWindowProps {
  messages: MessageType[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-center p-8">
          <div className="max-w-md p-6 rounded-2xl bg-card/40 backdrop-blur-sm border shadow-md transition-all duration-500 hover:shadow-lg animate-float">
            <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">Welcome to Ollama Chat</h2>
            <p className="text-muted-foreground animate-fade-in">
              Start a conversation with your local LLM. Your messages will be saved in your browser.
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.length > 10 && <ScrollToTop />}
          
          <div className="space-y-8">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          
          {isLoading && <TypingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
