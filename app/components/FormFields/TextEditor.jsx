import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage, injectIntl } from 'react-intl';
import ReactMDE from 'redux-forms-markdown-editor';

import formFieldsMsg from './messages';
import { strLength25x30000, required } from './validate';

import {
  TextEditorWrapper,
  TextEditorWarning,
  TextEditorTitle,
} from './TextEditorField';

const TextEditor = props => {
  const {
    meta: { touched, error, active },
    input: { value },
    labelMessage = {},
    intl,
  } = props;

  return (
    <TextEditorWrapper isError={touched && error}>
      {labelMessage.id &&
        intl.formatMessage(labelMessage) && (
          <TextEditorTitle>{intl.formatMessage(labelMessage)}</TextEditorTitle>
        )}
      <ReactMDE {...props} meta={{ ...props.meta, error: '', warning: '' }} />
      {(active || touched) &&
        strLength25x30000(value) && (
          <TextEditorWarning>
            <FormattedMessage {...formFieldsMsg.wrongLength25x30000} />
          </TextEditorWarning>
        )}
      {touched &&
        required(value) && (
          <TextEditorWarning>
            <FormattedMessage {...formFieldsMsg.requiredField} />
          </TextEditorWarning>
        )}
    </TextEditorWrapper>
  );
};

TextEditor.propTypes = {
  intl: intlShape.isRequired,
  meta: PropTypes.object,
  input: PropTypes.object,
  labelMessage: PropTypes.object,
};

export default injectIntl(TextEditor);
