import os
import time

outputs_dir = '/home/pi/Project/dump'
def render_output_locations():
  return outputs_dir + time.strftime("%d-%m-%Y-%H:%M:%S")

def run_backup():
  command = "mongodump --host='mongopi' --port=27017"
  command += " --out " + render_output_locations()
  os.system(command)
  
while True:
    time.sleep(12*60*60)
    run_backup()