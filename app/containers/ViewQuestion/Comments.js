import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  TEXT_PRIMARY,
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_TRANSPARENT,
} from 'style-constants';

import editSmallIcon from 'images/editSmallIcon.svg?inline';
import deleteSmallIcon from 'images/deleteSmallIcon.svg?inline';
import blockSmallIcon from 'images/blockSmallIcon.svg?inline';

import Span from 'components/Span';
import Textarea from 'components/Textarea';

import Button, { BlockButton } from './Button';
import UserInfo from './UserInfo';
import CommentOptions from './CommentOptions';
import CommentForm from './CommentForm';

import messages from './messages';

import {
  SAVE_COMMENT_FORM,
  SAVE_COMMENT_BUTTON,
  COMMENT_TYPE,
} from './constants';

const CommentManage = styled.div`
  opacity: 0;

  button {
    padding-left: 15px !important;

    ${Span} {
      font-size: 14px;
    }
  }
`;

const CommentViewStyled = styled.li`
  position: relative;
`;

const CommentEditStyled = styled.li`
  ${Textarea} {
    height: 90px;
  }
`;

const CommentsStyled = styled.ul`
  ${CommentViewStyled} {
    border: 1px solid ${BORDER_SECONDARY};
    padding: 5px 15px 8px 15px;

    :first-child {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }

    :last-child {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }

    :not(:last-child) {
      border-bottom-color: ${BORDER_TRANSPARENT};
    }

    :hover {
      border-color: ${BORDER_PRIMARY};

      ${CommentManage} {
        opacity: 1;
      }
    }
  }
`;

const CommentEdit = /* istanbul ignore next */ ({
  answerId,
  id,
  content,
  translations,
  saveCommentLoading,
  saveComment,
  toggleView,
}) => (
  <CommentEditStyled className="my-4">
    <CommentForm
      form={`${SAVE_COMMENT_FORM}_${answerId}${id}`}
      comment={content}
      submitButtonId={SAVE_COMMENT_BUTTON}
      submitButtonName={translations[messages.saveButton.id]}
      sendCommentLoading={saveCommentLoading}
      sendComment={saveComment}
      answerId={answerId}
      commentId={id}
      toggleView={toggleView}
    />
  </CommentEditStyled>
);

const CommentView = /* istanbul ignore next */ item => (
  <CommentViewStyled>
    <div className="d-flex justify-content-between align-items-center">
      <UserInfo
        type={COMMENT_TYPE}
        avatar={item.userInfo.ipfs_avatar}
        name={item.userInfo.display_name}
        rating={item.userInfo.rating}
        account={item.userInfo.user}
        postTime={item.post_time}
        locale={item.locale}
      />

      <CommentManage>
        <Button
          show={item.isItWrittenByMe}
          params={{
            ...item.buttonParams,
            commentId: item.id,
            whowasvoted: item.userInfo.user,
          }}
          onClick={() => item.toggleView(!item.isView)}
        >
          <Span className="d-flex align-items-center" color={TEXT_PRIMARY}>
            <img className="mr-1" src={editSmallIcon} alt="icon" />
            <FormattedMessage {...messages.editButton} />
          </Span>
        </Button>

        <Button
          show={item.isItWrittenByMe}
          id={`comment__${item.answerId}${item.id}`}
          params={{
            ...item.buttonParams,
            commentId: item.id,
            whowasvoted: item.userInfo.user,
          }}
          onClick={item.deleteComment}
        >
          <Span className="d-flex align-items-center" color={TEXT_PRIMARY}>
            <img className="mr-1" src={deleteSmallIcon} alt="icon" />
            <FormattedMessage {...messages.deleteButton} />
          </Span>
        </Button>

        <BlockButton
          show
          id={`comment_vote_to_delete_${item.answerId}${item.id}`}
          isVotedToDelete={item.isVotedToDelete}
          isItWrittenByMe={item.isItWrittenByMe}
          onClick={item.voteToDelete}
          params={{
            ...item.buttonParams,
            commentId: item.id,
            whowasvoted: item.userInfo.user,
          }}
        >
          <Span className="d-flex align-items-center" color={TEXT_PRIMARY}>
            <img className="mr-1" src={blockSmallIcon} alt="icon" />
            <FormattedMessage {...messages.voteToDelete} />
          </Span>
        </BlockButton>
      </CommentManage>
    </div>

    <div dangerouslySetInnerHTML={{ __html: item.content }} />
  </CommentViewStyled>
);

const Comment = /* istanbul ignore next */ item => {
  const [isView, toggleView] = useState(true);

  return (
    <React.Fragment>
      {!isView ? (
        <CommentEdit toggleView={toggleView} {...item} />
      ) : (
        <CommentView isView={isView} toggleView={toggleView} {...item} />
      )}
    </React.Fragment>
  );
};

const Comments = /* istanbul ignore next */ props => {
  const DEFAULT_COMMENTS_NUMBER = 3;
  const [isAllCommentsView, changeCommentsView] = useState(false);

  const commentsNum = !isAllCommentsView ? DEFAULT_COMMENTS_NUMBER : undefined;

  return (
    <div>
      <CommentsStyled className="my-3">
        {props.comments
          .slice(0, commentsNum)
          .map(item => (
            <Comment {...item} {...props} key={`${COMMENT_TYPE}${item.id}`} />
          ))}
      </CommentsStyled>

      <CommentOptions
        form={props.form}
        submitButtonId={props.submitButtonId}
        submitButtonName={props.submitButtonName}
        sendCommentLoading={props.sendCommentLoading}
        sendComment={props.sendComment}
        answerId={props.answerId}
        changeCommentsView={changeCommentsView}
        isAllCommentsView={isAllCommentsView}
        commentsNumber={props.comments.length - DEFAULT_COMMENTS_NUMBER}
      />
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  form: PropTypes.string,
  submitButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendCommentLoading: PropTypes.bool,
  sendComment: PropTypes.func,
  answerId: PropTypes.string,
};

CommentEdit.propTypes = {
  answerId: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.string,
  translations: PropTypes.object,
  saveCommentLoading: PropTypes.bool,
  saveComment: PropTypes.func,
  toggleView: PropTypes.func,
};

export { Comment, CommentEdit, CommentView, Comments };
export default React.memo(Comments);
