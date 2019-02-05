import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import AsyncSelect from 'react-select/lib/Async';
import { gray, black, white } from 'style-constants';

import Label from './Label';
import WarningMessage from './WarningMessage';

const SelectStyled = styled.div`
  margin-bottom: 14px;
`;

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
    <SelectStyled>
      <Label>{label}</Label>
      <div className="row">
        <div className="col-xl-6">
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
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '16px',
                background: `${white} !important`,
              }),
              menu: base => ({
                ...base,
                color: black,
                fontFamily: 'Source Sans Pro, sans-serif',
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
    </SelectStyled>
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
