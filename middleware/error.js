const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectID
  if (err.name === 'CastError') {
    const message = `Not found with id of ${err.value}`;
    error = new ErrorResponse({ CastError: message }, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse({ email: message }, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.assign(
      {},
      ...Object.values(err.errors).map((val) => ({
        [val.path]: val.message,
      })),
    );

    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
