require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const debug = require('debug')('server');
const { NODE_ENV, PORT, MONGODB } = process.env;
const env = NODE_ENV;

require('./config')(app);
require('./config/routes')(app);
mongoose
  .connect('mongodb://localhost/meaty', { useMongoClient: true })
  .then(() => {
    app.listen(PORT || 3000, () => {
      debug(`Server listening on ${PORT || 3000}`);
    });
  })
  .catch(err => console.error(err));
