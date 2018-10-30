import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';

import { strLength, required } from './validate';
import renderField from './renderField';
import messages from './messages';

import { EOS_ACC, DISPLAY_NAME } from './constants';

const SignUpForm = props => {
  const {
    handleSubmit,
    submitting,
    invalid,
    registerUser,
    loading,
    account,
    translations,
  } = props;

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <div>
        <Field
          name={EOS_ACC}
          component={renderField}
          disabled={loading}
          type="text"
          translations={translations}
          label={[translations[messages.eosAccount.id], account]}
          readOnly
        />
        <Field
          name={DISPLAY_NAME}
          component={renderField}
          disabled={loading}
          type="text"
          label={[translations[messages.displayName.id]]}
          readOnly={false}
          translations={translations}
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
          {loading && <LoadingIndicator />}
          {!loading && <FormattedMessage {...messages.signUp} />}
        </button>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  registerUser: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  loading: PropTypes.bool,
  account: PropTypes.string,
  errorMessage: PropTypes.object,
  translations: PropTypes.object,
};

export default reduxForm({
  form: 'SignUpForm',
})(SignUpForm);
