const jwt = require('jsonwebtoken');
const logger = require('./logger');

const signJwt = async payload => {
  const CURRENT_TIME = Math.floor(Date.now() / 1000);

  return await new Promise((res, rej) => {
    jwt.sign(
      { ...payload, iat: CURRENT_TIME },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 * 24 * 7 },
      (err, token) => err ? rej(err) : res(token)
    );
  });
}

module.exports = signJwt;
