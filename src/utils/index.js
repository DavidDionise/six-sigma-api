const fs = require('fs');
const path = require('path');

const util_modules = {};
const util_files = fs.readdirSync(__dirname).filter(f => f != 'index.js');

util_files.forEach(file => {
  util_modules[path.parse(file).name] = require(`${__dirname}/${file}`);
});

module.exports = util_modules;
