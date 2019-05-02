import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import ProfileEditForm from '../ProfileEditForm';

const props = {
  intl: { formatMessage: jest.fn() },
  handleSubmit: jest.fn(),
  change: jest.fn(),
  location: {},
  uploadImage: jest.fn(),
  getCroppedAvatar: jest.fn(),
  clearImageChanges: jest.fn(),
  saveProfile: jest.fn(),
  isProfileSaving: false,
  cachedProfileImg: 'cachedProfileImg',
  editingImgState: false,
  profile: {},
};

describe('<ProfileEditForm />', () => {
  it('snapshot test 1', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <ProfileEditForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
