import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {memoryHistory} from 'react-router-dom';
import configureStore from 'configureStore';
import {ConnectedRouter} from 'react-router-redux';
import createdHistory from 'createdHistory';

import LanguageProvider from 'containers/LanguageProvider';

import ViewProfilePage from '../index';

describe('<CommentForm />', () => {
  const props = {
    match: {
      params: {id: 'id'},
    },
    profile: {},
    account: 'account',
    communities: [],
    questions: [],
    questionsWithUserAnswers: [],
    questionsLoading: false,
    questionsWithAnswersLoading: false,
    locale: 'en',
  };

  it('snapshot test', () => {
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider locale="en" key="en" messages={{}}>
          <ConnectedRouter history={createdHistory}>
            <ViewProfilePage
              match={props.match}
              profile={props.profile}
              account={props.account}
              communities={props.communities}
              questions={props.questions}
              questionsWithUserAnswers={props.questionsWithUserAnswers}
              questionsLoading={props.questionsLoading}
              questionsWithAnswersLoading={props.questionsWithAnswersLoading}
              locale={props.locale}
            />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
