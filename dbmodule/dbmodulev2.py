import pymongo
import json
import pika
import sys
from pymongo import MongoClient

def init_connect_db(host='mongopi', port=27017, username='[user]', password='[password]'):
    client = MongoClient(host, port, username=username, password=password)
    db = client.data
    return db

def init_connect_rabbitmq(host='rabbitmq-mqtt', port=5672, username='guest', password='guest', virtual_host='/'):
    credentials = pika.PlainCredentials(username, password)
    connection = pika.BlockingConnection(pika.ConnectionParameters(host, port, virtual_host, credentials))
    return connection

def exit_connect_rabbitmq(connection):
    connection.close()

def send_response(groups, devices, programs, sensors, charts, db): #(отправка серверу)
    data = []
    if (groups):
        for group in db.groups.find({}, {'id':1, 'title':1, 'devices':1, 'solution':1, 'plant':1, 'program':1, '_id': 0}):
            group['key'] = 'group'
            # message = json.dumps(group)
            data.append(json.dumps(group))
            # отправка сообщения в очередь
    if (devices):
        for device in db.devices.find({}, {'id':1, 'name':1, 'MACaddr':1,  '_id': 0}):
            device['key'] = 'device'
            data.append(json.dumps(group))
    if (programs):
        for program in db.growingPrograms.find({}, {'id':1, 'programName':1, 'group':1, 'days':1, 'status':1, 'blocks':1, '_id': 0}):
            program['key'] = 'program'
            data.append(json.dumps(group))
    if (sensors):
        for sensor in db.sensors.find({}, {'name':1, 'type':1, 'value':1, 'values':1, 'MACaddr':1, 'id':1, '_id': 0}):
            sensor['key'] = 'sensor'
            data.append(json.dumps(group))
    if (charts):
        for chart in db.charts.find({}, {'id':1, 'type':1, 'value':1, 'MACaddr':1, 'name':1, 'groupId':1,'_id': 0}):
            chart['key'] = 'chart'
            data.append(json.dumps(group))
    message = json.dumps({'key':'end'})
    return data
    # отправление данных в очередь

def create_group(db,data):
    collection = db.groups
    collection.insert_one(data)
    send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False, db = db)

def edit_group(db,data):
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
    send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False, db = db)

def delete_group(db,data):
    collection = db.groups
    collection.delete_one({"id":data['id']})
    send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False, db = db)

def create_device(db,data):
    collection = db.device
    collection.insert_one(data)
    send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False, db = db)

def edit_device(db,data):
    collection = db.device
    collection.update_one({
            'id': data['id']
            },{
            '$set': {
                'name': data['name'],
                'MACaddr': data['MACaddr']
            }
            }, upsert=False)
    send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False, db = db)

def delete_device(db,data):
    collection = db.device
    collection.delete_one({"id":data['id']})
    send_response(groups = True,  devices = True, programs = False, sensors = False, charts = False, db = db)


def on_request(ch, method, props, body):
    print(body)
    dict = json.loads(body)
    dict['action']
    del dict['action']
    # проверка ключа
    message = json.dumps({'key':'end'})
    ch.basic_publish(exchange='', routing_key=props.reply_to, properties=pika.BasicProperties(correlation_id = props.correlation_id),
                        body=message)
    ch.basic_ack(delivery_tag=method.delivery_tag)


init_connect_db();
init_connect_rabbitmq();

