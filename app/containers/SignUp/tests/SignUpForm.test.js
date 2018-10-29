import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { translationMessages } from 'i18n';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';
import SignUpForm from '../SignUpForm';

describe('<SignUpForm />', () => {
  const props = {
    handleSubmit: jest.fn(),
    submitting: false,
    invalid: false,
    registerUser: jest.fn(),
    loading: false,
    account: 'user1',
    translations: [],
  };

  const store = configureStore({}, memoryHistory);
  const renderedComponent = mount(
    <Provider store={store}>
      <LanguageProvider locale="en" key="en" messages={translationMessages}>
        <ConnectedRouter history={createdHistory}>
          <SignUpForm {...props} />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
  );

  it('snapshot test', () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
