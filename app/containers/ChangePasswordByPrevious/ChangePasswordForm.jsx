import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import commonMessages from 'common-messages';

import { required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import H4 from 'components/H4';
import { validatePassword } from 'containers/SignUp/IHaveEOSAccountForm';

import signupMessages from 'containers/SignUp/messages';
import profileMessages from 'containers/Profile/messages';

import {
  OLD_PASSWORD_FIELD,
  NEW_PASSWORD_FIELD,
  CONFIRM_PASSWORD_FIELD,
} from './constants';

const ChangePasswordForm = ({
  handleSubmit,
  locale,
  changePassword,
  changePasswordProcessing,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.change} />{' '}
      <FormattedMessage {...signupMessages.password} />
    </H4>

    <form onSubmit={handleSubmit(changePassword)}>
      <Field
        name={OLD_PASSWORD_FIELD}
        disabled={changePasswordProcessing}
        label={translationMessages[locale][profileMessages.oldPassword.id]}
        component={TextInputField}
        validate={required}
        warn={required}
        type="password"
      />

      <Field
        name={NEW_PASSWORD_FIELD}
        disabled={changePasswordProcessing}
        label={translationMessages[locale][profileMessages.newPassword.id]}
        component={TextInputField}
        type="password"
      />

      <Field
        name={CONFIRM_PASSWORD_FIELD}
        disabled={changePasswordProcessing}
        label={translationMessages[locale][profileMessages.confirmPassword.id]}
        component={TextInputField}
        type="password"
      />

      <Button disabled={changePasswordProcessing} className="w-100">
        <FormattedMessage {...signupMessages.continue} />
      </Button>
    </form>
  </div>
);

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  changePassword: PropTypes.func,
  locale: PropTypes.string,
  changePasswordProcessing: PropTypes.bool,
};

const formName = 'ChangePasswordForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
})(ChangePasswordForm);

FormClone = connect(
  /* istanbul ignore next */ () => ({
    validate: state =>
      validatePassword(state, [NEW_PASSWORD_FIELD, CONFIRM_PASSWORD_FIELD]),
    warn: state =>
      validatePassword(state, [NEW_PASSWORD_FIELD, CONFIRM_PASSWORD_FIELD]),
  }),
)(FormClone);

export default FormClone;
