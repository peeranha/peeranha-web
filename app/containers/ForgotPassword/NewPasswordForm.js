import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import infoIcon from 'images/icon-information.svg?inline';

import { showPopover } from 'utils/popover';

import { strLength3x20, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import H4 from 'components/H4';
import { validatePassword } from 'containers/SignUp/IHaveEOSAccountForm';

import signupMessages from 'containers/SignUp/messages';
import loginMessages from 'containers/Login/messages';

import {
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
  NEW_PASSWORD_FIELD,
} from './constants';

import messages from './messages';

const NewPasswordForm = /* istanbul ignore next */ ({
  handleSubmit,
  locale,
  changePassword,
  changePasswordLoading,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...loginMessages.iForgotPassword} />
    </H4>

    <form onSubmit={handleSubmit(changePassword)}>
      <Field
        name={MASTER_KEY_FIELD}
        disabled={changePasswordLoading}
        label={
          <button
            id={MASTER_KEY_FIELD}
            className="d-flex align-items-end"
            type="button"
            onClick={() =>
              showPopover(
                MASTER_KEY_FIELD,
                translationMessages[locale][messages.youGotThisKey.id],
              )
            }
          >
            <span className="mr-1">
              <FormattedMessage {...signupMessages.masterKey} />
            </span>
            <img src={infoIcon} alt="aboud master key saving" />
          </button>
        }
        component={TextInputField}
        validate={[required]}
        warn={[required]}
      />

      <Field
        name={PASSWORD_FIELD}
        disabled={changePasswordLoading}
        label={translationMessages[locale][signupMessages.password.id]}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
        type="password"
      />

      <Field
        name={NEW_PASSWORD_FIELD}
        disabled={changePasswordLoading}
        label={translationMessages[locale][signupMessages.confirmPassword.id]}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
        type="password"
      />

      <Button disabled={changePasswordLoading} className="w-100">
        <FormattedMessage {...signupMessages.continue} />
      </Button>
    </form>
  </div>
);

NewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  changePassword: PropTypes.func,
  locale: PropTypes.string,
  changePasswordLoading: PropTypes.bool,
};

const formName = 'NewPasswordForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
})(NewPasswordForm);

FormClone = connect(
  /* istanbul ignore next */ () => ({
    validate: state => validatePassword(state),
    warn: state => validatePassword(state),
  }),
)(FormClone);

export default FormClone;
