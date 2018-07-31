import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin';

import commonPaths from './commonPaths';

const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [
            'css-loader',
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
          fallback: 'style-loader',
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
    new UglifyJsWebpackPlugin({
      sourceMap: false,
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new FaviconsWebpackPlugin({
      logo: commonPaths.logo,
    }),
  ],
};

export default config;
