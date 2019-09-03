import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Wrapper from './Wrapper';

export const NumberInputField = /* istanbul ignore next */ ({
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
}) => {
  const onChange = x => {
    const lastChar = x.target.value;

    if (Number(lastChar) || !lastChar) {
      input.onChange(lastChar);
    }
  };

  return (
    <Wrapper label={label} tip={tip} meta={meta} splitInHalf={splitInHalf}>
      <Input
        input={{ ...input, onChange }}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isRefreshable={isRefreshable}
        onClick={onClick}
        error={meta.touched && (meta.error || meta.warning)}
        type={type}
      />
    </Wrapper>
  );
};

NumberInputField.propTypes = {
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
  onClick: PropTypes.func,
};

export default React.memo(NumberInputField);
