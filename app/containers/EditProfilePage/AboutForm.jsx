import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field } from 'redux-form/immutable';

import { ABOUT_FIELD } from 'containers/Profile/constants';

import TextEditorField from 'components/FormFields/TextEditorField';
import { strLength20x1000 } from 'components/FormFields/validate';

const AboutForm = ({ isProfileSaving }) => {
  const { t } = useTranslation();

  return (
    <Field
      name={ABOUT_FIELD}
      component={TextEditorField}
      label={t('profile.aboutLabel')}
      tip={t('profile.companyTip')}
      disabled={isProfileSaving}
      validate={strLength20x1000}
      warn={strLength20x1000}
    />
  );
};

AboutForm.propTypes = {
  formValues: PropTypes.object,
  isProfileSaving: PropTypes.bool,
};

export default memo(AboutForm);
