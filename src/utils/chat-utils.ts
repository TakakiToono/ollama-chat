import { ChatOllama } from "@langchain/ollama";
import OpenAI from "openai";
// import { Message, OllamaRequest, OllamaResponse } from "@/types/chat";
import { toast } from "sonner";
import axios from "axios";

// Constants for API configuration
const NGROK_URL = "https://poetic-uniformly-jackal.ngrok-free.app";

export async function sendMessageToOllama(prompt: string): Promise<string> {
  // try {
  //   // local ollama llm instance
  //   const llm = new ChatOllama({
  //     // model: "gemma3",
  //     model: "llama3.2",
  //     temperature: 0.1,
  //     maxRetries: 2,
  //     // other params...
  //   });

  //   const response = await llm.invoke([
  //     {
  //       role: "system",
  //       content: "you are a general pupose assistant bot and expert in coding.",
  //       // any system prompt here
  //     },
  //     { role: "human", content: prompt },
  //   ]);

  //   // if (!response.ok) {
  //   //   throw new Error(`Error: ${response.status}`);
  //   // }

  //   return response.content;
  // }
  try {
    // Initialize OpenAI API client
    // Using our proxy server to avoid CORS issues
    // const ai = new OpenAI({
    //   apiKey: "baka", // Using a placeholder API key
    //   baseURL: NGROK_URL,
    //   dangerouslyAllowBrowser: true, // Required for browser-side API calls
    //   // No need to add Authorization header as the proxy adds it
    // });

    // console.log(ai);

    // const result = await ai.api.generate.create({
    //   model: "llama3.2",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "you are a general pupose assistant bot and expert in coding.",
    //     },
    //     {
    //       role: "user",
    //       content: prompt,
    //     },
    //   ],
    // });
    // console.log(result.choices[0].message.content);
    // return result?.choices[0].message.content;
    //
    const url = `${NGROK_URL}/api/generate`;
    //
    const result = await axios.post(url, {
      model: "llama3.2",
      systemPrompt:
        "you are a general pupose assistant bot and expert in coding.",
      prompt,
    });
    const responses = JSON.parse(JSON.stringify(result.data.trim()))
      .split("\n")
      .map((singleWord: string) => {
        console.log(singleWord);
        return JSON.parse(singleWord);
      });
    const finalOutput = responses.reduce(
      (a: string, b: { response: "" }) => a + " " + b.response,
      "",
    );
    console.log({ result });
    console.log({ responses });
    console.log({ finalOutput });

    // return "baka";
    return finalOutput;
  } catch (error) {
    console.error("Failed to send message to Ollama:", error);
    // Show user-friendly error message
    toast.error(
      "Failed to connect to the AI service. Make sure the proxy server is running.",
    );
    throw error;
  }
}

/**
 * Saves chat messages to browser's localStorage
 * @param messages - Array of chat messages to save
 */
export function saveMessagesToLocalStorage(messages): void {
  try {
    localStorage.setItem("ollama-chat-messages", JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save messages to localStorage:", error);
  }
}

/**
 * Loads saved chat messages from browser's localStorage
 * @returns Array of chat messages or empty array if none found
 */
export function loadMessagesFromLocalStorage() {
  try {
    const saved = localStorage.getItem("ollama-chat-messages");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load messages from localStorage:", error);
    return [];
  }
}

/**
 * Generates a unique ID for messages
 * @returns A unique string ID combining timestamp and random characters
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
