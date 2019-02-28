import React from 'react';
import PropTypes from 'prop-types';

import Tags from 'components/TagsList';
import Community from 'components/Community';

import TextBlock from './TextBlock';
import ContentOptions from './ContentOptions';
import CommentForm from './CommentForm';
import Comments from './Comments';

import { ADD_COMMENT_FORM, POST_COMMENT_BUTTON } from './constants';
import messages from './messages';

const ContentBody = ({
  content,
  type,
  deleteItem,
  voteToDelete,
  editItem,
  buttonParams,
  translations,
  isItWrittenByMe,
  answerId,
  questionData,
  communities,
  locale,
  editComment,
  saveComment,
  saveCommentLoading,
  editCommentState,
  deleteComment,
  comments,
  postCommentLoading,
  postComment,
}) => (
  <div className="content-body">
    <TextBlock content={content} />
    <ContentOptions
      type={type}
      deleteItem={deleteItem}
      voteToDelete={voteToDelete}
      editItem={editItem}
      buttonParams={buttonParams}
      translations={translations}
      isItWrittenByMe={isItWrittenByMe}
      answerId={answerId}
    />
    <div>
      <Community
        communityId={questionData.community_id}
        communities={communities}
      />
      <Tags
        chosenTags={questionData.tags}
        communityId={questionData.community_id}
        communities={communities}
      />
    </div>
    <Comments
      locale={locale}
      type={type}
      editComment={editComment}
      saveComment={saveComment}
      saveCommentLoading={saveCommentLoading}
      editCommentState={editCommentState}
      deleteComment={deleteComment}
      voteToDelete={voteToDelete}
      buttonParams={buttonParams}
      translations={translations}
      answerId={answerId}
      comments={comments}
    />
    <div className="add-comment">
      <CommentForm
        form={`${ADD_COMMENT_FORM}${answerId}`}
        submitButtonId={POST_COMMENT_BUTTON}
        submitButtonName={translations[messages.postCommentButton.id]}
        sendCommentLoading={postCommentLoading}
        sendComment={postComment}
        answerId={answerId}
      />
    </div>
  </div>
);

ContentBody.propTypes = {
  type: PropTypes.string,
  locale: PropTypes.string,
  content: PropTypes.string,
  translations: PropTypes.object,
  questionData: PropTypes.object,
  editCommentState: PropTypes.object,
  buttonParams: PropTypes.object,
  isItWrittenByMe: PropTypes.bool,
  postCommentLoading: PropTypes.bool,
  saveCommentLoading: PropTypes.bool,
  comments: PropTypes.array,
  communities: PropTypes.array,
  postComment: PropTypes.func,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  voteToDelete: PropTypes.func,
  editComment: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ContentBody;
