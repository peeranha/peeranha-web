import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import { createStore } from 'state/store';
import Root from 'containers/root';
import routes from 'config/routes';
import { translationMessages } from './i18n';

const history = createHistory();
const store = createStore(history);

// Render an application root
const render = (
  RootComponent = Root,
  storeObject = store,
  historyObject = history,
  routesList = routes,
  messages = translationMessages,
) => {
  ReactDOM.render(
    /* eslint-disable react/jsx-filename-extension */
    <AppContainer>
      <RootComponent
        store={storeObject}
        history={historyObject}
        routes={routesList}
        messages={messages}
        locale={process.env.DEFAULT_LOCALE}
      />
    </AppContainer>,
    /* eslint-enable react/jsx-filename-extension */
    document.getElementById('app'),
  );
};

if (module.hot) {
  module.hot.accept('./containers/root', () => {
    const root = require('./containers/root').default; // eslint-disable-line import/no-dynamic-require, global-require

    render(root);
  });

  module.hot.accept('./i18n', () => {
    const messages = require('./i18n').translationMessages; // eslint-disable-line import/no-dynamic-require, global-require

    render(undefined, undefined, undefined, messages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  require.ensure(['intl/dist/Intl'], (require) => {
    const intl = require('intl/dist/Intl');
    window.IntlPolyfill = intl;
    window.Intl = intl;

    require('intl/locale-data/jsonp/en.js');

    render();
  }, 'IntlBundle');
} else {
  render();
}
