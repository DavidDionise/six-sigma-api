const jwt = require('jsonwebtoken');
const { ValidationError, AuthorizationError } = Error;
const { verifyJwt } = require('../utils');

const excluded_paths = ['users/signup', 'users/signin', 'users/validate-auth', 'fields'];

const auth = async function (req, res, next) {
  const bypass_auth = excluded_paths.find(path => {
    if (req.path[req.path.length - 1] == '/') {
      return `${path}/` == req.path.substr(1);
    } else {
      return path == req.path.substr(1);
    }
  });

  if (bypass_auth == null) {
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