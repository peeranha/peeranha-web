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
  APP_FONT,
  BORDER_WARNING_LIGHT,
  BORDER_PRIMARY_RGB,
  BORDER_WARNING_LIGHT_RGB,
  TEXT_SECONDARY_LIGHT,
} from 'style-constants';

import arrowDown from 'images/arrowDownNotFilled.svg?external';
import Span from 'components/Span';
import Icon from 'components/Icon';
import { singleCommunityColors } from 'utils/communityManagement';
import Wrapper from './Wrapper';

const colors = singleCommunityColors();

export const Box = styled.div`
  padding: 0 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 36px;
  box-sizing: border-box;
  border: 1px solid ${BORDER_TRANSPARENT};

  background: ${(x) => (x.isActive ? BG_SECONDARY_LIGHT : BG_TRANSPARENT)};

  :hover {
    border: 1px solid ${colors.textColor || BORDER_PRIMARY};
    background: none;
  }
`;

const DefaultOption = ({ data, isFocused, innerProps = {} }) => {
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

export const getSelectOptions = (initialOptions) =>
  initialOptions.map((x) => ({
    value: x,
    label: x,
  }));

/* eslint no-param-reassign: 0 */
export const Select2 = ({
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
  error,
  isWrapped,
  disabledScrollbar,
}) => {
  const S = isAsync ? AsyncSelect : Select;

  return (
    <S
      {...input}
      onChange={(x) => {
        input.value = x;
        input.onChange(x);
      }}
      components={{
        Group,
        DropdownIndicator: () => (
          <Icon
            className="mr-1"
            icon={arrowDown}
            width="16"
            color={TEXT_SECONDARY_LIGHT}
          />
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
            (error && BORDER_WARNING_LIGHT) ||
            (state.isFocused && (colors.textColor || BORDER_PRIMARY)) ||
            BORDER_SECONDARY
          }`,
          boxShadow: `0 0 0 3px ${
            (error && `rgba(${BORDER_WARNING_LIGHT_RGB}, 0.4)`) ||
            (state.isFocused &&
              (colors.textColorShadow || `rgba(${BORDER_PRIMARY_RGB}, 0.4)`)) ||
            BORDER_TRANSPARENT
          }`,
          borderRadius: '3px',
          color: TEXT_DARK,
          fontFamily: APP_FONT,
          fontSize: '16px',
          background: `${BG_LIGHT} !important`,
          minWidth: 270,
          minHeight: 40,
          margin: `${menuIsOpen ? '10px' : '0'}`,
          padding: '0 5px',
        }),
        menu: (base) => ({
          ...base,
          color: TEXT_DARK,
          fontFamily: APP_FONT,
          fontSize: '16px',
          position: isWrapped ? 'relative' : 'absolute',
          margin: 0,
          boxShadow: 'none',
        }),
        menuList: (base) => ({
          ...base,
          paddingBottom: 0,
          boxShadow: !menuIsOpen ? `0 0 3px ${BORDER_SECONDARY}` : `none`,
          borderRadius: '3px',
          overflow: disabledScrollbar ? 'hidden' : 'auto',
        }),
      }}
    />
  );
};

export const SelectField = (props) => (
  <Wrapper
    label={props.label}
    tip={props.tip}
    meta={props.meta}
    splitInHalf={props.splitInHalf}
    id={props.input.name}
  >
    <Select2
      {...props}
      error={props.meta.touched && (props.meta.error || props.meta.warning)}
    />
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
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  disabled: PropTypes.bool,
  isAsync: PropTypes.bool,
  loadOptions: PropTypes.func,
  autoFocus: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  isWrapped: PropTypes.bool,
  Group: PropTypes.any,
  CustomOption: PropTypes.any,
  placeholder: PropTypes.string,
  disabledScrollbar: PropTypes.bool,
};

SelectField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  label: PropTypes.string,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
};

export default SelectField;
