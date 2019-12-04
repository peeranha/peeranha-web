import React from 'react';
import PropTypes from 'prop-types';
import { TEXT_PRIMARY, TEXT_WARNING } from 'style-constants';

import { svgDraw } from 'components/Icon/IconStyled';
import TransparentButton from 'components/Button/Contained/Transparent';

/* eslint no-nested-ternary: 0, indent: 0 */
export const SpanStyled = TransparentButton.extend`
  ${x => svgDraw({ color: x.isVotedToDelete ? TEXT_WARNING : TEXT_PRIMARY })};

  display: inline-flex;
  align-items: center;
  margin-left: 30px;

  > *:last-child {
    margin-left: 7px;
  }

  @media only screen and (max-width: 576px) {
    margin-left: 8px;
    > *:last-child {
      display: none;
    }
  }
`;

export const Button = ({
  id,
  onClick,
  params = {},
  show,
  children,
  disabled,
  isVotedToDelete,
  className,
}) => {
  const z = {};

  Object.keys(params).forEach(x => {
    z[`data-${x}`] = params[x];
  });

  return show ? (
    <SpanStyled
      {...z}
      id={id}
      className={className}
      disabled={disabled}
      onClick={onClick}
      isVotedToDelete={isVotedToDelete}
    >
      {children}
    </SpanStyled>
  ) : null;
};

Button.propTypes = {
  params: PropTypes.object,
  children: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  disabled: PropTypes.bool,
  isVotedToDelete: PropTypes.bool,
};

export default React.memo(Button);
