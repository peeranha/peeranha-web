import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import {
  strLength15x100,
  required,
  maxByteLength,
  withoutDoubleSpace,
  strLength5x100,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';

import { FORM_TITLE } from './constants';

import messages from './messages';

const TitleForm = ({ questionLoading, intl, isDocumentation }) => {
  const length = isDocumentation ? strLength5x100 : strLength15x100;
  return (
    <Field
      name={FORM_TITLE}
      component={TextInputField}
      disabled={questionLoading}
      label={intl.formatMessage(messages.titleLabel)}
      tip={intl.formatMessage(messages.titleTip)}
      validate={[withoutDoubleSpace, length, maxByteLength, required]}
      warn={[length, required]}
      splitInHalf
    />
  );
};

TitleForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default memo(TitleForm);
