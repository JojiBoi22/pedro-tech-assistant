"""
Shared core: handle_message() for CLI and future WhatsApp.
"""
import time
from dataclasses import dataclass

from agents import diagnose, research, solve


@dataclass
class AssistantResult:
    diagnosis: str
    solution: str
    research: str
    final_answer: str
    timing_ms: int


def handle_message(user_text: str) -> AssistantResult:
    """Run diagnose → research → solve and format the reply."""
    start = time.time()

    print("[core] step 1/3 diagnose...", flush=True)
    diagnosis_text = diagnose(user_text)

    print("[core] step 2/3 research...", flush=True)
    research_text = research(user_text)

    print("[core] step 3/3 solve...", flush=True)
    solution_text = solve(user_text, diagnosis_text)

    final_answer = "\n".join(
        [
            "🔧 **Pedro Tech Assistant**",
            "",
            "**Diagnosis**",
            diagnosis_text,
            "",
            "**Solution**",
            solution_text,
            "",
            "**Extra notes**",
            research_text,
            "",
            "_Need more help? Reply with more detail or screenshots._",
        ]
    )

    elapsed_ms = int((time.time() - start) * 1000)
    return AssistantResult(
        diagnosis=diagnosis_text,
        solution=solution_text,
        research=research_text,
        final_answer=final_answer,
        timing_ms=elapsed_ms,
    )
