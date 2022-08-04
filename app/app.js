/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Importing Bootstrap and its dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import Popper from 'popper.js'; // eslint-disable-line no-unused-vars
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

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
import LanguageProvider from 'containers/LanguageProvider';
import DataCacheProvider from 'containers/DataCacheProvider';
import AccountProvider from 'containers/AccountProvider';
import FacebookProvider from './containers/FacebookProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';
import createdHistory from './createdHistory';

// Import Analytics
import './analytics';

import i18n from './i18n';

// Import CSS reset and Global Styles
import './global-styles';
import EthereumProvider from './containers/EthereumProvider';

window.$ = $;

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, createdHistory);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <EthereumProvider>
          <AccountProvider>
            <LanguageProvider>
              <FacebookProvider>
                <DataCacheProvider>
                  <ConnectedRouter history={createdHistory}>
                    <App />
                  </ConnectedRouter>
                </DataCacheProvider>
              </FacebookProvider>
            </LanguageProvider>
          </AccountProvider>
        </EthereumProvider>
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

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}
