import pymongo
import json
import pika
import sys
import datetime

from pymongo import MongoClient

client = MongoClient()
client = MongoClient('localhost', 27017)

db = client.data

credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost',
                                                               5672,
                                                               '/',
                                                               credentials))

channel = connection.channel()
channel.queue_declare(queue='data1', durable=False)
print('start consuming')

def on_request(ch, method, props, body):
    today = datetime.datetime.today()
    print(body)
    dict = json.loads(body)
    print(dict)
    collection = client.data.sensors
    MACaddr = dict['MACaddr']
    name = dict['name']
    key = dict['key']
    del dict['MACaddr']
    del dict['name']
    del dict['key']
    for key in dict:
        print ("%s -> %s" % (key, dict[key]))
        collection.update_one({
            'MACaddr': MACaddr,
            'name': name,
            'type': key
            },{
            '$set': {
                'value': dict[key]['value']}
            ,
            '$push': {
                'values': {
                    'date': str(today.strftime("%Y-%m-%d-%H.%M.%S")),
                    'value': dict[key]['value']
                    }       
                }
            }, upsert=True)
    ch.basic_ack(delivery_tag=method.delivery_tag)

    connection1 = pika.BlockingConnection(pika.ConnectionParameters('localhost',
                                                               5672,
                                                               '/',
                                                               credentials))

    channel1 = connection1.channel()

    channel1.queue_declare(queue='')
    for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
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

    for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,  '_id': 0}):
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
    for sensor in client.data.sensors.find({}, {'name':1, 'type':1, 'value':1, 'values':1, 'MACaddr':1, 'id':1, '_id': 0}):
        sensor['key'] = 'sensor'
        message = json.dumps(sensor)
        channel1.basic_publish(
            exchange='',
            routing_key='data-for-server',
            body=message,
            properties=pika.BasicProperties(
                delivery_mode=2, 
            ))
    for chart in client.data.charts.find({}, {'id':1, 'type':1, 'value':1, 'MACaddr':1, 'name':1, 'groupId':1,'_id': 0}):
        chart['key'] = 'chart'
        message = json.dumps(chart)
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
    
    
channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='data1', on_message_callback=on_request)

channel.start_consuming()