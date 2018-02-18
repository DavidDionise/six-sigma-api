const { NotImplentedError } = Error;

const finalizeRequest = function (req, res, next) {
  if (Object.keys(this.body).length == 0) {
    next(new NotImplentedError());
  } else {
    res.json(this.body);
  }
};

module.exports = finalizeRequest;