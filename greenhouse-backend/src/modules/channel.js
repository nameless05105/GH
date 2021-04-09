const e = require('./event.js');
var amqp = require('amqplib/callback_api');
var modules = new Array;
var modules1 = new Array;
amqp.connect('amqp://95.181.230.220', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue('data-for-server_modules', {durable: false});
    channel.assertQueue('data-for-server_modules_for_date', {durable: false});
    channel.assertQueue('data-for-server', {durable: false});
    channel.prefetch(1);

    channel.consume('data-for-server_modules', function(msg) {
      let obj = JSON.parse(msg.content.toString());
          switch(obj.key) {
            case 'modules':  {
              modules.push(obj);
              break;
            }
            case 'end':  {
              e.emit('channel_modules', {modules});
              modules = [];
              break;
            }
            default:
              break;
          }
      
    }, {
      noAck: true
    });

    channel.consume('data-for-server_modules_for_date', function(msg) {
      let obj = JSON.parse(msg.content.toString());
          switch(obj.key) {
            case 'modules':  {
              modules1.push(obj);
              break;
            }
            case 'end':  {
              e.emit('channel_modules_for_date', {modules1});
              modules1 = [];
              break;
            }
            default:
              break;
          }
      
    }, {
      noAck: true
    });

    e.on('socket_modules',  n=>{channel.sendToQueue('rpc_queue_modules',Buffer.from(n));
                          console.log("send to queue",n)}    
    );

    e.on('socket_modules_for_date',  n=>{channel.sendToQueue('rpc_queue_modules_for_date',Buffer.from(n));
        console.log("send to queue",n)}    
    );
    
  });
});




