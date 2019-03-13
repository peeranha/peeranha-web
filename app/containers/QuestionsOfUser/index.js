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

import reducer from './reducer';
import saga from './saga';

import { getQuestions, resetStore } from './actions';

import Header from './Header';
import QuestionsList from './QuestionsList';

/* eslint-disable react/prefer-stateless-function */
export class QuestionsOfUser extends React.PureComponent {
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
      isLastFetch,
      questionsLoading,
      locale,
      questions,
      className,
      infinityOff,
      communities,
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
  }
}

QuestionsOfUser.propTypes = {
  isLastFetch: PropTypes.bool,
  questionsLoading: PropTypes.bool,
  userId: PropTypes.string,
  locale: PropTypes.string,
  questions: PropTypes.array,
  className: PropTypes.string,
  infinityOff: PropTypes.bool,
  communities: PropTypes.array,
  getQuestionsDispatch: PropTypes.func,
  resetStoreDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  questions: selectQuestions(),
  questionsLoading: selectQuestionsLoading(),
  isLastFetch: selectIsLastFetch(),
  communities: selectCommunities(),
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

const withReducer = injectReducer({ key: 'questionsOfUser', reducer });
const withSaga = injectSaga({ key: 'questionsOfUser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(QuestionsOfUser);
