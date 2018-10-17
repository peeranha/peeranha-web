import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';

import LanguageProvider from 'containers/LanguageProvider';
import Profile from '../index';

describe('<Profile>', () => {
  it('Profile snapshot', () => {
    const store = configureStore({}, memoryHistory);
    const wrapper = shallow(
      <Provider store={store}>
        <LanguageProvider>
          <Profile />
        </LanguageProvider>
      </Provider>,
    );
    const componentInstance = wrapper.instance();
    expect(componentInstance.render()).toMatchSnapshot();
  });
});
