import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import { translationMessages } from 'i18n';
import configureStore from 'configureStore';

import LanguageProvider from 'containers/LanguageProvider';

import Form from '../Form';

jest.mock('react-avatar-edit', () => jest.fn(() => <mock-avatar />));
jest.mock('communities-config', () =>
  jest.fn(() => ({
    key: { origin: '' },
  })),
);

const communityId = 1;
const communityData = {
  avatar: 'Avatar',
  name: 'Name',
  description: 'Short description',
  officialSite: '',
  main_description: 'Descriptive description',
};

const editCommunityDispatch = jest.fn();

const props = {
  communityId,
  editCommunityDispatch,
  community: communityData,
  communityLoading: false,
};

describe('<Form />', () => {
  const store = configureStore({});

  it('renders and matches the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={translationMessages}>
          <Form {...props} />
        </LanguageProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles submitions', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={translationMessages}>
          <Form {...props} />
        </LanguageProvider>
      </Provider>,
    );

    fireEvent.submit(container.querySelector('form'));

    expect(editCommunityDispatch).toHaveBeenCalledWith(
      communityId,
      communityData,
    );
  });
});
