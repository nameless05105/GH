#!/usr/bin/python
# coding=utf-8
import serial
import json
import UJ_analyzer as UJ

connection = UJ.init_connect()
try:
    # port = serial.Serial("/dev/ttyS0", baudrate=9600, timeout=0.5)
    port = serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=0.5)
    input_json = []
    data = {'address': [], 'number': [], 'graph': []}

    rcv = ''
    level = 0
    while True:
        rcv = rcv + port.read(1)
        if len(rcv) > 0:
            if rcv[-1] == '{':
                level += 1
            elif rcv[-1] == '}':
                level -= 1
                if level <= 0:
                    if level == 0:
                        try:
                            packet = json.loads(rcv)
                            UJ.data_handler(packet=packet, data=data, connection=connection)
                        except Exception as exception:
                            print('Error: ' + str(exception))
                    else:
                        level = 0
                    rcv = ''
            else:
                if level == 0:
                    rcv = ''

except Exception:
    UJ.exit_connect(connection)

