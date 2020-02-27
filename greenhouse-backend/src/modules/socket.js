// var app = require('express')();
// var server = require('http').Server(app);
// var Server = require('socket.io');
const e = require('./event.js');


e.on('startSocket',  function Socket() {
  
  var io = require('socket.io')(8090);
  console.log('socket on')

    io.on('connection', (socket) => {
      
    socket.on('sendData', (data , message) => {
      console.log(data, message);
      if (message === 'logOut') {
        socket.emit('UPDATE_GROUP_DATA', []);
        socket.emit('UPDATE_DEVICE_DATA', []);
        socket.emit('UPDATE_PROGRAM_DATA', []);
        socket.emit('UPDATE_SENSOR_DATA', []);
        
      }
      if (message === 'Auth') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log('channel',n.programs);
          console.log('channel',n.charts)
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          socket.emit('UPDATE_PROGRAM_DATA', n.programs);
          socket.emit('UPDATE_SENSOR_DATA', n.sensors);
          socket.emit('UPDATE_CHART_DATA', n.charts);
          })
      }
      if (message === 'CREATE_DEVICE') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log('channel', n)
          })
      }
      if (message === 'EDIT_DEVICE') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log('channel', n)
          })
      }
      if (message === 'DELETE_DEVICE') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log('channel', n)
          })
      }
      if (message === 'CREATE_GROUP') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log('channel', n)
          })
      }
      if (message === 'EDIT_GROUP') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log('channel', n)
          })
      }
      if (message === 'DELETE_GROUP') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log('channel', n)
          })
      }

    });

  });

}

);


