import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { TEXT_SECONDARY, TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import dotsIcon from 'images/dots.svg?external';
import arrowDownOutlined from 'images/arrowDown.svg?external';

import Span from 'components/Span';
import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import { TextareaStyled } from 'components/Textarea';
import { singleCommunityColors } from 'utils/communityManagement';
import CommentForm from './CommentForm';

import messages from './messages';
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
}) => {
  const toggleFormButtonId = `${TOGGLE_ADD_COMMENT_FORM_BUTTON}${answerId}`;

  const showCommentForm =
    addCommentFormDisplay.find(buttonId => buttonId === toggleFormButtonId) ||
    false;

  return (
    <div className="my-3">
      <div className="d-flex align-items-center justify-content-between justify-content-sm-start">
        {commentsNumber > 0 && (
          <ButtonStyled onClick={() => changeCommentsView(!isAllCommentsView)}>
            <Span className="mr-1" bold>{`${commentsNumber} `}</Span>
            <Span className="text-lowercase" color={TEXT_SECONDARY}>
              <FormattedMessage {...messages.moreComments} />
              <Icon
                className="ml-1"
                rotate={isAllCommentsView}
                icon={arrowDownOutlined}
                width="9"
              />
            </Span>
          </ButtonStyled>
        )}

        <ButtonStyled
          id={toggleFormButtonId}
          onClick={() => checkAddCommentAvailable(toggleFormButtonId, answerId)}
        >
          <IconMd icon={dotsIcon} fill={colors.linkColor || BORDER_PRIMARY} />
          <Span className="ml-1" color={colors.linkColor || TEXT_PRIMARY}>
            <FormattedMessage {...messages.addComment} />
          </Span>
        </ButtonStyled>
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
  isPhone: PropTypes.bool,
  sendComment: PropTypes.func,
  checkAddCommentAvailable: PropTypes.func,
  hideAddCommentForm: PropTypes.func,
  addCommentFormDisplay: PropTypes.array,
  answerId: PropTypes.number,
  changeCommentsView: PropTypes.func,
  isAllCommentsView: PropTypes.bool,
  commentsNumber: PropTypes.number,
};

export default React.memo(CommentOptions);
