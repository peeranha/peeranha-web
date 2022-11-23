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
  webpackFinal: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.join(__dirname, '../app/components'),
      'common-components': path.join(__dirname, '../app/components/common'),
      styles: path.join(__dirname, '../app/styles'),
      hooks: path.join(__dirname, '../app/hooks'),
      icons: path.join(__dirname, '../app/components/icons'),
      themes: path.join(__dirname, '../app/themes'),
    };
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
