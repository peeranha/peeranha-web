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

import SignUp from './index';

import {
  KEYCAT_ACCOUNT_FIELD,
  DISPLAY_NAME_FIELD,
  I_ACCEPT_PRIVACY_POLICY_FIELD,
} from './constants';

import messages from './messages';

import { Form } from './EmailVerificationForm';
import loginMessages from '../Login/messages';
import { REFERRAL_CODE } from '../Login/constants';
import { getCookie } from '../../utils/cookie';
import { REFERRAL_CODE_URI } from '../App/constants';

const KeycatSignUpForm = ({ handleSubmit, keycatAccountValue, change }) => (
  <SignUp withScatter>
    {({
      signUpWithKeycat,
      locale,
      signUpWithKeycatProcessing,
      showKeycatSignUpForm,
      keycatAccountName,
    }) => {
      if (keycatAccountName !== keycatAccountValue) {
        change(KEYCAT_ACCOUNT_FIELD, keycatAccountName);
      }

      return (
        <SignUpOptions withScatter showKeycatSignUpForm={showKeycatSignUpForm}>
          <Form onSubmit={handleSubmit(signUpWithKeycat)}>
            <Field
              name={KEYCAT_ACCOUNT_FIELD}
              disabled
              readOnly
              label={translationMessages[locale][messages.eosName.id]}
              component={TextInputField}
              validate={[required]}
              warn={[required]}
            />

            <Field
              name={DISPLAY_NAME_FIELD}
              disabled={signUpWithKeycatProcessing}
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
              disabled={signUpWithKeycatProcessing}
              label={translationMessages[locale][messages.referralCode.id]}
              component={TextInputField}
              validate={[validateTelosName]}
            />

            <Field
              name={I_ACCEPT_PRIVACY_POLICY_FIELD}
              disabled={signUpWithKeycatProcessing}
              label={<IAcceptTerms />}
              component={Checkbox}
              validate={required}
              warn={required}
            />
            <Button
              disabled={signUpWithKeycatProcessing}
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

KeycatSignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  keycatAccountValue: PropTypes.string,
  change: PropTypes.func,
};

const formName = 'KeycatSignUpForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = compose(
  connect(() => ({
    initialValues: {
      [REFERRAL_CODE]: getCookie(REFERRAL_CODE_URI),
    },
  })),
  reduxForm({ form: formName }),
)(KeycatSignUpForm);

FormClone = connect(state => {
  const form = state.toJS().form[formName] || { values: {} };

  return {
    keycatAccountValue: form.values ? form.values[KEYCAT_ACCOUNT_FIELD] : null,
  };
})(FormClone);

export default FormClone;
