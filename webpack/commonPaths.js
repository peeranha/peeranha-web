import path from 'path';

const rootDir = path.resolve(__dirname, '../');
const appRootDir = path.resolve(rootDir, 'src');
const publicDir = path.resolve(rootDir, 'public');

export default {
  root: rootDir,
  appRoot: appRootDir,
  appEntry: './index.js',
  htmlTemplate: path.resolve(publicDir, './index.html'),
  logo: path.resolve(publicDir, './img/logo.svg'),
  output: path.resolve(rootDir, 'dist'),
  devServer: path.resolve(rootDir, 'webpack-dev-server/client'),
  nodeModules: path.resolve(rootDir, 'node_modules'),
  dotEnvConfig: path.resolve(rootDir, '.env'),
};
