/**
 * COMMON WEBPACK CONFIGURATION
 */

/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/* eslint-enable */

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

module.exports = (options) => {
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
    entry: options.entry,
    output: {
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
      ...options.output,
    },
    optimization: options.optimization,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
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
          test: /\.(jpg|png|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8 * 1024,
                esModule: false,
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
          use: ['html-loader', 'markdown-loader'],
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
      new webpack.DefinePlugin(envKeys),
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
        Buffer: ['buffer', 'Buffer'],
      }),
      new CopyWebpackPlugin([{ from: 'static' }]),
    ]),
    resolve: {
      modules: ['node_modules', 'app'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      mainFields: ['browser', 'jsnext:main', 'main'],
      fallback: {
        fs: false,
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert/'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        os: require.resolve('os-browserify/browser'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer'),
        path: require.resolve('path-browserify'),
        vm: require.resolve('vm-browserify'),
        symlinks: false,
      },
      alias: {
        components: path.join(__dirname, '../../app/components'),
        'common-components': path.join(
          __dirname,
          '../../app/components/common',
        ),
        styles: path.join(__dirname, '../../app/styles'),
        hooks: path.join(__dirname, '../../app/hooks'),
        icons: path.join(__dirname, '../../app/components/icons'),
        themes: path.join(__dirname, '../../app/themes'),
        app: path.join(__dirname, '../../app'),
        utils: path.join(__dirname, '../../app/utils'),
        containers: path.join(__dirname, '../../app/containers'),
        'routes-config': path.resolve(__dirname, '../../app/routes-config.js'),
        'common-messages': path.resolve(
          __dirname,
          '../../app/common-messages.js',
        ),
        'style-constants': path.resolve(
          __dirname,
          '../../app/style-constants.js',
        ),
        pages: path.resolve(__dirname, '../../app/pages'),
      },
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
  };
};
