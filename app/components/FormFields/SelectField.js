import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

import {
  BORDER_PRIMARY,
  BG_SECONDARY_LIGHT,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  BORDER_SECONDARY,
  TEXT_DARK,
  BG_LIGHT,
  BORDER_SECONDARY_DARK,
  APP_FONT,
} from 'style-constants';

import searchIcon from 'images/search.svg?inline';
import Span from 'components/Span';

import Wrapper from './Wrapper';

export const Box = styled.div`
  padding: 0 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 36px;
  box-sizing: border-box;
  border: 1px solid ${BORDER_TRANSPARENT};

  background: ${/* istanbul ignore next */ x =>
    x.isActive ? BG_SECONDARY_LIGHT : BG_TRANSPARENT};

  :hover {
    border: 1px solid ${BORDER_PRIMARY};
    background: none;
  }
`;

const DefaultOption = /* istanbul ignore next */ ({
  data,
  isFocused,
  innerProps = {},
}) => {
  let isActive = false;

  if (isFocused) {
    isActive = true;
  }

  return (
    <Box {...innerProps} isActive={isActive}>
      <Span>{data.label}</Span>
    </Box>
  );
};

export const getSelectOptions = initialOptions =>
  initialOptions.map(x => ({
    value: x,
    label: x,
  }));

/* eslint no-param-reassign: 0 */
export const Select2 = /* istanbul ignore next */ ({
  input,
  options,
  isMulti,
  isClearable,
  isSearchable,
  disabled,
  isAsync,
  loadOptions,
  autoFocus,
  menuIsOpen,
  Group,
  CustomOption,
  placeholder,
}) => {
  const S = isAsync ? AsyncSelect : Select;

  return (
    <S
      {...input}
      onChange={x => {
        input.value = x;
        input.onChange(x);
      }}
      components={{
        Group,
        DropdownIndicator: () => (
          <img className="mr-1" src={searchIcon} alt="icon" />
        ),
        IndicatorSeparator: null,
        Option: CustomOption || DefaultOption,
      }}
      placeholder={placeholder}
      autoFocus={autoFocus}
      menuIsOpen={menuIsOpen}
      loadOptions={loadOptions}
      onBlur={() => input.onBlur && input.onBlur(input.value)}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isDisabled={disabled}
      options={options}
      styles={{
        control: (base, state) => ({
          ...base,
          border: `1px solid ${
            state.isFocused ? BORDER_PRIMARY : BORDER_SECONDARY
          }`,
          boxShadow: `0 0 0 3px ${
            state.isFocused ? BORDER_PRIMARY : BORDER_TRANSPARENT
          }66`,
          borderRadius: '3px',
          color: TEXT_DARK,
          fontFamily: APP_FONT,
          fontSize: '16px',
          background: `${BG_LIGHT} !important`,
          minWidth: 250,
          margin: `${menuIsOpen ? '10px' : '0'}`,
          padding: '0 5px',
        }),
        menu: base => ({
          ...base,
          color: TEXT_DARK,
          fontFamily: APP_FONT,
          fontSize: '16px',
          position: 'relative',
          margin: 0,
          boxShadow: 'none',
        }),
        menuList: base => ({
          ...base,
          paddingBottom: 0,
          boxShadow: !menuIsOpen ? `0 0 3px ${BORDER_SECONDARY_DARK}` : `none`,
          borderRadius: '3px',
        }),
      }}
    />
  );
};

export const SelectField = /* istanbul ignore next */ props => (
  <Wrapper
    label={props.label}
    tip={props.tip}
    meta={props.meta}
    splitInHalf={props.splitInHalf}
  >
    <Select2 {...props} />
  </Wrapper>
);

DefaultOption.propTypes = {
  data: PropTypes.object,
  isFocused: PropTypes.bool,
  innerProps: PropTypes.object,
};

Select2.propTypes = {
  input: PropTypes.object,
  defaultValue: PropTypes.object,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  disabled: PropTypes.bool,
  isAsync: PropTypes.bool,
  loadOptions: PropTypes.func,
  autoFocus: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  Group: PropTypes.any,
  CustomOption: PropTypes.any,
  placeholder: PropTypes.string,
};

SelectField.propTypes = {
  meta: PropTypes.object,
  label: PropTypes.string,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
};

export default React.memo(SelectField);
