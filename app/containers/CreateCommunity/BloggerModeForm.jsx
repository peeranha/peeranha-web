import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { imageValidation } from 'components/FormFields/validate';

import BannerField from 'components/FormFields/BannerField';

import { ABOUT_FIELD, COMM_BANNER_FIELD } from './constants';
import messages from './messages';
import SocialLinksGroup from './SocialLinksGroup';
import ColorsGroup from './ColorsGroup';
import AboutForm from './AboutForm';

const BloggerModeForm = ({ disabled, formValues, intl, initialValues }) => (
  <>
    <AboutForm
      formValues={formValues}
      intl={intl}
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
      label={intl.formatMessage(messages.topBanner)}
    />
    <br />
    <SocialLinksGroup disabled={disabled} intl={intl} />

    <ColorsGroup
      disabled={disabled}
      intl={intl}
      formValues={formValues}
      initialValues={initialValues}
    />
  </>
);

BloggerModeForm.propTypes = {
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  formValues: PropTypes.object,
};

export default memo(BloggerModeForm);
