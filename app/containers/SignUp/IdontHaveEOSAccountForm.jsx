import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';

import { scrollToErrorField } from 'utils/animation';

import dangerIcon from 'images/dangerIcon.svg?inline';
import downloadIcon from 'images/download.svg?inline';

import {
  required,
  comparePasswords,
  strLength8x100,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import YouNeedEosAccount from 'components/SignUpWrapper/YouNeedEosAccount';
import Checkbox from 'components/Input/Checkbox';

import SignUp from './index';
import messages from './messages';

import {
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
  PASSWORD_CONFIRM_FIELD,
  I_SAVE_MASTER_KEY_FIELD,
} from './constants';

import { Link, Div } from './IHaveEOSAccountForm';

const IdontHaveEOSAccountForm = ({ handleSubmit, change, masterKeyValue }) => (
  <YouNeedEosAccount route={routes.signup.haveEosAccount.name}>
    <SignUp>
      {({
        idontHaveEosAccount,
        locale,
        idontHaveEosAccountProcessing,
        keys: { linkToDownloadAllKeys, masterKey },
      }) => {
        const translate = translationMessages[locale];

        if (!masterKeyValue) {
          change(MASTER_KEY_FIELD, masterKey);
        }

        return (
          <form onSubmit={handleSubmit(idontHaveEosAccount)}>
            <Div primary>
              <Field
                name={MASTER_KEY_FIELD}
                label={translate[messages.masterKey.id]}
                component={TextInputField}
                validate={[required]}
                warn={[required]}
                readOnly
                disabled
                autoComplete="off"
              />

              <div className="d-flex align-items-center mb-3">
                <img
                  width="20px"
                  className="mr-2"
                  src={dangerIcon}
                  alt="dangerIcon"
                />
                <FormattedMessage {...messages.youHaveToSaveKeys} />
              </div>

              <div className="mb-3">
                <Link
                  href={linkToDownloadAllKeys}
                  download="info.txt"
                  className="d-flex align-items-center"
                >
                  <img
                    width="20px"
                    className="mr-2"
                    src={downloadIcon}
                    alt="downloadIcon"
                  />
                  <FormattedMessage {...messages.downloadKeys} />
                </Link>
              </div>
            </Div>
            <Div>
              <Field
                name={PASSWORD_FIELD}
                disabled={idontHaveEosAccountProcessing}
                label={translate[messages.password.id]}
                component={TextInputField}
                type="password"
                autoComplete="new-password"
                validate={[required, strLength8x100, comparePasswords]}
                warn={[required, strLength8x100, comparePasswords]}
              />
            </Div>
            <Div>
              <Field
                name={PASSWORD_CONFIRM_FIELD}
                disabled={idontHaveEosAccountProcessing}
                label={translate[messages.confirmPassword.id]}
                component={TextInputField}
                type="password"
                autoComplete="new-password"
                validate={[required, strLength8x100, comparePasswords]}
                warn={[required, strLength8x100, comparePasswords]}
              />
            </Div>
            <Div className="mb-4">
              <Field
                name={I_SAVE_MASTER_KEY_FIELD}
                disabled={idontHaveEosAccountProcessing}
                label={translate[messages.iSaveMasterKey.id]}
                component={Checkbox}
                validate={required}
                warn={required}
              />
            </Div>
            <Div>
              <SubmitButton
                disabled={idontHaveEosAccountProcessing}
                className="w-100"
              >
                <FormattedMessage {...messages.signUp} />
              </SubmitButton>
            </Div>
          </form>
        );
      }}
    </SignUp>
  </YouNeedEosAccount>
);

IdontHaveEOSAccountForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  iSaveMasterKeyValue: PropTypes.bool,
  iAcceptPolicyValue: PropTypes.bool,
  eosActivePrevValue: PropTypes.string,
  masterKeyValue: PropTypes.string,
};

const formName = 'IdontHaveEOSAccountForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(IdontHaveEOSAccountForm);

FormClone = connect(state => {
  const form = state.toJS().form[formName] || { values: {} };

  return {
    masterKeyValue: form.values ? form.values[MASTER_KEY_FIELD] : null,
    passwordList: form.values
      ? [form.values[PASSWORD_FIELD], form.values[PASSWORD_CONFIRM_FIELD]]
      : [],
  };
})(FormClone);

export default FormClone;
