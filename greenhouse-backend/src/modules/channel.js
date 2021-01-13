
const e = require('./event.js');
var amqp = require('amqplib/callback_api');
var groups = new Array;
var devices = new Array;
var programs = new Array;
var sensors = new Array;
var charts = new Array;
var configurations = new Array;
var containers = new Array;
var greenhouses = new Array;
var technology = new Array;
var users = new Array;
var modules = new Array;

// rabbitmq-mqtt
amqp.connect('amqp://localhost', function(error0, connection) {
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
      console.log('вот это место')
      let obj = JSON.parse(msg.content.toString());
          switch(obj.key) {
            case 'module':  {
              modules.push(obj);
              break;
            }
            case 'successfull':  {
              e.emit('channel', {obj});
              break;
            }
            case 'container':  {
              containers.push(obj);
              break;
            }
            case 'configuration':  {
              configurations.push(obj);
              console.log(configurations);
              break;
            }
            case 'greenhouse':  {
              greenhouses.push(obj);
              break;
            }
            case 'end':  {
              e.emit('channel', {containers, modules, configurations, greenhouses});
              console.log('done')
              modules = [];
              containers = [];
              configurations = [];
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
            case 'configuration':  {
              configurations.push(obj);
              console.log(configurations);
              break;
            }
            case 'container':  {
              containers.push(obj);
              break;
            }
            case 'greenhouse':  {
              greenhouses.push(obj);
              break;
            }
            case 'technology':  {
              technology.push(obj);
              break;
            }
            case 'user':  {
              users.push(obj);
              break;
            }
            case 'module':  {
              modules.push(obj);
              break;
            }
            case 'end':  {
              e.emit('channel', { configurations, containers, greenhouses, technology, users, modules});
              configurations = [];
              containers = [];
              greenhouses = [];
              technology = [];
              users = [];
              modules = [];
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




