/**
 *
 * QuestionsOfUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import InfinityLoader from 'components/InfinityLoader';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import * as select from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getQuestions, resetStore } from './actions';

import QuestionsWithAnswersList from './QuestionsWithAnswersList';
import Header from './Header';

/* eslint-disable react/prefer-stateless-function */
export class QuestionsWithAnswersOfUser extends React.PureComponent {
  componentDidMount() {
    this.fetchQuestions();
  }

  componentWillUnmount() {
    this.props.resetStoreDispatch();
  }

  fetchQuestions = () => {
    const { getQuestionsDispatch, userId } = this.props;
    getQuestionsDispatch(userId);
  };

  render() {
    const {
      locale,
      communities,
      questions,
      questionsLoading,
      isLastFetch,
      className,
      infinityOff,
    } = this.props;

    return (
      <InfinityLoader
        loadNextPaginatedData={this.fetchQuestions}
        isLoading={questionsLoading}
        isLastFetch={isLastFetch}
        infinityOff={infinityOff}
      >
        <div className={className}>
          <Header />

          {questions[0] && (
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
  }
}

QuestionsWithAnswersOfUser.propTypes = {
  isLastFetch: PropTypes.bool,
  questionsLoading: PropTypes.bool,
  userId: PropTypes.string,
  infinityOff: PropTypes.bool,
  className: PropTypes.string,
  getQuestionsDispatch: PropTypes.func,
  resetStoreDispatch: PropTypes.func,

  locale: PropTypes.string,
  communities: PropTypes.array,
  questions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
  questions: select.selectQuestionsWithUserAnswers(),
  questionsLoading: select.selectQuestionsLoading(),
  isLastFetch: select.selectIsLastFetch(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getQuestionsDispatch: userId => dispatch(getQuestions(userId)),
    resetStoreDispatch: () => dispatch(resetStore()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'questionsWithAnswersOfUser',
  reducer,
});
const withSaga = injectSaga({ key: 'questionsWithAnswersOfUser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(QuestionsWithAnswersOfUser);
