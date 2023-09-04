import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  BORDER_PRIMARY,
  BORDER_SECONDARY,
  BORDER_TRANSPARENT,
  BORDER_RADIUS_M,
} from 'style-constants';

import editIcon from 'images/pencil.svg?external';
import deleteIcon from 'images/deleteIcon.svg?external';

import { getRatingByCommunity, getUserAvatar } from 'utils/profileManagement';

import Span from 'components/Span';
import Icon from 'components/Icon';
import { TextareaStyled } from 'components/Textarea';

import { useOnClickOutside } from 'utils/click-listners';
import { IconMd } from 'components/Icon/IconWithSizes';
import blockchainLogo from 'images/blockchain-outline-32.svg?external';
import IPFSInformation from 'containers/Questions/Content/Body/IPFSInformation';
import SeeOriginal from 'containers/ViewQuestion/SeeOriginal';
import { getUserName } from 'utils/user';
import { LANGUAGES_MAP } from 'utils/constants';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import { COMMENT_TYPE, SAVE_COMMENT_BUTTON, SAVE_COMMENT_FORM } from './constants';

import Button from './Button';
import UserInfo from './UserInfo';
import CommentOptions from './CommentOptions';
import CommentForm from './CommentForm';
import AreYouSure from './AreYouSure';

const CommentManage = styled.div`
  display: flex;
  opacity: 0;

  button {
    margin-left: 20px;
    font-size: 16px;

    > *:last-child {
      margin-left: 7px;
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

const CommentEdit = ({ answerId, id, content, saveCommentLoading, saveComment, toggleView }) => {
  const { t } = useTranslation();

  return (
    <CommentEditStyled className="my-4">
      <CommentForm
        form={`${SAVE_COMMENT_FORM}_${answerId}${id}`}
        comment={content}
        submitButtonId={SAVE_COMMENT_BUTTON}
        submitButtonName={t('post.saveButton')}
        sendCommentLoading={saveCommentLoading}
        sendComment={saveComment}
        answerId={answerId}
        commentId={id}
        toggleView={toggleView}
      />
    </CommentEditStyled>
  );
};

const CommentView = (item) => {
  const { t } = useTranslation();
  const isItWrittenByMe = item.profileInfo
    ? item.author?.id?.toLowerCase() === item.profileInfo.user.toLowerCase()
    : false;

  const translation = item.translations?.find(
    ({ language }) => +language === LANGUAGES_MAP[item.locale],
  );

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const refPopover = useRef(null);

  useOnClickOutside(refPopover, () => setPopoverOpen(false));

  const isModerator =
    hasGlobalModeratorRole(getPermissions(item.profileInfo)) ||
    hasProtocolAdminRole(getPermissions(item.profileInfo)) ||
    hasCommunityModeratorRole(getPermissions(item.profileInfo), item.communityId);

  const formattedHistories = item.histories?.filter(
    (history) => history.comment?.id === `${item.postId}-${item.answerId}-${item.id}`,
  );

  const getContent = () => {
    if (Number(item.language) === LANGUAGES_MAP[item.locale] || item.showOriginal) {
      return item.content;
    }
    return translation ? translation.content : item.content;
  };

  return (
    <li
      css={{
        '@media only screen and (max-width: 576px)': {
          ':hover': {
            'div > a': {
              paddingTop: '30px',
            },
          },
        },
      }}
    >
      <div className="d-flex justify-content-between align-items-center position-relative">
        <UserInfo
          type={COMMENT_TYPE}
          avatar={getUserAvatar(item.author.avatar)}
          name={getUserName(item.author?.displayName, item.author?.id)}
          rating={getRatingByCommunity(item.author, item.communityId)}
          account={item.author.user}
          achievementsCount={item.author.achievements?.length}
          postTime={+item.postTime}
          locale={item.locale}
          isComment
        />

        <CommentManage>
          <SeeOriginal
            isOriginalLanguage={Number(item.language) === LANGUAGES_MAP[item.locale]}
            translation={translation}
            showOriginal={item.showOriginal}
            setShowOriginal={item.setShowOriginal}
            locale={item.locale}
            language={item.language || item.questionData?.language}
          />

          <div id={`delete-comment-${item.answerId}${item.id}`}>
            <AreYouSure
              submitAction={item.deleteComment}
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
                  disabled={item.ids.includes(`delete-comment-${item.answerId}${item.id}`)}
                >
                  <Icon icon={deleteIcon} width="18" fill={BORDER_PRIMARY} />
                  <span>{t('post.deleteButton')}</span>
                </Button>
              )}
            />
          </div>

          <div className="position-relative">
            <Button show disabled={isPopoverOpen} onClick={() => setPopoverOpen(true)}>
              <IconMd icon={blockchainLogo} />
              <span>{t('common.source')}</span>
            </Button>

            {isPopoverOpen && (
              <div ref={refPopover}>
                <IPFSInformation
                  locale={item.locale}
                  ipfsHash={item.ipfsHash}
                  histories={formattedHistories}
                />
              </div>
            )}
          </div>
          <Button
            show={!!item.profileInfo && isItWrittenByMe}
            params={{
              ...item.buttonParams,
              commentId: item.id,
              whowasvoted: item.author.user,
            }}
            onClick={() => item.toggleView(!item.isView)}
          >
            <Icon icon={editIcon} width="18" fill={BORDER_PRIMARY} />
            <span>{t('post.editButton')}</span>
          </Button>
        </CommentManage>
      </div>

      <Span
        fontSize="16"
        lineHeight="20"
        className="d-block mb-2"
        dangerouslySetInnerHTML={{ __html: getContent() }}
      />
    </li>
  );
};

const Comment = (item) => {
  const [isView, toggleView] = useState(true);
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <React.Fragment>
      {!isView ? (
        <CommentEdit toggleView={() => toggleView(!isView)} {...item} />
      ) : (
        <CommentView
          {...item}
          isView={isView}
          toggleView={toggleView}
          showOriginal={showOriginal}
          setShowOriginal={setShowOriginal}
        />
      )}
    </React.Fragment>
  );
};

const Comments = (props) => {
  const isPhone = window.screen.width <= 576;
  const DEFAULT_COMMENTS_NUMBER = isPhone ? 0 : 3;
  const [isAllCommentsView, changeCommentsView] = useState(false);

  const commentsNum = !isAllCommentsView ? DEFAULT_COMMENTS_NUMBER : undefined;

  return (
    <div>
      {props.comments?.length > 0 && (
        <CommentsStyled>
          {props.comments.slice(0, commentsNum).map((item) => (
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
        commentsNumber={props?.comments.length - DEFAULT_COMMENTS_NUMBER}
        profileInfo={props?.profileInfo}
        loginWithSuiDispatch={props?.loginWithSuiDispatch}
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
  loginWithSuiDispatch: PropTypes.func,
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
    (state) => ({
      profileInfo: makeSelectProfileInfo()(state),
    }),
    null,
  )(Comments),
);
