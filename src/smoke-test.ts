/**
 * Smoke test each layer without the interactive CLI.
 * Run: npx tsx src/smoke-test.ts
 */
import { askLLM, getLlmConfig } from './llm.js';
import { diagnose, research, solve } from './agents.js';
import { handleMessage } from './core.js';

const SAMPLE = 'My laptop will not connect to Wi-Fi after a Windows update';

async function main() {
  const cfg = getLlmConfig();
  console.log('=== Pedro Tech smoke test ===');
  console.log('Config:', cfg);
  console.log('');

  // 1) Raw LLM
  console.log('--- 1) llm.ts: askLLM ---');
  const raw = await askLLM(
    'Reply with exactly one short sentence.',
    'Say hello from Pedro Tech.',
    'smoke-llm'
  );
  console.log('Result:', raw);
  console.log('');

  // 2) Agents one by one
  console.log('--- 2) agents.ts: diagnose ---');
  const d = await diagnose(SAMPLE);
  console.log(d);
  console.log('');

  console.log('--- 3) agents.ts: research ---');
  const r = await research(SAMPLE);
  console.log(r);
  console.log('');

  console.log('--- 4) agents.ts: solve ---');
  const s = await solve(SAMPLE, d);
  console.log(s);
  console.log('');

  // 3) Full pipeline
  console.log('--- 5) core.ts: handleMessage ---');
  const full = await handleMessage(SAMPLE);
  console.log(full.finalAnswer);
  console.log(`Timing: ${full.timingMs} ms`);
  console.log('\nAll smoke tests finished.');
}

main().catch((err) => {
  console.error('Smoke test failed:', err.message || err);
  process.exit(1);
});
