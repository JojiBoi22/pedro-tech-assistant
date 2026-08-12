import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || 'ollama',
  baseURL: process.env.LLM_BASE_URL || 'http://127.0.0.1:11434/v1',
});

/**
 * Thin LLM wrapper (OpenAI-compatible).
 * Works with Ollama, Groq, OpenAI, and other compatible providers.
 */
export async function askLLM(system: string, user: string): Promise<string> {
  const res = await client.chat.completions.create({
    model: process.env.LLM_MODEL || 'llama3.1:8b',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.3,
  });
  return res.choices[0]?.message?.content?.trim() || 'No response generated.';
}
