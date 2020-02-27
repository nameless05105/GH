import pymongo
import json
import pika
import sys
import datetime

from pymongo import MongoClient

client = MongoClient()
client = MongoClient('mongopi', 27017, username='[user]', password='[password]')

db = client.data

credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-mqtt',
                                                               5672,
                                                               '/',
                                                               credentials))

channel = connection.channel()
channel.queue_declare(queue='data1', durable=False)
print('start consuming')

def on_request(ch, method, props, body):
    print(body)
    dict = json.loads(body)
    print(dict)
    collection = client.data.sensors
    MACaddr = dict['MACaddr']
    name = dict['name']
    del dict['MACaddr']
    del dict['name']
    for key in dict:
        print ("%s -> %s" % (key, dict[key]))
        collection.update_one({
            'MACaddr': MACaddr,
            'name': name,
            'type': key
            },{
            '$set': {
                'value': dict[key]['value']
            },{
            '$push': {
                'values': {
                    'date': datetime.datetime.now(),
                    'value': dict[key]['value']
                }
                }
            }}, upsert=True)

    # collection = client.data.chart
    # dict['data'] = datetime.datetime.now()
    # collection.insert_one(dict)

    connection1 = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-mqtt',
                                                               5672,
                                                               '/',
                                                               credentials))

    channel1 = connection1.channel()

    channel1.queue_declare(queue='')
    for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, '_id': 0}):
        group['key'] = 'group'
        message = json.dumps(group)
        # print(" [.] Sent" % message)
        channel1.basic_publish(
            exchange='',
            routing_key='data-for-server',
            body=message,
            properties=pika.BasicProperties(
                delivery_mode=2, 
            ))

    for device in client.data.devices.find({}, {'id':1, 'name':1, 'typeDevice':1, 'MACaddr':1, '_id': 0}):
        device['key'] = 'device'
        message = json.dumps(device)
        # print(" [.] Sent" % message)
        channel1.basic_publish(
            exchange='',
            routing_key='data-for-server',
            body=message,
            properties=pika.BasicProperties(
                delivery_mode=2, 
            ))
    for sensor in client.data.sensors.find({}, {'name':1, 'type':1, 'value':1, 'MACaddr':1, '_id': 0}):
        sensor['key'] = 'sensor'
        message = json.dumps(sensor)
        channel1.basic_publish(
            exchange='',
            routing_key='data-for-server',
            body=message,
            properties=pika.BasicProperties(
                delivery_mode=2, 
            ))
    message = json.dumps({'key':'end'}) 
    channel1.basic_publish(
        exchange='',
        routing_key='data-for-server',
        body=message,
        properties=pika.BasicProperties(
            delivery_mode=2, 
        ))
    
    print(" [x] Sent %r" % message)
    connection1.close()
    ch.basic_ack(delivery_tag=method.delivery_tag)
    
channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='data1', on_message_callback=on_request)

channel.start_consuming()