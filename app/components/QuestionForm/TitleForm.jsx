import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import {
  strLength15x100,
  required,
  maxByteLength,
  withoutDoubleSpace,
  withoutDuplicates,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';

import { FORM_TITLE } from './constants';

import messages from './messages';

const TitleForm = ({ questionLoading, intl, questionList }) => (
  <Field
    name={FORM_TITLE}
    component={TextInputField}
    disabled={questionLoading}
    label={intl.formatMessage(messages.titleLabel)}
    tip={intl.formatMessage(messages.titleTip)}
    validate={[
      withoutDoubleSpace,
      strLength15x100,
      maxByteLength,
      required,
      withoutDuplicates(questionList),
    ]}
    warn={[strLength15x100, required]}
    splitInHalf
  />
);

TitleForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  questionsList: PropTypes.array,
};

export default memo(TitleForm);
