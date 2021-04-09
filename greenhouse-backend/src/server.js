import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import connectStore from "connect-mongo";
import cors from "cors";
import bodyParser from "body-parser";
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
  paramRoutes,
  reportRoutes
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

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
    app.use(bodyParser.json())

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
    apiRouter.use('/report', reportRoutes);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


   
  } catch (err) {
    console.log(err);
  }
})(); 