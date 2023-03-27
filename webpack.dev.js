const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const { webpack } = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'dist'),
    // },
    // devMiddleware: {
    //   writeToDisk: true,
    // },
  },
});
