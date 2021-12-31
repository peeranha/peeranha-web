/**
 *
 * QuestionsOfUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import InfinityLoader from 'components/InfinityLoader';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import * as select from './selectors';

import QuestionsWithAnswersList from './QuestionsWithAnswersList';
import Header from './Header';
import { getQuestions } from './actions';

export const QuestionsWithAnswersOfUser = ({
  locale,
  communities,
  questions,
  questionsLoading,
  isLastFetch,
  className,
  infinityOff,
  displayName,
  account,
  userId,
  getQuestionsDispatch,
}) => {
  return (
    <InfinityLoader
      loadNextPaginatedData={getQuestionsDispatch.bind(null, userId)}
      isLoading={questionsLoading}
      isLastFetch={isLastFetch}
      infinityOff={infinityOff}
    >
      <div className={className}>
        <Header userId={userId} account={account} displayName={displayName} />

        {questions.length > 0 && (
          <QuestionsWithAnswersList
            questions={questions}
            locale={locale}
            communities={communities}
          />
        )}

        {questionsLoading && <LoadingIndicator />}
      </div>
    </InfinityLoader>
  );
};

QuestionsWithAnswersOfUser.propTypes = {
  isLastFetch: PropTypes.bool,
  questionsLoading: PropTypes.bool,
  userId: PropTypes.string,
  infinityOff: PropTypes.bool,
  className: PropTypes.string,
  displayName: PropTypes.string,
  account: PropTypes.string,
  locale: PropTypes.string,
  communities: PropTypes.array,
  questions: PropTypes.array,
  getQuestionsDispatch: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    account: makeSelectAccount(),
    communities: selectCommunities(),
    questions: select.selectQuestionsWithUserAnswers(),
    questionsLoading: select.selectQuestionsLoading(),
    isLastFetch: select.selectIsLastFetch(),
  }),
  dispatch => ({
    getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
  }),
)(QuestionsWithAnswersOfUser);
