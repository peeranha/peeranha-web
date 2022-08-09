import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { formatStringToHtmlId } from 'utils/animation';

import {
  BG_LIGHT,
  BG_PRIMARY_DARK,
  BORDER_PRIMARY_DARK,
  BORDER_SECONDARY,
} from 'style-constants';

// import CheckedIcon from 'icons/Checked';
import CheckedIcon from 'icons/Checked';

import Span from 'components/Span';
import { DisableHandling, ErrorHandling } from './InputStyled';

const Container = styled.div`
  width: ${({ width }) => width || 'auto'};
`;

export const Icon = styled.span`
  background: ${BG_LIGHT};
  min-width: 22px;
  min-height: 22px;
  border-radius: 3px;
  margin-right: 10px;
  display: inline-block;
  background-color: ${BG_LIGHT};
  background-repeat: no-repeat;
  background-position: center;
  z-index: 9;
  cursor: pointer;

  ${({ error }) => ErrorHandling(error)};
  ${({ disabled }) => DisableHandling(disabled)};

  border: 1px solid ${BORDER_SECONDARY};
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;

  width: calc(100% - 10px);
  height: 100%;

  cursor: pointer;

  :checked + span {
    background-color: ${BG_PRIMARY_DARK};

    border: 1px solid ${BORDER_PRIMARY_DARK};
  }
`;

export const Label = Span.extend`
  font-size: 16px;
  line-height: 22px;
  min-width: 110px;
  cursor: pointer;
  flex: 1;
  opacity: ${x => (x.disabled ? '0.6' : '1')};
`.withComponent('label');

/* eslint jsx-a11y/label-has-for: 0 */
const Checkbox = ({ input, label, disabled, meta, width }) => (
  <Container width={width} className="d-flex align-items-start">
    <div className="position-relative d-inline-flex">
      <Input
        {...input}
        value={input.value}
        type="checkbox"
        id={formatStringToHtmlId(input.name)}
        name={input.name}
        disabled={disabled}
        checked={input.value}
      />
      <Icon
        disabled={disabled}
        error={meta.touched && (meta.error || meta.warning)}
        className="df aic jcc"
      >
        {input.value && <CheckedIcon stroke="#fff" />}
      </Icon>
    </div>

    <Label htmlFor={formatStringToHtmlId(input.name)} disabled={disabled}>
      {label}
    </Label>
  </Container>
);

Checkbox.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  width: PropTypes.string,
};

export default Checkbox;
