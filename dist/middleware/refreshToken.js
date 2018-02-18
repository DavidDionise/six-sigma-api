const { signJwt } = require('../utils');
const ONE_HOUR = 3600;

const refreshToken = async function (req, res, next) {
  if (this.jwt_data) {
    const CURRENT_TIME = Math.floor(Date.now / 1000);
    const { iat: TOKEN_ISSUED_AT, email } = this.jwt_data;
    // If it's been more than one hour, refresh the token
    if (CURRENT_TIME - TOKEN_ISSUED_AT > ONE_HOUR) {
      try {
        const updated_token = await signJwt({ email });
        next();
      } catch (ex) {
        next(new Error(ex));
      }
    }
  } else {
    next();
  }
};

module.exports = refreshToken;