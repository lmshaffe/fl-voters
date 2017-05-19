const express = require('express')
const router = express.Router()

module.exports = function(app) {
  let logger = app.locals.logger
  logger.info('Initializing get_voter routes.')
  const voterError = require('../util/error/voterError')(app)
  const voterDbApi = require('../apis/db/voterDbApi')(app)

  router.get('/voters', getVoters)
  router.get('/voters/:voterId', getVotersById)

  async function getVoters(req, res, next) {
    let {page, limit, firstName, lastName} = extractRequestData(req)
    try {
      let results = await voterDbApi.getVoters(page, limit, firstName, lastName)
      if (results) {
        let {isMore, totalCount, totalPages} = results
        let response = {isMore, totalCount, totalPages, results}
        res.json(response)
      }
      else res.status(voterError.notFound.status).json(voterError.notFound)
    } catch (err) {
      logger.error('get_voter:getVoters:')
      logger.error(err)
      res.status(voterError.exception.status).json(voterError.exception)
    }
  }

  async function getVotersById(req, res, next) {
    let {voterId} = req.params
    try {
      let voterResults = await voterDbApi.getVotersById(voterId)
      if (voterResults) res.json(voterResults);
      else res.status(voterError.notFound.status).json(voterError.notFound);
    } catch (err){
      logger.error('get_voter:getVotersById:');
      logger.error(err);
      res.status(voterError.exception.status).json(voterError.exception);
    }
  }

  function extractRequestData(req) {
    let page = parseInt(req.query.page)
    page = (Number.isInteger(page) && page > 0) ? page : 1
    let limit = parseInt(req.query.limit)
    limit = (Number.isInteger(limit) && limit > 0 && limit <= 250) ? limit : 50
    return {
      page: +req.query.page || 1,
      limit: limit,
      firstName: req.query.firstName || req.query.firstname || null,
      lastName: req.query.lastName || req.query.lastname || null
    }
  }

  logger.info('Initializing get_voter complete.')
  return router
};
