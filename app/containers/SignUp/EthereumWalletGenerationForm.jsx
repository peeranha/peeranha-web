import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {
  BG_PRIMARY_LIGHT,
  BG_TRANSPARENT,
  BORDER_RADIUS_M,
} from 'style-constants';
import * as routes from 'routes-config';

import dangerIcon from 'images/dangerIcon.svg?inline';

import { scrollToErrorField } from 'utils/animation';

import {
  required,
  strLength8x100,
  comparePasswords,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import YouNeedBlockchainAccount from 'components/SignUpWrapper/SignUpViaEmailWrapper';
import Checkbox from 'components/Input/Checkbox';
import IAcceptTerms from 'components/IAcceptTerms';
import Img from 'components/Img';

import SignUp from './index';

import {
  EOS_ACCOUNT_FIELD,
  EOS_ACTIVE_PRIVATE_KEY_FIELD,
  EOS_OWNER_PRIVATE_KEY_FIELD,
  STORE_KEY_FIELD,
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
  PASSWORD_CONFIRM_FIELD,
  I_SAVE_MNEMONIC_PHRASE_KEY_FIELD,
  I_ACCEPT_PRIVACY_POLICY_FIELD,
} from './constants';
import { signUpViaEmailComplete } from './actions';

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

const EthereumWalletGenerationForm = ({
  handleSubmit,
  change,
  storeMyKeysValue,
  masterKeyValue,
}) => {
  const { t } = useTranslation();

  return (
    <YouNeedBlockchainAccount route={routes.signup.accountSetup.name}>
      <SignUp>
        {({ iHaveEosAccountProcessing, keys: { masterKey } }) => {
          if (!masterKeyValue) {
            change(MASTER_KEY_FIELD, masterKey);
          }

          if (!storeMyKeysValue) {
            change(EOS_OWNER_PRIVATE_KEY_FIELD, '');
          }

          return (
            <form onSubmit={handleSubmit(signUpViaEmailComplete)}>
              <Div>
                <Field
                  name={EOS_ACCOUNT_FIELD}
                  disabled={iHaveEosAccountProcessing}
                  label={t('signUp.eosName')}
                  component={TextInputField}
                  validate={[required, validateTelosName]}
                  warn={[required, validateTelosName]}
                />
              </Div>

              <Div>
                <Field
                  name={EOS_ACTIVE_PRIVATE_KEY_FIELD}
                  disabled={iHaveEosAccountProcessing}
                  label={t('signUp.eosActivePrivateKey')}
                  component={TextInputField}
                  validate={required}
                  warn={required}
                  autoComplete="off"
                />
              </Div>

              <Div primary>
                <Field
                  name={MASTER_KEY_FIELD}
                  label={t('signUp.masterKey')}
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
                  {t('signUp.youHaveToSaveKeys')}
                </div>
              </Div>
              <Div>
                <Field
                  name={PASSWORD_FIELD}
                  disabled={iHaveEosAccountProcessing}
                  label={t('signUp.password')}
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
                  label={t('signUp.confirmPassword')}
                  component={TextInputField}
                  type="password"
                  validate={[required, strLength8x100, comparePasswords]}
                  warn={[required, strLength8x100, comparePasswords]}
                />
              </Div>
              <Div className="mb-4">
                <Field
                  name={I_SAVE_MNEMONIC_PHRASE_KEY_FIELD}
                  disabled={iHaveEosAccountProcessing}
                  label={t('signUp.iSaveMasterKey')}
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
                  {t('signUp.signUp')}
                </SubmitButton>
              </Div>
            </form>
          );
        }}
      </SignUp>
    </YouNeedBlockchainAccount>
  );
};

EthereumWalletGenerationForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  iAcceptPolicyValue: PropTypes.bool,
  masterKeyPrevValue: PropTypes.string,
  masterKeyValue: PropTypes.string,
  storeMyKeysValue: PropTypes.bool,
};

const formName = 'EthereumWalletGenerationForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(EthereumWalletGenerationForm);

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
