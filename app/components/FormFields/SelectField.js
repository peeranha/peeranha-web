import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';

import { gray, black, white, APP_FONT } from 'style-constants';

import Wrapper from './Wrapper';

/* istanbul ignore next */
const SelectField = ({
  input,
  label,
  options,
  isMulti,
  isClearable,
  isSearchable,
  disabled,
  meta,
  isAsync,
  loadOptions,
  fieldWithTips,
}) => {
  const S = isAsync ? AsyncSelect : Select;

  return (
    <Wrapper label={label} fieldWithTips={fieldWithTips} meta={meta}>
      <S
        {...input}
        components={{
          IndicatorSeparator: null,
          DropdownIndicator: null,
        }}
        loadOptions={loadOptions}
        onBlur={() => input.onBlur && input.onBlur(input.value)}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={disabled}
        options={options}
        styles={{
          control: base => ({
            ...base,
            border: `1px solid ${gray}`,
            borderRadius: '3px',
            color: black,
            fontFamily: APP_FONT,
            fontSize: '16px',
            background: `${white} !important`,
          }),
          menu: base => ({
            ...base,
            color: black,
            fontFamily: APP_FONT,
            fontSize: '16px',
          }),
        }}
      />
    </Wrapper>
  );
};

SelectField.propTypes = {
  input: PropTypes.object,
  defaultValue: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  fieldWithTips: PropTypes.bool,
  disabled: PropTypes.bool,
  isAsync: PropTypes.bool,
  loadOptions: PropTypes.func,
};

export default React.memo(SelectField);
