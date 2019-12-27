import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import { scrollToErrorField } from 'utils/animation';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import signUpMessages from 'containers/SignUp/messages';

import { required } from 'components/FormFields/validate';

import { PASSWORD_FIELD } from './constants';

const ShowActiveKeyForm = ({
  handleSubmit,
  locale,
  showActiveKey,
  showActiveKeyProcessing,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.show} />{' '}
      <FormattedMessage {...signUpMessages.eosActivePrivateKey} />
    </H4>

    <form onSubmit={handleSubmit(showActiveKey)}>
      <Field
        name={PASSWORD_FIELD}
        disabled={showActiveKeyProcessing}
        label={translationMessages[locale][commonMessages.password.id]}
        component={TextInputField}
        validate={required}
        warn={required}
        type="password"
      />

      <Button disabled={showActiveKeyProcessing} className="w-100 mb-3">
        <FormattedMessage {...commonMessages.submit} />
      </Button>
    </form>
  </div>
);

ShowActiveKeyForm.propTypes = {
  handleSubmit: PropTypes.func,
  showActiveKey: PropTypes.func,
  locale: PropTypes.string,
  showActiveKeyProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'ShowActiveKeyForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(ShowActiveKeyForm);
