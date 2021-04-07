import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import letterImg from 'images/letter-smile.svg?inline';
import commonMessages from 'common-messages';

import { required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import SendAnotherCodeButton from 'components/Button/Contained/Transparent';

import {
  CONFIRM_FB_DATA_DEL_FORM,
  VERIFY_DEL_FB_DATA_FIELD,
} from '../constants';
import messages from '../messages';
import { P, Form } from '../index';

const ConfirmDelRightMenu = ({
  handleSubmit,
  confirmDataDeletion,
  sendAnotherCode,
  locale,
  processing,
}) => (
  <>
    <div className="text-center">
      <img src={letterImg} alt="check your email" />
      <P className="text-center py-2">
        <FormattedMessage {...messages.checkYourEmail} />
      </P>
    </div>
    <Form onSubmit={handleSubmit(confirmDataDeletion)}>
      <Field
        name={VERIFY_DEL_FB_DATA_FIELD}
        disabled={processing}
        label={translationMessages[locale][messages.verificationCode.id]}
        component={TextInputField}
        validate={[required]}
        warn={[required]}
      />

      <SendAnotherCodeButton
        onClick={sendAnotherCode}
        className="mb-3"
        type="button"
        disabled={processing}
      >
        <FormattedMessage {...commonMessages.sendAnotherCode} />
      </SendAnotherCodeButton>

      <SubmitButton disabled={processing} className="w-100">
        <FormattedMessage {...messages.confirmDeletion} />
      </SubmitButton>
    </Form>
  </>
);

ConfirmDelRightMenu.propTypes = {
  handleSubmit: PropTypes.func,
  confirmDataDeletion: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  locale: PropTypes.string,
  processing: PropTypes.bool,
};

export default reduxForm({
  form: CONFIRM_FB_DATA_DEL_FORM,
})(ConfirmDelRightMenu);
