import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import { scrollToErrorField } from 'utils/animation';

import letterImg from 'images/letter.svg?inline';
import TextInputField from 'components/FormFields/TextInputField';
import { required } from 'components/FormFields/validate';

import { CODE_FIELD, CONFIRM_EMAIL_FORM, EMAIL_FORM } from './constants';
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
  dispatch,
}) => {
  const { t } = useTranslation();
  const [incorrectCode, setIncorrectCode] = useState(verificationCodeError);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);

  useEffect(() => {
    if (incorrectCode) {
      setIncorrectCode(false);
    }
  }, []);

  useEffect(() => {
    if (!incorrectCode && verificationCodeError) {
      setIncorrectCode(true);
    }
  }, [verificationCodeError]);

  useEffect(() => {
    if (
      verificationCodeRequest >= 2 &&
      (!currentEmail || currentEmail === emailAddress)
    ) {
      setSeconds(60);
      setTimerActive(true);
    }
  }, [verificationCodeRequest]);

  const handlerVerificationCode = (event) =>
    setIncorrectCode(verificationCode === event.target.value);

  const handlerCloseModal = () => {
    setCurrentEmail(emailAddress);
    setTimeout(() => closeModal(), 1000);
  };

  return (
    <div css={styles.confirmEmailForm}>
      <h4>{t('common.confirmNewEmail')}</h4>
      <div>
        <img src={letterImg} alt="check your email" />
        <p>{t('profile.confirmVerificationCode')}</p>

        <div>{emailAddress}</div>
        <button onClick={handlerCloseModal}>{t('profile.changeEmail')}</button>
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
          <button
            css={styles.timerButton}
            onClick={sendAnotherCode}
            type="button"
          >
            {t('common.sendAnotherCode')}
          </button>
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
        <button
          css={styles.verifyButton}
          disabled={confirmOldEmailProcessing || incorrectCode}
          type="submit"
          onClick={() => {
            if (incorrectCode) {
              dispatch(reset(EMAIL_FORM));
            }
          }}
        >
          {t('signUp.verify')}
        </button>
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
  form: EMAIL_FORM,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(ConfirmEmailForm);
