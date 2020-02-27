# coding=utf-8
import json
import pika

sensor_type = {'HW-666':  ['voltage'],
               'DS18B20': ['temp'],
               'DHT': ['temp', 'humidity'],
               'GY-BMP280': ['temp', 'pressure'],
               'CJMCU-811': ['eCO2', 'nTVOC'],
               'HTU21D':  ['temp', 'humidity'],
               'TSL2561': ['light']}


def init_connect(username='guest', password='guest',  host='rabbitmq', port=5672, virtual_host='/'):
    credentials = pika.PlainCredentials(username, password)
    connection = pika.BlockingConnection(pika.ConnectionParameters(host, port, virtual_host, credentials))
    return connection


def exit_connect(connection):
    connection.close()


def data_handler(packet, data, connection=None):
    if 'MACaddr' in packet and 'num' in packet:
        server_packet = {'MACaddr': str(packet['MACaddr'])}
        if str(packet['MACaddr']) in data['address']:
            num_address = data['address'].index(str(packet['MACaddr']))
            # Проверка повтора пакетов
            if packet['num'] <= data['number'][num_address]:
                # При переполнении int16 (max ~= 65тыс) счётчик пакетов обнулится
                if not ((packet['num'] < 15) and (65000 < data['number'][num_address])):
                    return
        else:
            data['address'].append(str(packet['MACaddr']))
            data['number'].append(-1)
            data['graph'].append({})

        num_address = data['address'].index(str(packet['MACaddr']))
        data['number'][num_address] = packet['num']
        print 'MAC-адресс ' + str(packet['MACaddr'])
        print 'Номер пакета: ' + str(packet['num'])

        for sensor in sensor_type:
            if sensor in packet:
                server_packet["name"] = sensor
                print sensor + ':'
                for indicator in sensor_type[sensor]:
                    if indicator in packet[sensor]:
                        server_packet[indicator] = {'value': str(packet[sensor][indicator])}
                        print '  ' + indicator + ' = ' + str(packet[sensor][indicator])
                server_packet = json.dumps(server_packet)
                print server_packet
                if not (connection is None):
                    channel = connection.channel()
                    channel.queue_declare(queue='data1')
                    message = server_packet
                    channel.basic_publish(exchange='', routing_key='data1', body=message)

        print ''
        # UJ_graph.print_graph(data['graph'][num_address])
