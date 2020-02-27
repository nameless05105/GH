import pymongo
import json
import pika
import sys
import datetime
import uuid

from pymongo import MongoClient

client = MongoClient()
client = MongoClient('localhost', 27017)

db = client.data

credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-mqtt',
                                                               5672,
                                                               '/',
                                                               credentials))

channel = connection.channel()
channel.queue_declare(queue='add_sensors', durable=False)
print('start consuming')
def on_request(ch, method, props, body):
    print(body)
    dict = json.loads(body)
    print(dict)
    collection = client.data.sensors
    result = collection.find_one({'MACaddr':dict['MACaddr']})
    if (dict['key'] == 'CREATE_SENSOR') and ( not result):
        del dict['key']
        for key in dict['sensors']:
            print (key)
            collection.insert_one({ 'MACaddr': dict['MACaddr'], 'name': dict['name'], 'type': key })
        collection = client.data.devices
        collection.insert_one({ 'id': uuid.uuid1(),'MACaddr': dict['MACaddr'], 'name': dict['name'] })
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
channel.basic_consume(queue='add_sensors', on_message_callback=on_request)

channel.start_consuming()