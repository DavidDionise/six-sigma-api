const jwt = require('jsonwebtoken');

const verifyJwt = async token => {
  return await new Promise((res, rej) => {
    jwt.sign(
      token,
      process.env.JWT_SECRET_KEY,
      (err, token) => err ? rej(err) : res(data)
    );
  });
}

module.exports = verifyJwt;
