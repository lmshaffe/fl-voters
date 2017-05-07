
module.exports = function(app) {
  const Voter = require('../../db/models/voter');

  class voterDbApi {

    constructor() {
      this._app = app;
      this._logger = app.locals.logger;
    }

    async getVoters(voters) {
      let query = (!voters) ? Voter.find().limit(10)
                            : Voter.findOne({'_id': voters});
      try {
        let voters = await this._queryDB(query);
        return voters;
      } catch (err){
        this._logger.error('voterDbApi:getVoters:');
        this._logger.error(err);
        return(err);
      }
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
