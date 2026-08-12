# Pedro Tech Assistant

**CLI tech-support assistant for Pedro Tech Freelance (Kempton Park, South Africa).**

Python + Groq multi-agent style bot: diagnose → research → solve. Built for fast demos and a future WhatsApp channel.

> Tagline: *Your problem, my magic.*

---

## Purpose

1. Help non-experts with PC, laptop, network, and software issues
2. Benchmark fast cloud open models (Groq) for tech support quality
3. Demo a multi-agent style pipeline before deeper framework integration
4. Share one `handle_message()` core across CLI and WhatsApp

---

## Stack

| Layer | Choice |
|--------|--------|
| Language | Python 3.10+ |
| LLM | Groq API (`qwen/qwen3.6-27b` default) |
| Channels | CLI now · WhatsApp next |
| Brand | Pedro Tech Freelance — Kempton Park, SA |

---

## Quick start

```bash
git clone https://github.com/JojiBoi22/pedro-tech-assistant.git
cd pedro-tech-assistant

python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# edit .env and paste GROQ_API_KEY from https://console.groq.com

python cli.py
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
├── llm.py              # Groq client
├── agents.py           # diagnose / research / solve roles
├── core.py             # handle_message() — shared core
├── cli.py              # Interactive CLI
├── requirements.txt
├── .env.example
├── AGENTS.md
└── README.md
```

---

## How it works

```
User (CLI / future WhatsApp)
        ↓
handle_message()
        ↓
  diagnose → research → solve
        ↓
  Formatted answer + timing
```

---

## Roadmap

- [x] Python CLI with Groq
- [x] diagnose → research → solve pipeline
- [ ] WhatsApp channel (same `handle_message`)
- [ ] Wire Multi-agent-framework / hive-framework ideas
- [ ] Session memory
- [ ] Web UI

---

## Related projects

- [Multi-agent-framework](https://github.com/JojiBoi22/Multi-agent-framework)
- [hive-framework](https://github.com/JojiBoi22/hive-framework)

---

## Author

**Pedro Tech Freelance** · Kempton Park, South Africa  
Built by [JojiBoi22](https://github.com/JojiBoi22)

## License

MIT
