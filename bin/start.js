'use strict';

const envLoader = require('../core/env_loader');
const logger = require('../core/logger');

if (envLoader.load()) {
  const port = process.env.PORT || process.env.APP_PORT_HTTP || 3000;
  const server = require('../core/server');
  server.start(port);
} else {
  logger.error('Cannot start server.');
  process.exit(1);
}
