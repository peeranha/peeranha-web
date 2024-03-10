// Importing Bootstrap and its dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SuiProvider from 'containers/SuiProvider';
import $ from 'jquery';
// Needed for redux-saga es6 generator support
import '@babel/polyfill';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga4';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'sanitize.css/sanitize.css';
import { I18nextProvider } from 'react-i18next';

// Import root app
import App from 'containers/App';

// Import Providers
import DataCacheProvider from 'containers/DataCacheProvider';
import AccountProvider from 'containers/AccountProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import 'file-loader?name=[name].[ext]!./.htaccess';
import { isSuiBlockchain } from 'utils/constants';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';
import createdHistory from './createdHistory';

import i18n from './i18n';

// Import CSS reset and Global Styles
import './global-styles';
import EthereumProvider from './containers/EthereumProvider';

window.$ = $;
if (process.env.GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.GTM_ID,
  };

  TagManager.initialize(tagManagerArgs);
}

const reactGA4Id = process.env.GA4_ID;
if (reactGA4Id) {
  ReactGA.initialize(reactGA4Id);
}

const NetworkProvider = isSuiBlockchain ? SuiProvider : EthereumProvider;

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
