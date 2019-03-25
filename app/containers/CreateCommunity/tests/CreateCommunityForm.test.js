import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import CreateCommunityForm from '../CreateCommunityForm';

describe('<ProfileEditForm />', () => {
  const props = {
    handleSubmit: () => {},
    submitting: true,
    invalid: true,
    createCommunity: jest.fn(),
    uploadImage: jest.fn(),
    getCroppedAvatar: jest.fn(),
    clearImageChanges: jest.fn(),
    editingImgState: '',
    cachedProfileImg: '',
    createCommunityLoading: false,
    translations: {},
    profile: {},
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <CreateCommunityForm {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
