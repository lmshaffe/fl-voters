
module.exports = function(app) {
  const Voter = require('../../db/models/voter');

  class voterDbApi {

    constructor() {
      this._app = app;
      this._logger = app.locals.logger;
    }

    getVoters(voters) {
      return new Promise((resolve, reject) => {
        let query = (!voters) ? Voter.find().limit(10)
                              : Voter.findOne({'_id': voters});
        this._queryDB(query).then(voters => {
          resolve(voters);
        }, err => {
          this._logger.error('voterDbApi:getVoters:');
          this._logger.error(err);
          reject(err);
        })
      })
    }

    _queryDB(query) {
      return query.lean().then(results => {
        return (results) ? results : null
      }, (err) => {
        this._logger.error('voterDbApi:_queryDB:');
        this._logger.error(err);
        throw new Error(err);
      });
    }
  }

  return new voterDbApi();
}
