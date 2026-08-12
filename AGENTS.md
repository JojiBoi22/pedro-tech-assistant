# AGENTS.md — Pedro Tech Assistant (Python)

Living document for agent roles and evolution.

---

## Product goal

Tech support multi-agent system for Pedro Tech Freelance (Kempton Park, SA).

Primary users: DIY users, CLI demos, future WhatsApp clients (dad, Waylon, customers).

Core principle: one shared brain (`handle_message`) behind every channel.

---

## Current agents (v1 Python)

| Agent | File | Job |
|--------|------|-----|
| Diagnostic | `agents.py` | Cause + confidence + clarifying questions |
| Research | `agents.py` | Short extra context |
| Solution | `agents.py` | Numbered fix steps for non-experts |
| Orchestrator | `core.py` | Sequential pipeline + formatting |
| LLM | `llm.py` | Groq API |

Brand tone: clear, practical, South African freelance tech support. Prefer free/simple fixes first.

---

## Model policy

Default: `qwen/qwen3.6-27b` via Groq (fast cloud).

Alternatives in `.env`:

- `llama-3.3-70b-versatile` — strong general
- `llama-3.1-8b-instant` — cheapest / fastest

---

## Channels

| Channel | Status | Entry |
|---------|--------|--------|
| CLI | ✅ | `cli.py` → `handle_message` |
| WhatsApp | Next | same `handle_message` |
| Web UI | Planned | same `handle_message` |

---

## Safety & tone

- Warn before destructive steps
- Prefer reversible fixes first
- No illegal / hacking guidance
- Calm, professional, not call-centre script

---

## Changelog

| Date | Change |
|------|--------|
| 2026-08-12 | v1 Python rewrite on Groq; TypeScript CLI retired |
