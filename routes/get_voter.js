const express = require('express');
const router = express.Router();

module.exports = function(app) {
  let logger = app.locals.logger;
  logger.info('Initializing get_voter routes.');
  const voterError = require('../util/error/voterError')(app);
  const voterDbApi = require('../apis/db/voterDbApi')(app);

  router.get('/voters', getVoters);
  router.get('/voters/:voters', getVoters);

  function getVoters(req, res, next) {
    let voters = req.params.voters;
    voterDbApi.getVoters(voters)
    .then(voters => {
      if (voters) res.json(voters);
      else res.status(voterError.notFound.status).json(voterError.notFound);
    })
    .catch(err => {
      logger.error('get_voter:getVoters - Error: ${err}');
      res.status(voterError.exception.status).json(voterError.exception);
    })
  }

  logger.info('Initializing get_voter complete.');
  return router;
};
