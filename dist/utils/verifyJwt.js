const jwt = require('jsonwebtoken');

const verifyJwt = async token => {
  return await new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => err ? rej(err) : res(data));
  });
};

module.exports = verifyJwt;