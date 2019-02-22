import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import EmailLandingForm from '../EmailLandingForm';
import messages from '../messages';

describe('<EmailLandingForm />', () => {
  const props = {
    translations: {},
    form: 'form',
    handleSubmit: () => {},
    button: messages.faqTitle,
    sendEmailLoading: true,
    sendEmail: () => {},
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <EmailLandingForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
