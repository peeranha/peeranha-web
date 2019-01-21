import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
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
import LocationField from 'components/FormFields/LocationField';

import * as routes from 'routes-config';

import {
  imageValidation,
  strLength3x20,
  strLength25x30000,
} from 'components/FormFields/validate';

/* eslint-disable-next-line */
export let ProfileEditForm = /* istanbul ignore next */ props => {
  const { handleSubmit, submitting, invalid, sendProps } = props;
  const viewUrl = routes.profile_view(sendProps.match.params.id);

  // @locationIsWrong - true - if user entered location value manually (choosed not from cities list)
  const { profile } = sendProps.profile;
  const locationIsWrong =
    profile &&
    profile[LOCATION_FIELD] &&
    !profile[LOCATION_FIELD].id &&
    profile[LOCATION_FIELD].name;

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
          disabled={sendProps.isProfileSaving}
          name={LOCATION_FIELD}
          sendProps={sendProps}
          component={LocationField}
          label={sendProps.translations[messages.locationLabel.id]}
        />
      </div>
      <div>
        <button
          className="btn btn-success form-control"
          disabled={
            invalid ||
            submitting ||
            sendProps.isProfileSaving ||
            locationIsWrong
          }
          type="submit"
        >
          {sendProps.isProfileSaving && <LoadingIndicator />}
          {!sendProps.isProfileSaving && (
            <FormattedMessage {...messages.saveButton} />
          )}
        </button>
        <button
          disabled={sendProps.isProfileSaving}
          className="btn btn-secondary form-control"
          onClick={sendProps.cancelChanges}
          type="button"
        >
          <FormattedMessage {...messages.cancelButton} />
        </button>
        <Link to={viewUrl} href={viewUrl}>
          <button
            disabled={sendProps.isProfileSaving}
            className="btn btn-link form-control"
            type="button"
          >
            <FormattedMessage {...messages.viewButton} />
          </button>
        </Link>
      </div>
    </form>
  );
};

ProfileEditForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  sendProps: PropTypes.object,
};

ProfileEditForm = reduxForm({
  form: 'ProfileEditForm',
})(ProfileEditForm);

ProfileEditForm = connect((state, props) => ({
  initialValues: props.sendProps.profile.profile,
}))(ProfileEditForm);

export default ProfileEditForm;
