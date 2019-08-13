import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import NumberInputField from 'components/FormFields/NumberInputField';
import Button from 'components/Button/Contained/InfoLarge';

import { strLength3x20, required } from 'components/FormFields/validate';

import { EOS_ACCOUNT_FIELD, AMOUNT_FIELD, PASSWORD_FIELD } from './constants';

const SendTokensForm = ({
  handleSubmit,
  sendTokens,
  locale,
  sendTokensProcessing,
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
        validate={[required]}
        warn={[required]}
      />

      <Field
        name={AMOUNT_FIELD}
        disabled={sendTokensProcessing}
        label={translationMessages[locale][commonMessages.amount.id]}
        component={NumberInputField}
        validate={[required]}
        warn={[required]}
      />

      <Field
        name={PASSWORD_FIELD}
        disabled={sendTokensProcessing}
        label={translationMessages[locale][commonMessages.password.id]}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
        type="password"
      />

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
};

const formName = 'SendTokensForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
})(SendTokensForm);

FormClone = connect((_, props) => ({
  initialValues: {
    [EOS_ACCOUNT_FIELD]: props.email,
  },
}))(FormClone);

export default FormClone;
