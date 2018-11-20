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
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import LoadingIndicator from 'components/LoadingIndicator';
import TextEditor from 'components/TextEditor';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import {
  getQuestionData,
  postAnswer,
  postComment,
  upVote,
  downVote,
  markAsAccepted,
} from './actions';

import * as makeSelectViewQuestion from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import { TEXT_EDITOR_ANSWER_FORM, TEXTAREA_COMMENT_FORM } from './constants';

import ViewQuestionContainer from './ViewQuestionContainer';
import NoSuchQuestion from './NoSuchQuestion';

/* eslint-disable react/prefer-stateless-function */
export class ViewQuestion extends React.Component {
  componentDidMount() {
    this.questionId = this.props.match.params.id;
    this.props.getQuestionDataDispatch(this.questionId);
  }

  markAsAccepted = id => {
    this.props.markAsAcceptedDispatch(this.props.account, this.questionId, id);
  };

  upVote = answerId => {
    this.props.upVoteDispatch(this.props.account, this.questionId, answerId);
  };

  downVote = answerId => {
    this.props.downVoteDispatch(this.props.account, this.questionId, answerId);
  };

  postAnswer = (...args) => {
    const answer = TextEditor.getHtmlText(args[0].get(TEXT_EDITOR_ANSWER_FORM));

    this.props.postAnswerDispatch(
      this.props.account,
      this.questionId,
      answer,
      args[2].reset,
    );
  };

  postComment = (...args) => {
    this.props.postCommentDispatch(
      this.props.account,
      this.questionId,
      args[2].answerId,
      args[0].get(TEXTAREA_COMMENT_FORM),
      args[2].reset,
    );
  };

  editContent = () => {
    console.log('Redirect to edit content');
    return null;
  };

  render() {
    const {
      locale,
      account,
      questionData,
      postAnswerLoading,
      postCommentLoading,
      questionDataLoading,
    } = this.props;

    const sendProps = {
      account,
      questionData,
      postAnswerLoading,
      postCommentLoading,
      upVote: this.upVote,
      downVote: this.downVote,
      postAnswer: this.postAnswer,
      postComment: this.postComment,
      editContent: this.editContent,
      markAsAccepted: this.markAsAccepted,
      translations: translationMessages[locale],
    };

    const helmetTitle =
      (questionData && questionData.content.title) ||
      sendProps.translations[messages.title.id];

    const helmetDescription =
      (questionData && questionData.content.content) ||
      sendProps.translations[messages.title.description];

    return (
      <div className="container">
        <Helmet>
          <title>{helmetTitle}</title>
          <meta name="description" content={helmetDescription} />
        </Helmet>

        {!questionDataLoading &&
          questionData && <ViewQuestionContainer {...sendProps} />}

        {!questionDataLoading && !questionData && <NoSuchQuestion />}

        {questionDataLoading && <LoadingIndicator />}
      </div>
    );
  }
}

ViewQuestion.propTypes = {
  account: PropTypes.string,
  locale: PropTypes.string,
  questionDataLoading: PropTypes.bool,
  postAnswerLoading: PropTypes.bool,
  postCommentLoading: PropTypes.bool,
  questionData: PropTypes.object,
  match: PropTypes.object,
  getQuestionDataDispatch: PropTypes.func,
  postAnswerDispatch: PropTypes.func,
  postCommentDispatch: PropTypes.func,
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
  markAsAcceptedDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  locale: makeSelectLocale(),
  questionDataLoading: makeSelectViewQuestion.selectQuestionDataLoading(),
  questionData: makeSelectViewQuestion.selectQuestionData(),
  postCommentLoading: makeSelectViewQuestion.selectPostCommentLoading(),
  postAnswerLoading: makeSelectViewQuestion.selectPostAnswerLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getQuestionDataDispatch: questionId =>
      dispatch(getQuestionData(questionId)),
    postAnswerDispatch: (user, questionId, answer, reset) =>
      dispatch(postAnswer(user, questionId, answer, reset)),
    postCommentDispatch: (user, questionId, answerId, comment, reset) =>
      dispatch(postComment(user, questionId, answerId, comment, reset)),
    upVoteDispatch: (user, questionId, answerId) =>
      dispatch(upVote(user, questionId, answerId)),
    downVoteDispatch: (user, questionId, answerId) =>
      dispatch(downVote(user, questionId, answerId)),
    markAsAcceptedDispatch: (user, questionId, correctAnswerId) =>
      dispatch(markAsAccepted(user, questionId, correctAnswerId)),
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
