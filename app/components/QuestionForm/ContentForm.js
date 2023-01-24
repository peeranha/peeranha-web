import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { strLength25x30000, required } from 'components/FormFields/validate';
import TextEditorField from 'components/FormFields/TextEditorField';

import { FORM_CONTENT } from './constants';

const ContentForm = ({
  questionLoading,
  isHasRole,
  isEditForm,
  isPostAuthor,
}) => {
  const { t } = useTranslation();

  return (
    <Field
      name={FORM_CONTENT}
      component={TextEditorField}
      disabled={questionLoading || (isHasRole && isEditForm && !isPostAuthor)}
      label={t('common.questionBodyLabel')}
      validate={[strLength25x30000, required]}
      warn={[strLength25x30000, required]}
    />
  );
};

ContentForm.propTypes = {
  questionLoading: PropTypes.bool,
  formValues: PropTypes.object,
};

export default memo(ContentForm);
