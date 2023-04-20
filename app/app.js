// Importing Bootstrap and its dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'sanitize.css/sanitize.css';
import { I18nextProvider } from 'react-i18next';

import { WalletProvider } from '@suiet/wallet-kit';
// Import root app
import App from 'containers/App';

// Import Providers
import DataCacheProvider from 'containers/DataCacheProvider';
import AccountProvider from 'containers/AccountProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import 'file-loader?name=[name].[ext]!./.htaccess';
import { isSuiBlockchain } from 'utils/sui';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';
import createdHistory from './createdHistory';

// Import Analytics
import './analytics';

import i18n from './i18n';

// Import CSS reset and Global Styles
import './global-styles';
import EthereumProvider from './containers/EthereumProvider';
import TagManager from 'react-gtm-module';
window.$ = $;
if (process.env.GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.GTM_ID,
  };

  TagManager.initialize(tagManagerArgs);
}

const NetworkProvider = isSuiBlockchain() ? WalletProvider : EthereumProvider;

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, createdHistory);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <NetworkProvider>
          <AccountProvider>
            <DataCacheProvider>
              <ConnectedRouter history={createdHistory}>
                <App />
              </ConnectedRouter>
            </DataCacheProvider>
          </AccountProvider>
        </NetworkProvider>
      </Provider>
    </I18nextProvider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
