import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Wrapper from './Wrapper';

export const TextInputField = ({
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
}) => (
  <Wrapper
    label={label}
    tip={tip}
    meta={meta}
    splitInHalf={splitInHalf}
    disabled={disabled}
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
  </Wrapper>
);

TextInputField.propTypes = {
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

export default TextInputField;
