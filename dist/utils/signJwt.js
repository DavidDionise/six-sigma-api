var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const jwt = require('jsonwebtoken');

const signJwt = async payload => {
  const CURRENT_TIME = Math.floor(Date.now() / 1000);
  const ONE_WEEK = 60 * 60 * 24 * 7;

  return await new Promise((res, rej) => {
    jwt.sign(_extends({}, payload, { iat: CURRENT_TIME }), process.env.JWT_SECRET_KEY, { expiresIn: ONE_WEEK }, (err, token) => err ? rej(err) : res(token));
  });
};

module.exports = signJwt;