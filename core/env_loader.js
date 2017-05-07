'use strict';

const path = require('path');

const env = 'dev';
const configPaths = {
  'schema' : '../config/required_env.json',
  'dev' : '../config/app_config/.env_dev',
  'tst' : '../config/app_config/.env_tst',
  'prd' : '../config/app_config/.env_prd'
};
class EnvLoader {

  constructor() {
    this._initLogger();
  }

  _initLogger() {
    this.logger = require('./logger');
  }

  _loadFromDotEnv() {
    if (!configPaths[env]) {
      this.logger.warn(`Missing env to load config file: ${env}`);
      this.logger.warn(`Supported environments:\n ${JSON.stringify(configPaths, null, 2)}`);
      return;
    }
    require('dotenv').config({
      path: path.join(__dirname, configPaths[env]),
      silent: true
    });
  }

  _validateRequiredVars() {
    try {
      let isValid = true;
      let required_env = require(configPaths['schema']);

      if (!required_env) {
        this.logger.warn(`Missing required env variable: ${required_env}`);
        return false;
      }
      required_env.forEach((envField) => {
        if (!process.env[envField]) {
          this.logger.warn(`Missing required env variable: ${envField}`);
          isValid = false;
        }
      });
      return isValid;
    } catch(e) {
      this.logger.error('Encountered an error while attempting to validate environment variables.');
      this.logger.error(JSON.stringify(e, null, 2));
    }
    return false;
  }

  load() {
    this._loadFromDotEnv();
    return this._validateRequiredVars();
  }
}

module.exports = new EnvLoader();
