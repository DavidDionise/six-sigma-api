const fs = require('fs');
const path = require('path');

const types_modules = {};
const types_files = fs.readdirSync(__dirname).filter(f => f != 'index.js');
types_files.forEach(file => {
  types_modules[path.parse(file).name] = require(`${__dirname}/${file}`);
});

module.exports = types_modules;