import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WarningMessage from 'components/FormFields/WarningMessage';

import {
  LANDING_FONT,
  BORDER_WARNING_LIGHT,
  BORDER_SECONDARY,
  TEXT_SECONDARY_LIGHT,
  BORDER_DARK,
} from 'style-constants';

import { Message } from './DefaultInput';

const PADDING = '0';
const HEIGHT = '40';

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${LANDING_FONT};
  text-transform: none;
  letter-spacing: -0.9px;
  width: 100%;
`;

const Label = styled.div`
  position: absolute;
  left: ${PADDING}px;
  padding-bottom: 0;
  transition: 0.5s;
  font-size: 14px;
  color: ${TEXT_SECONDARY_LIGHT};
  order: 1;
`;

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid ${BORDER_SECONDARY};
  padding: 5px ${PADDING}px !important;
  transition: 0.5s;
  height: ${HEIGHT}px;
  box-sizing: border-box;
  font-size: 14px;
  order: 2;

  :focus {
    border-color: ${BORDER_WARNING_LIGHT} !important;
  }

  ${(x) =>
    x.error
      ? `
    border-color: ${BORDER_WARNING_LIGHT} !important;
  `
      : ``} :hover {
    border-color: ${BORDER_DARK};
  }

  :focus + ${Label} {
    font-size: 12px;
    padding-bottom: ${1.2 * HEIGHT}px;
  }

  ${(x) =>
    x.value
      ? `+ * {
     font-size: 12px !important;
     padding-bottom: ${1.2 * HEIGHT}px !important;
   }
  `
      : ``};
`;

export const FloatingLabelInput = ({
  input,
  label,
  disabled,
  multiline,
  meta,
}) => (
  <div className="mb-4">
    <Box>
      <Input
        {...input}
        type="text"
        disabled={disabled}
        multiline={multiline}
        error={meta.touched && (meta.error || meta.warning)}
      />
      <Label>{label}</Label>
    </Box>

    <Message className="my-1">
      <WarningMessage
        warning={meta.warning}
        error={meta.error}
        visited={meta.visited}
        touched={meta.touched}
        active={meta.active}
      />
    </Message>
  </div>
);

FloatingLabelInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  label: PropTypes.element,
};

export { Box, Label, Input };
export default FloatingLabelInput;
