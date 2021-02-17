import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { imageValidation } from 'components/FormFields/validate';

import BannerField from 'components/FormFields/BannerField';

import { COMM_BANNER_FIELD } from './constants';
import SocialLinksGroup from './SocialLinksGroup';
import ColorsGroup from './ColorsGroup';

const BloggerModeForm = ({ disabled, formValues, intl, initialValues }) => (
  <>
    <Field
      name={COMM_BANNER_FIELD}
      component={BannerField}
      validate={[imageValidation]}
      warn={[imageValidation]}
      disabled={disabled}
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
