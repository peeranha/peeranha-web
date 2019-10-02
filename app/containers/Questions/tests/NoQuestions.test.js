import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { ConnectedRouter } from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';
import { Banner, AllQuestions } from '../Banner';

describe('<AllQuestions />', () => {
  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <AllQuestions />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('Banner', () => {
  let isFeed = true;
  let followedCommunities = [];

  it('<Feed />', () => {
    isFeed = true;
    followedCommunities = [];

    expect(Banner({ isFeed, followedCommunities })).toMatchSnapshot();
  });

  it('<AllQuestions />', () => {
    isFeed = false;
    followedCommunities = [];

    expect(Banner({ isFeed, followedCommunities })).toMatchSnapshot();
  });
});
