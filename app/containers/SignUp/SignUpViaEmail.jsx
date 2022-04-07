import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';

import { scrollToErrorField } from 'utils/animation';

import dangerIcon from 'images/dangerIcon.svg?inline';

import {
  required,
  comparePasswords,
  strLength8x100,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import SignUpViaEmailWrapper from 'components/SignUpWrapper/SignUpViaEmailWrapper';
import Checkbox from 'components/Input/Checkbox';
import IAcceptTerms from 'components/IAcceptTerms';
import Img from 'components/Img';
import * as clipboard from 'clipboard-polyfill';

import { bindActionCreators } from 'redux';
import DownloadIcon from 'images/download.svg?inline';

import { PEER_PRIMARY_COLOR } from 'style-constants';
import SignUp from './index';
import messages from './messages';

import {
  PASSWORD_FIELD,
  PASSWORD_CONFIRM_FIELD,
  I_SAVE_MNEMONIC_PHRASE_KEY_FIELD,
  I_ACCEPT_PRIVACY_POLICY_FIELD,
  MNEMONIC_PHRASE,
  ETHEREUM_WALLET_ADDRESS,
  ETHEREUM_WALLET_VIA_EMAIL_FIELD,
} from './constants';

import { Div } from './EthereumWalletGenerationForm';
import { MnemonicPhrase } from './MnemonicPhrase';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { putKeysToState, signUpViaEmailComplete } from './actions';

const StyledDownloadContainer = styled.div`
  color: ${PEER_PRIMARY_COLOR};
  pointer-events: all;
  cursor: pointer;
  width: fit-content;

  &:active {
    opacity: 0.8;
  }
`;

async function generateKey() {
  const arrayBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(arrayBuffer);

  return arrayBuffer[0];
}

const SignUpViaEmail = ({
  change,
  mnemonicPhrase,
  handleSubmit,
  putKeysToStateDispatch,
  handleSignUpViaEmailComplete,
  keys,
}) => {
  const [ethereumWallet, setEthereumWallet] = useState(null);

  const mnemonicPhraseValue = keys[MNEMONIC_PHRASE];
  const ethereumAddress = keys[ETHEREUM_WALLET_ADDRESS];

  const writeToBuffer = () => {
    clipboard.writeText(mnemonicPhrase);
    return false;
  };

  const downloadEthereumWallet = () => {
    const blob = new Blob([ethereumWallet.mnemonic.phrase], {
      type: 'plain/text',
    });
    const linkToDownload = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = linkToDownload;
    a.download = 'secret-phrase.txt';
    a.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(linkToDownload);
      a.remove();
    });
  };

  const getMasterKey = async () => {
    const extraEntropy = await generateKey();
    const wallet = ethers.Wallet.createRandom({
      extraEntropy,
    });

    setEthereumWallet(wallet);
    putKeysToStateDispatch({
      [MNEMONIC_PHRASE]: wallet.mnemonic.phrase,
      [ETHEREUM_WALLET_ADDRESS]: wallet.address,
    });
  };

  useEffect(() => {
    getMasterKey();
  }, []);

  useEffect(
    () => {
      if (mnemonicPhraseValue) {
        change(MNEMONIC_PHRASE, mnemonicPhraseValue);
      }

      if (ethereumAddress) {
        change(ETHEREUM_WALLET_ADDRESS, ethereumAddress);
      }
    },
    [mnemonicPhraseValue, ethereumAddress],
  );

  return (
    <SignUpViaEmailWrapper>
      <SignUp>
        {({ locale, signUpViaEmailProcessing }) => {
          const translate = translationMessages[locale];

          return (
            <form onSubmit={handleSubmit(handleSignUpViaEmailComplete)}>
              <Div primary>
                <Field
                  name={MNEMONIC_PHRASE}
                  label={translate[messages.secretPhrase.id]}
                  component={MnemonicPhrase}
                  validate={[required]}
                  warn={[required]}
                  readOnly
                  disabled
                  autoComplete="off"
                  writeToBuffer={writeToBuffer}
                  getMasterKey={getMasterKey}
                />
                <div className="d-flex align-items-center mb-3">
                  <Img
                    notRounded
                    size={0.8}
                    className="mr-2"
                    src={dangerIcon}
                    alt="dangerIcon"
                  />
                  <FormattedMessage {...messages.youHaveToSaveKeys} />
                </div>

                <StyledDownloadContainer
                  className="d-flex"
                  onClick={downloadEthereumWallet}
                >
                  <Img
                    notRounded
                    size={0.8}
                    className="mr-2"
                    src={DownloadIcon}
                    alt="downloadIcon"
                  />
                  <FormattedMessage {...messages.downloadSecretPhrase} />
                </StyledDownloadContainer>
              </Div>
              <Div>
                <Field
                  name={PASSWORD_FIELD}
                  disabled={signUpViaEmailProcessing}
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
                  disabled={signUpViaEmailProcessing}
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
                  name={I_SAVE_MNEMONIC_PHRASE_KEY_FIELD}
                  disabled={signUpViaEmailProcessing}
                  label={translate[messages.iSaveSecretPhrase.id]}
                  component={Checkbox}
                  validate={required}
                  warn={required}
                />
              </Div>
              <Div className="mb-4">
                <Field
                  name={I_ACCEPT_PRIVACY_POLICY_FIELD}
                  disabled={signUpViaEmailProcessing}
                  label={<IAcceptTerms />}
                  component={Checkbox}
                  validate={required}
                  warn={required}
                />
              </Div>
              <Div>
                <SubmitButton
                  disabled={signUpViaEmailProcessing}
                  className="w-100"
                >
                  <FormattedMessage id={messages.signUp.id} />
                </SubmitButton>
              </Div>
            </form>
          );
        }}
      </SignUp>
    </SignUpViaEmailWrapper>
  );
};

SignUpViaEmail.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  iAcceptPolicyValue: PropTypes.bool,
  mnemonicPhrase: PropTypes.string,
  locale: PropTypes.string,
  putKeysToStateDispatch: PropTypes.func,
  handleSignUpViaEmailComplete: PropTypes.func,
  keys: PropTypes.object,
};

const formName = 'signUpViaEmail';

/* eslint import/no-mutable-exports: 0 */
let SignUpViaEmailForm = reduxForm({
  form: formName,
  touchOnChange: true,
  asyncBlurFields: [ETHEREUM_WALLET_VIA_EMAIL_FIELD],
  onSubmitFail: errors => scrollToErrorField(errors),
  shouldAsyncValidate: ({ syncValidationPasses }) => syncValidationPasses,
})(SignUpViaEmail);

SignUpViaEmailForm = connect(
  state => {
    const form = state.toJS().form[formName] || { values: {} };
    const keys = state.get('signUp').get('keys') || {};

    return {
      locale: makeSelectLocale()(state),
      keys,
      mnemonicPhrase: form.values ? form.values[MNEMONIC_PHRASE] : null,
      password: form.values ? form.values[PASSWORD_FIELD] : null,
      passwordList: form.values
        ? [form.values[PASSWORD_FIELD], form.values[PASSWORD_CONFIRM_FIELD]]
        : [],
    };
  },
  dispatch => ({
    putKeysToStateDispatch: bindActionCreators(putKeysToState, dispatch),
    handleSignUpViaEmailComplete: bindActionCreators(
      signUpViaEmailComplete,
      dispatch,
    ),
  }),
)(SignUpViaEmailForm);

export default SignUpViaEmailForm;
