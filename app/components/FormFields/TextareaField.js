import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Textarea from 'components/Textarea';

import Label from './Label';
import WarningMessage from './WarningMessage';

const TextareaFieldStyled = styled.div`
  margin-bottom: 14px;
`;

const TextareaField = ({ input, label, disabled, meta, placeholder }) => (
  <TextareaFieldStyled>
    <Label>{label}</Label>
    <Textarea
      {...input}
      error={meta.touched && (meta.error || meta.warning)}
      disabled={disabled}
      placeholder={placeholder}
    />
    <WarningMessage {...meta} />
  </TextareaFieldStyled>
);

TextareaField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TextareaField;
