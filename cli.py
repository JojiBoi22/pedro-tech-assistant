#!/usr/bin/env python3
"""
Pedro Tech Assistant — interactive CLI demo.
Run: python cli.py
"""
from llm import get_config
from core import handle_message


def main() -> None:
    cfg = get_config()
    print("\n🔧 PEDRO TECH ASSISTANT (Python + Groq)\n")
    print(f"Model: {cfg['model']}")
    print(f"Temp:  {cfg['temperature']}  |  max tokens: {cfg['max_tokens']}")
    print('Type a tech problem. Type "exit" to quit.\n')

    while True:
        try:
            text = input("You > ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nBye. Pedro Tech — Your problem, my magic.\n")
            break

        if not text:
            continue
        if text.lower() in {"exit", "quit", "q"}:
            print("\nBye. Pedro Tech — Your problem, my magic.\n")
            break

        print("\nThinking...\n")
        try:
            result = handle_message(text)
            print(result.final_answer)
            print(f"\n⏱ {result.timing_ms} ms\n")
        except Exception as err:
            print(f"\nError: {err}")
            print(
                "Check GROQ_API_KEY in .env and that the model name is valid.\n"
            )


if __name__ == "__main__":
    main()
