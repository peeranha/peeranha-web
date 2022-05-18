import React from 'react';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { render } from '@testing-library/react';
import { translationMessages } from 'i18n';

import configureStore from 'configureStore';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import EditCommunity from '../index';

jest.mock('react-avatar-edit', () => jest.fn(() => <mock-avatar />));

jest.mock('communities-config', () =>
  jest.fn(() => ({
    key: { origin: '' },
  })),
);

jest.mock('utils/properties', () => ({
  communityModeratorCreatePermission: jest.fn(() => true),
}));

jest.mock('containers/AccountProvider/selectors', () => ({
  makeSelectProfileInfo: jest.fn(() => () => ({
    integer_properties: [],
  })),
}));
jest.mock('containers/DataCacheProvider/selectors', () => ({
  selectCommunities: jest.fn(() => () => []),
  selectFaqQuestions: jest.fn(() => () => []),
}));
jest.mock('containers/LanguageProvider/selectors', () => ({
  makeSelectLocale: jest.fn(() => () => 'en'),
}));

jest.mock('../selectors', () => ({
  selectCommunity: jest.fn(() => () => ({
    avatar: 'Avatar',
    name: 'Name',
    description: 'Short description',
    website: '',
    main_description: 'Descriptive description',
  })),
  selectEditCommunityLoading: jest.fn(() => () => false),
  selectGetCommunityLoading: jest.fn(() => () => false),
}));

const props = {
  match: {
    params: { communityId: 1 },
  },
};

describe('<EditCommunity />', () => {
  const store = configureStore({}, memoryHistory);

  it('renders and matches the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={translationMessages}>
          <ConnectedRouter history={createdHistory}>
            <EditCommunity match={props.match} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
