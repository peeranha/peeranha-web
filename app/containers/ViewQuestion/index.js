/**
 *
 * ViewQuestion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as routes from 'routes-config';

import { scrollToSection } from 'utils/animation';

import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { TEXT_EDITOR_ANSWER_FORM } from 'components/AnswerForm/constants';

import {
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
  resetStore,
} from './actions';

import * as makeSelectViewQuestion from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import { TEXTAREA_COMMENT_FORM, POST_COMMENT_BUTTON } from './constants';

import ViewQuestionContainer from './ViewQuestionContainer';
import NoSuchQuestion from './NoSuchQuestion';

/* eslint-disable react/prefer-stateless-function */
export class ViewQuestion extends React.Component {
  componentDidMount() {
    this.questionId = this.props.match.params.id;
    this.props.getQuestionDataDispatch(this.questionId);
  }

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.questionData &&
      nextProps.questionDataLoading !== this.props.questionDataLoading
    ) {
      setTimeout(() => scrollToSection(), 250);
    }
  };

  componentWillUnmount() {
    this.props.resetStoreDispatch();
    window.$(window).off();
  }

  /**
   *
   * Question methods
   *
   */

  deleteQuestion = e => {
    const { id } = e.currentTarget;
    this.props.deleteQuestionDispatch(this.props.account, this.questionId, id);
  };

  editQuestion = e => {
    const { questionid } = e.currentTarget.dataset;
    this.props.history.push(routes.questionEdit(questionid));
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
    const { questionid, answerid } = e.currentTarget.dataset;
    this.props.history.push(routes.answerEdit(questionid, answerid));
  };

  deleteAnswer = e => {
    const { id } = e.currentTarget;
    const { answerid } = e.currentTarget.dataset;
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
      args[2].toggleView,
    );
  };

  saveComment = (...args) => {
    const comment = args[0].get(TEXTAREA_COMMENT_FORM);
    const { commentId, answerId, toggleView } = args[2];

    this.props.saveCommentDispatch(
      this.props.account,
      this.questionId,
      answerId,
      commentId,
      comment,
      toggleView,
    );
  };

  deleteComment = e => {
    const { id } = e.currentTarget;
    const { commentid, answerid } = e.currentTarget.dataset;
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

  markAsAccepted = e => {
    const { answerid, whowasaccepted } = e.currentTarget.dataset;

    const postButtonId = e.currentTarget.id;
    const translations = translationMessages[this.props.locale];

    this.props.markAsAcceptedDispatch(
      this.props.account,
      this.questionId,
      answerid,
      postButtonId,
      translations,
      whowasaccepted,
    );
  };

  upVote = e => {
    const { answerid, whowasupvoted } = e.currentTarget.dataset;

    const postButtonId = e.currentTarget.id;
    const translations = translationMessages[this.props.locale];

    this.props.upVoteDispatch(
      this.props.account,
      this.questionId,
      +answerid,
      postButtonId,
      translations,
      whowasupvoted,
    );
  };

  downVote = e => {
    const { answerid, whowasdownvoted } = e.currentTarget.dataset;

    const postButtonId = e.currentTarget.id;
    const translations = translationMessages[this.props.locale];

    this.props.downVoteDispatch(
      this.props.account,
      this.questionId,
      +answerid,
      postButtonId,
      translations,
      whowasdownvoted,
    );
  };

  voteToDelete = e => {
    const { id } = e.currentTarget;
    const {
      questionid,
      answerid,
      commentid,
      whowasvoted,
    } = e.currentTarget.dataset;

    this.props.voteToDeleteDispatch(
      questionid,
      answerid,
      commentid,
      id,
      whowasvoted,
    );
  };

  render() /* istanbul ignore next */ {
    const {
      locale,
      account,
      questionData,
      postAnswerLoading,
      postCommentLoading,
      questionDataLoading,
      saveCommentLoading,
      communities,
    } = this.props;

    const sendProps = {
      account,
      locale,
      communities,
      questionData,
      postAnswerLoading,
      postCommentLoading,
      saveCommentLoading,
      upVote: this.upVote,
      downVote: this.downVote,
      postAnswer: this.postAnswer,
      editAnswer: this.editAnswer,
      deleteAnswer: this.deleteAnswer,
      postComment: this.postComment,
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

    const articlePublishedTime =
      questionData && questionData.post_time
        ? new Date(questionData.post_time * 1000)
        : ``;

    const articleModifiedTime =
      questionData && questionData.lastEditedDate
        ? new Date(questionData.lastEditedDate * 1000)
        : ``;

    const tagIds = questionData ? questionData.tags : [];

    const commId = questionData ? questionData.community_id : null;

    const community = communities.filter(x => x.id === commId)[0] || {
      tags: [],
    };

    const tags = community.tags.filter(x => tagIds.includes(x.id));

    const keywords = `${tags.map(x => x.name)}, ${helmetTitle}`;

    return (
      <div>
        <Seo
          title={helmetTitle}
          description={helmetDescription}
          language={locale}
          keywords={keywords}
          articlePublishedTime={articlePublishedTime}
          articleModifiedTime={articleModifiedTime}
        />

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
  communities: PropTypes.array,
  questionDataLoading: PropTypes.bool,
  postAnswerLoading: PropTypes.bool,
  postCommentLoading: PropTypes.bool,
  saveCommentLoading: PropTypes.bool,
  questionData: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  getQuestionDataDispatch: PropTypes.func,
  postAnswerDispatch: PropTypes.func,
  postCommentDispatch: PropTypes.func,
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
  markAsAcceptedDispatch: PropTypes.func,
  deleteQuestionDispatch: PropTypes.func,
  deleteAnswerDispatch: PropTypes.func,
  saveCommentDispatch: PropTypes.func,
  deleteCommentDispatch: PropTypes.func,
  voteToDeleteDispatch: PropTypes.func,
  resetStoreDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  questionDataLoading: makeSelectViewQuestion.selectQuestionDataLoading(),
  questionData: makeSelectViewQuestion.selectQuestionData(),
  postCommentLoading: makeSelectViewQuestion.selectPostCommentLoading(),
  postAnswerLoading: makeSelectViewQuestion.selectPostAnswerLoading(),
  saveCommentLoading: makeSelectViewQuestion.selectSaveCommentLoading(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    saveCommentDispatch: (user, qId, aId, cId, comment, toggleView) =>
      dispatch(saveComment(user, qId, aId, cId, comment, toggleView)),

    deleteCommentDispatch: (user, qId, aId, cId, bId) =>
      dispatch(deleteComment(user, qId, aId, cId, bId)),

    deleteQuestionDispatch: (user, qId, bId) =>
      dispatch(deleteQuestion(user, qId, bId)),

    deleteAnswerDispatch: (user, qId, aId, bId) =>
      dispatch(deleteAnswer(user, qId, aId, bId)),

    getQuestionDataDispatch: qId => dispatch(getQuestionData(qId)),

    postAnswerDispatch: (user, qId, answer, reset, postbId, transl) =>
      dispatch(postAnswer(user, qId, answer, reset, postbId, transl)),

    postCommentDispatch: (us, qid, aid, comm, reset, bId, transl, toggle) =>
      dispatch(postComment(us, qid, aid, comm, reset, bId, transl, toggle)),

    upVoteDispatch: (user, qId, aId, postbId, transl, whoWasUpvoted) =>
      dispatch(upVote(user, qId, aId, postbId, transl, whoWasUpvoted)),

    downVoteDispatch: (user, qId, aId, postbId, transl, whoWasDownvoted) =>
      dispatch(downVote(user, qId, aId, postbId, transl, whoWasDownvoted)),

    markAsAcceptedDispatch: (user, qId, corrId, bId, transl, accepted) =>
      dispatch(markAsAccepted(user, qId, corrId, bId, transl, accepted)),

    voteToDeleteDispatch: (qId, aId, cId, buttonid, whowasvoted) =>
      dispatch(voteToDelete(qId, aId, cId, buttonid, whowasvoted)),

    resetStoreDispatch: () => dispatch(resetStore()),
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
