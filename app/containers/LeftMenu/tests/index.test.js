import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {memoryHistory} from 'react-router-dom';
import configureStore from 'configureStore';
import {ConnectedRouter} from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import LeftMenu from '../index';

describe('<CommentForm />', () => {
  const props = {
    profile: {},
    isMenuVisible: false,
    showMenu: jest.fn(),
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <LeftMenu
              profile={props.profile}
              isMenuVisible={props.isMenuVisible}
              showMenu={props.showMenu}/>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
