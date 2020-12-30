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

  return (
    <Wrapper
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      id={input.name}
    >
      <Input
        input={input}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isRefreshable={isRefreshable}
        onClick={onClick}
        error={meta.touched && (meta.error || meta.warning)}
        type="number"
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
