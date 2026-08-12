"""
Groq LLM client for Pedro Tech Assistant.
"""
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY") or os.getenv("LLM_API_KEY")
if not API_KEY:
    raise RuntimeError(
        "Missing GROQ_API_KEY. Add it to .env (see .env.example)."
    )

client = Groq(api_key=API_KEY)
MODEL = os.getenv("LLM_MODEL", "qwen/qwen3.6-27b")
TEMPERATURE = float(os.getenv("LLM_TEMPERATURE", "0.6"))
MAX_TOKENS = int(os.getenv("LLM_MAX_TOKENS", "2048"))


def ask_llm(system: str, user: str, label: str = "llm") -> str:
    """Send a system + user message to Groq and return the text reply."""
    print(f"[{label}] → {MODEL} ...", flush=True)
    completion = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        temperature=TEMPERATURE,
        max_completion_tokens=MAX_TOKENS,
        top_p=0.95,
    )
    text = (completion.choices[0].message.content or "").strip()
    print(f"[{label}] ✓", flush=True)
    return text or "No response generated."


def get_config() -> dict:
    return {
        "model": MODEL,
        "temperature": TEMPERATURE,
        "max_tokens": MAX_TOKENS,
    }
