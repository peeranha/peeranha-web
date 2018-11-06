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

import renderTextarea from 'components/RenderFields/renderTextarea';
import renderTextInput from 'components/RenderFields/renderTextInput';
import renderFileInput from 'components/RenderFields/renderFileInput';
import renderLocationField from 'components/RenderFields/renderLocationField';

import {
  imageValidation,
  strLength20,
  strLength1000,
} from 'components/RenderFields/validate';

/* eslint-disable-next-line */
export let ProfileEditForm = props => {
  const { handleSubmit, submitting, invalid, sendProps } = props;
  const viewUrl = `/users/${sendProps.match.params.id}`;

  // @locationIsWrong - true - if user entered location value manually (choosed not from cities list)
  const { ipfs } = sendProps.profile;
  const locationIsWrong =
    ipfs &&
    ipfs[LOCATION_FIELD] &&
    !ipfs[LOCATION_FIELD].id &&
    ipfs[LOCATION_FIELD].name;

  return (
    <form onSubmit={handleSubmit(sendProps.saveProfile)}>
      <div>
        <Field
          disabled={sendProps.isProfileSaving}
          name={AVATAR_FIELD}
          label={sendProps.translations[messages.avatarLabel.id]}
          component={renderFileInput}
          sendProps={sendProps}
          validate={imageValidation}
          warn={imageValidation}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={DISPLAY_NAME_FIELD}
          component={renderTextInput}
          label={sendProps.translations[messages.displayNameLabel.id]}
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={POSITION_FIELD}
          component={renderTextInput}
          label={sendProps.translations[messages.positionLabel.id]}
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={COMPANY_FIELD}
          component={renderTextInput}
          label={sendProps.translations[messages.companyLabel.id]}
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={ABOUT_FIELD}
          component={renderTextarea}
          label={sendProps.translations[messages.aboutLabel.id]}
          validate={strLength1000}
          warn={strLength1000}
        />
        <Field
          disabled={sendProps.isProfileSaving}
          name={LOCATION_FIELD}
          sendProps={sendProps}
          component={renderLocationField}
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

ProfileEditForm = connect(state => ({
  initialValues: state.get('profile').get('profile').ipfs,
}))(ProfileEditForm);

export default ProfileEditForm;
