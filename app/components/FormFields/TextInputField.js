import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Wrapper from './Wrapper';

export const TextInputField = /* istanbul ignore next */ ({
  input,
  label,
  readOnly,
  disabled,
  meta,
  placeholder,
  isSearchable,
  tip,
}) => (
  <Wrapper label={label} tip={tip} meta={meta}>
    <Input
      input={input}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      isSearchable={isSearchable}
      error={meta.touched && (meta.error || meta.warning)}
      type="text"
    />
  </Wrapper>
);

TextInputField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  isSearchable: PropTypes.bool,
  tip: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default React.memo(TextInputField);
