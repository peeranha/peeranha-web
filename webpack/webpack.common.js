import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

import commonPaths from './commonPaths';
import { packageSort } from './utils';

const config = {
  context: commonPaths.appRoot,
  entry: {
    app: [
      'babel-polyfill',
      commonPaths.appEntry,
    ],
  },
  output: {
    path: commonPaths.output,
    publicPath: '/',
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'env'],
              plugins: [
                'react-html-attrs',
                'transform-class-properties',
                'transform-decorators-legacy',
                'transform-object-rest-spread',
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              mimetype: 'application/font-woff2',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              mimetype: 'application/vnd.ms-fontobject',
            },
          },
        ],
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'video/mp4',
            },
          },
        ],
      },
      {
        test: /\.webm$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'video/webm',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new Dotenv({
      path: commonPaths.dotEnvConfig,
    }),
    new CleanWebpackPlugin(commonPaths.output, {
      root: commonPaths.root,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.htmlTemplate,
      chunksSortMode: packageSort(['common', 'vendor', 'dev', 'app']),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
  ],

  resolve: {
    modules: [
      commonPaths.nodeModules,
      commonPaths.appRoot,
    ],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      app: commonPaths.appRoot,
    },
  },
};

export default config;
