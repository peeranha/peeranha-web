import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Wrapper from './Wrapper';

export const NumberInputField = ({
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
  dotRestriction = 6,
  type = 'text',
}) => {
  const onChange = x => {
    const inputValue = x.target.value;
    const inputAfterDot = String(inputValue).split('.')[1];

    if (
      (Number(inputValue) || !inputValue) &&
      (!inputAfterDot || inputAfterDot.length <= dotRestriction)
    ) {
      input.onChange(inputValue);
    }
  };

  return (
    <Wrapper
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      id={input.name}
    >
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
  dotRestriction: PropTypes.number,
};

export default React.memo(NumberInputField);
