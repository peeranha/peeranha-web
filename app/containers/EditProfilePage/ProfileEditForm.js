import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';

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
import SelectField from 'components/FormFields/SelectField';

import Button from 'components/Button';
import H3 from 'components/H3';

import {
  imageValidation,
  strLength3x20,
  strLength25x30000,
} from 'components/FormFields/validate';

import { getCitiesList } from 'utils/profileManagement';

import FormStyled from './FormStyled';
import AvatarStyled from './AvatarStyled';
import { PROFILE_EDIT_FORM } from './constants';

const loadCities = async (v, callback) => {
  const cities = await getCitiesList(v);

  const formattedCities = cities.map(x => ({
    label: x.name,
    value: x.name,
  }));

  callback(formattedCities);
};

/* eslint-disable-next-line */
export let ProfileEditForm = /* istanbul ignore next */ ({
  handleSubmit,
  submitting,
  invalid,
  change,
  location,
  intl,
  uploadImage,
  getCroppedAvatar,
  clearImageChanges,
  saveProfile,
  isProfileSaving,
  cachedProfileImg,
  editingImgState,
  profile,
}) => {
  const size = 120;

  if (!location) {
    change(LOCATION_FIELD, {
      value: profile.profile[LOCATION_FIELD],
      label: profile.profile[LOCATION_FIELD],
    });
  }

  return (
    <FormStyled size={15 + size} onSubmit={handleSubmit(saveProfile)}>
      <div className="col-xl-12 position-static">
        <H3 marginBottom={24}>
          <FormattedMessage {...messages.editProfile} />
        </H3>
        <AvatarStyled>
          <Field
            name={AVATAR_FIELD}
            component={AvatarField}
            disabled={isProfileSaving}
            editingImgState={editingImgState}
            size={size}
            uploadImage={uploadImage}
            cachedProfileImg={cachedProfileImg}
            ipfsAvatar={profile.ipfs_avatar}
            getCroppedAvatar={getCroppedAvatar}
            clearImageChanges={clearImageChanges}
            validate={imageValidation}
            warn={imageValidation}
          />
        </AvatarStyled>
        <Field
          name={DISPLAY_NAME_FIELD}
          component={TextInputField}
          label={intl.formatMessage({ id: messages.displayNameLabel.id })}
          disabled={isProfileSaving}
          validate={strLength3x20}
          warn={strLength3x20}
        />
        <Field
          name={COMPANY_FIELD}
          component={TextInputField}
          label={intl.formatMessage({ id: messages.companyLabel.id })}
          disabled={isProfileSaving}
          validate={strLength3x20}
          warn={strLength3x20}
        />
        <Field
          name={POSITION_FIELD}
          component={TextInputField}
          label={intl.formatMessage({ id: messages.positionLabel.id })}
          disabled={isProfileSaving}
          validate={strLength3x20}
          warn={strLength3x20}
        />
        <Field
          name={LOCATION_FIELD}
          isAsync
          loadOptions={loadCities}
          label={intl.formatMessage({ id: messages.locationLabel.id })}
          disabled={isProfileSaving}
          component={SelectField}
        />
        <Field
          name={ABOUT_FIELD}
          component={TextareaField}
          label={intl.formatMessage({ id: messages.aboutLabel.id })}
          disabled={isProfileSaving}
          validate={strLength25x30000}
          warn={strLength25x30000}
        />

        <Button
          className="my-3"
          disabled={invalid || submitting || isProfileSaving}
          typeAttr="submit"
          type="red"
        >
          <FormattedMessage {...messages.saveButton} />
        </Button>
      </div>
    </FormStyled>
  );
};

ProfileEditForm.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  location: PropTypes.object,
  uploadImage: PropTypes.func,
  getCroppedAvatar: PropTypes.func,
  clearImageChanges: PropTypes.func,
  saveProfile: PropTypes.func,
  isProfileSaving: PropTypes.bool,
  cachedProfileImg: PropTypes.string,
  editingImgState: PropTypes.bool,
  profile: PropTypes.object,
};

const selector = formValueSelector(PROFILE_EDIT_FORM);

ProfileEditForm = reduxForm({
  form: PROFILE_EDIT_FORM,
})(ProfileEditForm);

ProfileEditForm = connect((state, props) => ({
  initialValues: props.profile.profile,
  location: selector(state, LOCATION_FIELD),
}))(ProfileEditForm);

export default injectIntl(React.memo(ProfileEditForm));
