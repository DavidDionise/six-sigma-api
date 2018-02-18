const initContext = function(req, res, next) {
  this.body = {};
  next();
};

module.exports = initContext;
