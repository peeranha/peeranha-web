import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Wrapper from 'components/FormFields/Wrapper';
import styled from 'styled-components';
import { SecondaryWithInfoHover } from '../../components/Button/Outlined/SecondaryMedium';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

const StyledWrapper = styled(Wrapper)`
  > :nth-child(2) {
    > :nth-child(1) {
      display: flex !important;
      flex-wrap: nowrap;
      align-items: center;
      flex-direction: row;
    }
  }
`;

const DisagreeButton = styled(SecondaryWithInfoHover)`
  margin-left: 5px;
  height: 100%;
  padding: 0;
  font-size: 14px;
`;

export const MasterKeyInputField = ({
  input,
  label,
  readOnly,
  disabled,
  meta,
  placeholder,
  isSearchable,
  isRefreshable,
  tip,
  splitInHalf,
  onClick,
  type = 'text',
  autoComplete,
  insideOfSection,
  iconLabel,
  isShowLabel,
  writeToBuffer,
}) => (
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
    <Input
      input={input}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isRefreshable={isRefreshable}
      onClick={onClick}
      autoComplete={autoComplete}
      error={
        (meta.touched || (meta.error && meta.error.visited)) &&
        (meta.error || meta.warning)
      }
      type={type}
    />
    <DisagreeButton onClick={writeToBuffer} id="copy" type="button">
      <FormattedMessage {...commonMessages.copy} />
    </DisagreeButton>
  </StyledWrapper>
);

MasterKeyInputField.propTypes = {
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
};

export default MasterKeyInputField;
