import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TEXT_SECONDARY } from 'style-constants';

import validationArrowIcon from 'images/validationArrow.svg?inline';

export const Div = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 18px;
  font-style: italic;
  color: ${TEXT_SECONDARY};

  > div {
    display: flex;
    align-items: center;

    img {
      margin-right: 12px;
    }
  }
`;

export const WarningMessage = ({
  error,
  active,
  warning,
  touched,
  className,
  tip,
}) => {
  const err = error || warning;

  return (touched && err) || (active && tip) ? (
    <Div className={className}>
      <div>
        {tip && (
          <img
            className="d-none d-xl-inline"
            src={validationArrowIcon}
            alt="icon"
          />
        )}

        {(err && (
          <FormattedMessage
            id={err.id}
            values={{
              min: err.min,
              max: err.max,
            }}
          />
        )) ||
          tip}
      </div>
    </Div>
  ) : null;
};

WarningMessage.propTypes = {
  error: PropTypes.object,
  warning: PropTypes.object,
  className: PropTypes.string,
  tip: PropTypes.string,
  touched: PropTypes.bool,
  active: PropTypes.bool,
};

export default React.memo(WarningMessage);
