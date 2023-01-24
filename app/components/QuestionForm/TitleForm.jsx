import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import {
  strLength15x100,
  required,
  maxByteLength,
  withoutDoubleSpace,
  strLength5x100,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';

import { FORM_TITLE } from './constants';

const TitleForm = ({
  questionLoading,
  isDocumentation,
  isHasRole,
  isEditForm,
  isPostAuthor,
}) => {
  const { t } = useTranslation();
  const length = isDocumentation ? strLength5x100 : strLength15x100;

  return (
    <Field
      name={FORM_TITLE}
      component={TextInputField}
      disabled={questionLoading || (isHasRole && isEditForm && !isPostAuthor)}
      label={t('common.titleLabel')}
      tip={t('common.titleTip')}
      validate={[withoutDoubleSpace, length, maxByteLength, required]}
      warn={[length, required]}
      splitInHalf
    />
  );
};

TitleForm.propTypes = {
  questionLoading: PropTypes.bool,
};

export default memo(TitleForm);
