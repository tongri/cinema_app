

async def produce_data(broker, topic, message):
    print(f"sending {message}", flush=True)
    await broker.publish(topic, message)
