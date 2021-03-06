import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { BG_PRIMARY_LIGHT, BG_TRANSPARENT, BORDER_RADIUS_M } from 'style-constants';
import * as routes from 'routes-config';

import dangerIcon from 'images/dangerIcon.svg?inline';

import { scrollToErrorField } from 'utils/animation';

import {
  required,
  strLength8x100,
  comparePasswords,
  validateTelosName,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import YouNeedEosAccount from 'components/SignUpWrapper/YouNeedEosAccount';
import Checkbox, { Icon, Label } from 'components/Input/Checkbox';
import IAcceptTerms from 'components/IAcceptTerms';
import Img from 'components/Img';

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

export const Div = styled.div`
  padding: ${x => (x.primary ? '20px' : '0px')} 30px;
  margin-bottom: ${x => (x.primary ? '20px' : '0px')};
  border-radius: ${BORDER_RADIUS_M};
  background: ${x => (x.primary ? BG_PRIMARY_LIGHT : BG_TRANSPARENT)};
  position: relative;

  #i-save-master-key,
  #i-accept-privacy-policy {
    height: 22px;
    width: 22px;
  }

  @media only screen and (max-width: 992px) {
    ${x => (x.primary ? `background: ${BG_TRANSPARENT};` : '')};
  }

  @media only screen and (max-width: 400px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

// eslint-disable-next-line no-unused-vars
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
        keys: { masterKey },
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
                validate={[required, validateTelosName]}
                warn={[required, validateTelosName]}
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
                <Img
                  notRounded
                  size={0.85}
                  className="mr-2"
                  src={dangerIcon}
                  alt="dangerIcon"
                />
                <FormattedMessage {...messages.youHaveToSaveKeys} />
              </div>
            </Div>
            <Div>
              <Field
                name={PASSWORD_FIELD}
                disabled={iHaveEosAccountProcessing}
                label={translate[messages.password.id]}
                component={TextInputField}
                type="password"
                validate={[required, strLength8x100, comparePasswords]}
                warn={[required, strLength8x100, comparePasswords]}
              />
            </Div>
            <Div>
              <Field
                name={PASSWORD_CONFIRM_FIELD}
                disabled={iHaveEosAccountProcessing}
                label={translate[messages.confirmPassword.id]}
                component={TextInputField}
                type="password"
                validate={[required, strLength8x100, comparePasswords]}
                warn={[required, strLength8x100, comparePasswords]}
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
                label={<IAcceptTerms />}
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
                <FormattedMessage {...messages.signUp} />
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
  onSubmitFail: errors => scrollToErrorField(errors),
})(IHaveEOSAccountForm);

FormClone = connect(state => {
  const form = state.toJS().form[formName] || { values: {} };

  return {
    storeMyKeysValue: form.values ? form.values[STORE_KEY_FIELD] : false,
    masterKeyValue: form.values ? form.values[MASTER_KEY_FIELD] : null,
    passwordList: form.values
      ? [form.values[PASSWORD_FIELD], form.values[PASSWORD_CONFIRM_FIELD]]
      : [],
    initialValues: {
      [STORE_KEY_FIELD]: true,
    },
  };
})(FormClone);

export default FormClone;
