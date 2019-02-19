import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';

import Label from './Label';
import WarningMessage from './WarningMessage';

const TextInputField = ({
  input,
  label,
  readOnly,
  disabled,
  meta,
  placeholder,
  isSearchable,
}) => (
  <div className="mb-2">
    <Label>{label}</Label>
    <div className="row align-items-start">
      <Input
        className="col-xl-6 mb-1"
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
  </div>
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
