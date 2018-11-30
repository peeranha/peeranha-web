import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import ChangesHistory from './ChangesHistory';
import UserInfo from './UserInfo';
import CommentForm from './CommentForm';

import messages from './messages';

import { SAVE_COMMENT_FORM, SAVE_COMMENT_BUTTON } from './constants';

const CommentEdit = item => (
  <div className="save-edited-form">
    <CommentForm
      form={`${SAVE_COMMENT_FORM}_${item.answerId}${item.id}`}
      comment={item.content}
      submitButtonId={SAVE_COMMENT_BUTTON}
      submitButtonName={item.translations[messages.saveButton.id]}
      sendCommentLoading={item.saveCommentLoading}
      sendComment={item.saveComment}
      answerId={item.answerId}
      commentId={item.id}
    />
  </div>
);

const CommentView = item => (
  <div className="comment-content">
    <div>
      <ChangesHistory
        locale={item.locale}
        postTime={item.post_time}
        lastEditedDate={item.lastEditedDate}
      />
      <p
        className="comment-text"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </div>
    <p className="option-edit">
      <Button
        buttonParams={{ ...item.buttonParams, commentId: item.id }}
        isItWrittenByMe={item.isItWrittenByMe}
        buttonName={item.translations[messages.editButton.id]}
        buttonClick={item.editComment}
      />
      <Button
        buttonId={`comment__${item.answerId}${item.id}`}
        buttonParams={{ ...item.buttonParams, commentId: item.id }}
        isItWrittenByMe={item.isItWrittenByMe}
        buttonName={item.translations[messages.deleteButton.id]}
        buttonClick={item.deleteComment}
      />
      <Button
        buttonId={`comment_vote_to_delete_${item.answerId}${item.id}`}
        buttonParams={{ ...item.buttonParams, commentId: item.id }}
        isItWrittenByMe="true"
        buttonName={item.translations[messages.voteToDelete.id]}
        buttonClick={item.voteToDelete}
      />
    </p>
  </div>
);

/* eslint eqeqeq: 0 */
const CommentVision = item => {
  const { answerid, commentid } = item.editCommentState;
  return answerid == item.answerId && commentid == item.id ? (
    <CommentEdit {...item} />
  ) : (
    <CommentView {...item} />
  );
};

const Comment = item => (
  <div className="comment-body">
    <UserInfo
      avatar={item.userInfo.ipfs_avatar}
      name={item.userInfo.display_name}
      rating={item.userInfo.rating}
      account={item.userInfo.owner}
    />
    <CommentVision {...item} />
  </div>
);

const Comments = props => (
  <div className="comments">
    {props.comments.map(item => (
      <Comment {...item} {...props} key={`comment${item.id}`} />
    ))}
  </div>
);

Comments.propTypes = {
  comments: PropTypes.array,
};

export { Comment, CommentVision, CommentEdit, CommentView };
export default Comments;
