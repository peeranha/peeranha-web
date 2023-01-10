import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import commonMessages from 'common-messages';
import messages from './messages';

import { scrollToErrorField } from 'utils/animation';

import letterImg from 'images/letter-smile.svg?inline';

import P from 'components/P';
import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';

import { required } from 'components/FormFields/validate';

import { CODE_FIELD, CONFIRM_EMAIL_FORM } from './constants';

const ConfirmEmailForm = ({
  handleSubmit,
  confirmOldEmail,
  confirmOldEmailProcessing,
  sendAnotherCode,
  closeModal,
  emailAddress,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage id={messages.confirmNewEmail.id} />
    </H4>

    <div className="text-center pb-3">
      <img src={letterImg} alt="check your email" />
      <P className="text-center py-2" css={{ color: 'var(--color-gray-dark)' }}>
        <FormattedMessage id={messages.verificationCodeText.id} />
      </P>
      <div className="semi-bold mb-3">{emailAddress}</div>
      <TransparentButton
        onClick={closeModal}
        className="db mb-3"
        css={{ margin: 'auto' }}
      >
        <FormattedMessage id={messages.changeEmail.id} />
      </TransparentButton>
      <div
        css={{ height: '1px', background: '#C2C6D8', marginTop: '25px' }}
      ></div>
    </div>

    <form onSubmit={handleSubmit(confirmOldEmail)}>
      <Field
        name={CODE_FIELD}
        disabled={confirmOldEmailProcessing}
        label={translationMessages[locale][signUpMessages.verificationCode.id]}
        component={TextInputField}
        validate={required}
        warn={required}
      />

      <TransparentButton
        className="mb-3"
        onClick={sendAnotherCode}
        type="button"
      >
        <FormattedMessage id={commonMessages.sendAnotherCode.id} />
      </TransparentButton>

      <Button
        disabled={confirmOldEmailProcessing}
        className="w-100 mb-3"
        type="submit"
      >
        <FormattedMessage id={messages.verify.id} />
      </Button>
    </form>
  </div>
);

ConfirmEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  confirmOldEmail: PropTypes.func,
  confirmOldEmailProcessing: PropTypes.bool,
};

export default reduxForm({
  form: CONFIRM_EMAIL_FORM,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(ConfirmEmailForm);
