import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Wrapper from 'components/FormFields/Wrapper';

import RefreshIcon from 'images/reload.svg?external';
import CopyIcon from 'images/copy.svg?external';
import Textarea from 'components/Textarea';
import Icon from 'components/Icon';
import { BORDER_PRIMARY } from 'style-constants';

const StyledWrapper = styled(Wrapper)`
  > :nth-child(2) {
    > :nth-child(1) {
      display: flex !important;
      flex-wrap: nowrap;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const StyledMasterInputContainer = styled.div`
  position: relative;
  width: 100%;

  textarea {
    font-size: 18px;
    line-height: 22px;
  }
`;

const StyledRefreshIconContainer = styled.div`
  position: absolute;
  top: 15%;
  right: 9px;
  cursor: pointer;
  pointer-events: auto;
`;

const CopyIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 5px;
  cursor: pointer;
  pointer-events: auto;
  transform: scale(0.75);

  svg #copy-checkmark {
    stroke-dasharray: 17px;
    stroke-dashoffset: ${({ isCopied }) => (isCopied ? 0 : 17)}px;
    transition: all 0.3s cubic-bezier(0.77, 0, 0.18, 1);

    ${({ isCopied }) =>
      !isCopied &&
      css`
        opacity: 0;
      `};
  }
`;

export const MnemonicPhrase = ({
  input,
  label,
  readOnly,
  disabled,
  meta,
  placeholder,
  tip,
  splitInHalf,
  onClick,
  type = 'text',
  autoComplete,
  insideOfSection,
  iconLabel,
  isShowLabel,
  writeToBuffer,
  getMasterKey,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateMasterKey = () => {
    getMasterKey();
  };

  const handleCopyPhrase = () => {
    setIsCopied(true);
    writeToBuffer();
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <StyledWrapper
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      disabled={!disabled}
      id={input.name}
      insideOfSection={insideOfSection}
      iconLabel={iconLabel}
      isShowLabel={isShowLabel}
    >
      <StyledMasterInputContainer>
        <Textarea
          {...input}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onClick={onClick}
          autoComplete={autoComplete}
          error={
            (meta.touched || (meta.error && meta.error.visited)) &&
            (meta.error || meta.warning)
          }
          type={type}
        />

        <StyledRefreshIconContainer onClick={handleGenerateMasterKey}>
          <Icon
            fill={BORDER_PRIMARY}
            icon={RefreshIcon}
            width="24"
            height="24"
          />
        </StyledRefreshIconContainer>
        <CopyIconContainer isCopied={isCopied} onClick={handleCopyPhrase}>
          <Icon stroke-width={1} icon={CopyIcon} width="32" height="32" />
        </CopyIconContainer>
      </StyledMasterInputContainer>
    </StyledWrapper>
  );
};

MnemonicPhrase.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isRefreshable: PropTypes.bool,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  onClick: PropTypes.func,
  insideOfSection: PropTypes.bool,
  iconLabel: PropTypes.string,
  isShowLabel: PropTypes.bool,
  writeToBuffer: PropTypes.func,
  getMasterKey: PropTypes.func,
};
