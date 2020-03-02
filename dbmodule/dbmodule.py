import pymongo
import json
import pika
import sys

from pymongo import MongoClient

client = MongoClient()
# client = MongoClient('mongopi', 27017, username='[user]', password='[password]')
client = MongoClient('localhost', 27017)
db = client.data


credentials = pika.PlainCredentials('guest', 'guest')
# connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-mqtt',
#                                                                5672,
#                                                                '/',
#                                                                credentials))
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()


channel.queue_declare(queue='rpc_queue')


def on_request(ch, method, props, body):
    print(body)
    dict = json.loads(body)
    print(dict)
    if (dict['action'] == 'Auth'):
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,  '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for program in client.data.growingPrograms.find({}, {'id':1, 'programName':1, 'group':1, 'days':1, 'status':1, 'blocks':1, '_id': 0}):
            program['key'] = 'program'
            message = json.dumps(program)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for sensor in client.data.sensors.find({}, {'name':1, 'type':1, 'value':1, 'values':1, 'MACaddr':1, 'id':1, '_id': 0}):
            sensor['key'] = 'sensor'
            message = json.dumps(sensor)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)  
        for chart in client.data.charts.find({}, {'id':1, 'type':1, 'value':1, 'MACaddr':1, 'name':1, 'groupId':1,'_id': 0}):
            chart['key'] = 'chart'
            message = json.dumps(chart)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)                                     
        message = json.dumps({'key':'end'}) 
    elif (dict['action'] == 'CREATE_DEVICE'):
        collection = client.data.devices
        del dict['action']
        collection.insert_one(dict)
       
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,  '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
                                         
        message = json.dumps({'key':'end'}) 
    elif (dict['action'] == 'CREATE_GROUP'):
        collection = client.data.groups
        del dict['action']
        collection.insert_one(dict)
        # message = json.dumps({'key':'successfull'}) 
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1,  'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1, '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
                                          
        message = json.dumps({'key':'end'}) 
    elif (dict['action'] == 'EDIT_DEVICE'):
        collection = client.data.devices
        del dict['action']
        collection.update_one({
            'id': dict['id']
            },{
            '$set': {
                'name': dict['name'],
                'MACaddr': dict['MACaddr']
            }
            }, upsert=False)
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1, '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
                                          
        message = json.dumps({'key':'end'})
    elif (dict['action'] == 'EDIT_GROUP'):
        collection = client.data.groups
        collection.update_one({
            'id': dict['id']
            },{
            '$set': {
                'title': dict['title'],
                'devices': dict['devices'],
                'solution': dict['solution'],
                'plant': dict['plant'],
                'program': dict['program']
            }
            }, upsert=False)
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,'typeDevice':1,  '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
                                          
        message = json.dumps({'key':'end'})  
    elif (dict['action'] == 'DELETE_DEVICE'):
        collection = client.data.devices
        del dict['action']
        collection.delete_one({"id":dict['id']})
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,  '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
                                          
        message = json.dumps({'key':'end'}) 
    elif (dict['action'] == 'DELETE_GROUP'):
        collection = client.data.groups
        del dict['action']
        collection.delete_one({"id":dict['id']})
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,'typeDevice':1,  '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
                                          
        message = json.dumps({'key':'end'})
    elif (dict['action'] == 'CREATE_PROGRAM'):
        collection = client.data.growingPrograms
        del dict['action']
        collection.insert_one(dict)
        for program in client.data.growingPrograms.find({}, {'id':1, 'programName':1, 'group':1, 'days':1, 'status':1, 'blocks':1, '_id': 0}):
            program['key'] = 'program'
            message = json.dumps(program)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)                                
        message = json.dumps({'key':'end'})
    elif (dict['action'] == 'DELETE_PROGRAM'):
        collection = client.data.growingPrograms
        del dict['action']
        collection.delete_one({"id":dict['id']})
        for program in client.data.growingPrograms.find({}, {'id':1, 'programName':1, 'group':1, 'days':1, 'status':1, 'blocks':1, '_id': 0}):
            program['key'] = 'program'
            message = json.dumps(program)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)                                
        message = json.dumps({'key':'end'})
    elif (dict['action'] == 'EDIT_PROGRAM'):
        collection = client.data.growingPrograms
        del dict['action']
        collection.update_one({
            'id': dict['id']
            },{
            '$set': {
                'programName': dict['programName'],
                'group': dict['group'],
                'days': dict['days'],
                'status': dict['status'],
                'blocks': dict['blocks']
            }
            }, upsert=False)
        for program in client.data.growingPrograms.find({}, {'id':1, 'programName':1, 'group':1, 'days':1, 'status':1, 'blocks':1, '_id': 0}):
            program['key'] = 'program'
            message = json.dumps(program)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)                                
        message = json.dumps({'key':'end'})  
    elif (dict['action'] == 'CREATE_CHART'):
        collection = client.data.charts
        del dict['action']
        collection.insert_one(dict)
        for chart in client.data.charts.find({}, {'id':1, 'type':1, 'value':1, 'MACaddr':1, 'name':1, 'groupId':1,'_id': 0}):
            chart['key'] = 'chart'
            message = json.dumps(chart)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,'typeDevice':1,  '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for sensor in client.data.sensors.find({}, {'name':1, 'type':1, 'value':1, 'values':1, 'MACaddr':1, 'id':1, '_id': 0}):
            sensor['key'] = 'sensor'
            message = json.dumps(sensor)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)                                
        message = json.dumps({'key':'end'})
    elif (dict['action'] == 'DELETE_CHART'):
        collection = client.data.charts
        del dict['action']
        collection.delete_one({"id":dict['id']})
        for chart in client.data.charts.find({}, {'id':1, 'type':1, 'value':1, 'MACaddr':1, 'name':1, 'groupId':1,'_id': 0}):
            chart['key'] = 'chart'
            message = json.dumps(chart)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for group in client.data.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            message = json.dumps(group)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)

        for device in client.data.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,'typeDevice':1,  '_id': 0}):
            device['key'] = 'device'
            message = json.dumps(device)
            # print(" [.] Sent" % message)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)
        for sensor in client.data.sensors.find({}, {'name':1, 'type':1, 'value':1, 'values':1, 'MACaddr':1, 'id':1, '_id': 0}):
            sensor['key'] = 'sensor'
            message = json.dumps(sensor)
            ch.basic_publish(exchange='',
                            routing_key=props.reply_to,
                            properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id),
                            body=message)                                
        message = json.dumps({'key':'end'})             
    ch.basic_publish(exchange='',
                        routing_key=props.reply_to,
                        properties=pika.BasicProperties(correlation_id = \
                                                            props.correlation_id),
                        body=message)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='rpc_queue', on_message_callback=on_request)

print(" [x] Awaiting RPC requests")
print(" test #2")
channel.start_consuming()


