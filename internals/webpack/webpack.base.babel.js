/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

module.exports = options => {
  const baseEnvPath = path.resolve('.env');
  const testEnvPath = `${baseEnvPath}.test`;
  const stagingEnvPath = `${baseEnvPath}.staging`;
  const prodEnvPath = `${baseEnvPath}.prod`;

  let targetEnvPath = baseEnvPath;

  if (process.env.NODE_ENV === 'production') {
    targetEnvPath = prodEnvPath;
  } else if (process.env.NODE_ENV === 'staging') {
    targetEnvPath = stagingEnvPath;
  } else if (process.env.NODE_ENV === 'test') {
    targetEnvPath = testEnvPath;
  }

  // Set the path parameter in the dotenv config
  const env = dotenv.config({ path: targetEnvPath }).parsed;

  // reduce .env keys to an object
  const envKeys = Object.keys(env).reduce((prev, next) => {
    const updatedPrev = prev;
    updatedPrev[`process.env.${next}`] = JSON.stringify(env[next]);
    return updatedPrev;
  }, {});

  return {
    mode: options.mode,
    node: {
      fs: 'empty',
    },
    entry: options.entry,
    output: {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
      ...options.output,
    }, // Merge with env dependent settings
    optimization: options.optimization,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Transform all .js files required somewhere with Babel
          exclude: {
            test: /node_modules/, // Exclude libraries in node_modules ...
            not: [
              // Except for a few of them that needs to be transpiled because they use modern syntax
              /ipfs-core-types/,
              /ipfs-core-utils/,
              /ipfs-utils/,
              /ipfs-http-client/,
              /it-map/,
              /it-first/,
              /it-last/,
              /it-all/,
              /testing-library/,
              /web3.storage/,
            ],
          },
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'ie 11' }]],
            },
          },
        },
        {
          // Preprocess our own .css files
          // This is the place to add your own loaders (e.g. sass/less etc.)
          // for a list of loaders, see https://webpack.js.org/loaders/#styling
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          // Preprocess 3rd party .css files located in node_modules
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.svg/,
          oneOf: [
            {
              resourceQuery: /inline/, // foo.svg?inline
              use: {
                loader: 'svg-url-loader',
                options: {
                  encoding: 'base64',
                  noquotes: true,
                },
              },
            },
            {
              resourceQuery: /external/, // foo.svg?external
              use: {
                loader: 'svg-inline-loader',
                options: {},
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  enabled: true,
                  progressive: true,
                  // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                  // Try enabling it in your environment by switching the config to:
                  // enabled: true,
                  // progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: [0.7, 0.8],
                  speed: 4,
                },
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader',
            },
            {
              loader: 'markdown-loader',
              options: {
                /* your options here */
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
      ],
    },
    plugins: options.plugins.concat([
      new webpack.ProvidePlugin({
        // make fetch available
        fetch: 'exports-loader?self.fetch!whatwg-fetch',
      }),

      // Expose .env config to webpack in order to use `process.env.{key}` inside code
      new webpack.DefinePlugin(envKeys),
      new CopyWebpackPlugin([{ from: 'static' }]),
    ]),
    resolve: {
      modules: ['node_modules', 'app'],
      extensions: ['.js', '.jsx', '.react.js'],
      mainFields: ['browser', 'jsnext:main', 'main'],
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
  };
};
