import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Base from 'components/Base';
import MarkdownPreviewBlock from 'components/TextEditor/MarkdownPreview';

import Comments from './Comments';
import BestAnswerMarker from './BestAnswerMarker';

import { ADD_COMMENT_FORM, POST_COMMENT_BUTTON } from './constants';

export const ContentBody = ({
  content,
  type,
  voteToDelete,
  voteToDeleteLoading,
  buttonParams,
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
  isOfficialReply,
  isOriginalLanguage,
  profile,
  loginWithSuiDispatch,
}) => {
  const { t } = useTranslation();
  let actualAnswerId = answerId;
  if (typeof answerId === 'string') {
    actualAnswerId = answerId?.split('-')?.[2] || answerId;
  }
  return (
    <Base position="bottom" paddingTop="10">
      <BestAnswerMarker
        answerId={Number(actualAnswerId)}
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
        isOfficial={isOfficialReply}
        author={author}
        profile={profile}
      />

      <MarkdownPreviewBlock content={content} />

      <Comments
        postId={questionData.id}
        locale={locale}
        questionData={questionData}
        isOriginalLanguage={isOriginalLanguage}
        type={type}
        saveComment={saveComment}
        saveCommentLoading={saveCommentLoading}
        deleteComment={deleteComment}
        deleteCommentLoading={deleteCommentLoading}
        voteToDelete={voteToDelete}
        voteToDeleteLoading={voteToDeleteLoading}
        buttonParams={buttonParams}
        answerId={answerId}
        comments={comments}
        form={`${ADD_COMMENT_FORM}${answerId}`}
        submitButtonId={POST_COMMENT_BUTTON}
        submitButtonName={t('post.postCommentButton')}
        sendCommentLoading={postCommentLoading}
        sendComment={postComment}
        checkAddCommentAvailable={checkAddCommentAvailable}
        hideAddCommentForm={hideAddCommentForm}
        addCommentFormDisplay={addCommentFormDisplay}
        ids={ids}
        infiniteImpact={infiniteImpact}
        communityId={commId}
        histories={histories}
        loginWithSuiDispatch={loginWithSuiDispatch}
      />
    </Base>
  );
};

ContentBody.propTypes = {
  type: PropTypes.string,
  locale: PropTypes.string,
  content: PropTypes.string,
  translations: PropTypes.array,
  isOriginalLanguage: PropTypes.bool,
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
  loginWithSuiDispatch: PropTypes.func,
};

export default React.memo(ContentBody);
