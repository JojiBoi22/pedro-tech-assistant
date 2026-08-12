"""
Pedro Tech role agents: diagnose, research, solve.
"""
from llm import ask_llm

BRAND = (
    "You are part of PEDRO TECH ASSISTANT — a professional South African "
    "tech support system. Brand: Pedro Tech Freelance (Kempton Park). "
    "Be clear, practical, step-by-step. Prefer free/simple fixes first."
)


def diagnose(problem: str) -> str:
    system = f"""{BRAND}
Role: Diagnostic specialist. Identify the most likely cause of the tech problem.
Reply with:
1. Most likely cause
2. Confidence (Low/Medium/High)
3. Key questions to ask if needed
Keep it short."""
    return ask_llm(system, problem, label="diagnose")


def research(problem: str) -> str:
    system = f"""{BRAND}
Role: Research specialist. Give brief extra context (common causes, known issues, useful tools).
Keep under 8 lines."""
    return ask_llm(system, problem, label="research")


def solve(problem: str, diagnosis: str) -> str:
    system = f"""{BRAND}
Role: Solution specialist. Give clear fix steps a non-expert can follow.
Use numbered steps. Warn about risky actions. End with: If this fails, try..."""
    user = f"Problem: {problem}\n\nDiagnosis: {diagnosis}"
    return ask_llm(system, user, label="solve")
