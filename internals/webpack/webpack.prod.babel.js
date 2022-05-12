const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const testPlugins = [
  {
    filename: 'index',
    meta: {
      'google-site-verification': 'xG6B69BYag77q5daOYxk0ehphPB3mT4VLX2gYjUp4Bs',
    },
  },
  {
    filename: 'index-testcommunity',
    meta: {
      'google-site-verification': 'IgB1UAlZ0YIseYsjVbTZVNplkxGptwU0Zm7oajS9kHk',
    },
  },
];

const prodPlugins = [
  {
    filename: 'index',
    meta: {
      'google-site-verification': 'XJoQa42mRY-KI-3CMiVI2cJZBfaSso4VHQvtBtD04u8',
    },
  },
];

const plugins = process.env.NODE_ENV === 'test' ? testPlugins : prodPlugins;

module.exports = require('./webpack.base.babel')({
  mode: 'production',
  entry: [path.join(process.cwd(), 'app/app.js')],
  output: {
    path: path.resolve(__dirname, '../../build'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  optimization: {
    runtimeChunk: true,
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  plugins: [
    ...plugins.map(
      ({ filename, meta = {} }) =>
        new HtmlWebpackPlugin({
          template: 'app/index.html',
          filename: `${filename}.html`,
          meta,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
          inject: true,
        }),
    ),
    new WebpackPwaManifest({
      name: 'Peeranha',
      short_name: 'Peeranha',
      description: 'Decentralized Q&A platform',
      background_color: '#fafafa',
      theme_color: '#b1624d',
      icons: [
        {
          src: path.resolve('app/images/icon-512x512.png'),
          sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512],
        },
      ],
    }),
  ],
  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
