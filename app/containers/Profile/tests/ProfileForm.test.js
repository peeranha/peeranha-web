import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';

import ProfileForm from '../ProfileForm';

jest.mock('react-dom');

const Form = reduxForm({
  form: 'ProfileForm',
})(ProfileForm);

const profileMap = new Map();
profileMap.set('profile', {
  ipfs: {},
});

const storeMap = new Map();
storeMap.set('profile', profileMap);

const formFieldValues = {
  handleSubmit: () => {},
  sendProps: {
    profile: {
      ipfs: {},
    },
    translations: {},
  },
};

it('ProfileForm renders correctly', () => {
  const store = createStore(state => state, storeMap);
  const tree = renderer
    .create(
      <Provider store={store}>
        <Form {...formFieldValues} />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
