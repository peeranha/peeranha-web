import webpackMerge from 'webpack-merge';
import dotenv from 'dotenv';

import commonConfig from './webpack.common';

dotenv.config();

const addons = addonsArg =>
  []
    .concat.apply([], [addonsArg])
    .filter(Boolean)
    .map(addonName => require(`./addons/webpack.${addonName}`).default); // eslint-disable-line import/no-dynamic-require, global-require

const config = (env) => {
  const envConfig = env ? require(`./webpack.${env.env}`).default : {}; // eslint-disable-line import/no-dynamic-require, global-require

  return webpackMerge(commonConfig, envConfig, ...addons(env ? env.addons : []));
};

export default config;
