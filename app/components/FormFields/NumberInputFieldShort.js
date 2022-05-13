import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from 'components/Input';
import Wrapper from './Wrapper';

const InfoText = styled.span`
  margin-left: 10px;
  font-weight: 600;
`;

export const NumberInputFieldShort = ({
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
  infoText,
}) => {
  const onChange = (x) => {
    try {
      let inputValue = String(x.target.value);
      inputValue = inputValue.replace(/[^0-9.]/, '');

      const lastChar = inputValue[inputValue.length - 1];

      if (lastChar === undefined) {
        input.onChange('');
        return;
      }

      if (lastChar === '.') {
        input.onChange(inputValue.split('.')[0]);
        return;
      }

      if (
        inputValue[0] === '0' &&
        inputValue[1] &&
        inputValue[1].match(/[0-9]/)
      ) {
        input.onChange(lastChar);
        return;
      }

      if (lastChar.match(/[0-9.]/)) {
        input.onChange(inputValue);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onBlur = () => {
    if (input.value.slice(-1) === '.') {
      input.onChange(input.value.slice(0, -1));
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
        input={{ ...input, onChange, onBlur }}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isRefreshable={isRefreshable}
        onClick={onClick}
        error={meta.touched && (meta.error || meta.warning)}
        type="text"
      />
      {infoText && <InfoText>{infoText}</InfoText>}
    </Wrapper>
  );
};

NumberInputFieldShort.propTypes = {
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
  onClick: PropTypes.func,
  infoText: PropTypes.string,
};

export default NumberInputFieldShort;
