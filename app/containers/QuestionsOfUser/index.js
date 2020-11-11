/**
 *
 * QuestionsOfUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { STATE_KEY } from './constants';
import reducer from './reducer';
import saga from './saga';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import InfinityLoader from 'components/InfinityLoader';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  selectQuestions,
  selectQuestionsLoading,
  selectIsLastFetch,
} from './selectors';

import Header from './Header';
import QuestionsList from './QuestionsList';
import { getQuestions } from './actions';

export const QuestionsOfUser = ({
  isLastFetch,
  questionsLoading,
  locale,
  questions,
  className,
  infinityOff,
  communities,
  userId,
  account,
  displayName,
  getQuestionsDispatch,
}) => (
  <InfinityLoader
    loadNextPaginatedData={getQuestionsDispatch.bind(null, userId)}
    isLoading={questionsLoading}
    isLastFetch={isLastFetch}
    infinityOff={infinityOff}
  >
    <div className={className}>
      <Header userId={userId} account={account} displayName={displayName} />

      {questions.length > 0 && (
        <QuestionsList
          questions={questions}
          locale={locale}
          communities={communities}
        />
      )}

      {questionsLoading && <LoadingIndicator />}
    </div>
  </InfinityLoader>
);

QuestionsOfUser.propTypes = {
  isLastFetch: PropTypes.bool,
  questionsLoading: PropTypes.bool,
  account: PropTypes.string,
  displayName: PropTypes.string,
  userId: PropTypes.string,
  locale: PropTypes.string,
  questions: PropTypes.array,
  className: PropTypes.string,
  infinityOff: PropTypes.bool,
  communities: PropTypes.array,
  getQuestionsDispatch: PropTypes.func,
};

export default compose(
  injectReducer({ key: STATE_KEY, reducer }),
  injectSaga({ key: STATE_KEY, saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      account: makeSelectAccount(),
      questions: selectQuestions(),
      questionsLoading: selectQuestionsLoading(),
      isLastFetch: selectIsLastFetch(),
      communities: selectCommunities(),
    }),
    dispatch => ({
      getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
    }),
  ),
)(QuestionsOfUser);
