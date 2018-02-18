
const fetchFields = async function () {
  const Fields = this.db.collection('fields');
  const current_fields = await Fields.find().toArray();
  this.body = { results: current_fields };
};

module.exports = fetchFields;