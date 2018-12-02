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
import * as routes from 'routes-config';

import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import { TEXT_EDITOR_ANSWER_FORM } from 'components/AnswerForm/constants';

import {
  toggleCommentVision,
  saveComment,
  deleteComment,
  deleteAnswer,
  deleteQuestion,
  getQuestionData,
  postAnswer,
  postComment,
  upVote,
  downVote,
  markAsAccepted,
  voteToDelete,
} from './actions';

import * as makeSelectViewQuestion from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import {
  TEXTAREA_COMMENT_FORM,
  POST_COMMENT_BUTTON,
  MARK_AS_BUTTON,
  UP_VOTE_BUTTON,
  DOWN_VOTE_BUTTON,
} from './constants';

import ViewQuestionContainer from './ViewQuestionContainer';
import NoSuchQuestion from './NoSuchQuestion';

/* eslint-disable react/prefer-stateless-function */
export class ViewQuestion extends React.Component {
  componentDidMount() {
    this.questionId = this.props.match.params.id;
    this.props.getQuestionDataDispatch(this.questionId);
  }

  /**
   *
   * Question methods
   *
   */

  deleteQuestion = e => {
    const { id } = e.target;
    this.props.deleteQuestionDispatch(this.props.account, this.questionId, id);
  };

  editQuestion = e => {
    const { questionid } = e.target.dataset;
    this.props.history.push(routes.question_edit(questionid));
  };

  /**
   *
   * Answer methods
   *
   */

  postAnswer = (...args) => {
    const answer = args[0].get(TEXT_EDITOR_ANSWER_FORM);
    const postButtonId = args[2].sendButtonId;
    const translations = translationMessages[this.props.locale];

    this.props.postAnswerDispatch(
      this.props.account,
      this.questionId,
      answer,
      args[2].reset,
      postButtonId,
      translations,
    );
  };

  editAnswer = e => {
    const { questionid, answerid } = e.target.dataset;
    this.props.history.push(routes.answer_edit(questionid, answerid));
  };

  deleteAnswer = e => {
    const { id } = e.target;
    const { answerid } = e.target.dataset;
    this.props.deleteAnswerDispatch(
      this.props.account,
      this.questionId,
      answerid,
      id,
    );
  };

  /**
   *
   * Comment methods
   *
   */

  postComment = (...args) => {
    const postButtonId = `${POST_COMMENT_BUTTON}${args[2].answerId}`;
    const translations = translationMessages[this.props.locale];

    this.props.postCommentDispatch(
      this.props.account,
      this.questionId,
      args[2].answerId,
      args[0].get(TEXTAREA_COMMENT_FORM),
      args[2].reset,
      postButtonId,
      translations,
    );
  };

  editComment = e => {
    const { commentid, answerid } = e.target.dataset;
    this.props.toggleCommentVisionDispatch({ commentid, answerid });
  };

  saveComment = (...args) => {
    const comment = args[0].get(TEXTAREA_COMMENT_FORM);
    const { commentId, answerId } = args[2];

    this.props.saveCommentDispatch(
      this.props.account,
      this.questionId,
      answerId,
      commentId,
      comment,
    );
  };

  deleteComment = e => {
    const { id } = e.target;
    const { commentid, answerid } = e.target.dataset;
    this.props.deleteCommentDispatch(
      this.props.account,
      this.questionId,
      answerid,
      commentid,
      id,
    );
  };

  /**
   *
   * Other methods
   *
   */

  markAsAccepted = answerId => {
    const postButtonId = `${MARK_AS_BUTTON}${answerId}`;
    const translations = translationMessages[this.props.locale];

    this.props.markAsAcceptedDispatch(
      this.props.account,
      this.questionId,
      answerId,
      postButtonId,
      translations,
    );
  };

  upVote = answerId => {
    const postButtonId = `${UP_VOTE_BUTTON}${answerId}`;
    const translations = translationMessages[this.props.locale];

    this.props.upVoteDispatch(
      this.props.account,
      this.questionId,
      answerId,
      postButtonId,
      translations,
    );
  };

  downVote = answerId => {
    const postButtonId = `${DOWN_VOTE_BUTTON}${answerId}`;
    const translations = translationMessages[this.props.locale];

    this.props.downVoteDispatch(
      this.props.account,
      this.questionId,
      answerId,
      postButtonId,
      translations,
    );
  };

  voteToDelete = e => {
    const { id } = e.target;
    const { questionid, answerid, commentid } = e.target.dataset;

    this.props.voteToDeleteDispatch(questionid, answerid, commentid, id);
  };

  render() {
    const {
      locale,
      account,
      questionData,
      postAnswerLoading,
      postCommentLoading,
      questionDataLoading,
      saveCommentLoading,
      editCommentState,
    } = this.props;

    const sendProps = {
      account,
      locale,
      questionData,
      postAnswerLoading,
      postCommentLoading,
      saveCommentLoading,
      editCommentState,
      upVote: this.upVote,
      downVote: this.downVote,
      postAnswer: this.postAnswer,
      editAnswer: this.editAnswer,
      deleteAnswer: this.deleteAnswer,
      postComment: this.postComment,
      editComment: this.editComment,
      saveComment: this.saveComment,
      deleteComment: this.deleteComment,
      markAsAccepted: this.markAsAccepted,
      deleteQuestion: this.deleteQuestion,
      editQuestion: this.editQuestion,
      voteToDelete: this.voteToDelete,
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
  saveCommentLoading: PropTypes.bool,
  questionData: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  editCommentState: PropTypes.object,
  getQuestionDataDispatch: PropTypes.func,
  postAnswerDispatch: PropTypes.func,
  postCommentDispatch: PropTypes.func,
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
  markAsAcceptedDispatch: PropTypes.func,
  deleteQuestionDispatch: PropTypes.func,
  deleteAnswerDispatch: PropTypes.func,
  toggleCommentVisionDispatch: PropTypes.func,
  saveCommentDispatch: PropTypes.func,
  deleteCommentDispatch: PropTypes.func,
  voteToDeleteDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  locale: makeSelectLocale(),
  questionDataLoading: makeSelectViewQuestion.selectQuestionDataLoading(),
  questionData: makeSelectViewQuestion.selectQuestionData(),
  postCommentLoading: makeSelectViewQuestion.selectPostCommentLoading(),
  postAnswerLoading: makeSelectViewQuestion.selectPostAnswerLoading(),
  saveCommentLoading: makeSelectViewQuestion.selectSaveCommentLoading(),
  editCommentState: makeSelectViewQuestion.selectEditComment(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleCommentVisionDispatch: editCommentState =>
      dispatch(toggleCommentVision(editCommentState)),
    saveCommentDispatch: (user, qId, aId, cId, comment) =>
      dispatch(saveComment(user, qId, aId, cId, comment)),
    deleteCommentDispatch: (user, qId, aId, cId, bId) =>
      dispatch(deleteComment(user, qId, aId, cId, bId)),
    deleteQuestionDispatch: (user, qId, bId) =>
      dispatch(deleteQuestion(user, qId, bId)),
    deleteAnswerDispatch: (user, qId, aId, bId) =>
      dispatch(deleteAnswer(user, qId, aId, bId)),
    getQuestionDataDispatch: qId => dispatch(getQuestionData(qId)),
    postAnswerDispatch: (user, qId, answer, reset, postbId, transl) =>
      dispatch(postAnswer(user, qId, answer, reset, postbId, transl)),
    postCommentDispatch: (user, qId, aId, comment, reset, postbId, transl) =>
      dispatch(postComment(user, qId, aId, comment, reset, postbId, transl)),
    upVoteDispatch: (user, qId, aId, postbId, transl) =>
      dispatch(upVote(user, qId, aId, postbId, transl)),
    downVoteDispatch: (user, qId, aId, postbId, transl) =>
      dispatch(downVote(user, qId, aId, postbId, transl)),
    markAsAcceptedDispatch: (user, qId, correctaId, postbId, transl) =>
      dispatch(markAsAccepted(user, qId, correctaId, postbId, transl)),
    voteToDeleteDispatch: (qId, aId, cId, buttonid) =>
      dispatch(voteToDelete(qId, aId, cId, buttonid)),
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
