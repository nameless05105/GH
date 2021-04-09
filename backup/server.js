import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import connectStore from "connect-mongo";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import {  
  userRoutes, 
  sessionRoutes,
  containerRoutes,
  configurationRoutes,
  technologyRoutes,
  greenhouseRoutes,
  moduleRoutes,
  onedaydataRoutes,
  sensorRoutes,
  paramRoutes
} from './routes/index'; 
import {
  PORT, NODE_ENV, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME
} from "./config";

const e = require('./modules/event.js');
let channel = require('./modules/channel');
let socket = require('./modules/socket');
e.emit('startSocket');

(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log('MongoDB connected');

    const app = express();

    app.disable('x-powered-by');
    app.use(cors())
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // app.use('/static', express.static(path.join(__dirname, './public/static')));
    // app.get('*', function(req, res) {
    //   res.sendFile('index.html', {root: path.join(__dirname, './public/')});
    // });

    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) res.status(500).send(err)
      })
    });


    



    const MongoStore = connectStore(session);

    app.use(session({
      name: SESS_NAME,
      secret: SESS_SECRET,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(SESS_LIFETIME) / 1000,
      }),
      saveUninitialized: false,
      resave: false,
      cookie: {
        sameSite: true,
        secure: NODE_ENV === 'development',
        maxAge: parseInt(SESS_LIFETIME)
      }
    }));

    const apiRouter = express.Router();
    app.use('/api', apiRouter);
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/session', sessionRoutes);
    apiRouter.use('/container', containerRoutes);
    apiRouter.use('/configuration', configurationRoutes);
    apiRouter.use('/technology', technologyRoutes);
    apiRouter.use('/greenhouse', greenhouseRoutes);
    apiRouter.use('/module', moduleRoutes);
    apiRouter.use('/one', onedaydataRoutes);
    apiRouter.use('/sensor', sensorRoutes);
    apiRouter.use('/parameters', paramRoutes);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


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

    var connections = new Map();

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
              connection.send(JSON.stringify({
                      head: "A-Containers",
                      body: ["1","2","3"]
              }))  
              break;

            case "Q-Container":
              var container = msg.body.container;
              connection.send(JSON.stringify({
                      head: "A-Container",
                      body: {
                          "name": container,
                          "address": 1,
                          "channel": 1,
                          "sensors": [
                            {
                              "count": 1,
                              "period": 45,
                              "structure": [
                                {
                                  "type": "Air_temperature",
                                  "count": 1
                                },
                                {
                                  "type": "Air_humidity",
                                  "count": 1
                                }
                              ]
                            },
                            {
                              "count": 1,
                              "period": 20,
                              "structure": [
                                {
                                  "type": "Illumination_level",
                                  "count": 2
                                }
                              ]
                            }
                          ],
                          "devices": [
                            {
                              "count": 3,
                              "structure": [
                                {
                                  "type": "Phytolamp_PWM",
                                  "time_type": "hour",
                                  "frequency": 1,
                                  "period": 15,
                                  "bias": 7,
                                  "count": 1
                                }
                              ]
                            }
                          ]
                        }
                        
              }))  
              break;
              // Container.find({}, {name:1, _id:0}, (err, containers) => {
              //     if (err) {
              //         return res.status(400).json({ success: false, error: err })
              //     }
              //     if (!containers.length) {
              //         return res
              //             .status(404)
              //             .json({ success: false, error: 'container not found' })
              //     }
              //     let containersArray = containers.map(function(obj) {
              //         return obj.name;
              //       });
                  
              //     connection.send(JSON.stringify({
              //       head: "A-Containers",
              //       body: {containersArray}
              //     }))  

              //     return containersArray;
              // }).catch(err => console.log(err))


              break;

        }

      });
    });


   
  } catch (err) {
    console.log(err);
  }
})(); 