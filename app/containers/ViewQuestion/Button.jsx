import React from 'react';
import PropTypes from 'prop-types';
import { TEXT_PRIMARY, TEXT_WARNING } from 'style-constants';

import { svgDraw } from 'components/Icon/IconStyled';
import TransparentButton from 'components/Button/Contained/Transparent';
import { graphCommunityColors, singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

/* eslint no-nested-ternary: 0, indent: 0 */
export const SpanStyled = TransparentButton.extend`
  ${(x) =>
    svgDraw({
      color: x.isVotedToDelete
        ? TEXT_WARNING
        : graphCommunity
        ? 'rgba(111, 76, 255, 1)'
        : colors.linkColor || TEXT_PRIMARY,
    })};

  ${(x) =>
    x.disabled && x.isDisabledWithStyle
      ? `
  cursor: default;
  -webkit-filter: grayscale(100%);
  -moz-filter:    grayscale(100%);
  -ms-filter:     grayscale(100%);
  -o-filter:      grayscale(100%);
  filter: grayscale(100%);`
      : `
  :hover {
    opacity: 0.8;
  }`}
  display: inline-flex;
  align-items: center;
  //margin-left: 30px;

  > *:last-child {
    margin-left: 7px;
  }

  @media only screen and (max-width: 1285px) {
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
  isDisabledWithStyle,
}) => {
  const z = {};

  Object.keys(params).forEach((x) => {
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
      isDisabledWithStyle={isDisabledWithStyle}
    >
      {children}
    </SpanStyled>
  ) : null;
};

Button.propTypes = {
  params: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  disabled: PropTypes.bool,
  isVotedToDelete: PropTypes.bool,
  isDisabledWithStyle: PropTypes.bool,
};

export default React.memo(Button);
