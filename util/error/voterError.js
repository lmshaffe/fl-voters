
module.exports = function(app) {
  class voterError {
    constructor() {
      this._initializeDefaultErrors()
    }

    _initializeDefaultErrors() {
      this.badInput  = { httpStatus: 400, status: "400", title: 'The provided parameters are invalid.', detail: ''}
      this.notFound  = { httpStatus: 404, status: "404", title: 'The selected resource could not be found.'}
      this.exception = { httpStatus: 500, status: "500", title: 'Error retrieving selected resource, please see logs.', detail: ''}
    }
  }

  return new voterError();
}
