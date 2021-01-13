// var app = require('express')();
// var server = require('http').Server(app);
// var Server = require('socket.io');
const e = require('./event.js');


e.on('startSocket',  function Socket() {
  
  var io = require('socket.io')(8090);
  // io = io.of('/sock');
  console.log('socket on')

    io.on('connection', (socket) => {
      
    socket.on('sendData', (data , message) => {
      console.log(data, message);
      if (message === 'Get_Data_for_Greenhouse') {
        data.action = message;
        let json_str = JSON.stringify(data);
        console.log('что отправляется в шину', json_str)
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log(n)
          socket.emit('UPDATE_CONFIGURATIONS', n.configurations);
          socket.emit('UPDATE_CONTAINERS', n.containers);
          socket.emit('UPDATE_TECHNOLOGY', n.technology);
          socket.emit('UPDATE_USERS', n.users);
          socket.emit('UPDATE_MODULES', n.modules);
          socket.emit('UPDATE_GREENHOUSES', n.greenhouses);
          })
      }
      if (message === 'Get_Greenhouses') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        console.log('что отправляется в шину', json_str)
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log(n)
          socket.emit('UPDATE_GREENHOUSES', n.greenhouses);
          })
      }
      if (message === 'Get_Users') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        console.log('что отправляется в шину', json_str)
        e.emit('socket', json_str);
        e.on('channel', n=>{
          console.log(n)
          socket.emit('UPDATE_USERS', n.users);
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

      if (message === 'CREATE_CONFIGURATION') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_CONFIGURATION_DATA', n.configurations);
          })
      }

      if (message === 'EDIT_CONFIGURATION') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_CONFIGURATION_DATA', n.configurations);
          })
      }
      
      if (message === 'DELETE_CONFIGURATION') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_CONFIGURATION_DATA', n.configurations);
          })
      }

      if (message === 'CREATE_CONTAINER') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_CONTAINERS', n.containers);
          })
      }

      if (message === 'EDIT_CONTAINER') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_CONTAINERS', n.containers);
          })
      }

      if (message === 'DELETE_CONTAINER') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_CONTAINERS', n.containers);
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

      if (message === 'START_PROGRAM') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_PROGRAM_DATA', n.programs);
          })
      }

      if (message === 'STOP_PROGRAM') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket', json_str);
        e.on('channel', n=>{
          socket.emit('UPDATE_PROGRAM_DATA', n.programs);
          })
      }

      if (message === 'PAUSE_PROGRAM') {
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


