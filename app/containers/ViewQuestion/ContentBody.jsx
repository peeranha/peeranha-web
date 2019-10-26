import React from 'react';
import PropTypes from 'prop-types';

import Base from 'components/Base';

import TextBlock from './TextBlock';
import Comments from './Comments';
import BestAnswerMarker from './BestAnswerMarker';

import { ADD_COMMENT_FORM, POST_COMMENT_BUTTON } from './constants';
import messages from './messages';

export const ContentBody = ({
  content,
  type,
  voteToDelete,
  voteToDeleteLoading,
  buttonParams,
  translations,
  answerId,
  questionData,
  locale,
  saveComment,
  saveCommentLoading,
  deleteComment,
  deleteCommentLoading,
  comments,
  postCommentLoading,
  postComment,
  questionFrom,
  account,
  markAsAccepted,
  markAsAcceptedLoading,
  userInfo,
  isTheLargestRating,
}) => (
  <Base position="bottom">
    <BestAnswerMarker
      answerId={answerId}
      questionFrom={questionFrom}
      account={account}
      markAsAccepted={markAsAccepted}
      markAsAcceptedLoading={markAsAcceptedLoading}
      correctAnswerId={questionData.correct_answer_id}
      whoWasAccepted={userInfo.user}
      isTheLargestRating={isTheLargestRating}
    />

    <TextBlock content={content} />

    <Comments
      locale={locale}
      type={type}
      saveComment={saveComment}
      saveCommentLoading={saveCommentLoading}
      deleteComment={deleteComment}
      deleteCommentLoading={deleteCommentLoading}
      voteToDelete={voteToDelete}
      voteToDeleteLoading={voteToDeleteLoading}
      buttonParams={buttonParams}
      translations={translations}
      answerId={answerId}
      comments={comments}
      form={`${ADD_COMMENT_FORM}${answerId}`}
      submitButtonId={POST_COMMENT_BUTTON}
      submitButtonName={translations[messages.postCommentButton.id]}
      sendCommentLoading={postCommentLoading}
      sendComment={postComment}
    />
  </Base>
);

ContentBody.propTypes = {
  type: PropTypes.string,
  locale: PropTypes.string,
  content: PropTypes.string,
  translations: PropTypes.object,
  questionData: PropTypes.object,
  buttonParams: PropTypes.object,
  postCommentLoading: PropTypes.bool,
  saveCommentLoading: PropTypes.bool,
  comments: PropTypes.array,
  postComment: PropTypes.func,
  voteToDelete: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
  questionFrom: PropTypes.string,
  account: PropTypes.string,
  markAsAccepted: PropTypes.func,
  userInfo: PropTypes.object,
  isTheLargestRating: PropTypes.bool,
  voteToDeleteLoading: PropTypes.bool,
  deleteCommentLoading: PropTypes.bool,
  markAsAcceptedLoading: PropTypes.bool,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(ContentBody);
