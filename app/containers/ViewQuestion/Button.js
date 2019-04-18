import React from 'react';
import PropTypes from 'prop-types';
import { blue, gray, darkred } from 'style-constants';

import IconStyled from 'components/Icon/IconStyled';
import TransparentButton from 'components/Button/Contained/Transparent';

import Span from 'components/Span';

/* eslint no-nested-ternary: 0, indent: 0 */
const SpanStyled = Span.extend`
  color: ${(props /* istanbul ignore next */) =>
    props.isItWrittenByMe ? gray : props.isVotedToDelete ? darkred : blue};

  ${IconStyled} rect {
    fill: ${(props /* istanbul ignore next */) =>
      props.isItWrittenByMe ? gray : props.isVotedToDelete ? darkred : blue};
  }

  ${IconStyled} circle {
    stroke: ${(props /* istanbul ignore next */) =>
      props.isItWrittenByMe ? gray : props.isVotedToDelete ? darkred : blue};
  }
`;

export const Button = /* istanbul ignore next */ ({
  className,
  id,
  onClick,
  params,
  show,
  children,
}) =>
  show ? (
    <TransparentButton
      id={id}
      className={`d-inline-flex align-items-center pl-4 ${className}`}
      data-questionid={params.questionId}
      data-answerid={params.answerId}
      data-commentid={params.commentId}
      data-whowasvoted={params.whowasvoted}
      onClick={onClick}
    >
      {children}
    </TransparentButton>
  ) : null;

export const BlockButton = /* istanbul ignore next */ ({
  className,
  id,
  onClick,
  params,
  isVotedToDelete,
  isItWrittenByMe,
  children,
}) => (
  <Button show params={params} onClick={onClick} id={id} className={className}>
    <SpanStyled
      className="d-inline-flex align-items-center"
      isItWrittenByMe={isItWrittenByMe}
      isVotedToDelete={isVotedToDelete}
    >
      {children}
    </SpanStyled>
  </Button>
);

Button.propTypes = {
  params: PropTypes.object,
  children: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool,
};

BlockButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  params: PropTypes.object,
  isVotedToDelete: PropTypes.bool,
  isItWrittenByMe: PropTypes.bool,
  children: PropTypes.object,
};

export default React.memo(Button);
