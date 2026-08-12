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
 * Pipeline: diagnose then research then solve (sequential to avoid
 * thrashing a single local Ollama instance under low RAM).
 */
export async function handleMessage(userText: string): Promise<AssistantResult> {
  const start = Date.now();

  process.stderr.write('[core] step 1/3 diagnose...\n');
  const diagnosis = await diagnose(userText);

  process.stderr.write('[core] step 2/3 research...\n');
  const researchNotes = await research(userText);

  process.stderr.write('[core] step 3/3 solve...\n');
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
