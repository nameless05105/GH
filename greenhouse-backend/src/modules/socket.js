
const e = require('./event.js');
const ContainerCtrl = require('../controllers/container-ctrl');

const Container = require('../models/container')

e.on('startSocket',  function Socket() {
  
  var io = require('socket.io')(8090);
  console.log('socket on')

    io.on('connection', (socket) => {
    console.log("conn");

    socket.on('sendData', (data , message) => {
      
      if (message === 'MODULES') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket_modules', json_str);
        e.on('channel_modules', n=>{
          socket.emit('UPDATE_MODULES', n.modules);
          })
      }

      if (message === 'MODULES_FOR_DATE') {
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket_modules_for_date', json_str);
        e.on('channel_modules_for_date', n=>{
          console.log(n.modules1)
          socket.emit('UPDATE_MODULES_FOR_DATE', n.modules1);
          })
      }

      if (message === 'COMBINED_MODULES') {
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket_combined_modules', json_str);
        e.on('channel_combined_modules', n=>{
          console.log(n.modules1)
          socket.emit('UPDATE_COMBINED_MODULES', n.modules1);
          })
      }

      // if (message === 'R') {
      //   data.action = message;
      //   let json_str = JSON.stringify(data);
      //   e.emit('socket_combined_modules', json_str);
      //   e.on('channel_combined_modules', n=>{
      //     console.log(n.modules1)
      //     socket.emit('UPDATE_COMBINED_MODULES', n.modules1);
      //     })
      // }



    });
  });

  io.on('disconnect', () => {
    socket.emit('disconnected');
  });
    
});


