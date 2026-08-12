# Pedro Tech Assistant

**CLI tech-support assistant for Pedro Tech Freelance (Kempton Park, South Africa).**

A demo multi-agent style bot that diagnoses tech problems, proposes practical fixes, and adds short research notes — designed to run locally with open models (Ollama) and later expand to WhatsApp for real client support.

> Tagline: *Your problem, my magic.*

---

## Purpose

Pedro Tech Assistant is built to:

1. **Help non-experts** with everyday PC, laptop, network, and software issues
2. **Benchmark** open-source LLM responses for tech support quality
3. **Demo** a multi-agent style pipeline (Diagnose → Solve → Research) before full integration with [Multi-agent-framework](https://github.com/JojiBoi22/Multi-agent-framework) and [hive-framework](https://github.com/JojiBoi22/hive-framework)
4. **Grow into WhatsApp** so clients (and testers like family / partners) can message the same core logic

This repository is the **product layer**. The long-term engine is the author's multi-agent and hive frameworks.

---

## How it works (demo pipeline)

```
User message (CLI)
        ↓
handleMessage()
        ↓
┌─────────────────────────────┐
│  Diagnostic Worker          │  ← most likely cause + confidence
│  Research Worker (parallel) │  ← brief extra context
└─────────────────────────────┘
        ↓
  Solution Worker             ← numbered fix steps
        ↓
  Final formatted answer + timing
```

The same `handleMessage()` function is intended to power CLI, WhatsApp, and a future web UI.

---

## Stack

| Layer | Choice |
|--------|--------|
| Language | TypeScript (ESM) |
| Runtime | Node.js + `tsx` |
| LLM | Ollama (local) or any OpenAI-compatible API (e.g. Groq) |
| Future engine | Multi-agent-framework + hive-framework |
| Brand | Pedro Tech Freelance — Kempton Park, SA |

---

## Quick start

### 1. Prerequisites

- Node.js 18+
- [Ollama](https://ollama.com) with a model pulled (e.g. `llama3.1:8b`), **or** a Groq/OpenAI-compatible API key

```bash
# Example: local model
ollama pull llama3.1:8b
```

### 2. Install

```bash
git clone https://github.com/JojiBoi22/pedro-tech-assistant.git
cd pedro-tech-assistant
npm install
```

### 3. Configure

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Local Ollama (default)
LLM_API_KEY=ollama
LLM_BASE_URL=http://127.0.0.1:11434/v1
LLM_MODEL=llama3.1:8b

# Or Groq free tier:
# LLM_API_KEY=gsk_...
# LLM_BASE_URL=https://api.groq.com/openai/v1
# LLM_MODEL=llama-3.3-70b-versatile
```

### 4. Run

```bash
npm run dev
```

Example prompts:

- `My laptop won't connect to Wi-Fi after Windows update`
- `PC is very slow and fans are loud`
- `Blue screen when I open Chrome`

Type `exit` to quit.

---

## Project structure

```
pedro-tech-assistant/
├── src/
│   ├── llm.ts      # OpenAI-compatible LLM client (Ollama / Groq / etc.)
│   ├── agents.ts   # Diagnose / Solve / Research roles
│   ├── core.ts     # handleMessage() — shared core for CLI + future WhatsApp
│   └── cli.ts      # Interactive CLI demo
├── AGENTS.md       # Agent roles, pipeline, and evolution notes
├── .env.example
├── package.json
└── README.md
```

---

## Roadmap

- [x] CLI demo with diagnose → solve → research pipeline
- [x] Local open models via Ollama
- [ ] Wire real Supervisor + Workers from Multi-agent-framework
- [ ] Apply hive-framework hierarchical orchestration
- [ ] WhatsApp channel (same `handleMessage` core)
- [ ] Persistent memory / session context
- [ ] Web UI
- [ ] Benchmark suite for model quality

---

## Related projects

- [Multi-agent-framework](https://github.com/JojiBoi22/Multi-agent-framework) — TypeScript multi-agent engine
- [hive-framework](https://github.com/JojiBoi22/hive-framework) — hierarchical multi-agent orchestration

---

## Author

**Pedro Tech Freelance** · Kempton Park, South Africa  
Built by [JojiBoi22](https://github.com/JojiBoi22)

---

## License

MIT
