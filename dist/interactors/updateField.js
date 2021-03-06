const { ValidationError } = Error;
const { ObjectID } = require('mongodb');

/**
 * @description - Updates the text body of a field
 * @param {Object} payload
 *    @param {String} payload._id - The _id of the field being updated
 *    @param {String} payload.markup - The updated markup body
 */
const updateField = async function (payload) {
  const Fields = this.db.collection('fields');
  const { _id, markup } = payload;
  if (!_id) {
    throw new ValidationError(`You must include a '_id' property to update a field`);
  }
  if (!markup) {
    throw new ValidationError(`You must include a 'markup' property to update a field`);
  }

  const current_field = await Fields.findOne({ _id: ObjectID(_id) });
  if (!current_field) {
    throw new ValidationError(`No field exists in the system with the id ${_id}`);
  }

  const update_res = await Fields.findOneAndUpdate({ _id: ObjectID(_id) }, { $set: { markup } }, { returnOriginal: false });
  this.body = { updated_field: update_res.value };
};

module.exports = updateField;