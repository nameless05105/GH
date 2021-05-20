var WebSocketServer = require('websocket').server;       //
var WebSocketClient = require('websocket').client;       //
var WebSocketFrame  = require('websocket').frame;        //  Подключаем все компоненты библиотеки для работы с вебсокетами
var WebSocketRouter = require('websocket').router;       //
var W3CWebSocket    = require('websocket').w3cwebsocket; //

var http_s  = require('http').Server(app); //Подключаем сервер
const port = 7777;                         //Порт
http_s.listen(port, ()=>{
    console.log('[LAUNCHING]: Listening on ' + port);
});
var server = new WebSocketServer({
    httpServer           : http_s,        //Указываем на листенер
    autoAcceptConnections: true           //Авто-подключение
});

const Container = require('../models/container')

e.on('startMobileAppSocket',  function Socket() {

    server.on('connect', (connection)=>{
        connection.on('message', (data)=>{
            console.log(data);
            var msg = JSON.parse(data.utf8Data);
            
            switch(msg.head)
            {
                case "Q-Login":
                  connection.send(JSON.stringify({
                    head: "A-Login",
                    body: {
                      "success":true,
                      "session":"x_fj_YM2v6y41aPeR_9DaDlioD31o9kA"
                      }
                  }))
                  break;
        
        
                case "Q-Containers":
                    Container.find({}, {name:1, _id:0}, (err, containers) => {
                        if (err) {
                            console.log(err)
                        }
                        let containersArray = containers.map(function(obj) {
                            return obj.name;
                            });
                        connection.send(JSON.stringify({
                            head: "A-Containers",
                            body: containersArray
                        }))
                    }).catch(err => console.log(err)) 
                    break;
        
                case "Q-Container":
                  var container = msg.body.container;
                  Container.findOne({ name: container }, (err, container) => {
                    connection.send(JSON.stringify({
                        head: "A-Container",
                        body: container     
                    }))  
                  })
                  break;
            }
        
        });
    });

})


