import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import messages from 'containers/Profile/messages';

import {
  AVATAR_FIELD,
  DISPLAY_NAME_FIELD,
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import renderTextInput from './renderTextInput';
import renderTextarea from './renderTextarea';
import renderFileInput from './renderFileInput';
import renderLocationField from './renderLocationField';

import { imageValidation, strLength20, strLength96 } from './validate';

/* eslint-disable-next-line */
let ProfileEditForm = props => {
  const { handleSubmit, submitting, invalid, sendProps } = props;
  const { ipfs } = sendProps.profile;
  const viewUrl = `/users/${sendProps.match.params.id}`;

  return (
    <form onSubmit={handleSubmit(sendProps.saveProfile)}>
      <div>
        <Field
          name={AVATAR_FIELD}
          label={sendProps.translations[messages.avatarLabel.id]}
          component={renderFileInput}
          sendProps={sendProps}
          validate={imageValidation}
          warn={imageValidation}
        />
        <Field
          name={DISPLAY_NAME_FIELD}
          sendProps={sendProps}
          component={renderTextInput}
          label={sendProps.translations[messages.displayNameLabel.id]}
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          name={POSITION_FIELD}
          sendProps={sendProps}
          component={renderTextInput}
          label={sendProps.translations[messages.positionLabel.id]}
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          name={COMPANY_FIELD}
          sendProps={sendProps}
          component={renderTextInput}
          label={sendProps.translations[messages.companyLabel.id]}
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          name={ABOUT_FIELD}
          component={renderTextarea}
          sendProps={sendProps}
          label={sendProps.translations[messages.aboutLabel.id]}
          validate={strLength96}
          warn={strLength96}
        />
        <Field
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
            (ipfs &&
              ipfs[LOCATION_FIELD] &&
              !ipfs[LOCATION_FIELD].id &&
              ipfs[LOCATION_FIELD].name)
          }
          type="submit"
        >
          {sendProps.isProfileSaving ? (
            <FormattedMessage {...messages.savingButton} />
          ) : (
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
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  sendProps: PropTypes.object.isRequired,
};

ProfileEditForm = reduxForm({
  form: 'ProfileEditForm',
})(ProfileEditForm);

ProfileEditForm = connect(state => ({
  initialValues: state.get('profile').get('profile').ipfs,
}))(ProfileEditForm);

export default ProfileEditForm;
