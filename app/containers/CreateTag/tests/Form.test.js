import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import Form from '../Form';

describe('<Form />', () => {
  const props = {
    handleSubmit: () => {},
    submitting: true,
    invalid: true,
    createTag: jest.fn(),
    createTagLoading: false,
    translations: {},
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <Form {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
