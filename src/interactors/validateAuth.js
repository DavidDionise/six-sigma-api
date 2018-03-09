const { verifyJwt } = require('utils');

/**
 * @description - Validates the users authenticity
 * @param {Object} payload
 *    @prop {String} token - The users auth token
 */
 const validateAuth = async function(payload) {
   try {
     const { token } = payload;
     await verifyJwt(token);
     this.body = { validated: true };
   }
   catch(ex) {
     this.body = { validated: false };
   }
 }

 module.exports = validateAuth;
