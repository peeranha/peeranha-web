import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const requiredField = <FormattedMessage {...messages.requiredField} />;
const displayNameLength = <FormattedMessage {...messages.displayNameLength} />;

const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? displayNameLength.props.defaultMessage
    : undefined;

export const strLength = stringLength(3, 20);
export const required = value =>
  !value ? requiredField.props.defaultMessage : undefined;
