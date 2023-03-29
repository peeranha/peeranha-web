import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

import letterImg from 'images/letter.svg?inline';
import { TEXT_SECONDARY } from 'style-constants';
import P from 'components/P';
import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';

import { required } from 'components/FormFields/validate';

import { CODE_FIELD, CONFIRM_EMAIL_FORM } from './constants';
import { styles } from './ChangeEmail.styled';

const ConfirmEmailForm = ({
  handleSubmit,
  confirmOldEmail,
  confirmOldEmailProcessing,
  sendAnotherCode,
  closeModal,
  emailAddress,
  verificationCodeError,
  verificationCode,
  verificationCodeRequest,
}) => {
  const { t } = useTranslation();
  const [incorrectCode, setIncorrectCode] = useState(verificationCodeError);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [currentEmail, setCurrentEmail] = useState('');

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive, requestCount]);

  useEffect(() => {
    if (verificationCodeError) {
      setIncorrectCode(true);
    }
  }, [verificationCodeError]);

  useEffect(() => {
    if (
      verificationCodeRequest !== requestCount &&
      verificationCodeRequest % 3 === 0 &&
      (!currentEmail || currentEmail == emailAddress)
    ) {
      setSeconds(60);
      setTimerActive(true);
    }
  }, [verificationCodeRequest, requestCount]);

  const handlerVerificationCode = (event) =>
    setIncorrectCode(verificationCode === event.target.value);

  const handlerCloseModal = () => {
    setRequestCount(verificationCodeRequest);
    setCurrentEmail(emailAddress);
    setTimeout(() => closeModal(), 1000);
  };

  return (
    <div css={styles.confirmEmailForm}>
      <H4>{t('common.confirmNewEmail')}</H4>
      <div>
        <img src={letterImg} alt="check your email" />
        <P>{t('profile.confirmVerificationCode')}</P>

        <div>{emailAddress}</div>
        <TransparentButton onClick={handlerCloseModal}>
          {t('profile.changeEmail')}
        </TransparentButton>
        <div></div>
      </div>
      <form
        css={incorrectCode && styles.inputWarning}
        onSubmit={handleSubmit(confirmOldEmail)}
      >
        <Field
          name={CODE_FIELD}
          disabled={confirmOldEmailProcessing}
          label={t('signUp.verificationCode')}
          component={TextInputField}
          validate={required}
          warn={required}
          onChange={handlerVerificationCode}
        />
        {incorrectCode && (
          <div css={styles.textWarning}>{t('common.incorrectCode')}</div>
        )}
        <span>{t('common.notGetCode')}</span>
        {!seconds ? (
          <TransparentButton onClick={sendAnotherCode} type="button">
            {t('common.sendAnotherCode')}
          </TransparentButton>
        ) : (
          <span css={styles.timer}>
            <span>{t('common.notGetCodeTimer')}</span>
            <span>
              {seconds.toString().length > 1
                ? `00:${seconds}`
                : `00:0${seconds}`}
            </span>
          </span>
        )}
        <Button
          disabled={confirmOldEmailProcessing || incorrectCode}
          type="submit"
        >
          {t('signUp.verify')}
        </Button>
      </form>
    </div>
  );
};

ConfirmEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  confirmOldEmail: PropTypes.func,
  confirmOldEmailProcessing: PropTypes.bool,
  closeModal: PropTypes.func,
  emailAddress: PropTypes.string,
  verificationCodeError: PropTypes.bool,
  verificationCode: PropTypes.string,
  verificationCodeRequest: PropTypes.number,
};

export default reduxForm({
  form: CONFIRM_EMAIL_FORM,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(ConfirmEmailForm);
