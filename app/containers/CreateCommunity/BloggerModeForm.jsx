import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { imageValidation } from 'components/FormFields/validate';

import BannerField from 'components/FormFields/BannerField';

import { ABOUT_FIELD, COMM_BANNER_FIELD } from './constants';
import SocialLinksGroup from './SocialLinksGroup';
import ColorsGroup from './ColorsGroup';
import AboutForm from './AboutForm';

const BloggerModeForm = ({ disabled, formValues, initialValues }) => {
  const { t } = useTranslation();

  return (
    <>
      <AboutForm
        formValues={formValues}
        loading={disabled}
        name={ABOUT_FIELD}
        initialValues={initialValues}
      />

      <Field
        name={COMM_BANNER_FIELD}
        component={BannerField}
        validate={[imageValidation]}
        warn={[imageValidation]}
        disabled={disabled}
        label={t('createCommunity.topBanner')}
      />
      <br />
      <SocialLinksGroup disabled={disabled} />

      <ColorsGroup
        disabled={disabled}
        formValues={formValues}
        initialValues={initialValues}
      />
    </>
  );
};

BloggerModeForm.propTypes = {
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  formValues: PropTypes.object,
};

export default memo(BloggerModeForm);
