import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  BORDER_PRIMARY,
  BORDER_SECONDARY,
  BORDER_TRANSPARENT,
  BORDER_ATTENTION_LIGHT,
  BORDER_RADIUS_M,
} from 'style-constants';

import { MODERATOR_KEY } from 'utils/constants';

import editSmallIcon from 'images/editSmallIcon.svg?external';
import deleteSmallIcon from 'images/deleteSmallIcon.svg?external';
import blockSmallIcon from 'images/blockSmallIcon.svg?external';

import { getUserAvatar } from 'utils/profileManagement';

import { makeSelectProfileInfo } from '../AccountProvider/selectors';

import Span from 'components/Span';
import Icon from 'components/Icon';
import { TextareaStyled } from 'components/Textarea';
import Button from './Button';
import UserInfo from './UserInfo';
import CommentOptions from './CommentOptions';
import CommentForm from './CommentForm';
import AreYouSure from './AreYouSure';

import messages from './messages';

import {
  COMMENT_TYPE,
  SAVE_COMMENT_BUTTON,
  SAVE_COMMENT_FORM,
} from './constants';
import { hasGlobalModeratorRole } from '../../utils/properties';
import { getRoles } from '@testing-library/react';

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
  ${TextareaStyled} {
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
      border-top-left-radius: ${BORDER_RADIUS_M};
      border-top-right-radius: ${BORDER_RADIUS_M};
    }

    :last-child {
      border-bottom-left-radius: ${BORDER_RADIUS_M};
      border-bottom-right-radius: ${BORDER_RADIUS_M};
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
const CommentView = item => {
  const isItWrittenByMe = !!item.profileInfo
    ? item.author?.user === item.profileInfo.user
    : false;

  const isModerator = false;
  //   useMemo(
  //   () => hasGlobalModeratorRole(getRoles(item.profileInfo)),
  //   [item.profileInfo],
  // );

  return (
    <li>
      <div className="d-flex justify-content-between align-items-center position-relative">
        <UserInfo
          type={COMMENT_TYPE}
          avatar={getUserAvatar(item.author.avatar)}
          name={item.author?.displayName ?? ''}
          rating={item.author?.ratings?.[item.communityId] ?? 0}
          account={item.author.user}
          achievementsCount={item.author.achievementsReached?.length}
          postTime={+item.postTime}
          locale={item.locale}
          isComment
        />

        <CommentManage>
          <Button
            show={!!item.profileInfo && isItWrittenByMe}
            params={{
              ...item.buttonParams,
              commentId: item.id,
              whowasvoted: item.author.user,
            }}
            onClick={() => item.toggleView(!item.isView)}
          >
            <Icon icon={editSmallIcon} width="13" fill={BORDER_PRIMARY} />
            <FormattedMessage {...messages.editButton} />
          </Button>

          <div id={`delete-comment-${item.answerId}${item.id}`}>
            <AreYouSure
              submitAction={
                isModerator && !isItWrittenByMe
                  ? item.voteToDelete
                  : item.deleteComment
              }
              Button={({ onClick }) => (
                <Button
                  show={(!!item.profileInfo && isItWrittenByMe) || isModerator}
                  id={`delete-comment-${item.answerId}${item.id}`}
                  params={{
                    ...item.buttonParams,
                    commentId: item.id,
                    whowasvoted: item.author.user,
                  }}
                  onClick={onClick}
                  disabled={item.ids.includes(
                    `delete-comment-${item.answerId}${item.id}`,
                  )}
                >
                  <Icon
                    icon={deleteSmallIcon}
                    width="13"
                    fill={BORDER_PRIMARY}
                  />
                  <FormattedMessage {...messages.deleteButton} />
                </Button>
              )}
            />
          </div>
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
};

const Comment = item => {
  const [isView, toggleView] = useState(true);

  return (
    <React.Fragment>
      {!isView ? (
        <CommentEdit toggleView={() => toggleView(!isView)} {...item} />
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
        checkAddCommentAvailable={props.checkAddCommentAvailable}
        hideAddCommentForm={props.hideAddCommentForm}
        addCommentFormDisplay={props.addCommentFormDisplay}
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
  answerId: PropTypes.number,
  profileInfo: PropTypes.object,
};

CommentEdit.propTypes = {
  answerId: PropTypes.number,
  id: PropTypes.string,
  content: PropTypes.string,
  translations: PropTypes.object,
  saveCommentLoading: PropTypes.bool,
  saveComment: PropTypes.func,
  toggleView: PropTypes.func,
};

export { Comment, CommentEdit, CommentView, Comments };
export default React.memo(
  connect(
    state => {
      return {
        profileInfo: makeSelectProfileInfo()(state),
      };
    },
    null,
  )(Comments),
);
