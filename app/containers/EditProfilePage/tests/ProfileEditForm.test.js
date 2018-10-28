import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { translationMessages } from 'i18n';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';
import { LOCATION_FIELD } from 'containers/Profile/constants';

import ProfileEditForm from '../ProfileEditForm';

describe('<ProfileEditForm />', () => {
  const props = {
    handleSubmit: () => {},
    submitting: true,
    invalid: true,
    sendProps: {
      citiesList: [],
      profile: {
        ipfs: {
          [LOCATION_FIELD]: {},
        },
      },
      translations: {},
      match: {
        params: {
          id: 'id',
        },
      },
    },
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={translationMessages}>
          <ConnectedRouter history={createdHistory}>
            <ProfileEditForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
