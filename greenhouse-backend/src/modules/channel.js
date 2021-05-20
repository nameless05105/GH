const e = require('./event.js');
var amqp = require('amqplib/callback_api');
var modules = new Array;
var modules1 = new Array;
var combined_modules = new Array;
var reports = new Array;
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
    channel.assertQueue('data-for-server_combined_modules', {durable: false});
    channel.assertQueue('data-for-server', {durable: false});
    channel.assertQueue('data-for-server_data_for_reports1', {durable: false});
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

    channel.consume('data-for-server_data_for_reports1', function(msg) {
      let obj = JSON.parse(msg.content.toString());
          switch(obj.key) {
            case 'reports':  {
              reports.push(obj);
              console.log("obj",obj)
              break;
            }
            case 'end':  {
              e.emit('get_reports', {reports});
              reports = [];
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


    channel.consume('data-for-server_combined_modules', function(msg) {
      let obj = JSON.parse(msg.content.toString());
          switch(obj.key) {
            case 'combined_modules':  {
              combined_modules.push(obj);
              break;
            }
            case 'end':  {
              e.emit('channel_combined_modules', {combined_modules});
              combined_modules = [];
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

    e.on('socket_combined_modules',  n=>{channel.sendToQueue('rpc_queue_combined_modules',Buffer.from(n));
        console.log("send to queue",n)}    
    );

    e.on('socket_modules_for_date',  n=>{channel.sendToQueue('rpc_queue_modules_for_date',Buffer.from(n));
        console.log("send to queue",n)}    
    );

    e.on('send_to_rabbit',  n=>{channel.sendToQueue('rpc_queue_report_data1',Buffer.from(n));
      console.log("send to queue rpc_queue_report_data1",n)}    
    );
    
  });
});




