import pymongo
import json
import pika
import sys
import uuid
from pymongo import MongoClient

AUTH = 'Auth'

CREATE_GROUP = 'CREATE_GROUP'
EDIT_GROUP = 'EDIT_GROUP'
DELETE_GROUP = 'DELETE_GROUP'

CREATE_DEVICE = 'CREATE_DEVICE'
EDIT_DEVICE = 'EDIT_DEVICE'
DELETE_DEVICE = 'DELETE_DEVICE'

CREATE_PROGRAM = 'CREATE_PROGRAM'
EDIT_PROGRAM = 'EDIT_PROGRAM'
DELETE_PROGRAM = 'DELETE_PROGRAM'
START_PROGRAM = 'START_PROGRAM'
STOP_PROGRAM = 'STOP_PROGRAM'
PAUSE_PROGRAM = 'PAUSE_PROGRAM'

CREATE_CHART = 'CREATE_CHART'
DELETE_CHART = 'DELETE_CHART'

CREATE_SENSOR = 'CREATE_SENSOR'

client = MongoClient('mongopi', 27017, username='[user]', password='[password]')
# client = MongoClient('localhost', 27017)
db = client.data


credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-mqtt',
                                                               5672,
                                                               '/',
                                                               credentials))
# connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='rpc_queue')

def send_response(groups, devices, programs, sensors, charts): #(отправка серверу)
    data = []
    if (groups):
        for group in db.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            data.append(json.dumps(group))
    if (devices):
        for device in db.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,  '_id': 0}):
            device['key'] = 'device'
            data.append(json.dumps(device))
    if (programs):
        for program in db.growingPrograms.find({}, {'id':1, 'programName':1, 'group':1, 'days':1, 'status':1, 'blocks':1, '_id': 0}):
            program['key'] = 'program'
            data.append(json.dumps(program))
    if (sensors):
        for sensor in db.sensors.find({}, {'name':1, 'type':1, 'value':1, 'values':1, 'MACaddr':1, 'id':1, '_id': 0}):
            sensor['key'] = 'sensor'
            data.append(json.dumps(sensor))
    if (charts):
        for chart in db.charts.find({}, {'id':1, 'type':1, 'value':1, 'MACaddr':1, 'name':1, 'groupId':1,'_id': 0}):
            chart['key'] = 'chart'
            data.append(json.dumps(chart))
    data.append(json.dumps({'key':'end'}))
    return data

def create_group(data):
    collection = db.groups
    collection.insert_one(data)
    data = send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False)
    return data 

def edit_group(data):
    collection = db.groups
    collection.update_one({
            'id': data['id']
            },{
            '$set': {
                'title': data['title'],
                'devices': data['devices'],
                'solution': data['solution'],
                'plant': data['plant'],
                'program': data['program']
            }
            }, upsert=False)
    data = send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False)
    return data

def delete_group(data):
    collection = db.groups
    collection.delete_one({"id":data['id']})
    data = send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False)
    return data

def create_device(data):
    collection = db.device
    collection.insert_one(data)
    data = send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False)
    return data

def edit_device(data):
    collection = db.device
    collection.update_one({
            'id': data['id']
            },{
            '$set': {
                'name': data['name'],
                'MACaddr': data['MACaddr']
            }
            }, upsert=False)
    data = send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False)
    return data

def delete_device(data):
    collection = db.device
    collection.delete_one({"id":data['id']})
    data = send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False)
    return data

def create_program(data):
    collection = db.growingPrograms
    collection.insert_one(data)
    data = send_response(groups = True,  devices = False, programs = True, sensors = False, charts = False)
    return data

def edit_program(data):
    collection = db.growingPrograms
    collection.update_one({
            'id': data['id']
            },{
            '$set': {
                'programName': data['programName'],
                'group': data['group'],
                'days': data['days'],
                'blocks': data['blocks']
            }
            }, upsert=False)
    data = send_response(groups = True,  devices = False, programs = True, sensors = False, charts = False)
    return data

def start_program(data):
    collection = db.growingPrograms
    collection.update_one({
            'id': data['id']
            },{
            '$set': {
                'status': 'start'
            }
            }, upsert=False)
    data = send_response(groups = True,  devices = False, programs = True, sensors = False, charts = False)
    return data

def pause_program(data):
    collection = db.growingPrograms
    collection.update_one({
            'id': data['id']
            },{
            '$set': {
                'status': 'pause'
            }
            }, upsert=False)
    data = send_response(groups = True,  devices = False, programs = True, sensors = False, charts = False)
    return data

def stop_program(data):
    collection = db.growingPrograms
    collection.update_one({
            'id': data['id']
            },{
            '$set': {
                'status': 'stop'
            }
            }, upsert=False)
    data = send_response(groups = True,  devices = False, programs = True, sensors = False, charts = False)
    return data

def delete_program(data):
    collection = db.growingPrograms
    collection.delete_one({"id":data['id']})
    data = send_response(groups = True,  devices = False, programs = True, sensors = False, charts = False)
    return data

def create_chart(data):
    collection = db.charts
    collection.insert_one(data)
    data = send_response(groups = True,  devices = True, programs = False, sensors = True, charts = True)
    return data

def delete_chart(data):
    collection = db.charts
    collection.delete_one({"id":data['id']})
    data = send_response(groups = True,  devices = True, programs = False, sensors = True, charts = True)
    return data

def create_sensor(data):
    collection = db.sensors
    result = collection.find_one({'MACaddr':data['MACaddr']})
    for key in data['sensors']:
        print (key)
        collection.insert_one({ 'MACaddr': data['MACaddr'], 'name': data['name'], 'type': key })
    collection = client.data.devices
    collection.insert_one({ 'id': uuid.uuid1(),'MACaddr': data['MACaddr'], 'name': data['name'] })

def on_request(ch, method, props, body):
    dict = json.loads(body)
    print(dict)
    if (dict['action'] == AUTH):
        data = send_response(groups = True,  devices = True, programs = True, sensors = True, charts = True)
    elif (dict['action'] == CREATE_GROUP):
        data = create_group(dict)
    elif (dict['action'] == EDIT_GROUP):
        data = edit_group(dict)
    elif (dict['action'] == DELETE_GROUP):
        data = delete_group(dict)
    elif (dict['action'] == CREATE_DEVICE):
        data = create_device(dict)
    elif (dict['action'] == EDIT_DEVICE):
        data = edit_device(dict)
    elif (dict['action'] == DELETE_DEVICE):
        data = delete_device(dict)
    elif (dict['action'] == CREATE_PROGRAM):
        data = create_program(dict)
    elif (dict['action'] == EDIT_PROGRAM):
        data = edit_program(dict)
    elif (dict['action'] == DELETE_PROGRAM):
        data = delete_program(dict)
    elif (dict['action'] == CREATE_CHART):
        data = create_chart(dict)
    elif (dict['action'] == DELETE_CHART):
        data = delete_chart(dict)
    # data = []
    for list in data:
        ch.basic_publish(exchange='',routing_key=props.reply_to,properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id), body=list)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='rpc_queue', on_message_callback=on_request)

print(" [x] Awaiting RPC requests")
print(" test #2")
channel.start_consuming()