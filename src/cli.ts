#!/usr/bin/env node
import readline from 'node:readline';
import chalk from 'chalk';
import { handleMessage } from './core.js';
import { getLlmConfig } from './llm.js';

const cfg = getLlmConfig();
console.log(chalk.blue.bold('\n🔧 PEDRO TECH ASSISTANT (CLI Demo)\n'));
console.log(chalk.gray(`Model: ${cfg.model}`));
console.log(chalk.gray(`API:   ${cfg.baseURL}`));
console.log(chalk.gray(`Timeout: ${cfg.timeoutMs} ms`));
console.log(chalk.gray('Type a tech problem. Type "exit" to quit.\n'));
console.log(
  chalk.gray(
    'Note: local models can take 30–180s per step on CPU. Watch the [diagnose]/[research]/[solve] logs.\n'
  )
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function loop() {
  rl.question(chalk.cyan('You > '), async (input) => {
    const text = input.trim();
    if (!text) return loop();
    if (['exit', 'quit', 'q'].includes(text.toLowerCase())) {
      console.log(chalk.gray('\nBye. Pedro Tech — Your problem, my magic.\n'));
      rl.close();
      process.exit(0);
    }

    console.log(chalk.yellow('\nThinking... (this can take a while on CPU)\n'));
    try {
      const result = await handleMessage(text);
      console.log(chalk.green(result.finalAnswer));
      console.log(chalk.gray(`\n⏱ ${result.timingMs} ms\n`));
    } catch (err: any) {
      console.error(chalk.red('\nError:'), err.message || err);
      console.error(
        chalk.gray(
          '\nQuick checks:\n  ollama list\n  ollama run <your-model> "hello"\n  curl -s http://127.0.0.1:11434/api/tags\n'
        )
      );
    }
    loop();
  });
}

loop();
