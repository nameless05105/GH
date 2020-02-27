# модуль для отправки и получения сообщений через mqtt и rabbitmq
import json
import pika
import sys

credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-mqtt',
                                                               5672,
                                                               '/',
                                                               credentials))
channel = connection.channel()
channel.queue_bind(queue='mqtt_queue',
                    exchange='amq.topic',
                    routing_key='test.',)


def on_request(ch, method, props, body):
    print(body)
    dict = json.loads(body)
    print(dict)
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='mqtt_queue', on_message_callback=on_request)


while(True):
    a = input("\nSend message: ")
    if a=='q':
        break
    else:
        channel.basic_publish(exchange='amq.topic',
                                routing_key='test.',
                                body='test_publish')

print(" [x] Awaiting RPC requests")
channel.start_consuming()