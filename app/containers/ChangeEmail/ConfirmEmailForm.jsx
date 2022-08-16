import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">
        {t('common.change')} {t('signUp.email')}
      </H4>

      <div className="text-center pb-3">
        <img src={letterImg} alt="check your email" />
        <P className="text-center py-2">{t('signUp.checkYourEmail')}</P>
      </div>

      <form onSubmit={handleSubmit(confirmOldEmail)}>
        <Field
          name={CODE_FIELD}
          disabled={confirmOldEmailProcessing}
          label={t('signUp.verificationCode')}
          component={TextInputField}
          validate={required}
          warn={required}
        />

        <Button
          disabled={confirmOldEmailProcessing}
          className="w-100 mb-3"
          type="submit"
        >
          {t('common.submit')}
        </Button>

        <TransparentButton onClick={sendAnotherCode} type="button">
          {t('common.sendAnotherCode')}
        </TransparentButton>
      </form>
    </div>
  );
};

ConfirmEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  confirmOldEmail: PropTypes.func,
  confirmOldEmailProcessing: PropTypes.bool,
};

export default reduxForm({
  form: CONFIRM_EMAIL_FORM,
  onSubmitFail: errors => scrollToErrorField(errors),
})(ConfirmEmailForm);
