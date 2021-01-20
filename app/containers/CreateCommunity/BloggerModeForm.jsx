import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import TextInputField from '../../components/FormFields/TextInputField';
import {
  imageValidation,
  required,
  strLength8x100,
} from '../../components/FormFields/validate';
import BannerField from '../../components/FormFields/BannerField';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import {
  COMM_BANNER_FIELD,
  FACEBOOK_LINK_FIELD,
  INSTAGRAM_LINK_FIELD,
  YOUTUBE_LINK_FIELD,
  VK_LINK_FIELD,
} from './constants';
import messages from './messages';

const BloggerModeForm = ({ disabled, formValues, intl }) => (
  <>
    <Field
      name={COMM_BANNER_FIELD}
      component={BannerField}
      validate={[imageValidation, required]}
      warn={[imageValidation, required]}
      disabled={disabled}
    />

    <Field
      disabled={disabled}
      name={FACEBOOK_LINK_FIELD}
      component={TextInputField}
      label={intl.formatMessage(messages.facebookLink)}
      validate={[strLength8x100, required]}
      warn={[strLength8x100, required]}
      splitInHalf
    />

    <Field
      disabled={disabled}
      name={INSTAGRAM_LINK_FIELD}
      component={TextInputField}
      label={intl.formatMessage(messages.instagramLink)}
      validate={[strLength8x100, required]}
      warn={[strLength8x100, required]}
      splitInHalf
    />

    <Field
      disabled={disabled}
      name={YOUTUBE_LINK_FIELD}
      component={TextInputField}
      label={intl.formatMessage(messages.youtubeLink)}
      validate={[strLength8x100, required]}
      warn={[strLength8x100, required]}
      splitInHalf
    />

    <Field
      disabled={disabled}
      name={VK_LINK_FIELD}
      component={TextInputField}
      label={intl.formatMessage(messages.vkLink)}
      validate={[strLength8x100, required]}
      warn={[strLength8x100, required]}
      splitInHalf
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
