const express = require('express');
const router = express.Router();

module.exports = function(app) {
  let logger = app.locals.logger;
  logger.info('Initializing get_voter routes.');
  const voterError = require('../util/error/voterError')(app);
  const voterDbApi = require('../apis/db/voterDbApi')(app);

  router.get('/voters', getVoters);
  router.get('/voters/:voters', getVoters);

  async function getVoters(req, res, next) {
    let voters = req.params.voters;
    try {
      let voterResults = await voterDbApi.getVoters(voters)
      if (voterResults) res.json(voterResults);
      else res.status(voterError.notFound.status).json(voterError.notFound);
    } catch (err){
      logger.error('get_voter:getVoters:');
      logger.error(err);
      res.status(voterError.exception.status).json(voterError.exception);
    }
  }

  logger.info('Initializing get_voter complete.');
  return router;
};
