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

import * as select from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getQuestions, resetStore } from './actions';

// TODO: test this component

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
    const { isLastFetch, children, questionsLoading, infinityOff } = this.props;

    return (
      <InfinityLoader
        loadNextPaginatedData={this.fetchQuestions}
        isLoading={questionsLoading}
        isLastFetch={isLastFetch}
        infinityOff={infinityOff}
      >
        {React.Children.toArray(children)}
      </InfinityLoader>
    );
  }
}

QuestionsOfUser.propTypes = {
  isLastFetch: PropTypes.bool,
  questionsLoading: PropTypes.bool,
  infinityOff: PropTypes.bool,
  children: PropTypes.element,
  userId: PropTypes.string,
  getQuestionsDispatch: PropTypes.func,
  resetStoreDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  questionsLoading: select.selectQuestionsLoading(),
  isLastFetch: select.selectIsLastFetch(),
});

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
