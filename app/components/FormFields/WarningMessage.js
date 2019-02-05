import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import validationArrowIcon from 'svg/validationArrow';

import Span from 'components/Span';
import Icon from 'components/Icon';

const WarningMessageStyled = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  ${props => props.width && `flex-basis: ${props.width}px;`};
`;

const WarningMessage = ({ error, warning, className, isArrowed }) =>
  error || warning ? (
    <WarningMessageStyled className={className}>
      {isArrowed && (
        <Icon className="d-none d-xl-inline" icon={validationArrowIcon} />
      )}

      <Span color="gray" fontSize="14" isItalic>
        {(error && <FormattedMessage {...error} />) ||
          (warning && <FormattedMessage {...warning} />)}
      </Span>
    </WarningMessageStyled>
  ) : null;

WarningMessage.propTypes = {
  error: PropTypes.object,
  warning: PropTypes.object,
  className: PropTypes.string,
  isArrowed: PropTypes.bool,
};

export default WarningMessage;
