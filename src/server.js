const express = require('express');
const app = express();
require('dotenv').config();
const errorHandler = require('./error');
const cors = require('cors');
const env = process.env.NODE_ENV == 'production' ? 'PROD' : 'DEV';
const port = process.env[`${env}_PORT`];
const router = require('./router');
const initDb = require('./db');
const {
  initContext,
  auth,
  refreshToken,
  finalizeRequest
} = require('./middleware');

const initServer = async () => {
  const db = await initDb();

  // **** REQUEST MIDDLEWARE ******** //
  app.use(express.json());
  app.use(cors());
  app.use(initContext);
  app.use(auth);
  // ******************************** //

  // **** ROUTES ******************** //
  app.use(router(db));
  // ******************************** //

  // **** RESPONSE MIDDLEWARE ******* //
  app.use(refreshToken);
  app.use(finalizeRequest);
  // ******************************** //

  // **** ERROR HANDLING ************ //
  app.use(errorHandler);
  // ******************************** //

  app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
  });
};

initServer()
.catch(console.log);
