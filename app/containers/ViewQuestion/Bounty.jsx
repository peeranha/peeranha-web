import React from 'react';
import PropTypes from 'prop-types';
import { APP_FONT, TEXT_PRIMARY, TEXT_WARNING } from 'style-constants';

import { svgDraw } from 'components/Icon/IconStyled';
import TransparentButton from 'components/Button/Contained/Transparent';

/* eslint no-nested-ternary: 0, indent: 0 */
export const SpanStyled = TransparentButton.extend`
  color: white;
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  padding: 3px 8px;
  background-color: #576fed;
  border-radius: 20px;
  font-size: 20px;
  font-family: ${APP_FONT};
  font-weight: 600;
  line-height: 20px;

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

export const Bounty = ({ id, tip, show, amount, disabled, className }) => {
  return show ? (
    <SpanStyled id={id} className={className} disabled={disabled}>
      +{amount}
    </SpanStyled>
  ) : null;
};

Bounty.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  show: PropTypes.bool,
  disabled: PropTypes.bool,
  amount: PropTypes.number,
};

export default React.memo(Bounty);
