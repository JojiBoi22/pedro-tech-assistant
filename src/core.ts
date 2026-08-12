import { diagnose, solve, research } from './agents.js';

export interface AssistantResult {
  diagnosis: string;
  solution: string;
  research: string;
  finalAnswer: string;
  timingMs: number;
}

/**
 * Shared core for CLI, WhatsApp, and future web UI.
 * Demo pipeline: diagnose + research in parallel, then solve.
 */
export async function handleMessage(userText: string): Promise<AssistantResult> {
  const start = Date.now();

  const [diagnosis, researchNotes] = await Promise.all([
    diagnose(userText),
    research(userText),
  ]);

  const solution = await solve(userText, diagnosis);

  const finalAnswer = [
    '🔧 **Pedro Tech Assistant**',
    '',
    '**Diagnosis**',
    diagnosis,
    '',
    '**Solution**',
    solution,
    '',
    '**Extra notes**',
    researchNotes,
    '',
    '_Need more help? Reply with more detail or screenshots._',
  ].join('\n');

  return {
    diagnosis,
    solution,
    research: researchNotes,
    finalAnswer,
    timingMs: Date.now() - start,
  };
}
