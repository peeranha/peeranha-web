import React from 'react';
import PropTypes from 'prop-types';

import TextEditor from 'components/TextEditor';
import Wrapper from './Wrapper';

const TextEditorField = ({ input, label, disabled, meta, fieldWithTips }) => (
  <Wrapper label={label} fieldWithTips={fieldWithTips} meta={meta}>
    <TextEditor {...input} disabled={disabled} />
  </Wrapper>
);

TextEditorField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  fieldWithTips: PropTypes.bool,
};

export default React.memo(TextEditorField);
