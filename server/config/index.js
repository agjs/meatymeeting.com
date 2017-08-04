const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const env = process.env;

module.exports = app => {
  mongoose.Promise = global.Promise;
  app.use(compression({ threshold: 0 }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.resolve(__dirname, '../../', 'public')));
  app.engine(
    'handlebars',
    handlebars({ defaultLayout: path.resolve(__dirname, '../views/main') })
  );
  app.set('view engine', 'handlebars');
  app.use(
    '/libs',
    express.static(path.resolve(__dirname, '../../node_modules'))
  );
  app.use(
    '/css',
    express.static(path.resolve(__dirname, '../../public/src/assets/css'))
  );

  app.use(
    '/images',
    express.static(path.resolve(__dirname, '../../public/src/assets/images'))
  );

  if (env.NODE_ENV !== 'production') {
    require('./dev')(app);
  }
};
