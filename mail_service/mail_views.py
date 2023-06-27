import asyncio
from email.message import EmailMessage

import aioredis
import aiosmtplib
import json


async def send_message(body, mail_to):
    message = EmailMessage()
    message["From"] = "uacinema.nure@localhost"
    message["To"] = "uacinema.nure@gmail.com"
    message["Subject"] = "Activity on UA Cinema"

    await aiosmtplib.send(message, hostname="127.0.0.1", port=25)


def prepare_message(message: str):
    msg = json.loads(message)
    mail_to = msg.get("email")
    description = msg.get("description")
    return mail_to, description


async def main():
    consumer = aioredis.from_url("redis://localhost", decode_responses=True).pubsub()
    await consumer.subscribe('auth_topic')

    async for message in consumer.listen():
        if isinstance(message['data'], str):
            mail_to, message = prepare_message(message['data'])
            print(message)
            print(mail_to)
            if not mail_to or not message:
                continue
            await send_message(message, mail_to)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()
