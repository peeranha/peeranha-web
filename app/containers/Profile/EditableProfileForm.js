import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  AVATAR_FIELD,
  DISPLAY_NAME_FIELD,
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from './constants';

import renderTextInput from './renderTextInput';
import renderTextarea from './renderTextarea';
import renderFileInput from './renderFileInput';
import renderLocationField from './renderLocationField';

import { imageValidation, strLength20, strLength96 } from './validate';

/* eslint-disable-next-line */
let EditableProfileForm = props => {
  const { handleSubmit, submitting, invalid, sendProps } = props;

  return (
    <form onSubmit={handleSubmit(sendProps.saveProfile)}>
      <div>
        <Field
          name={AVATAR_FIELD}
          label="Avatar"
          component={renderFileInput}
          sendProps={sendProps}
          validate={imageValidation}
          warn={imageValidation}
        />
        <Field
          name={DISPLAY_NAME_FIELD}
          component={renderTextInput}
          label="Display name"
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          name={POSITION_FIELD}
          component={renderTextInput}
          label="Position"
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          name={COMPANY_FIELD}
          component={renderTextInput}
          label="Company"
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          name={ABOUT_FIELD}
          component={renderTextarea}
          label="About me"
          validate={strLength96}
          warn={strLength96}
        />
        <Field
          name={LOCATION_FIELD}
          sendProps={sendProps}
          component={renderLocationField}
          label="Location"
        />
      </div>
      <div>
        <button
          className="btn btn-success form-control"
          disabled={
            invalid ||
            submitting ||
            sendProps.loadingSaveProfile ||
            (!sendProps.profile.ipfs[LOCATION_FIELD].id &&
              sendProps.profile.ipfs[LOCATION_FIELD].name)
          }
          type="submit"
        >
          {sendProps.loadingSaveProfile ? 'Saving...' : 'Save'}
        </button>
        <button
          className="btn btn-secondary form-control"
          onClick={sendProps.cancelChanges}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

EditableProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  sendProps: PropTypes.object.isRequired,
};

EditableProfileForm = reduxForm({
  form: 'EditableProfileForm',
})(EditableProfileForm);

EditableProfileForm = connect(state => ({
  initialValues: state.get('profile').get('profile').ipfs,
}))(EditableProfileForm);

export default EditableProfileForm;
