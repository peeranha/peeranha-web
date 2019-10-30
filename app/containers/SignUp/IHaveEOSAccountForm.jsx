import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { BG_PRIMARY_LIGHT, BG_TRANSPARENT } from 'style-constants';
import * as routes from 'routes-config';

import dangerIcon from 'images/dangerIcon.svg?inline';
import downloadIcon from 'images/download.svg?inline';

import {
  required,
  strLength3,
  strLength12Max,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import YouNeedEosAccount from 'components/SignUpWrapper/YouNeedEosAccount';
import Checkbox, { Icon, Label } from 'components/Input/Checkbox';
import A from 'components/A';

import SignUp from './index';
import messages from './messages';

import {
  EOS_ACCOUNT_FIELD,
  EOS_ACTIVE_PRIVATE_KEY_FIELD,
  EOS_OWNER_PRIVATE_KEY_FIELD,
  STORE_KEY_FIELD,
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
  PASSWORD_CONFIRM_FIELD,
  I_SAVE_MASTER_KEY_FIELD,
  I_ACCEPT_PRIVACY_POLICY_FIELD,
} from './constants';

export const Link = A.extend`
  position: relative;
`.withComponent('a');

export const Div = styled.div`
  padding: ${x => (x.primary ? '20px' : '0px')} 30px;
  margin-bottom: ${x => (x.primary ? '20px' : '0px')};
  border-radius: 3px;
  background: ${x => (x.primary ? BG_PRIMARY_LIGHT : BG_TRANSPARENT)};
  position: relative;

  @media only screen and (max-width: 992px) {
    ${x => (x.primary ? `background: ${BG_TRANSPARENT};` : '')};
  }

  @media only screen and (max-width: 400px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const EosOwnerPrivateKeyDiv = Div.extend`
  position: relative;

  > div:nth-child(2) {
    position: absolute;
    top: 0;
    right: 30px;
    z-index: 3;

    ${Icon} {
      min-width: 18px;
      min-height: 18px;
      margin-right: 6px;
    }

    ${Label} {
      font-size: 14px;
    }
  }
`;

const IHaveEOSAccountForm = ({
  handleSubmit,
  change,
  storeMyKeysValue,
  masterKeyValue,
}) => (
  <YouNeedEosAccount route={routes.signup.dontHaveEosAccount.name}>
    <SignUp>
      {({
        iHaveEosAccount,
        locale,
        iHaveEosAccountProcessing,
        keys: { linkToDownloadMasterKey, masterKey },
      }) => {
        const translate = translationMessages[locale];

        if (!masterKeyValue) {
          change(MASTER_KEY_FIELD, masterKey);
        }

        if (!storeMyKeysValue) {
          change(EOS_OWNER_PRIVATE_KEY_FIELD, '');
        }

        return (
          <form onSubmit={handleSubmit(iHaveEosAccount)}>
            <Div>
              <Field
                name={EOS_ACCOUNT_FIELD}
                disabled={iHaveEosAccountProcessing}
                label={translate[messages.eosName.id]}
                component={TextInputField}
                validate={[required, strLength12Max]}
                warn={[required, strLength12Max]}
              />
            </Div>

            <Div>
              <Field
                name={EOS_ACTIVE_PRIVATE_KEY_FIELD}
                disabled={iHaveEosAccountProcessing}
                label={translate[messages.eosActivePrivateKey.id]}
                component={TextInputField}
                validate={required}
                warn={required}
                autoComplete="off"
              />
            </Div>

            <EosOwnerPrivateKeyDiv>
              <Field
                name={EOS_OWNER_PRIVATE_KEY_FIELD}
                disabled={iHaveEosAccountProcessing || !storeMyKeysValue}
                label={translate[messages.eosOwnerPrivateKey.id]}
                component={TextInputField}
                validate={storeMyKeysValue ? required : null}
                warn={storeMyKeysValue ? required : null}
                autoComplete="off"
              />
              <Field
                name={STORE_KEY_FIELD}
                disabled={iHaveEosAccountProcessing}
                label={translate[messages.storeThisKey.id]}
                component={Checkbox}
              />
            </EosOwnerPrivateKeyDiv>

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
                  href={linkToDownloadMasterKey}
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
                disabled={iHaveEosAccountProcessing}
                label={translate[messages.password.id]}
                component={TextInputField}
                type="password"
                autoComplete="new-password"
              />
            </Div>
            <Div>
              <Field
                name={PASSWORD_CONFIRM_FIELD}
                disabled={iHaveEosAccountProcessing}
                label={translate[messages.confirmPassword.id]}
                component={TextInputField}
                type="password"
                autoComplete="new-password"
              />
            </Div>
            <Div className="mb-4">
              <Field
                name={I_SAVE_MASTER_KEY_FIELD}
                disabled={iHaveEosAccountProcessing}
                label={translate[messages.iSaveMasterKey.id]}
                component={Checkbox}
                validate={required}
                warn={required}
              />
            </Div>
            <Div className="mb-4">
              <Field
                name={I_ACCEPT_PRIVACY_POLICY_FIELD}
                disabled={iHaveEosAccountProcessing}
                label={
                  <Link href={routes.privacyPolicy()} target="_blank">
                    {translate[messages.iAcceptPrivacyPolicy.id]}
                  </Link>
                }
                component={Checkbox}
                validate={required}
                warn={required}
              />
            </Div>
            <Div>
              <SubmitButton
                disabled={iHaveEosAccountProcessing}
                className="w-100"
              >
                <FormattedMessage {...messages.verify} />
              </SubmitButton>
            </Div>
          </form>
        );
      }}
    </SignUp>
  </YouNeedEosAccount>
);

IHaveEOSAccountForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  iSaveMasterKeyValue: PropTypes.bool,
  iAcceptPolicyValue: PropTypes.bool,
  masterKeyPrevValue: PropTypes.string,
  masterKeyValue: PropTypes.string,
  storeMyKeysValue: PropTypes.bool,
};

const formName = 'IHaveEOSAccountForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
})(IHaveEOSAccountForm);

export const validatePassword = (state, fields) => {
  const passwordField = fields ? fields[0] : PASSWORD_FIELD;
  const confirmPasswordField = fields ? fields[1] : PASSWORD_CONFIRM_FIELD;

  const password = state.toJS()[passwordField];
  const passwordConf = state.toJS()[confirmPasswordField];

  const errors = {};

  const passwordError = required(password) || strLength3(password);

  const passwordConfirmError =
    required(passwordConf) || strLength3(passwordConf);

  if (passwordError) {
    errors[passwordField] = passwordError;
  }

  if (passwordConfirmError) {
    errors[confirmPasswordField] = passwordConfirmError;
  }

  if (password && passwordConf && password !== passwordConf) {
    errors[passwordField] = { id: messages.passwordsDoNotMatch.id };
    errors[confirmPasswordField] = { id: messages.passwordsDoNotMatch.id };
  }

  return errors;
};

FormClone = connect(state => {
  const form = state.toJS().form[formName] || { values: {} };

  return {
    storeMyKeysValue: form.values ? form.values[STORE_KEY_FIELD] : false,
    masterKeyValue: form.values ? form.values[MASTER_KEY_FIELD] : null,
    initialValues: {
      [STORE_KEY_FIELD]: true,
    },
    validate: props => validatePassword(props),
    warn: props => validatePassword(props),
  };
})(FormClone);

export default FormClone;
