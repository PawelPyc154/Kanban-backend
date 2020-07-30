class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = typeof message === 'string' ? message : { ...message };
  }
}

module.exports = ErrorResponse;
