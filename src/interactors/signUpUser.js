const { signJwt } = require('utils');
const { ValidationError, AuthorizationError } = Error;
const { logger, generateHash } = require('utils');

/**
 * @description - Signs up a new user in the system
 * @param {Object} payload
 *    @prop {String} email - The email address for the new user
 *    @prop {String} password - The new users password
 *    @prop {String} password_confirm - The new users password confirmation
 *    @prop {String} secret_key - A secret key needed to create new users
 *    @return {{ updated_token: {String} }}
 */
const signUpUser = async function(payload) {
  const {
    email,
    password,
    password_confirm,
    secret_key
  } = payload;

  if(!email) {
    throw new ValidationError(`You must include a 'email' property to sign up a new user`);
  }
  if(!password) {
    throw new ValidationError(`You must include a 'password' property to sign up a new user`);
  }
  if(!password_confirm) {
    throw new ValidationError(`You must include a 'password_confirm' property to sign up a new user`);
  }
  if(!secret_key) {
    throw new ValidationError(`You must include a 'secret_key' property to sign up a new user`);
  }

  if(secret_key != process.env.ADMIN_SECRET_KEY) {
    throw new AuthorizationError(`You do not have permission to sign up new users`);
  }

  const Users = this.db.collection('users');
  const user_with_email = await Users.findOne({ email });
  if(user_with_email) {
    throw new ValidationError('A user with this email already exists in the system');
  }

  if(password != password_confirm) {
    throw new ValidationError(`password and password confirmation do not match`);
  }

  const hash = generateHash(password);
  const new_user = {
    email,
    hash
  };

  const token = await signJwt({
    email,
    hash
  });

  await Users.insertOne({ email, hash });

  this.body = { updated_token: token };
}

module.exports = signUpUser;
