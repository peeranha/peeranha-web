import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import {
  required,
  strLength3x20,
  validateTelosName,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import { SignUpOptions, P } from 'components/SignUpWrapper/SignUpOptions';
import Checkbox from 'components/Input/Checkbox';
import IAcceptTerms from 'components/IAcceptTerms';

import { selectEos } from 'containers/EosioProvider/selectors';

import SignUp from './index';

import {
  EOS_ACCOUNT_FIELD,
  DISPLAY_NAME_FIELD,
  I_ACCEPT_PRIVACY_POLICY_FIELD,
} from './constants';

import messages from './messages';

import { Form } from './EmailVerificationForm';
import loginMessages from '../Login/messages';
import { REFERRAL_CODE } from '../Login/constants';
import { getCookie } from '../../utils/cookie';
import { REFERRAL_CODE_URI } from '../App/constants';

const WalletsSignUpForm = ({
  handleSubmit,
  change,
  eosAccountValue,
  withScatter,
  withKeycat,
}) => (
  <SignUp withWallet>
    {({
      locale,
      signUpWithWallet,
      showWalletSignUpForm,
      eosAccountName,
      signUpWithWalletProcessing,
      logo,
    }) => {
      if (eosAccountName !== eosAccountValue) {
        change(EOS_ACCOUNT_FIELD, eosAccountName);
      }

      return (
        <SignUpOptions withWallet showWalletSignUpForm={showWalletSignUpForm} logo={logo}>
          <Form
            onSubmit={handleSubmit(val =>
              signUpWithWallet(val, {
                scatter: withScatter,
                keycat: withKeycat,
              }),
            )}
          >
            <Field
              name={EOS_ACCOUNT_FIELD}
              disabled
              readOnly
              label={translationMessages[locale][messages.eosName.id]}
              component={TextInputField}
              validate={[required]}
              warn={[required]}
            />

            <Field
              name={DISPLAY_NAME_FIELD}
              disabled={signUpWithWalletProcessing}
              label={translationMessages[locale][messages.displayName.id]}
              component={TextInputField}
              validate={[strLength3x20, required]}
              warn={[strLength3x20, required]}
            />

            <P className="text-center py-3">
              <FormattedMessage {...loginMessages.referralMessage} />
            </P>
            <Field
              name={REFERRAL_CODE}
              disabled={signUpWithWalletProcessing}
              label={
                <FormattedMessage
                  {...messages.referralCode}
                  values={{
                    optional: (
                      <text style={{ fontWeight: 'lighter' }}>
                        {
                          translationMessages[locale][
                            loginMessages.optionalReferralCode.id
                            ]
                        }
                      </text>
                    ),
                  }}
                />
              }
              component={TextInputField}
              validate={[validateTelosName]}
            />

            <Field
              name={I_ACCEPT_PRIVACY_POLICY_FIELD}
              disabled={signUpWithWalletProcessing}
              label={<IAcceptTerms />}
              component={Checkbox}
              validate={required}
              warn={required}
            />
            <Button
              disabled={signUpWithWalletProcessing}
              className="w-100 my-3"
            >
              <FormattedMessage {...messages.continue} />
            </Button>
          </Form>
        </SignUpOptions>
      );
    }}
  </SignUp>
);

WalletsSignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  eosAccountValue: PropTypes.string,
  change: PropTypes.func,
  withScatter: PropTypes.bool,
  withKeycat: PropTypes.bool,
};

const formName = 'WalletsSignUpForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = compose(
  connect(() => ({
    initialValues: {
      [REFERRAL_CODE]: getCookie(REFERRAL_CODE_URI),
    },
  })),
  reduxForm({ form: formName }),
)(WalletsSignUpForm);

FormClone = connect(state => {
  const form = state.toJS().form[formName] || { values: {} };
  const { withScatter, withKeycat } = selectEos(state);

  return {
    eosAccountValue: form.values ? form.values[EOS_ACCOUNT_FIELD] : null,
    withScatter,
    withKeycat,
  };
})(FormClone);

export default FormClone;
