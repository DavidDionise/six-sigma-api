const { logger } = require('./utils');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.source = 'six-sigma';
    this.status = 500;
  }
};

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.source = 'six-sigma';
    this.status = 403;
  }
};

class NotImplentedError extends Error {
  constructor(message = 'Not Implemented') {
    super(message);
    this.name = 'NotImplentedError';
    this.source = 'six-sigma';
    this.status = 501;
  }
}

Error.ValidationError = ValidationError;
Error.AuthorizationError = AuthorizationError;
Error.NotImplentedError = NotImplentedError;

const errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error(err);
    res.status(err.status || 500);
    res.json({
      message: err.message || err,
      name: err.name,
      source: err.source
    });
  }
};

module.exports = errorHandler;