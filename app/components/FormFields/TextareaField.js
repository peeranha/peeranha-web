import React from 'react';
import PropTypes from 'prop-types';

import Textarea from 'components/Textarea';
import Wrapper from './Wrapper';

export const TextareaField = ({
  input,
  label,
  disabled,
  meta,
  placeholder,
  tip,
  splitInHalf,
}) => (
  <Wrapper
    label={label}
    tip={tip}
    meta={meta}
    splitInHalf={splitInHalf}
    id={input.name}
  >
    <Textarea
      {...input}
      error={meta.touched && (meta.error || meta.warning)}
      disabled={disabled}
      placeholder={placeholder}
    />
  </Wrapper>
);

TextareaField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default React.memo(TextareaField);
