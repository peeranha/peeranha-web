import React from 'react';
import Wrapper from './Wrapper';

import _debounce from 'lodash/debounce';
import { Styles } from '../Input/InputStyled';
import styled from 'styled-components';

const InputColorStyled = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  transition: 0.5s;
  flex: 1;

  input {
    ${Styles};
    padding: 0;
    @media only screen and (max-width: 576px) {
      padding: 0;
    }
  }
`;

class DebouncedColorInput extends React.Component {
  constructor(input) {
    super(input);
    this.input = input;
    this.debouncedOnChange = _debounce(event => {
      input.onChange(event);
    }, 200);

    this.handleChange = event => {
      event.persist();
      this.debouncedOnChange(event);
    };
  }

  render() {
    return (
      <InputColorStyled>
        <input
          type="color"
          onChange={this.handleChange}
          defaultValue={this.input.defaultValue}
        />
      </InputColorStyled>
    );
  }
}

const ColorField = ({
  input,
  label,
  disabled,
  meta,
  tip,
  splitInHalf,
  type = 'color',
  insideOfSection,
  defaultValue,
}) => {
  return (
    <Wrapper
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      disabled={disabled}
      id={input.name}
      insideOfSection={insideOfSection}
    >
      <DebouncedColorInput
        {...input}
        type={type}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </Wrapper>
  );
};

export default React.memo(ColorField);
