import webpack from 'webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import commonPaths from './commonPaths';

const { host, port } = process.env;

const config = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    dev: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
    ],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [commonPaths.appRoot],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]',
              camelCase: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: {
                'postcss-cssnext': {},
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [commonPaths.appRoot],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[name]--[local]--[hash:base64:8]',
              camelCase: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: {
                'postcss-cssnext': {},
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      DEBUG: true,
    }),
    new FaviconsWebpackPlugin({
      logo: commonPaths.logo,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  devServer: {
    contentBase: commonPaths.output,
    host,
    port,
    historyApiFallback: true,
    hot: true,
    inline: true,
  },
};

export default config;
