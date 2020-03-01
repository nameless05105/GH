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
      
      if (message === 'Auth') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
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
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          })
      }
      if (message === 'EDIT_DEVICE') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          })
      }
      if (message === 'DELETE_DEVICE') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          })
      }
      if (message === 'CREATE_GROUP') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          })
      }
      if (message === 'EDIT_GROUP') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          })
      }
      if (message === 'DELETE_GROUP') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          })
      }

      if (message === 'CREATE_PROGRAM') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_PROGRAM_DATA', n.programs);
          })
      }

      if (message === 'EDIT_PROGRAM') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_PROGRAM_DATA', n.programs);
          })
      }

      if (message === 'DELETE_PROGRAM') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_PROGRAM_DATA', n.programs);
          })
      }

      if (message === 'CREATE_CHART') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          socket.emit('UPDATE_SENSOR_DATA', n.sensors);
          socket.emit('UPDATE_CHART_DATA', n.charts);
          })
      }

      if (message === 'DELETE_CHART') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_DEVICE_DATA', n.devices);
          socket.emit('UPDATE_GROUP_DATA', n.groups);
          socket.emit('UPDATE_SENSOR_DATA', n.sensors);
          socket.emit('UPDATE_CHART_DATA', n.charts);
          })
      }

    });

  });

}

);


