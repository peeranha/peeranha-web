import React from 'react';
import PropTypes from 'prop-types';

import TextBlock from './TextBlock';
import ContentOptions from './ContentOptions';
import CommentForm from './CommentForm';
import Comments from './Comments';

import { ADD_COMMENT_FORM, POST_COMMENT_BUTTON } from './constants';
import messages from './messages';

const ContentBody = props => (
  <div className="content-body">
    <TextBlock content={props.content} />
    <ContentOptions
      type={props.type}
      deleteItem={props.deleteItem}
      editItem={props.editItem}
      buttonParams={props.buttonParams}
      translations={props.translations}
      isItWrittenByMe={props.isItWrittenByMe}
      answerId={props.answerId}
    />
    <Comments
      type={props.type}
      editComment={props.editComment}
      saveComment={props.saveComment}
      saveCommentLoading={props.saveCommentLoading}
      editCommentState={props.editCommentState}
      deleteComment={props.deleteComment}
      buttonParams={props.buttonParams}
      translations={props.translations}
      answerId={props.answerId}
      comments={props.comments}
    />
    <div className="add-comment">
      <CommentForm
        form={`${ADD_COMMENT_FORM}${props.answerId}`}
        submitButtonId={POST_COMMENT_BUTTON}
        submitButtonName={props.translations[messages.postCommentButton.id]}
        sendCommentLoading={props.postCommentLoading}
        sendComment={props.postComment}
        answerId={props.answerId}
      />
    </div>
  </div>
);

ContentBody.propTypes = {
  type: PropTypes.string,
  content: PropTypes.string,
  translations: PropTypes.object,
  editCommentState: PropTypes.object,
  buttonParams: PropTypes.object,
  isItWrittenByMe: PropTypes.bool,
  postCommentLoading: PropTypes.bool,
  saveCommentLoading: PropTypes.bool,
  comments: PropTypes.array,
  postComment: PropTypes.func,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  editComment: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ContentBody;
