import { askLLM } from './llm.js';

const BRAND = `You are part of PEDRO TECH ASSISTANT — a professional South African tech support system.
Brand: Pedro Tech Freelance (Kempton Park). Be clear, practical, step-by-step. Prefer free/simple fixes first.`;

/** Diagnostic specialist — most likely cause + confidence */
export async function diagnose(problem: string): Promise<string> {
  return askLLM(
    `${BRAND}
Role: Diagnostic specialist. Identify the most likely cause of the tech problem.
Reply with:
1. Most likely cause
2. Confidence (Low/Medium/High)
3. Key questions to ask if needed
Keep it short.`,
    problem,
    'diagnose'
  );
}

/** Solution specialist — numbered fix steps for non-experts */
export async function solve(problem: string, diagnosis: string): Promise<string> {
  return askLLM(
    `${BRAND}
Role: Solution specialist. Give clear fix steps a non-expert can follow.
Use numbered steps. Warn about risky actions. End with "If this fails, try..."`,
    `Problem: ${problem}\n\nDiagnosis: ${diagnosis}`,
    'solve'
  );
}

/** Research specialist — brief extra context */
export async function research(problem: string): Promise<string> {
  return askLLM(
    `${BRAND}
Role: Research specialist. Give brief extra context (common causes, known issues, useful tools).
Keep under 8 lines.`,
    problem,
    'research'
  );
}
