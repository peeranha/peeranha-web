import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import {
  BG_LIGHT,
  BORDER_SECONDARY,
  BG_PRIMARY,
  BORDER_TRANSPARENT,
} from 'style-constants';

import checkedIcon from 'images/okay.svg?inline';

import Span from 'components/Span';
import { ErrorHandling, DisableHandling } from './InputStyled';

const Icon = styled.span`
  background: ${BG_LIGHT};
  min-width: 20px;
  min-height: 20px;
  border: 1px solid ${x => (x.value ? BORDER_TRANSPARENT : BORDER_SECONDARY)};
  border-radius: 3px;
  margin-right: 10px;
  display: inline-block;
  background-image: url(${x => (x.value ? checkedIcon : '')});
  background-color: ${x => (x.value ? BG_PRIMARY : BG_LIGHT)};
  background-repeat: no-repeat;
  background-position: center;

  ${({ error }) => ErrorHandling(error)};
  ${({ disabled }) => DisableHandling(disabled)};
`;

const Input = Icon.extend`
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
`.withComponent('input');

/* eslint jsx-a11y/label-has-for: 0 */
const Checkbox = ({ input, label, disabled, meta }) => (
  <div className="d-flex align-items-start">
    <div className="position-relative">
      <Icon
        value={input.value}
        disabled={disabled}
        error={meta.touched && (meta.error || meta.warning)}
      />
      <Input
        {...input}
        type="checkbox"
        id={input.name}
        name={input.name}
        disabled={disabled}
      />
    </div>

    <label className="flex-grow-1" htmlFor={input.name}>
      <Span fontSize="16" mobileFS="14">
        {label}
      </Span>
    </label>
  </div>
);

Checkbox.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default React.memo(Checkbox);
