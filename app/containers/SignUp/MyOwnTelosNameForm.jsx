import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Wrapper from '../../components/FormFields/Wrapper';
// import okay from 'images/okayGreen.svg?inline';
// import notOkay from 'images/notOkayRed.svg?inline';

import {
  required,
  validateTelosName,
} from '../../components/FormFields/validate';

export const MyOwnTelosNameForm = ({
  input,
  label,
  readOnly,
  disabled,
  meta,
  placeholder,
  isSearchable,
  isRefreshable,
  tip,
  splitInHalf,
  onClick,
  type = 'text',
  autoComplete,
  insideOfSection,
}) => {
  const { value } = input;
  //                   validate={[required, validateTelosName]}
  const lowerCase = /^[a-z.]+$/.test(value);
  const incorrectNumbers = /[06789]+/gm.test(value);
  const isCorrectSymbols = /[a-z1-5]+/gm.test(value);
  const correctLength = value.length >= 2 && value.length <= 12;
  console.log('=====', {
    incorrectNumbers,
    lowerCase,
    isCorrectSymbols,
    correctLength,
  });
  console.log(value, '!', required(value), '!', validateTelosName(value));
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
      <Input
        input={input}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isRefreshable={isRefreshable}
        onClick={onClick}
        autoComplete={autoComplete}
        error={meta.touched && (meta.error || meta.warning)}
        type={type}
      />
    </Wrapper>
  );
};

MyOwnTelosNameForm.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isRefreshable: PropTypes.bool,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  onClick: PropTypes.func,
  insideOfSection: PropTypes.bool,
};

export default MyOwnTelosNameForm;
