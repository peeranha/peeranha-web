import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import messages from 'containers/Profile/messages';

import {
  AVATAR_FIELD,
  DISPLAY_NAME_FIELD,
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import AvatarField from 'components/FormFields/AvatarField';

import Button from 'components/Button/Contained/InfoLarge';
import H3 from 'components/H3';

import {
  imageValidation,
  strLength3x20,
  strLength25x30000,
  required,
} from 'components/FormFields/validate';

import FormStyled from './FormStyled';
import AvatarStyled from './AvatarStyled';

import { PROFILE_EDIT_FORM, EDIT_PROFILE_BUTTON_ID } from './constants';

export const AVATAR_FIELD_WIDTH = 120;
export const AVATAR_FIELD_MARGIN = 30;

export const ProfileEditForm = ({
  handleSubmit,
  intl,
  saveProfile,
  isProfileSaving,
}) => (
  <FormStyled
    size={AVATAR_FIELD_WIDTH + AVATAR_FIELD_MARGIN}
    onSubmit={handleSubmit(saveProfile)}
  >
    <div className="position-static">
      <H3 className="pb-3">
        <FormattedMessage {...messages.editProfile} />
      </H3>

      <AvatarStyled>
        <Field
          name={AVATAR_FIELD}
          component={AvatarField}
          disabled={isProfileSaving}
          size={AVATAR_FIELD_WIDTH}
          validate={imageValidation}
          warn={imageValidation}
        />
      </AvatarStyled>

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
        validate={strLength25x30000}
        warn={strLength25x30000}
        splitInHalf
      />

      <Button
        id={EDIT_PROFILE_BUTTON_ID}
        className="my-3"
        disabled={isProfileSaving}
      >
        <FormattedMessage {...messages.saveButton} />
      </Button>
    </div>
  </FormStyled>
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
    ...props.profile.profile,
    [DISPLAY_NAME_FIELD]: props.profile.display_name,
    [AVATAR_FIELD]: props.profile.ipfs_avatar,
  },
}))(FormClone);

export default injectIntl(FormClone);
