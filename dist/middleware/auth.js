const jwt = require('jsonwebtoken');
const { ValidationError, AuthorizationError } = Error;
const { verifyJwt } = require('../utils');

const excluded_paths = ['signup', 'signin', 'check-auth'];

const auth = async function (req, res, next) {
  if (!excluded_paths.includes(req.path.substr(1))) {
    try {
      const { headers } = req;
      if (!headers.token) {
        throw new AuthorizationError(`You must include an authentication token with your request`);
      }

      this.jwt_data = await verifyJwt(headers.token);
      next();
    } catch (ex) {
      next(ex);
    }
  } else {
    next();
  }
};

module.exports = auth;