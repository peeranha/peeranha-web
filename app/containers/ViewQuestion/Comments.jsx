import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_TRANSPARENT,
} from 'style-constants';

import editSmallIcon from 'images/editSmallIcon.svg?inline';
import deleteSmallIcon from 'images/deleteSmallIcon.svg?inline';
import blockSmallIcon from 'images/blockSmallIcon.svg?external';

import { getUserAvatar } from 'utils/profileManagement';

import Span from 'components/Span';
import Icon from 'components/Icon';
import Textarea from 'components/Textarea';

import Button from './Button';
import UserInfo from './UserInfo';
import CommentOptions from './CommentOptions';
import CommentForm from './CommentForm';

import messages from './messages';

import {
  SAVE_COMMENT_FORM,
  SAVE_COMMENT_BUTTON,
  COMMENT_TYPE,
} from './constants';

import AreYouSure from './AreYouSure';

const CommentManage = styled.div`
  display: flex;
  opacity: 0;

  button {
    margin-left: 13px;
    font-size: 14px;

    > *:last-child {
      margin-left: 4px;
    }
  }

  @media only screen and (max-width: 576px) {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const CommentEditStyled = styled.li`
  ${Textarea} {
    height: 90px;
  }
`;

const CommentsStyled = styled.ul`
  margin-top: 30px;

  ${CommentEditStyled} {
    padding: 0;
    border: none;
  }

  li {
    border: 1px solid ${BORDER_SECONDARY};
    padding: 9px 28px 9px 38px;

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

  @media only screen and (max-width: 576px) {
    li {
      padding: 5px 15px;
    }
  }
`;

const CommentEdit = ({
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

/* eslint react/no-danger: 0 */
const CommentView = item => (
  <li>
    <div className="d-flex justify-content-between align-items-center position-relative">
      <UserInfo
        type={COMMENT_TYPE}
        avatar={getUserAvatar(item.userInfo.ipfs_avatar)}
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
          <img src={editSmallIcon} alt="icon" />
          <FormattedMessage {...messages.editButton} />
        </Button>

        <div id={`delete-comment-${item.answerId}${item.id}`}>
          <AreYouSure
            submitAction={item.deleteComment}
            Button={({ onClick }) => (
              <Button
                show={item.isItWrittenByMe}
                id={`delete-comment-${item.answerId}${item.id}`}
                params={{
                  ...item.buttonParams,
                  commentId: item.id,
                  whowasvoted: item.userInfo.user,
                }}
                onClick={onClick}
                disabled={item.ids.includes(
                  `delete-comment-${item.answerId}${item.id}`,
                )}
              >
                <img src={deleteSmallIcon} alt="icon" />
                <FormattedMessage {...messages.deleteButton} />
              </Button>
            )}
          />
        </div>

        <Button
          show={!item.isItWrittenByMe}
          id={`comment_vote_to_delete_${item.answerId}${item.id}`}
          params={{
            ...item.buttonParams,
            commentId: item.id,
            whowasvoted: item.userInfo.user,
          }}
          onClick={item.voteToDelete}
          disabled={item.ids.includes(
            `comment_vote_to_delete_${item.answerId}${item.id}`,
          )}
          isVotedToDelete={item.votingStatus.isVotedToDelete}
        >
          <Icon icon={blockSmallIcon} width="12" />
          <FormattedMessage {...messages.voteToDelete} />
        </Button>
      </CommentManage>
    </div>

    <Span
      fontSize="16"
      lineHeight="20"
      className="d-block mb-2"
      dangerouslySetInnerHTML={{ __html: item.content }}
    />
  </li>
);

const Comment = item => {
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

const Comments = props => {
  const isPhone = window.screen.width <= 576;
  const DEFAULT_COMMENTS_NUMBER = isPhone ? 0 : 3;
  const [isAllCommentsView, changeCommentsView] = useState(false);

  const commentsNum = !isAllCommentsView ? DEFAULT_COMMENTS_NUMBER : undefined;

  return (
    <div>
      {props.comments.length > 0 && (
        <CommentsStyled>
          {props.comments
            .slice(0, commentsNum)
            .map(item => (
              <Comment {...item} {...props} key={`${COMMENT_TYPE}${item.id}`} />
            ))}
        </CommentsStyled>
      )}

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
