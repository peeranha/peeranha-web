import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import createHistory from 'history/createBrowserHistory';
import configureStore from 'configureStore';

import Footer from '../index';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

describe('<Footer test />', () => {
  it('should match the snapshot test', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <IntlProvider locale="en">
              <Footer />
            </IntlProvider>
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
