import json
import pika
import sys
import uuid
import datetime
import json
from pymongo import MongoClient
from bson.objectid import ObjectId

credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters('95.181.230.220',
                                                               5672,
                                                               '/',
                                                               credentials))
# connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))                                                               

channel = connection.channel()
channel.queue_declare(queue='rpc_queue_modules')
channel.queue_declare(queue='rpc_queue_modules_for_date')
channel.queue_declare(queue='rpc_queue_report_data1')

# channel.exchange_declare(exchange='logs', exchange_type='fanout')

client = MongoClient('95.181.230.220', 38128, username='SuperNora9', password='tYf74-Gnet5_yhx')
# client = MongoClient('localhost', 27017)

def reduce_data(mass):
    interval = len(mass) // 24
    new_mass = []
    for i in range(24):
        new_mass.append(mass[i*interval])
    return new_mass




def send_response(greenhouseID): 
    data = []
    # from_date = datetime.datetime.now() - datetime.timedelta(days=1)
    from_date = datetime.datetime.now() - datetime.timedelta(hours=1)
    to_date = datetime.datetime.now()  
    pipeline =  [
        {"$unwind": "$components.values"},
        {"$match": {"components.values.date": {"$gte": from_date, "$lt": to_date}}},
        {"$group":{ "_id":"$_id", "id":{"$first":"$id"}, "type":{"$first" :"$components.type"}, "values": {"$push": {"date":"$components.values.date","value":"$components.values.value"} } }},
        {"$sort": {'type': 1}}
    ]
    # collection = client.data.greenhouses.find_one({"_id":ObjectId(greenhouseID)})
    c = client.laboratory.modules.aggregate(pipeline)
    for record in c:
        record['key'] = 'modules'
        data.append(json.dumps(record, default=str))
    data.append(json.dumps({'key':'end'}))
    return data

def send_response_module_for_date(str_date): 
    data = []
    date = datetime.datetime.strptime(str_date, '%Y-%m-%d').date()                
    from_date = datetime.datetime(int(date.year), int(date.month), int(date.day), 0, 0, 0)
    to_date = datetime.datetime(int(date.year), int(date.month), int(date.day), 23, 59, 59)
    pipeline =  [
        {"$unwind": "$components.values"},
        {"$match": {"components.values.date": {"$gte": from_date, "$lt": to_date}}},
        {"$group":{ "_id":"$_id", "id":{"$first":"$id"}, "type":{"$first" :"$components.type"}, "values": {"$push": {"date":"$components.values.date","value":"$components.values.value"} } }},
        {"$sort": {'type': 1}}
    ]
    c = client.laboratory.modules.aggregate(pipeline)
    for record in c:
        record['values'] = reduce_data(record['values'])
        record['key'] = 'modules'
        data.append(json.dumps(record, default=str))
    data.append(json.dumps({'key':'end'}))
    return data

def send_response_data_for_reports(dict): 
    data = []
    startDate = datetime.datetime.strptime(dict["startDate"], '%Y-%m-%d %H:%M:%S')
    endDate = datetime.datetime.strptime(dict["endDate"], '%Y-%m-%d %H:%M:%S')
    from_date = datetime.datetime(int(startDate.year), int(startDate.month), int(startDate.day), int(startDate.hour), int(startDate.minute), int(startDate.second))
    to_date = datetime.datetime(int(endDate.year), int(endDate.month), int(endDate.day), int(endDate.hour), int(endDate.minute), int(endDate.second))
    print(from_date)  
    print(to_date) 
    pipeline =  [
        {"$unwind": "$components.values"},
        {"$match": {"components.values.date": {"$gte": from_date, "$lt": to_date}}},
        {"$group":{ "_id":"$_id", "id":{"$first":"$id"}, "type":{"$first" :"$components.type"}, "values": {"$push": {"date":"$components.values.date","value":"$components.values.value"} } }},
        {"$sort": {'type': 1}}
    ]
    c = client.laboratory.modules.aggregate(pipeline)
    for record in c:
        record['values'] = reduce_data(record['values'])
        record['key'] = 'reports'
        data.append(json.dumps(record, default=str))
    data.append(json.dumps({'key':'end'}))
    print(data)
    return data

def on_request_modules(ch, method, props, body):
    dict = json.loads(body)
    data = []
    if (dict['action'] == "MODULES"):
        if ('greenhouse' in dict):
            greenhouse = dict['greenhouse']
        else:
            greenhouse = "5fa953edf3be7ea1552f2485"
        data = send_response(greenhouseID = greenhouse)
    for list in data:
        ch.basic_publish(exchange='',routing_key='data-for-server_modules', body=list)
    ch.basic_ack(delivery_tag=method.delivery_tag)

def on_request_modules_for_date(ch, method, props, body):
    dict = json.loads(body)
    data = []
    # if (dict['action'] == "MODULES_FOR_DATE"):
    #     data = send_response_module_for_date(dict['date'])
    for list in data:
        ch.basic_publish(exchange='',routing_key='data-for-server_modules_for_date', body=list)
    ch.basic_ack(delivery_tag=method.delivery_tag)    

def on_request_report_data(ch, method, props, body):
    dict = json.loads(body)
    data = []
    print("тут")
    data = send_response_data_for_reports(dict)
    for list in data:
        ch.basic_publish(exchange='',routing_key='data-for-server_data_for_reports1', body=list)
    ch.basic_ack(delivery_tag=method.delivery_tag)  

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='rpc_queue_modules', on_message_callback=on_request_modules)
channel.basic_consume(queue='rpc_queue_report_data1', on_message_callback=on_request_report_data)
channel.basic_consume(queue='rpc_queue_modules_for_date', on_message_callback=on_request_modules_for_date)

print(" [x] Awaiting RPC requests")
print(" test #2")
channel.start_consuming()