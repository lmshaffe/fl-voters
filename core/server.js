'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

class Server {

  constructor() {
    this.initLogger();
    this.initDB();
    this.initExpressMiddleware();
    this.initRoutes();
  }

  initLogger() {
    app.locals.logger = require('./logger');
  }

  start(port) {
    app.listen(port, () => app.locals.logger.info('app listening on port ' + port));
  }

  initExpressMiddleware() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
  }

  initDB() {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.APP_MONGO_URI);
  }

  initRoutes() {
    app.use('/', require('../routes/request_logger')(app));
    app.use('/', require('../routes/index')(app));
    app.use('/', require('../routes/get_voter')(app));
  }
}

module.exports = new Server();
