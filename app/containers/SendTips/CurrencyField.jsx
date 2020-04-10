import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
} from 'style-constants';

import { Wrapper } from 'components/FormFields/Wrapper';

const Option = styled.div`
  padding: 8px 14px;
  height: 40px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  img {
    height: 20px;
  }

  &:not(:last-child) {
    margin-right: 12px;
  }

  border: 1px solid
    ${x => (!x.isCurrentValue ? BORDER_SECONDARY : BORDER_PRIMARY)};
  box-shadow: ${x =>
    x.isCurrentValue ? `0 0 0 3px rgba(${BORDER_PRIMARY_RGB}, 0.4)` : `none`};
  ${x => (x.disabled ? `opacity: 0.6` : ``)};
`;

const CurrencyField = ({ input, label, disabled, meta, options }) => {
  if (!options) return null;

  const value = input.value.toJS ? input.value.toJS() : input.value;

  return (
    <Wrapper
      className="mb-0"
      label={label}
      meta={meta}
      disabled={disabled}
      id={input.name}
    >
      {options.map(option => (
        <Option
          key={option.name}
          onClick={() => input.onChange(option)}
          isCurrentValue={value.name === option.name}
          disabled={disabled}
        >
          {!Array.isArray(option.logo) ? (
            <>
              <img src={option.logo} alt="logo" />
              {option.name && <span className="ml-2">{option.name}</span>}
            </>
          ) : (
            option.logo.map((logo, i) => (
              <React.Fragment key={logo}>
                <img src={logo} alt="logo" />
                {!!option.names[i] && (
                  <span style={{ fontWeight: 600 }}>{option.names[i]}</span>
                )}
                {i !== option.logo.length - 1 ? (
                  <span className="pl-1 pr-1" style={{ fontWeight: 900 }}>
                    /
                  </span>
                ) : null}
              </React.Fragment>
            ))
          )}
        </Option>
      ))}
    </Wrapper>
  );
};

CurrencyField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array,
};

export default CurrencyField;
