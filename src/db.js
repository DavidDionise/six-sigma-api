const { MongoClient } = require('mongodb');
const db_name = 'six-sigma';
const env = process.env.NODE_ENV == 'production' ? 'PROD' : 'DEV';
const url = process.env[`${env}_DB_CONNECTION_STRING`];

const initDb = async () => {
  const client = await MongoClient.connect(url);
  const db = client.db(db_name);
  return db;
}

module.exports = initDb;
