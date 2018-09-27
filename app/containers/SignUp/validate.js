import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { EOS_ACC, DISPLAY_NAME } from './constants';

function validate(values) {
  const errors = {};
  const REQUIRED_FIELD = <FormattedMessage {...messages.requiredField} />;
  const DISPLAY_NAME_LENGTH = (
    <FormattedMessage {...messages.displayNameLength} />
  );

  if (!values.get(EOS_ACC)) {
    errors[EOS_ACC] = REQUIRED_FIELD.props.defaultMessage;
  }

  if (!values.get(DISPLAY_NAME)) {
    errors[DISPLAY_NAME] = REQUIRED_FIELD.props.defaultMessage;
  } else if (
    values.get(DISPLAY_NAME).length < 3 ||
    values.get(DISPLAY_NAME).length > 20
  ) {
    errors[DISPLAY_NAME] = DISPLAY_NAME_LENGTH.props.defaultMessage;
  }

  return errors;
}

export default validate;
