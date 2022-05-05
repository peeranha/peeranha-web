/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
  new HtmlWebpackPlugin({
    inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
    template: 'app/index.html',
  }),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: false, // show a warning when there is a circular dependency
  }),
  new AddAssetHtmlPlugin({
    filepath: 'build/vendor.bundle.js',
    includeSourcemap: false,
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: path.join(__dirname, '../../build', 'vendor-manifest.json'),
  }),
];

module.exports = require('./webpack.base.babel')({
  mode: 'development',

  // Add hot reloading in development
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/app.js'), // Start with js/app.js
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    minimize: false,
  },

  // Add development plugins
  plugins, // eslint-disable-line no-use-before-define

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});
