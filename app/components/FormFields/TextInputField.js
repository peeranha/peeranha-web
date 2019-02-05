import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from 'components/Input';

import Label from './Label';
import WarningMessage from './WarningMessage';

const InputStyled = styled.div`
  margin-bottom: 14px;
`;

const TextInputField = ({
  input,
  label,
  readOnly,
  disabled,
  meta,
  placeholder,
  isSearchable,
}) => (
  <InputStyled>
    <Label>{label}</Label>
    <div className="row">
      <Input
        className="col-xl-6"
        input={input}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        isSearchable={isSearchable}
        error={!!(meta.error || meta.warning)}
        type="text"
      />
      <WarningMessage className="col-xl-6" {...meta} isArrowed />
    </div>
  </InputStyled>
);

TextInputField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  isSearchable: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextInputField;
