import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import { scrollToErrorField } from 'utils/animation';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import NumberInputField from 'components/FormFields/NumberInputField';
import Button from 'components/Button/Contained/InfoLarge';

import {
  isTelosNameAvailable,
  required,
  validateTelosName,
  valueHasToBeLessThan,
} from 'components/FormFields/validate';

import { EOS_ACCOUNT_FIELD, AMOUNT_FIELD, PASSWORD_FIELD } from './constants';
import messages from './../ErrorPage/blockchainErrors';

const asyncValidate = async (value, dispatch, { eosService }) => {
  const telosName = value.get(EOS_ACCOUNT_FIELD);

  const isAvailable = await isTelosNameAvailable(eosService, telosName);
  if (isAvailable) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      [EOS_ACCOUNT_FIELD]: messages.accountDoesNotExist,
    });
  }
  return Promise.resolve({
    [EOS_ACCOUNT_FIELD]: undefined,
  });
};

const SendTokensForm = ({
  handleSubmit,
  sendTokens,
  locale,
  sendTokensProcessing,
  loginData,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.sendTokens} />
    </H4>

    <form onSubmit={handleSubmit(sendTokens)}>
      <Field
        name={EOS_ACCOUNT_FIELD}
        disabled={sendTokensProcessing}
        label={translationMessages[locale][commonMessages.eosAccount.id]}
        component={TextInputField}
        validate={[required, validateTelosName]}
        warn={[required, validateTelosName]}
      />

      <Field
        name={AMOUNT_FIELD}
        disabled={sendTokensProcessing}
        label={translationMessages[locale][commonMessages.amount.id]}
        component={NumberInputField}
        validate={[required, valueHasToBeLessThan]}
        warn={[required, valueHasToBeLessThan]}
      />

      {!(loginData.loginWithScatter || loginData.loginWithKeycat) && (
        <Field
          name={PASSWORD_FIELD}
          disabled={sendTokensProcessing}
          label={translationMessages[locale][commonMessages.password.id]}
          component={TextInputField}
          validate={required}
          warn={required}
          type="password"
        />
      )}

      <Button disabled={sendTokensProcessing} className="w-100 mb-3">
        <FormattedMessage {...commonMessages.submit} />
      </Button>
    </form>
  </div>
);

SendTokensForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendTokens: PropTypes.func,
  locale: PropTypes.string,
  sendTokensProcessing: PropTypes.bool,
  loginData: PropTypes.object,
  eosService: PropTypes.object,
};

const formName = 'SendTokensForm';

/* eslint import/no-mutable-exports: 0 */
export default reduxForm({
  form: formName,
  asyncValidate,
  asyncBlurFields: [EOS_ACCOUNT_FIELD],
  shouldAsyncValidate: ({ syncValidationPasses }) => syncValidationPasses,
  onSubmitFail: errors => scrollToErrorField(errors),
})(SendTokensForm);
