/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const { join } = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  entry: {
    vendor: ['lodash', 'react', 'bootstrap'],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: join(__dirname, '../../build'),
    library: 'vendor_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: join(__dirname, '../../build', 'vendor-manifest.json'),
    }),
  ],
});
