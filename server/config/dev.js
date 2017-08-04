const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require(path.resolve(
  __dirname,
  '../../webpack.dev.config'
));
const compiler = webpack(webpackDevConfig);

module.exports = app => {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      stats: {
        colors: true
      }
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log
    })
  );
};
