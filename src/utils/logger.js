const winston = require('winston');
const path = require('path');
const filename = path.resolve(`${__dirname}/../../error-logs.txt`);

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({ colorize: true }),
    new winston.transports.File({ filename, json: false, level: 'error' })
  ]
});

module.exports = logger;
