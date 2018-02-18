const fs = require('fs');
const path = require('path');

const middleware_files = fs.readdirSync(__dirname).filter(f => f != 'index.js');
const middleware_modules = {};
middleware_files.forEach(file => {
  const middlewareModule = require(`${__dirname}/${file}`);
  middleware_modules[path.parse(file).name] = (...args) => middlewareModule.call(args[1].locals, ...args);
});

module.exports = middleware_modules;
