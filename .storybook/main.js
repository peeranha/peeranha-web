const path = require('path');

module.exports = {
  stories: [
    '../app/**/*.stories.mdx',
    '../app/**/*.stories.@(js|jsx|ts|tsx)',
    './**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.join(__dirname, '../app/components'),
      containers: path.join(__dirname, '../app/containers'),
      'common-components': path.join(__dirname, '../app/components/common'),
      styles: path.join(__dirname, '../app/styles'),
      hooks: path.join(__dirname, '../app/hooks'),
      icons: path.join(__dirname, '../app/components/icons'),
      images: path.join(__dirname, '../app/images'),
      themes: path.join(__dirname, '../app/themes'),
      utils: path.join(__dirname, '../app/utils'),
      services: path.join(__dirname, '../app/services'),
      'common-messages': path.join(__dirname, '../app/common-messages.js'),
      'style-constants': path.join(__dirname, '../app/style-constants.js'),
      'communities-config': path.join(
        __dirname,
        '../app/communities-config.js',
      ),
      'communities-configs': path.join(__dirname, '../app/communities-configs'),
      i18n: path.join(__dirname, '../app/i18n.js'),
    };
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
