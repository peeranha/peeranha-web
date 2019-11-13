import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatStringToHtmlId } from 'utils/animation';

import Label from './Label';
import WarningMessage from './WarningMessage';

const StyledBox = styled.div`
  margin-bottom: 10px;
  position: relative;

  ${x =>
    x.disabled
      ? `:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    cursor: not-allowed;
  }`
      : ``};
`;

export const Wrapper = ({
  children,
  tip,
  label,
  meta,
  splitInHalf,
  disabled,
  id,
}) => {
  let valueWidth = 12;
  let tipWidth = 12;

  // ratio 2 : 1 if there is tip in row
  if (tip) {
    valueWidth = 8;
    tipWidth = 4;
  }

  // to split form in half
  if (splitInHalf) {
    valueWidth = 6;
    tipWidth = 6;
  }

  return (
    <StyledBox disabled={disabled} id={formatStringToHtmlId(id)}>
      <Label>{label}</Label>
      <div className="row align-items-center mb-3">
        <div className={`col-12 col-md-${valueWidth}`}>{children}</div>
        {meta && (
          <WarningMessage
            {...meta}
            tip={tip}
            className={`col-12 col-md-${tipWidth}`}
          />
        )}
      </div>
    </StyledBox>
  );
};

Wrapper.propTypes = {
  children: PropTypes.any,
  tip: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  meta: PropTypes.object,
  splitInHalf: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default React.memo(Wrapper);
