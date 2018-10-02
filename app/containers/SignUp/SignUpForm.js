import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { strLength, required } from './validate';
import renderField from './renderField';
import messages from './messages';

import { EOS_ACC, DISPLAY_NAME } from './constants';

const SignUpForm = props => {
  const eosAccoutLabel = <FormattedMessage {...messages.eosAccount} />;
  const displayNameLabel = <FormattedMessage {...messages.displayName} />;
  const {
    handleSubmit,
    submitting,
    invalid,
    registerUser,
    loading,
    errorMessage,
    account,
  } = props;

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <div>
        <Field
          name={EOS_ACC}
          component={renderField}
          type="text"
          label={[eosAccoutLabel.props.defaultMessage, account.eosAccount]}
          readOnly
        />
        <Field
          name={DISPLAY_NAME}
          component={renderField}
          type="text"
          label={[displayNameLabel.props.defaultMessage]}
          readOnly={false}
          validate={[strLength, required]}
          warn={[strLength, required]}
        />
      </div>
      <div>
        <button
          className="btn btn-success form-control"
          disabled={invalid || submitting || loading}
          type="submit"
        >
          <FormattedMessage {...messages.signUp} />
        </button>
        <h6 className="text-danger">{errorMessage && errorMessage.message}</h6>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  account: PropTypes.object.isRequired,
  errorMessage: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'SignUpForm',
})(SignUpForm);
