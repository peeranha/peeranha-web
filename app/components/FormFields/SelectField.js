import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

const SelectField = ({
  input,
  label,
  options,
  isMulti,
  isClearable,
  isSearchable,
  disabled,
  meta: { touched, error, warning },
}) => (
  <div>
    <h6>{label}</h6>
    <Select
      {...input}
      onBlur={() => input.onBlur(input.value)}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isDisabled={disabled}
      options={options}
    />
    <h6 className="text-danger">
      {touched &&
        ((error && <FormattedMessage {...error} />) ||
          (warning && <FormattedMessage {...warning} />))}
    </h6>
  </div>
);

SelectField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SelectField;
