import React from 'react';
import PropTypes from 'prop-types';

import Textarea from 'components/Textarea';
import Wrapper from './Wrapper';

const TextareaField = /* istanbul ignore next */ ({
  input,
  label,
  disabled,
  meta,
  placeholder,
  tip,
}) => (
  <Wrapper label={label} tip={tip} meta={meta}>
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
  tip: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default React.memo(TextareaField);
