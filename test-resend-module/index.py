
import json
import pika
import sys
import datetime
from random import randint
import time


credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost',
                                                               5672,
                                                               '/',
                                                               credentials))

channel = connection.channel()
channel.queue_declare(queue='data1', durable=False)
print('start consuming')

while True:
    data = {}
    data['MACaddr'] = '3C0A99E350C'
    data['name'] = 'DS18B20'
    
    data['key'] = 'UPDATE_SENSOR'
    value = randint(20, 25)
    data['temp'] = {'value':value}
    message = json.dumps(data)
    channel.basic_publish(
        exchange='',
        routing_key='data1',
        body=message,
        properties=pika.BasicProperties(
            delivery_mode=2, 
        ))
    print(data)
    time.sleep(10)
connection.close()