const jwt = require('jsonwebtoken');
const { ValidationError, AuthorizationError } = Error;
const { signJwt, generateHash } = require('../utils');

const signInUser = async function (payload) {
  const { email, password } = payload;
  if (!email) {
    throw new ValidationError('Must include email');
  }
  if (!password) {
    throw new ValidationError('Must include password');
  }

  const Users = this.db.collection('users');
  const current_user = await Users.findOne({ email });
  if (!current_user) {
    throw new ValidationError('Invalid email');
  }
  const hash = generateHash(password);
  if (current_user.hash != hash) {
    throw new AuthorizationError('Invalid login credentials');
  }

  const token = await signJwt({ email });
  this.body = { updated_token: token };
};

module.exports = signInUser;