# AGENTS.md — Pedro Tech Assistant

Living document for agent roles, pipeline design, and how this bot will evolve.
Tweak this file as the system grows.

---

## Product goal

Pedro Tech Assistant is a **tech support multi-agent system** for Pedro Tech Freelance (Kempton Park, SA).

Primary users:
- DIY users with PC / laptop / network / software problems
- Internal demo & benchmarking (CLI)
- Future: WhatsApp clients (dad, Waylon, real customers)

Core principle: **one shared brain** (`handleMessage`) behind CLI, WhatsApp, and web.

---

## Current demo agents (v0)

These are role prompts in `src/agents.ts`, not yet full Multi-agent-framework workers.

### 1. Diagnostic Worker
- **Job:** Identify the most likely cause of the reported problem
- **Output:** Cause + confidence (Low/Medium/High) + clarifying questions if needed
- **Style:** Short, practical, South African tech-support tone

### 2. Research Worker
- **Job:** Add brief extra context (common causes, known issues, useful tools)
- **Output:** Under ~8 lines
- **Runs:** In parallel with Diagnostic

### 3. Solution Worker
- **Job:** Turn diagnosis into clear, numbered fix steps a non-expert can follow
- **Rules:** Prefer free/simple fixes first; warn about risky steps; end with fallback
- **Depends on:** Diagnostic output

### Brand system prompt (shared)
> You are part of PEDRO TECH ASSISTANT — a professional South African tech support system.  
> Brand: Pedro Tech Freelance (Kempton Park). Be clear, practical, step-by-step. Prefer free/simple fixes first.

---

## Target architecture (next iterations)

Integrate [Multi-agent-framework](https://github.com/JojiBoi22/Multi-agent-framework):

```
Supervisor Agent
├── Diagnostic Worker   (specialty: diagnosis)
├── Solution Worker     (specialty: remediation)
├── Research Worker     (specialty: context / known issues)
└── (future) Safety / Verification Worker
```

Use [hive-framework](https://github.com/JojiBoi22/hive-framework) ideas for:
- Hierarchical task routing
- Structured handoffs
- STM / LTM memory across sessions

### Planned capabilities per agent

| Agent | Framework type | Tools / memory |
|--------|----------------|----------------|
| Supervisor | SupervisorAgent | Route by complexity, aggregate answers |
| Diagnostic | WorkerAgent | LLM + optional OS/network heuristics |
| Solution | WorkerAgent | LLM + step templates |
| Research | WorkerAgent | LLM + (later) web/search tools |
| Verifier | WorkerAgent / checkpoint | Consistency checks before send |

---

## Channels

| Channel | Status | Entry point |
|---------|--------|-------------|
| CLI | ✅ Demo | `src/cli.ts` → `handleMessage` |
| WhatsApp | Planned | Same `handleMessage` |
| Web UI | Planned | Same `handleMessage` |

---

## Model policy

Preference order:
1. **Local open models** via Ollama (privacy, offline, unlimited tokens)
2. Free/fast cloud open models (e.g. Groq Llama)
3. Paid APIs only if needed for quality benchmarks

Default demo model: `llama3.1:8b` (or whatever is set in `.env`).

---

## Safety & tone

- No destructive commands without clear warning
- Prefer reversible steps first
- Do not claim to “hack”, bypass licenses, or do illegal access
- Stay helpful, calm, and professional (freelance tech support, not a call centre script)

---

## Changelog (agents)

| Date | Change |
|------|--------|
| 2026-08-12 | v0 demo agents: diagnose / research / solve pipeline in CLI |

---

## Open decisions

- [ ] When to hard-switch from prompt roles to real Multi-agent-framework classes
- [ ] WhatsApp library (Baileys vs official Cloud API)
- [ ] Persistence format for conversation memory
- [ ] Benchmark set of fixed tech-support prompts for model comparison
