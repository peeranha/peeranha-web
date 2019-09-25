import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { TEXT_SECONDARY, TEXT_PRIMARY } from 'style-constants';

import dotsIcon from 'images/dots.svg?inline';
import arrowDownOutlined from 'images/arrowDownOutlined.png';

import Span from 'components/Span';
import Textarea from 'components/Textarea';

import CommentForm from './CommentForm';
import messages from './messages';

const Img = styled.img`
  position: relative;
`;

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  ${Img} {
    transition: 0.5s;
    transform: rotate(${x => (x.toRotate ? '180deg' : '0deg')});
  }
`;

const CommentEditStyled = styled.div`
  ${Textarea} {
    height: 90px;
  }
`;

export const CommentOptions = ({
  form,
  isPhone,
  submitButtonId,
  submitButtonName,
  sendCommentLoading,
  sendComment,
  answerId,
  changeCommentsView,
  isAllCommentsView,
  commentsNumber,
}) => {
  const [isAddCommentHidden, changeAddCommentView] = useState(true);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between justify-content-sm-start">
        {commentsNumber > 0 && (
          <ButtonStyled
            toRotate={isAllCommentsView}
            onClick={() => changeCommentsView(!isAllCommentsView)}
          >
            <Span className="mr-1" bold>{`${commentsNumber} `}</Span>
            <Span className="mr-1 text-lowercase" color={TEXT_SECONDARY}>
              <FormattedMessage {...messages.moreComments} />
            </Span>
            <Img src={arrowDownOutlined} alt="*" />
          </ButtonStyled>
        )}

        <ButtonStyled
          className="d-none d-sm-inline-flex"
          onClick={() => changeAddCommentView(!isAddCommentHidden)}
        >
          <img src={dotsIcon} alt="***" />
          <Span className="ml-1" color={TEXT_PRIMARY}>
            <FormattedMessage {...messages.addComment} />
          </Span>
        </ButtonStyled>
      </div>

      {(!isAddCommentHidden || (isAllCommentsView && isPhone)) && (
        <CommentEditStyled>
          <CommentForm
            form={form}
            className="mt-4"
            submitButtonId={submitButtonId}
            submitButtonName={submitButtonName}
            sendCommentLoading={sendCommentLoading}
            sendComment={sendComment}
            answerId={answerId}
            toggleView={changeAddCommentView}
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
  answerId: PropTypes.number,
  changeCommentsView: PropTypes.func,
  isAllCommentsView: PropTypes.bool,
  commentsNumber: PropTypes.number,
};

export default React.memo(CommentOptions);
