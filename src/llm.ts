import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.LLM_BASE_URL || 'http://127.0.0.1:11434/v1';
const model = process.env.LLM_MODEL || 'llama3.1:8b';
const timeoutMs = Number(process.env.LLM_TIMEOUT_MS || 120_000);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || 'ollama',
  baseURL,
  timeout: timeoutMs,
  maxRetries: 0,
});

export function getLlmConfig() {
  return { baseURL, model, timeoutMs };
}

/**
 * Thin LLM wrapper (OpenAI-compatible).
 * Works with Ollama, Groq, OpenAI, and other compatible providers.
 */
export async function askLLM(system: string, user: string, label = 'llm'): Promise<string> {
  const started = Date.now();
  process.stderr.write(`[${label}] calling ${model} via ${baseURL} ...\n`);

  try {
    const res = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.3,
    });

    const text = res.choices[0]?.message?.content?.trim() || 'No response generated.';
    process.stderr.write(`[${label}] ok in ${Date.now() - started} ms\n`);
    return text;
  } catch (err: any) {
    const msg = err?.message || String(err);
    process.stderr.write(`[${label}] FAILED after ${Date.now() - started} ms: ${msg}\n`);
    throw new Error(
      `LLM call failed (${label}). Is Ollama running? Model="${model}". Details: ${msg}`
    );
  }
}
