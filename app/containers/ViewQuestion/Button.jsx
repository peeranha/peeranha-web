import React from 'react';
import PropTypes from 'prop-types';
import { BG_PRIMARY, TEXT_PRIMARY, TEXT_WARNING } from 'style-constants';

import { svgDraw } from 'components/Icon/IconStyled';
import TransparentButton from 'components/Button/Contained/Transparent';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

/* eslint no-nested-ternary: 0, indent: 0 */
export const SpanStyled = TransparentButton.extend`
  ${x =>
    svgDraw({
      color: x.isVotedToDelete
        ? TEXT_WARNING
        : colors.linkColor || TEXT_PRIMARY,
    })};

  display: inline-flex;
  align-items: center;
  margin-left: 30px;
  width: max-content;

  > *:last-child {
    margin-left: 7px;
  }

  @media only screen and (max-width: 780px) {
    > *:last-child {
      display: none;
    }
  }

  @media only screen and (max-width: 785px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 1105px) {
    margin-left: 10px;
    font-size: 14px;
  }

  @media only screen and (max-width: 1205px) {
    display: flex;
    flex-direction: column;
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
    z[`data-${x.toLowerCase()}`] = params[x];
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
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  disabled: PropTypes.bool,
  isVotedToDelete: PropTypes.bool,
};

export default React.memo(Button);
