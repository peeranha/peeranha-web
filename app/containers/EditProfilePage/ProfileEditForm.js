import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from 'containers/Profile/messages';
import LoadingIndicator from 'components/LoadingIndicator';

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

import {
  imageValidation,
  strLength3x20,
  strLength25x30000,
} from 'components/FormFields/validate';

import { getCitiesList } from 'utils/profileManagement';

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
export let ProfileEditForm = /* istanbul ignore next */ props => {
  const {
    handleSubmit,
    submitting,
    invalid,
    change,
    sendProps,
    location,
  } = props;

  if (!location) {
    change(LOCATION_FIELD, {
      value: sendProps.profile.profile[LOCATION_FIELD],
      label: sendProps.profile.profile[LOCATION_FIELD],
    });
  }

  return (
    <form onSubmit={handleSubmit(sendProps.saveProfile)}>
      <div>
        <Field
          disabled={sendProps.isProfileSaving}
          name={AVATAR_FIELD}
          label={sendProps.translations[messages.avatarLabel.id]}
          component={AvatarField}
          sendProps={sendProps}
          validate={imageValidation}
          warn={imageValidation}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={DISPLAY_NAME_FIELD}
          component={TextInputField}
          label={sendProps.translations[messages.displayNameLabel.id]}
          validate={strLength3x20}
          warn={strLength3x20}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={POSITION_FIELD}
          component={TextInputField}
          label={sendProps.translations[messages.positionLabel.id]}
          validate={strLength3x20}
          warn={strLength3x20}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={COMPANY_FIELD}
          component={TextInputField}
          label={sendProps.translations[messages.companyLabel.id]}
          validate={strLength3x20}
          warn={strLength3x20}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={ABOUT_FIELD}
          component={TextareaField}
          label={sendProps.translations[messages.aboutLabel.id]}
          validate={strLength25x30000}
          warn={strLength25x30000}
        />
        <Field
          isAsync
          name={LOCATION_FIELD}
          loadOptions={loadCities}
          label={sendProps.translations[messages.locationLabel.id]}
          disabled={sendProps.isProfileSaving}
          component={SelectField}
        />
      </div>
      <div>
        <button
          className="btn btn-success form-control"
          disabled={invalid || submitting || sendProps.isProfileSaving}
          type="submit"
        >
          {sendProps.isProfileSaving && <LoadingIndicator />}
          {!sendProps.isProfileSaving && (
            <FormattedMessage {...messages.saveButton} />
          )}
        </button>
      </div>
    </form>
  );
};

ProfileEditForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  sendProps: PropTypes.object,
  location: PropTypes.object,
};

const selector = formValueSelector(PROFILE_EDIT_FORM);

ProfileEditForm = reduxForm({
  form: PROFILE_EDIT_FORM,
})(ProfileEditForm);

ProfileEditForm = connect((state, props) => ({
  initialValues: props.sendProps.profile.profile,
  location: selector(state, LOCATION_FIELD),
}))(ProfileEditForm);

export default ProfileEditForm;
