import pymongo
import json
import pika
import sys
import uuid
from pymongo import MongoClient

AUTH = 'Auth'
GET_DATA_FOR_GREENHOUSE = 'Get_Data_for_Greenhouse'
GET_GREENHOUSES = 'Get_Greenhouses'
GET_USERS = 'Get_Users'

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

CREATE_CONFIGURATION = 'CREATE_CONFIGURATION'
EDIT_CONFIGURATION = 'EDIT_CONFIGURATION'
DELETE_CONFIGURATION = 'DELETE_CONFIGURATION'

CREATE_CONTAINER = 'CREATE_CONTAINER'
EDIT_CONTAINER = 'EDIT_CONTAINER'
DELETE_CONTAINER = 'DELETE_CONTAINER'


# client = MongoClient('mongopi', 27017, username='[user]', password='[password]')
client = MongoClient('localhost', 27017)
db = client.data


# credentials = pika.PlainCredentials('guest', 'guest')
# connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq-mqtt',
#                                                                5672,
#                                                                '/',
#                                                                credentials))
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='rpc_queue')

def send_response(configurations, containers, greenhouses, greenhouse, technology, users, charts, modules ): #(отправка серверу)
    data = []
    if (charts):
        for chart in db.charts.find({}, {'id':1, 'type':1, 'value':1, 'MACaddr':1, 'name':1, 'groupId':1,'_id': 0}):
            chart['key'] = 'chart'
            data.append(json.dumps(chart))
    if (modules):
        for module in db.modules.find({}, {'components':1, '_id': 0}):
            module['key'] = 'module'
            data.append(json.dumps(module))
    if (configurations):
        for configuration in db.configurations.find({"greenhouse": greenhouse}, {'id':1, 'container':1, 'containerId':1,  'modules':1, '_id': 0}):
            configuration['key'] = 'configuration'
            data.append(json.dumps(configuration))
            print(data)
    if (containers):
        for container in db.containers.find({"greenhouse": greenhouse}, {'id':1, 'name':1, 'channel':1, 'address':1, 'sensors':1, 'devices':1, 'greenhouse':1, '_id': 0}):
            container['key'] = 'container'
            data.append(json.dumps(container))
            print(data)
    if (technology):
        for technology in db.technology.find({"greenhouse": greenhouse}, {'id':1, 'container':1, 'name':1,  'blocks':1, '_id': 0}):
            technology['key'] = 'technology'
            data.append(json.dumps(technology))
            print(data)
    if (greenhouses):
        for greenhouse in db.greenhouses.find({}, {'id':1, 'name':1, 'technologist':1, '_id': 0}):
            greenhouse['key'] = 'greenhouse'
            data.append(json.dumps(greenhouse))
    if (users):
        for user in db.users.find({}, {'username':1, 'email':1, 'greenhouse':1,  '_id': 0}):
            user['key'] = 'user'
            data.append(json.dumps(user))
    data.append(json.dumps({'key':'end'}))
    return data

# def create_configuration(data):
#     collection = db.configurations
#     collection.insert_one(data)
#     data = send_response(configurations = True, containers = True,  greenhouses = True, greenhouses = False)
#     return data

# def create_container(data):
#     collection = db.containers
#     print('creatr contr')
#     collection.insert_one(data)
#     data = send_response(configurations = True, containers = True,  greenhouses = True greenhouses = False)
#     return data

# def edit_container(data):
#     collection = db.containers
#     collection.update_one({
#             'id': data['id']
#             },{
#             '$set': {
#                 'name': data['name'],
#                 'address': data['address'],
#                 'channel': data['channel'],
#                 'sensors': data['sensors'],
#                 'devices': data['devices'],
#             }
#             }, upsert=False)
#     data = send_response(configurations = True, containers = True,  greenhouses = True)
#     return data

# def edit_configuration(data):
#     collection = db.configurations
#     collection.update_one({
#             'id': data['id']
#             },{
#             '$set': {
#                 'containerId': data['containerId'],
#                 'container': data['container'],
#                 'modules': data['modules']
#             }
#             }, upsert=False)
#     data = send_response(configurations = True, containers = True,  greenhouses = True)
#     return data

# def delete_configuration(data):
#     collection = db.configurations
#     collection.delete_one({"id":data['id']})
#     data = send_response(configurations = True, containers = True,  greenhouses = True)
#     return data

# def delete_container(data):
#     collection = db.containers
#     collection.delete_one({"id":data['id']})
#     data = send_response(configurations = True, containers = True,  greenhouses = True)
#     return data

def on_request(ch, method, props, body):
    dict = json.loads(body)
    print(dict)
    if (dict['action'] == GET_DATA_FOR_GREENHOUSE):
        data = send_response(configurations = True, containers = True, greenhouses = True, greenhouse = dict['id'], technology = True, users = True, charts = False, modules = True)
    if (dict['action'] == GET_GREENHOUSES):
        data = send_response(configurations = False, containers = False, greenhouses = True, greenhouse = '', technology = False, users = False, charts = False, modules = False)
    if (dict['action'] == GET_USERS):
        data = send_response(configurations = False, containers = False, greenhouses = False, greenhouse = '', technology = False, users = True, charts = False, modules = False)
    # elif (dict['action'] == DELETE_CONTAINER):
    #     data = delete_container(dict)
    # elif (dict['action'] == DELETE_CONFIGURATION):
    #     data = delete_configuration(dict)
    # elif (dict['action'] == EDIT_CONTAINER):
    #     data = edit_container(dict)
    # elif (dict['action'] == EDIT_CONFIGURATION):
    #     data = edit_configuration(dict)
    # elif (dict['action'] == CREATE_CONFIGURATION):
    #     data = create_configuration(dict)
    # elif (dict['action'] == CREATE_CONTAINER):
    #     data = create_container(dict)
    for list in data:
        ch.basic_publish(exchange='',routing_key=props.reply_to,properties=pika.BasicProperties(correlation_id = \
                                                                props.correlation_id), body=list)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='rpc_queue', on_message_callback=on_request)

print(" [x] Awaiting RPC requests")
print(" test #2")
channel.start_consuming()