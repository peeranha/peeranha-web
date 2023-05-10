import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TEXT_SECONDARY, TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import dotsIcon from 'images/dots.svg?external';
import arrowDownOutlined from 'images/arrowDown.svg?external';

import Span from 'components/Span';
import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import { TextareaStyled } from 'components/Textarea';
import SuiConnectModals from 'components/SuiConnectModals';

import { isSuiBlockchain } from 'utils/sui/sui';
import { singleCommunityColors } from 'utils/communityManagement';
import CommentForm from './CommentForm';

import { TOGGLE_ADD_COMMENT_FORM_BUTTON } from './constants';

const colors = singleCommunityColors();

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 40px;
  }
`;

const CommentEditStyled = styled.div`
  ${TextareaStyled} {
    height: 90px;
  }
`;

const ActionButtonWithLogin = ({ onClick, buttonId }) => {
  const { t } = useTranslation();
  return (
    <ButtonStyled id={buttonId} onClick={onClick}>
      <IconMd icon={dotsIcon} fill={colors.commentOption || BORDER_PRIMARY} />
      <Span className="ml-11" color={colors.commentOption || TEXT_PRIMARY}>
        {t('post.addComment')}
      </Span>
    </ButtonStyled>
  );
};

export const CommentOptions = ({
  form,
  submitButtonId,
  submitButtonName,
  sendCommentLoading,
  sendComment,
  checkAddCommentAvailable,
  addCommentFormDisplay,
  hideAddCommentForm,
  answerId,
  changeCommentsView,
  isAllCommentsView,
  commentsNumber,
  profileInfo,
  loginWithSuiDispatch,
}) => {
  const { t } = useTranslation();
  const toggleFormButtonId = `${TOGGLE_ADD_COMMENT_FORM_BUTTON}${answerId}`;

  const showCommentForm =
    addCommentFormDisplay.find((buttonId) => buttonId === toggleFormButtonId) || false;

  const actionButtonWithLogin = (onClick) => (
    <ActionButtonWithLogin onClick={onClick} buttonId={toggleFormButtonId} />
  );

  return (
    <div className="my-3">
      <div className="d-flex align-items-center justify-content-between justify-content-sm-start">
        {commentsNumber > 0 && !isAllCommentsView && (
          <ButtonStyled onClick={() => changeCommentsView(!isAllCommentsView)}>
            <Span className="mr-1" bold>{`${commentsNumber} `}</Span>
            <Span className="text-lowercase" color={TEXT_SECONDARY}>
              {commentsNumber === 1 ? t('post.moreComment') : t('post.moreComments')}
              <Icon
                className="ml-1"
                rotate={isAllCommentsView}
                icon={arrowDownOutlined}
                width="9"
              />
            </Span>
          </ButtonStyled>
        )}

        {!profileInfo && isSuiBlockchain ? (
          <SuiConnectModals
            loginWithWallet={loginWithSuiDispatch}
            actionButtonWithLogin={actionButtonWithLogin}
          />
        ) : (
          <ActionButtonWithLogin
            onClick={() => checkAddCommentAvailable(toggleFormButtonId, answerId)}
            buttonId={toggleFormButtonId}
          />
        )}
      </div>

      {showCommentForm && (
        <CommentEditStyled>
          <CommentForm
            form={form}
            className="mt-4"
            submitButtonId={submitButtonId}
            submitButtonName={submitButtonName}
            sendCommentLoading={sendCommentLoading}
            sendComment={sendComment}
            answerId={answerId}
            toggleView={() => hideAddCommentForm(toggleFormButtonId)}
          />
        </CommentEditStyled>
      )}
    </div>
  );
};

CommentOptions.propTypes = {
  form: PropTypes.string,
  submitButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendCommentLoading: PropTypes.bool,
  sendComment: PropTypes.func,
  checkAddCommentAvailable: PropTypes.func,
  hideAddCommentForm: PropTypes.func,
  addCommentFormDisplay: PropTypes.array,
  answerId: PropTypes.number,
  changeCommentsView: PropTypes.func,
  isAllCommentsView: PropTypes.bool,
  commentsNumber: PropTypes.number,
  profileInfo: PropTypes.object,
  loginWithSuiDispatch: PropTypes.func,
};

export default React.memo(CommentOptions);
