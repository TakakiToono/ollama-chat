
export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

export interface OllamaRequest {
  model: string;
  prompt: string;
}

export interface OllamaResponse {
  model: string;
  response: string;
}
