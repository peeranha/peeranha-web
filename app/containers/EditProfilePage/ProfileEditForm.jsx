import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import messages from 'containers/Profile/messages';

import {
  ABOUT_FIELD,
  AVATAR_FIELD,
  COMPANY_FIELD,
  DISPLAY_NAME_FIELD,
  LOCATION_FIELD,
  POSITION_FIELD,
} from 'containers/Profile/constants';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import AvatarField from 'components/FormFields/AvatarField';

import Button from 'components/Button/Contained/InfoLarge';
import Box from 'components/Base/AvatarBase';
import H3 from 'components/H3';
import FormBox from 'components/Form';

import {
  imageValidation,
  required,
  strLength20x1000,
  strLength3x20,
} from 'components/FormFields/validate';

import { EDIT_PROFILE_BUTTON_ID, PROFILE_EDIT_FORM } from './constants';

export const ProfileEditForm = ({
  handleSubmit,
  intl,
  saveProfile,
  isProfileSaving,
}) => (
  <Box position="bottom">
    <Field
      name={AVATAR_FIELD}
      component={AvatarField}
      disabled={isProfileSaving}
      validate={imageValidation}
      warn={imageValidation}
    />

    <FormBox onSubmit={handleSubmit(saveProfile)}>
      <H3>
        <FormattedMessage {...messages.editProfile} />
      </H3>

      <Field
        name={DISPLAY_NAME_FIELD}
        component={TextInputField}
        label={intl.formatMessage({ id: messages.displayNameLabel.id })}
        tip={intl.formatMessage({ id: messages.displayNameTip.id })}
        disabled={isProfileSaving}
        validate={[required, strLength3x20]}
        warn={[required, strLength3x20]}
        splitInHalf
      />

      <Field
        name={COMPANY_FIELD}
        component={TextInputField}
        label={intl.formatMessage({ id: messages.companyLabel.id })}
        tip={intl.formatMessage({ id: messages.companyTip.id })}
        disabled={isProfileSaving}
        validate={strLength3x20}
        warn={strLength3x20}
        splitInHalf
      />

      <Field
        name={POSITION_FIELD}
        component={TextInputField}
        label={intl.formatMessage({ id: messages.positionLabel.id })}
        tip={intl.formatMessage({ id: messages.positionTip.id })}
        disabled={isProfileSaving}
        validate={strLength3x20}
        warn={strLength3x20}
        splitInHalf
      />

      <Field
        name={LOCATION_FIELD}
        label={intl.formatMessage({ id: messages.locationLabel.id })}
        tip={intl.formatMessage({ id: messages.locationTip.id })}
        disabled={isProfileSaving}
        component={TextInputField}
        validate={strLength3x20}
        warn={strLength3x20}
        splitInHalf
      />

      <Field
        name={ABOUT_FIELD}
        component={TextareaField}
        label={intl.formatMessage({ id: messages.aboutLabel.id })}
        tip={intl.formatMessage({ id: messages.companyTip.id })}
        disabled={isProfileSaving}
        validate={strLength20x1000}
        warn={strLength20x1000}
        splitInHalf
      />

      <Button
        id={EDIT_PROFILE_BUTTON_ID}
        disabled={isProfileSaving}
        type="submit"
      >
        <FormattedMessage {...messages.saveButton} />
      </Button>
    </FormBox>
  </Box>
);

ProfileEditForm.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  location: PropTypes.object,
  saveProfile: PropTypes.func,
  isProfileSaving: PropTypes.bool,
  profile: PropTypes.object,
};

let FormClone = reduxForm({
  form: PROFILE_EDIT_FORM,
})(ProfileEditForm);

FormClone = connect((_, props) => ({
  enableReinitialize: true,
  initialValues: {
    ...(props?.profile?.profile || {}),
    [DISPLAY_NAME_FIELD]: props?.profile?.['display_name'],
    [AVATAR_FIELD]: props?.profile?.['ipfs_avatar'],
  },
}))(FormClone);

export default injectIntl(FormClone);
