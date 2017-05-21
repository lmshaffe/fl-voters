
module.exports = function(app) {
  const Voter = require('../../db/models/voter')

  class voterDbApi {

    constructor() {
      this._app = app
      this._logger = app.locals.logger
    }

    async getVotersById(voterId) {
      let query = Voter.findOne({'_id': voterId})
      try {
        let voters = await this._queryDb(query)
        return voters
      } catch (err){
        this._logger.error('voterDbApi:getVoterById:')
        this._logger.error(err)
        throw new Error(err);
      }
    }

    async getVoters(page, perPage, firstName, lastName) {
      let queryCondition = {}
      if (firstName) queryCondition.firstName = firstName
      if (lastName) queryCondition.lastName = lastName
      let findQuery = Voter.find(queryCondition).limit(perPage).skip(perPage * (page - 1)).sort({lastName: 'asc'})
      try {
        let [totalCount, voters] = await Promise.all([this._getDbCount(queryCondition), this._queryDb(findQuery)]);
        // let totalCount = await this._getDbCount(queryCondition)
        // let voters = await this._queryDb(query)
        voters.totalCount = totalCount
        voters.isMore = perPage * page < totalCount
        voters.totalPages = Math.ceil((totalCount / perPage))
        return voters
      } catch (err) {
        this._logger.error('voterDbApi:getVoters:')
        this._logger.error(err)
        throw new Error(err)
      }
    }

    async _queryDb(query) {
      return query.lean().then(results => {
        return (results) ? results : null
      }, (err) => {
        this._logger.error('voterDbApi:_queryDB:')
        this._logger.error(err)
        throw new Error(err)
      })
    }

    async _getDbCount(queryCondition) {
      return Voter.count(queryCondition).then(count => {
        return count
      }, (err) => {
        this._logger.error('voterDbApi:_getDbCount:')
        this._logger.error(err)
        throw new Error(err)
      })
    }
  }

  return new voterDbApi();
}
