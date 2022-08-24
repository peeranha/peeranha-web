import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  AVATAR_FIELD,
  COMPANY_FIELD,
  DISPLAY_NAME_FIELD,
  LOCATION_FIELD,
  POSITION_FIELD,
} from 'containers/Profile/constants';

import TextInputField from 'components/FormFields/TextInputField';
import AvatarField from 'components/FormFields/AvatarField';

import Button from 'components/Button/Contained/InfoLarge';
import Box from 'components/Base/AvatarBase';
import H3 from 'components/H3';
import FormBox from 'components/Form';

import {
  imageValidation,
  required,
  strLength3x20,
} from 'components/FormFields/validate';

import AboutForm from './AboutForm';

import { EDIT_PROFILE_BUTTON_ID, PROFILE_EDIT_FORM } from './constants';
import { getUserName } from '../../utils/user';

export const ProfileEditForm = ({
  formValues,
  handleSubmit,
  saveProfile,
  isProfileSaving,
}) => {
  const { t } = useTranslation();

  return (
    <Box position="bottom">
      <Field
        name={AVATAR_FIELD}
        component={AvatarField}
        disabled={isProfileSaving}
        validate={imageValidation}
        warn={imageValidation}
      />

      <FormBox onSubmit={handleSubmit(saveProfile)}>
        <H3>{t('profile.editProfile')}</H3>

        <Field
          name={DISPLAY_NAME_FIELD}
          component={TextInputField}
          label={t('profile.displayNameLabel')}
          tip={t('profile.displayNameTip')}
          disabled={isProfileSaving}
          validate={[required, strLength3x20]}
          warn={[required, strLength3x20]}
          splitInHalf
        />

        <Field
          name={COMPANY_FIELD}
          component={TextInputField}
          label={t('profile.companyLabel')}
          tip={t('profile.companyTip')}
          disabled={isProfileSaving}
          validate={strLength3x20}
          warn={strLength3x20}
          splitInHalf
        />

        <Field
          name={POSITION_FIELD}
          component={TextInputField}
          label={t('profile.positionLabel')}
          tip={t('profile.positionTip')}
          disabled={isProfileSaving}
          validate={strLength3x20}
          warn={strLength3x20}
          splitInHalf
        />

        <Field
          name={LOCATION_FIELD}
          label={t('profile.locationLabel')}
          tip={t('profile.locationTip')}
          disabled={isProfileSaving}
          component={TextInputField}
          validate={strLength3x20}
          warn={strLength3x20}
          splitInHalf
        />

        <AboutForm formValues={formValues} isProfileSaving={isProfileSaving} />

        <Button
          id={EDIT_PROFILE_BUTTON_ID}
          disabled={isProfileSaving}
          type="submit"
        >
          {t('profile.saveButton')}
        </Button>
      </FormBox>
    </Box>
  );
};

ProfileEditForm.propTypes = {
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  location: PropTypes.object,
  saveProfile: PropTypes.func,
  isProfileSaving: PropTypes.bool,
  profile: PropTypes.object,
};

// eslint-disable-next-line
let FormClone = reduxForm({
  form: PROFILE_EDIT_FORM,
})(ProfileEditForm);

FormClone = connect((state, props) => ({
  enableReinitialize: true,
  formValues: state.toJS().form[PROFILE_EDIT_FORM]?.values ?? {},
  initialValues: {
    ...(props?.profile?.profile || {}),
    [DISPLAY_NAME_FIELD]: getUserName(
      props?.profile?.displayName,
      props?.profile?.id,
    ),
    [AVATAR_FIELD]: props?.profile?.avatar,
  },
}))(FormClone);

export default FormClone;
