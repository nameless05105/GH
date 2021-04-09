// var app = require('express')();
// var server = require('http').Server(app);
// var Server = require('socket.io');
const e = require('./event.js');
const ContainerCtrl = require('../controllers/container-ctrl');

const Container = require('../models/container')

e.on('startSocket',  function Socket() {
  
  var io = require('socket.io')(8090);
  console.log('socket on')

    io.on('connection', (socket) => {
      console.log("conn")
      
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

      if (message === 'GETDATA') {
        console.log(message)
        ContainerCtrl.getContainersName;
        console.log("nanan",JSON.stringify(data))
        let containersArray = []

        // Container.find({}, {name:1, _id:0}, (err, containers) => {
        //     if (err) {
        //         return res.status(400).json({ success: false, error: err })
        //     }
        //     if (!containers.length) {
        //         return res
        //             .status(404)
        //             .json({ success: false, error: 'container not found' })
        //     }
        //     containersArray = containers.map(function(obj) {
        //         return obj.name;
        //       });
        //     console.log('rjyntqyths',containersArray)
        //     socket.emit('REQUESTDATA', JSON.stringify(containersArray));
        // }).catch(err => console.log(err))


        Container.findOne({ name: 'c1' }, {action:0, _id:0, greenhouse:0, __v:0}, (err, container) => {
            if (err) {
              console.log('err')
            }
    
            if (!container) {
              console.log('not found')
            }
            console.log('rjyntqyths',container)
            socket.emit('REQUESTDATA', JSON.stringify(container));
        }).catch(err => console.log(err))
      }

      if (message === 'MODULES_FOR_DATE') {
        console.log(message)
        data.action = message;
        let json_str = JSON.stringify(data);
        e.emit('socket_modules_for_date', json_str);
        e.on('channel_modules_for_date', n=>{
          console.log(n.modules1)
          socket.emit('UPDATE_MODULES_FOR_DATE', n.modules1);
          })
      }
    });
  });
});


