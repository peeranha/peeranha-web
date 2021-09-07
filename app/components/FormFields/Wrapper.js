import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatStringToHtmlId } from 'utils/animation';

import Label from './Label';
import WarningMessage from './WarningMessage';

const CL = 350;

const StyledBox = styled.div`
  position: relative;
  max-width: 100%;
  margin-bottom: ${x => (!x.insideOfSection ? '15px' : '10px')};
  > div:nth-child(2) {
    display: flex;
    flex-wrap: nowrap;
    align-items: ${x => (x.splitInHalf ? 'center' : 'initial')};
    flex-direction: ${x => (x.splitInHalf ? 'row' : 'column')};
    > div:nth-child(1) {
      flex: 0 0 ${x => (x.splitInHalf ? `${CL}px` : `100%`)};
      max-width: ${x => (x.splitInHalf ? `${CL}px` : `100%`)};
    }
    > div:nth-child(2) {
      flex: 0 0 ${x => (x.splitInHalf ? `calc(100% - ${CL}px)` : `100%`)};
      max-width: ${x => (x.splitInHalf ? `calc(100% - ${CL}px)` : `100%`)};
      padding-left: ${x => (x.splitInHalf ? '30px' : '0px')};
      margin-top: ${x => (x.splitInHalf ? '0px' : '8px')};
    }
  }
  @media only screen and (max-width: 768px) {
    > div:nth-child(2) {
      align-items: initial;
      flex-wrap: nowrap;
      flex-direction: column;
      > div:nth-child(1) {
        flex: 0 0 100%;
        max-width: 100%;
      }
      > div:nth-child(2) {
        flex: 0 0 100%;
        max-width: 100%;
        padding-left: 0px;
        margin-top: 8px;
      }
    }
  }
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

export const InputContainer = styled.div``;

export const Wrapper = ({
                          children,
                          tip,
                          label,
                          meta,
                          splitInHalf,
                          disabled,
                          id,
                          insideOfSection,
                          className,
                        }) => (
  <StyledBox
    className={className}
    disabled={disabled}
    id={formatStringToHtmlId(id)}
    splitInHalf={splitInHalf}
    insideOfSection={insideOfSection}
  >
    <Label>{label}</Label>
    <div>
      <InputContainer>{children}</InputContainer>
      {meta && (
        <WarningMessage
          {...meta}
          containerIsSplittedInHalf={splitInHalf}
          tip={tip}
        />
      )}
    </div>
  </StyledBox>
);

Wrapper.propTypes = {
  children: PropTypes.any,
  tip: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  meta: PropTypes.object,
  splitInHalf: PropTypes.bool,
  disabled: PropTypes.bool,
  insideOfSection: PropTypes.bool,
};

export default React.memo(Wrapper);
