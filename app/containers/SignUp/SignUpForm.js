import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';

import { strLength3x20, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';

import messages from './messages';

import { EOS_ACC, DISPLAY_NAME } from './constants';

const SignUpForm = /* istanbul ignore next */ props => {
  const {
    handleSubmit,
    submitting,
    invalid,
    registerUser,
    loading,
    translations,
  } = props;

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <div>
        <Field
          name={EOS_ACC}
          component={TextInputField}
          disabled={loading}
          label={translations[messages.eosAccount.id]}
          readOnly
        />
        <Field
          name={DISPLAY_NAME}
          component={TextInputField}
          disabled={loading}
          label={translations[messages.displayName.id]}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
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
  translations: PropTypes.object,
};

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: 'SignUpForm',
})(SignUpForm);

FormClone = connect(state => ({
  initialValues: {
    [EOS_ACC]: state.get('account').get('account'),
  },
}))(FormClone);

export default FormClone;
