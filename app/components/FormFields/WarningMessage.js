import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { TEXT_SECONDARY } from 'style-constants';

import validationArrowIcon from 'images/validationArrow.svg?inline';

import Span from 'components/Span';

const Div = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;

  > div {
    display: flex;
    align-items: center;
    position: absolute;
  }

  @media only screen and (max-width: 768px) {
    height: auto;
    > div {
      position: relative;
      display: block;
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
  intl,
}) =>
  (touched && (error || warning)) || (active && tip) ? (
    <Div className={className}>
      <div>
        {tip && (
          <img
            className="d-none d-xl-inline mr-2"
            src={validationArrowIcon}
            alt="icon"
          />
        )}

        <Span color={TEXT_SECONDARY} fontSize="14" mobileFS="12" isItalic>
          {(error && intl.formatMessage({ id: error.id })) ||
            (warning && intl.formatMessage({ id: warning.id })) ||
            tip}
        </Span>
      </div>
    </Div>
  ) : null;

WarningMessage.propTypes = {
  error: PropTypes.object,
  warning: PropTypes.object,
  className: PropTypes.string,
  tip: PropTypes.string,
  touched: PropTypes.bool,
  active: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default React.memo(injectIntl(WarningMessage));
