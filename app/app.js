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
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import AccountProvider from 'containers/AccountProvider';
import EosioProvider from 'containers/EosioProvider';
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';
import createdHistory from './createdHistory';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

window.$ = $;

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, createdHistory);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <EosioProvider>
        <AccountProvider>
          <LanguageProvider messages={messages}>
            <ConnectedRouter history={createdHistory}>
              <App />
            </ConnectedRouter>
          </LanguageProvider>
        </AccountProvider>
      </EosioProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
