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

import {
  TEXT_EDITOR_ANSWER_FORM,
  TEXTAREA_COMMENT_FORM,
  POST_ANSWER_BUTTON,
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

  postAnswer = (...args) => {
    const answer = TextEditor.getHtmlText(args[0].get(TEXT_EDITOR_ANSWER_FORM));
    const postButtonId = `${POST_ANSWER_BUTTON}${args[2].postButtonId}`;
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
    postAnswerDispatch: (
      user,
      questionId,
      answer,
      reset,
      postButtonId,
      translations,
    ) =>
      dispatch(
        postAnswer(user, questionId, answer, reset, postButtonId, translations),
      ),
    postCommentDispatch: (
      user,
      questionId,
      answerId,
      comment,
      reset,
      postButtonId,
      translations,
    ) =>
      dispatch(
        postComment(
          user,
          questionId,
          answerId,
          comment,
          reset,
          postButtonId,
          translations,
        ),
      ),
    upVoteDispatch: (user, questionId, answerId, postButtonId, translations) =>
      dispatch(upVote(user, questionId, answerId, postButtonId, translations)),
    downVoteDispatch: (
      user,
      questionId,
      answerId,
      postButtonId,
      translations,
    ) =>
      dispatch(
        downVote(user, questionId, answerId, postButtonId, translations),
      ),
    markAsAcceptedDispatch: (
      user,
      questionId,
      correctAnswerId,
      postButtonId,
      translations,
    ) =>
      dispatch(
        markAsAccepted(
          user,
          questionId,
          correctAnswerId,
          postButtonId,
          translations,
        ),
      ),
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
