import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';

import communitySuggestImage from 'images/communitySuggest.svg?inline';

import P from 'components/P';
import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import signUpMessages from 'containers/SignUp/messages';

import { strLength3x20, required } from 'components/FormFields/validate';

import { CODE_FIELD, PASSWORD_FIELD } from './constants';

import messages from './messages';

const SubmitEmailForm = ({
  handleSubmit,
  locale,
  deleteAccount,
  deleteAccountProcessing,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...messages.areYouLeaving} />{' '}
    </H4>

    <div className="text-center pb-3">
      <img src={communitySuggestImage} alt="check your email" />
      <P className="text-center py-2">
        <FormattedMessage {...signUpMessages.checkYourEmail} />
      </P>
    </div>

    <form onSubmit={handleSubmit(deleteAccount)}>
      <Field
        name={CODE_FIELD}
        disabled={deleteAccountProcessing}
        label={translationMessages[locale][signUpMessages.verificationCode.id]}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
      />

      <Field
        name={PASSWORD_FIELD}
        disabled={deleteAccountProcessing}
        label={translationMessages[locale][signUpMessages.password.id]}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
        type="password"
      />

      <Button disabled={deleteAccountProcessing} className="w-100 mb-3">
        <FormattedMessage {...commonMessages.submit} />
      </Button>
    </form>
  </div>
);

SubmitEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  deleteAccount: PropTypes.func,
  locale: PropTypes.string,
  deleteAccountProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'SubmitEmailForm',
})(SubmitEmailForm);
