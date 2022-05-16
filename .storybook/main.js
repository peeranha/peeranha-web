const path = require('path');

module.exports = {
  stories: ['../app/**/*.stories.mdx', '../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.join(__dirname, '../app/components'),
      styles: path.join(__dirname, '../app/styles'),
      hooks: path.join(__dirname, '../app/hooks'),
    };
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
