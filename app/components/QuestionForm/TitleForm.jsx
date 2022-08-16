import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import {
  strLength15x100,
  required,
  maxByteLength,
  withoutDoubleSpace,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';

import { FORM_TITLE } from './constants';

const TitleForm = ({ questionLoading }) => {
  const { t } = useTranslation();

  return (
    <Field
      name={FORM_TITLE}
      component={TextInputField}
      disabled={questionLoading}
      label={t('common.titleLabel')}
      tip={t('common.titleTip')}
      validate={[withoutDoubleSpace, strLength15x100, maxByteLength, required]}
      warn={[strLength15x100, required]}
      splitInHalf
    />
  );
};

TitleForm.propTypes = {
  questionLoading: PropTypes.bool,
};

export default memo(TitleForm);
