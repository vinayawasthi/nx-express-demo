/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import config from './config/config';
import express = require('express');
import mongoose from 'mongoose';
import { Logging } from './app/library/logging';
import authorRoutes from './app/routes/Author';
import bookRoutes from './app/routes/Book';

const app = express();
mongoose.connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("mongo server connected");
    startServer();
  }).catch((error) => {
    Logging.error("mongo server unable to connect");
    Logging.error(error);
  });

const startServer = () => {
  app.use((req, res, next) => {
    Logging.info(`Incoming Method [${req.method}] -> Url [${req.url}] -> IP [${req.socket.remoteAddress}]`);
    req.on('finish', () => {
      Logging.info(`Incoming Method [${req.method}] -> Url [${req.url}] -> IP [${req.socket.remoteAddress}] -> Status [${res.statusCode}]`);
    });
    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Acess-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
    }
    next();
  });
  /* App Routes */
  app.use(authorRoutes);
  app.use(bookRoutes);
  /* Health Check */
  app.get('/ping', (req, res, next) => { res.status(200).json({ message: 'pong' }) });
  /* No Found Request */
  app.use((req, res, next) => {
    const error = new Error("REQUEST URL NO FOUND");
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });
  /* Starting Server */
  const server = app.listen(config.server.port, () => {
    Logging.info(`Listening at http://localhost:${config.server.port}`);
  });
  server.on('error', Logging.error);
  server.on('close',  Logging.info)
}


