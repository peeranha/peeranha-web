/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

/* eslint-disable */
const { join } = require('path');
const webpack = require('webpack');
/* eslint-enable */

/* eslint-disable-next-line */
module.exports = require('./webpack.base.babel')({
  mode: 'development',
  entry: {
    vendor: [
      'lodash',
      'react',
      'bootstrap',
      'react-dom',
      'jquery',
      'react-redux',
      'react-router',
      'react-router-dom',
      'react-router-redux',
      'redux',
      'redux-immutable',
      'redux-saga',
    ],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: join(__dirname, '../../public/vendors'),
    library: 'vendor_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: join(__dirname, '../../public/vendors', 'vendor-manifest.json'),
    }),
  ],
});
