#!/usr/bin/env node
import readline from 'node:readline';
import chalk from 'chalk';
import { handleMessage } from './core.js';

console.log(chalk.blue.bold('\n🔧 PEDRO TECH ASSISTANT (CLI Demo)\n'));
console.log(chalk.gray('Type a tech problem. Type "exit" to quit.\n'));

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

    console.log(chalk.yellow('\nThinking...\n'));
    try {
      const result = await handleMessage(text);
      console.log(chalk.green(result.finalAnswer));
      console.log(chalk.gray(`\n⏱ ${result.timingMs} ms\n`));
    } catch (err: any) {
      console.error(chalk.red('Error:'), err.message || err);
    }
    loop();
  });
}

loop();
