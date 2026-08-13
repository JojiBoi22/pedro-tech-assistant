import os
import json
import asyncio
from http.server import BaseHTTPRequestHandler
from telegram import Update, Bot
from groq import Groq

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

SYSTEM_PROMPT = """You are a helpful tech assistant.
Answer questions about programming, hardware, networking, software, and troubleshooting clearly and accurately.
Keep responses concise and practical."""

async def process_update(update: Update, bot: Bot):
    if not update.message or not update.message.text:
        return

    user_message = update.message.text.strip()

    if user_message.startswith("/start"):
        await bot.send_message(chat_id=update.effective_chat.id, text="Tech Assistant ready. Ask me anything about tech.")
        return

    if not GROQ_API_KEY:
        await bot.send_message(chat_id=update.effective_chat.id, text="Bot is missing GROQ_API_KEY.")
        return

    try:
        client = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=1024
        )
        reply = response.choices[0].message.content
    except Exception as e:
        reply = f"Error: {str(e)}"

    await bot.send_message(chat_id=update.effective_chat.id, text=reply)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            if not TELEGRAM_TOKEN:
                raise ValueError("TELEGRAM_TOKEN is not set")

            data = json.loads(body)
            bot = Bot(token=TELEGRAM_TOKEN)
            update = Update.de_json(data, bot)

            # Create a new event loop for this request
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                loop.run_until_complete(process_update(update, bot))
            finally:
                loop.close()

            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"ok")
        except Exception as e:
            print("Error:", str(e))
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode())

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Pedro Tech Assistant is running.")
