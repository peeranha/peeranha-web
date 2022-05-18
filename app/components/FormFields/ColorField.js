import React from 'react';
import _debounce from 'lodash/debounce';
import styled from 'styled-components';

import { BORDER_RADIUS_M, BORDER_SECONDARY } from 'style-constants';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const InputColorStyled = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  transition: 0.5s;

  input {
    height: 100%;
    min-height: 0;
    padding: 0;
    border: none;
    border-radius: ${BORDER_RADIUS_M};
    overflow: hidden;
    cursor: pointer;

    ::-webkit-color-swatch-wrapper {
      padding: 0;
      border: none;
    }

    ::-webkit-color-swatch {
      border: 1px solid ${BORDER_SECONDARY};
      border-radius: 3px;
    }

    @media only screen and (max-width: 576px) {
      padding: 0;
    }
  }
`;

class DebouncedColorInput extends React.Component {
  constructor(input) {
    super(input);
    this.input = input;
    this.debouncedOnChange = _debounce((event) => {
      input.onChange(event);
    }, 200);

    this.handleChange = (event) => {
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
}) => (
  <Wrapper
    tip={tip}
    meta={meta}
    splitInHalf={splitInHalf}
    disabled={disabled}
    id={input.name}
    insideOfSection={insideOfSection}
  >
    <DebouncedColorInput
      name={input.name}
      onBlur={input.onBlur}
      onChange={input.onChange}
      onDragStart={input.onDragStart}
      onDrop={input.onDrop}
      onFocus={input.onFocus}
      value={input.value}
      type={type}
      disabled={disabled}
      defaultValue={defaultValue}
    />
    {label}
  </Wrapper>
);

ColorField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  meta: PropTypes.object,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
  type: PropTypes.string,
  insideOfSection: PropTypes.bool,
  defaultValue: PropTypes.object,
};

export default React.memo(ColorField);
