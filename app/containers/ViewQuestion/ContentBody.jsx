import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Base from 'components/Base';
import TextBlock from 'components/FormFields/TextBlock';

import { isAnswerOfficial } from 'utils/properties';

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
  checkAddCommentAvailable,
  hideAddCommentForm,
  addCommentFormDisplay,
  questionFrom,
  account,
  markAsAccepted,
  markAsAcceptedLoading,
  author,
  isTheLargestRating,
  ids,
  isItWrittenByMe,
  infiniteImpact,
  commId,
  histories,
}) => {
  const isOfficial = useMemo(
    () =>
      isAnswerOfficial(
        questionData.answers.find(({ id }) => id === answerId) || {
          isOfficialReply: false,
        },
      ),
    [questionData.answers, answerId],
  );

  return (
    <Base position="bottom" paddingTop="10">
      <BestAnswerMarker
        answerId={answerId}
        questionFrom={questionFrom}
        account={account}
        markAsAccepted={markAsAccepted}
        markAsAcceptedLoading={markAsAcceptedLoading}
        correctAnswerId={questionData.bestReply}
        whoWasAccepted={author.user}
        isTheLargestRating={isTheLargestRating}
        ids={ids}
        isGeneral={questionData.isGeneral}
        isItWrittenByMe={isItWrittenByMe}
        communityId={questionData.communityId}
        questionId={questionData.id}
        isOfficial={isOfficial}
        author={author}
      />

      <TextBlock content={content} />

      <Comments
        postId={questionData.id}
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
        checkAddCommentAvailable={checkAddCommentAvailable}
        hideAddCommentForm={hideAddCommentForm}
        addCommentFormDisplay={addCommentFormDisplay}
        ids={ids}
        infiniteImpact={infiniteImpact}
        communityId={commId}
        histories={histories}
      />
    </Base>
  );
};

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
  checkAddCommentAvailable: PropTypes.func,
  hideAddCommentForm: PropTypes.func,
  addCommentFormDisplay: PropTypes.array,
  voteToDelete: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
  questionFrom: PropTypes.string,
  account: PropTypes.string,
  markAsAccepted: PropTypes.func,
  author: PropTypes.object,
  isTheLargestRating: PropTypes.bool,
  voteToDeleteLoading: PropTypes.bool,
  deleteCommentLoading: PropTypes.bool,
  markAsAcceptedLoading: PropTypes.bool,
  ids: PropTypes.array,
  answerId: PropTypes.number,
  isItWrittenByMe: PropTypes.bool,
  infiniteImpact: PropTypes.bool,
  histories: PropTypes.array,
  commId: PropTypes.number,
};

export default React.memo(ContentBody);
