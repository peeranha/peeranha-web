import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import { gray, black, white, APP_FONT } from 'style-constants';

import Label from './Label';
import WarningMessage from './WarningMessage';

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
}) => {
  const S = isAsync ? AsyncSelect : Select;

  return (
    <div className="mb-2">
      <Label>{label}</Label>
      <div className="row align-items-start">
        <div className="col-xl-6 mb-1">
          <S
            {...input}
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
              dropdownIndicator: base => ({
                ...base,
                display: 'none',
              }),
              indicatorsContainer: base => ({
                ...base,
                display: 'none',
              }),
            }}
          />
        </div>
        <WarningMessage className="col-xl-6" {...meta} isArrowed />
      </div>
    </div>
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
  disabled: PropTypes.bool,
  isAsync: PropTypes.bool,
  loadOptions: PropTypes.func,
};

export default SelectField;
