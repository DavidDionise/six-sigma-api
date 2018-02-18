const sha = require('sha256');

const generateHash = str => {
  return sha(`${str}${process.env.SALT}`);
}

module.exports = generateHash;
