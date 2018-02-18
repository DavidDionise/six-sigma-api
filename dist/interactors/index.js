const fs = require('fs');
const path = require('path');

const interactor_modules = {};
const initInteractors = (payload, ctx) => {
  const interactor_files = fs.readdirSync(__dirname).filter(f => f != 'index.js');

  interactor_files.forEach(file => {
    const interactorModule = require(`${__dirname}/${file}`);
    interactor_modules[path.parse(file).name] = interactorModule.bind(ctx, payload);
  });

  return interactor_modules;
};

module.exports = initInteractors;