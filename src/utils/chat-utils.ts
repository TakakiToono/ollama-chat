import { ChatOllama } from "@langchain/ollama";
// import { Message, OllamaRequest, OllamaResponse } from "@/types/chat";
import { toast } from "sonner";

export async function sendMessageToOllama(prompt: string): Promise<string> {
  try {
    // local ollama llm instance
    const llm = new ChatOllama({
      model: "gemma3",
      temperature: 0.1,
      maxRetries: 2,
      // other params...
    });

    const response = await llm.invoke([
      {
        role: "system",
        content: "you are a general pupose assistant bot and expert in coding.",
        // any system prompt here
      },
      { role: "human", content: prompt },
    ]);

    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }

    return response.content;
  } catch (error) {
    console.error("Failed to send message to Ollama:", error);
    toast.error("Failed to connect to Ollama. Is the service running?");
    throw error;
  }
}

export function saveMessagesToLocalStorage(messages): void {
  try {
    localStorage.setItem("ollama-chat-messages", JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save messages to localStorage:", error);
  }
}

export function loadMessagesFromLocalStorage() {
  try {
    const saved = localStorage.getItem("ollama-chat-messages");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load messages from localStorage:", error);
    return [];
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
