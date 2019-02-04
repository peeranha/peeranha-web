import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';

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
    <div>
      <h6>{label}</h6>
      <S
        {...input}
        loadOptions={loadOptions}
        onBlur={() => input.onBlur && input.onBlur(input.value)}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={disabled}
        options={options}
      />
      <WarningMessage {...meta} />
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
