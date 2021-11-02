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
  userInfo,
  isTheLargestRating,
  ids,
  isItWrittenByMe,
  infiniteImpact,
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
    <Base position="bottom">
      <BestAnswerMarker
        answerId={answerId}
        questionFrom={questionFrom}
        account={account}
        markAsAccepted={markAsAccepted}
        markAsAcceptedLoading={markAsAcceptedLoading}
        correctAnswerId={questionData.bestReply}
        whoWasAccepted={userInfo.user}
        isTheLargestRating={isTheLargestRating}
        ids={ids}
        isGeneral={questionData.isGeneral}
        isItWrittenByMe={isItWrittenByMe}
        communityId={questionData.communityId}
        questionId={questionData.id}
        isOfficial={isOfficial}
        userInfo={userInfo}
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
        checkAddCommentAvailable={checkAddCommentAvailable}
        hideAddCommentForm={hideAddCommentForm}
        addCommentFormDisplay={addCommentFormDisplay}
        ids={ids}
        infiniteImpact={infiniteImpact}
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
  userInfo: PropTypes.object,
  isTheLargestRating: PropTypes.bool,
  voteToDeleteLoading: PropTypes.bool,
  deleteCommentLoading: PropTypes.bool,
  markAsAcceptedLoading: PropTypes.bool,
  ids: PropTypes.array,
  answerId: PropTypes.number,
  isItWrittenByMe: PropTypes.bool,
  infiniteImpact: PropTypes.bool,
};

export default React.memo(ContentBody);
