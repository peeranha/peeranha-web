/**
 *
 * ViewQuestion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import LoadingIndicator from 'components/LoadingIndicator';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import * as makeSelectViewQuestion from './selectors';
import { getQuestionData, postAnswer, postComment } from './actions';
import reducer from './reducer';
import saga from './saga';

import ViewQuestionForm from './ViewQuestionForm';

/* eslint-disable react/prefer-stateless-function */
export class ViewQuestion extends React.Component {
  componentDidUpdate() {
    this.user = this.props.account;
    console.log(this.props.questionData);
  }

  componentDidMount() {
    this.questionId = this.props.match.params.id;
    this.props.getQuestionDataDispatch(this.questionId);
  }

  postAnswer = () => {
    const answer = '<p>Answer</p>';

    this.props.postAnswerDispatch(this.user, this.questionId, answer);
  };

  postComment = e => {
    const answerId = +e.target.dataset.answer_id;
    const comment = '<p>Comment</p>';

    this.props.postCommentDispatch(
      this.user,
      this.questionId,
      answerId,
      comment,
    );
  };

  render() {
    const sendProps = {
      postAnswer: this.postAnswer,
      postComment: this.postComment,
      questionData: this.props.questionData,
    };

    return (
      <div className="container">
        <Helmet>
          <title>ViewQuestion</title>
          <meta name="description" content="Description of ViewQuestion" />
        </Helmet>

        {!this.props.questionDataLoading &&
          this.props.questionData && <ViewQuestionForm {...sendProps} />}

        {this.props.questionDataLoading && <LoadingIndicator />}
      </div>
    );
  }
}

ViewQuestion.propTypes = {
  account: PropTypes.string,
  questionDataLoading: PropTypes.bool,
  questionData: PropTypes.object,
  match: PropTypes.object,
  getQuestionDataDispatch: PropTypes.func,
  postAnswerDispatch: PropTypes.func,
  postCommentDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  questionDataLoading: makeSelectViewQuestion.selectQuestionDataLoading(),
  questionData: makeSelectViewQuestion.selectQuestionData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getQuestionDataDispatch: questionId =>
      dispatch(getQuestionData(questionId)),
    postAnswerDispatch: (user, questionId, answer) =>
      dispatch(postAnswer(user, questionId, answer)),
    postCommentDispatch: (user, questionId, answerId, comment) =>
      dispatch(postComment(user, questionId, answerId, comment)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'viewQuestion', reducer });
const withSaga = injectSaga({ key: 'viewQuestion', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewQuestion);
