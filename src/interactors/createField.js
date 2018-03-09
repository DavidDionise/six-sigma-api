const { ValidationError } = Error;
const { ObjectID } = require('mongodb');

/**
 * @description - Updates the text body of a field
 * @param {Object} payload
 *    @param {String} payload.name
 *    @param {String} payload.markup
 */
const createField = async function(payload) {
  const Fields = this.db.collection('fields');
  const { name, markup } = payload;
  if(!name) {
    throw new ValidationError(`You must include a 'name' property to update a field`);
  }
  if(!markup) {
    throw new ValidationError(`You must include a 'markup' property to update a field`);
  }

  const current_field = await Fields.findOne({ name });
  if(current_field) {
    throw new ValidationError(`A field already exists in the system with the name ${name}`);
  }

  const insert_field_res = await Fields.insert({ name, markup });
  this.body = { new_field: insert_field_res };
}

module.exports = createField;
