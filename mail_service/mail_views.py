import asyncio
from email.message import EmailMessage

import aioredis
import aiosmtplib
import json


async def get_connection():
    try:
        smtp_client = aiosmtplib.SMTP(hostname="smtp.gmail.com", port=465, use_tls=True)
        await smtp_client.connect()
        await smtp_client.login('test@gmail.com', 'password')
    except Exception as e:
        print(f"Exception raised {e}, check  credentials or email service configuration")


async def send_message(body, mail_to):
    message = EmailMessage()
    message["From"] = "uacinema.nure@localhost"
    message["To"] = mail_to
    message["Subject"] = "Activity on UA Cinema"
    message.set_content(body)

    async with get_connection() as client:
        await client.send(message, hostname="smtp.gmail.com", port=465, use_tls=True)


def prepare_message(message: str):
    msg = json.loads(message)
    mail_to = msg.get("email")
    description = msg.get("description")
    return mail_to, description


async def main():
    consumer = aioredis.from_url("redis://localhost", decode_responses=True).pubsub()
    await consumer.subscribe('auth_topic')

    await get_connection()

    async for message in consumer.listen():
        if isinstance(message['data'], str):
            mail_to, message = prepare_message(message['data'])
            if not mail_to or not message:
                continue
            await send_message(message, mail_to)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()
