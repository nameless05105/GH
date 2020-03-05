
const e = require('./event.js');
var amqp = require('amqplib/callback_api');
var groups = new Array;
var devices = new Array;
var programs = new Array;
var sensors = new Array;
var charts = new Array;
amqp.connect('amqp://rabbitmq-mqtt', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue('data-for-server', {
      durable: false
    });
    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'data-for-server');
    channel.consume('data-for-server', function(msg) {

      console.log(" [x] Received %s", msg.content.toString());
      let obj = JSON.parse(msg.content.toString());
          switch(obj.key) {
            case 'group':  {
              groups.push(obj);
              break;
            }
            case 'device':  {
              devices.push(obj);
              break;
            }
            case 'sensor':  {
              sensors.push(obj);
              break;
            }
            case 'successfull':  {
              e.emit('channel', {obj});
              break;
            }
            case 'end':  {
              e.emit('channel', {groups, devices, sensors});
              console.log('done')
              groups = [];
              devices = [];
              sensors = [];
              break;
            }
            default:
              break;
          }
      
    }, {
      noAck: true
    });
    
    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }

      var correlationId = '12345'
      var num 
      
      console.log(' [x] Req', num);
      

      channel.consume(q.queue, function(msg) {
        if (msg.properties.correlationId == correlationId) {
          console.log(' [.] Got %s', msg.content.toString());
          let obj = JSON.parse(msg.content.toString());
          switch(obj.key) {
            case 'group':  {
              groups.push(obj);
              break;
            }
            case 'device':  {
              devices.push(obj);
              break;
            }
            case 'program':  {
              programs.push(obj);
              break;
            }
            case 'successfull':  {
              e.emit('channel', {obj});
              break;
            }
            case 'sensor':  {
              sensors.push(obj);
              break;
            }
            case 'chart':  {
              charts.push(obj);
              break;
            }
            case 'end':  {
              e.emit('channel', {groups, devices, programs, sensors, charts});
              groups = [];
              devices = [];
              programs = [];
              sensors = [];
              charts = [];
              break;
            }
            default:
              break;
          }

        }
      }, {
        noAck: true
      });

      e.on('socket',  n=>{channel.sendToQueue('rpc_queue',
                          Buffer.from(n),{ 
                            correlationId: correlationId, 
                            replyTo: q.queue });
                          console.log("send to queue",n)}
                  
      );

    });
  });
});




