
import { Message, OllamaRequest, OllamaResponse } from "@/types/chat";
import { toast } from "sonner";

export async function sendMessageToOllama(
  prompt: string,
  model: string = "llama2"
): Promise<string> {
  try {
    const request: OllamaRequest = {
      model,
      prompt,
    };

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error("Failed to send message to Ollama:", error);
    toast.error("Failed to connect to Ollama. Is the service running?");
    throw error;
  }
}

export function saveMessagesToLocalStorage(messages: Message[]): void {
  try {
    localStorage.setItem("ollama-chat-messages", JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save messages to localStorage:", error);
  }
}

export function loadMessagesFromLocalStorage(): Message[] {
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
