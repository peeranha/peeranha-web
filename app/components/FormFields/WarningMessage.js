import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TEXT_SECONDARY } from 'style-constants';

import validationArrowIcon from 'images/validationArrow.svg?inline';
import { italicFont } from '../../global-styles';

export const Div = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 18px;
  font-style: ${italicFont};
  max-height: ${(x) => (x.isSpecialPosition ? 'auto' : '40px')};
  word-break: normal;
  color: ${TEXT_SECONDARY};

  > div {
    display: flex;
    align-items: center;
    flex-direction: ${(x) => (x.isSpecialPosition ? 'column' : 'row')};

    img {
      margin-right: ${(x) => (x.isSpecialPosition ? '0px' : '12px')};
      transform: ${(x) => (x.isSpecialPosition ? 'rotate(90deg) translateX(8px)' : '0deg')};

      @media only screen and (max-width: 1100px) {
        display: none !important;
      }
    }

    span {
      min-width: 155px;
    }
  }
`;

export const WarningMessage = ({
  error,
  active,
  warning,
  className,
  containerIsSplittedInHalf,
  tip,
  isSpecialPosition,
  visited,
  touched,
  warningStyle,
}) => {
  const { t } = useTranslation();
  const err = error || warning;

  if (err && err.size) {
    err.id = err.get('id');
  }

  return ((touched || visited || (err && err.visited)) && err) || (active && tip) ? (
    <Div className={className} isSpecialPosition={isSpecialPosition}>
      <div>
        {(tip || isSpecialPosition) && (
          <img
            className={`${!isSpecialPosition ? 'd-none' : ''} ${
              containerIsSplittedInHalf ? 'd-md-inline' : ''
            }`}
            src={validationArrowIcon}
            alt="icon"
          />
        )}

        <span css={warningStyle}>
          {(err &&
            t(err.id || err, {
              min: err.min,
              max: err.max,
            })) ||
            tip}
        </span>
      </div>
    </Div>
  ) : null;
};

WarningMessage.propTypes = {
  error: PropTypes.string,
  warning: PropTypes.string,
  className: PropTypes.string,
  containerIsSplittedInHalf: PropTypes.bool,
  tip: PropTypes.string,
  visited: PropTypes.bool,
  touched: PropTypes.bool,
  active: PropTypes.bool,
  isSpecialPosition: PropTypes.bool,
};

export default React.memo(WarningMessage);
