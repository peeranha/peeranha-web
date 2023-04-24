import React, { useState, useEffect } from 'react';
import { Field, reduxForm, reset } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import letterImg from 'images/letter.svg?inline';
import TextInputField from 'components/FormFields/TextInputField';
import { required } from 'components/FormFields/validate';

import {
  CODE_FIELD,
  CONFIRM_EMAIL_FORM,
  EMAIL_FORM,
  CHECK_EMAIL_IMG_ALT,
} from './constants';
import { styles } from './EmailNotifications.styled';
import { ConfirmEmailFormProps } from './types';

const ConfirmEmailForm: React.FC<ConfirmEmailFormProps> = ({
  handleSubmit,
  confirmEmail,
  confirmEmailProcessing,
  sendAnotherCode,
  closeModal,
  emailAddress,
  verificationCodeError,
  verificationCode,
  verificationCodeRequest,
  dispatch,
}): JSX.Element => {
  const { t } = useTranslation();
  const [incorrectCode, setIncorrectCode] = useState<boolean>(
    verificationCodeError,
  );
  const [seconds, setSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string>('');

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

  const verificationCodeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => setIncorrectCode(verificationCode === event.target.value);

  const closeModalHandler = (): void => {
    setCurrentEmail(emailAddress);
    setTimeout(() => closeModal(), 1000);
  };

  return (
    <div css={styles.confirmEmailForm}>
      <h4>{t('common.confirmNewEmail')}</h4>
      <div>
        <img src={letterImg} alt={CHECK_EMAIL_IMG_ALT} />
        <p>{t('profile.confirmVerificationCode')}</p>

        <div>{emailAddress}</div>
        <button onClick={closeModalHandler}>{t('profile.changeEmail')}</button>
        <div></div>
      </div>
      <form
        css={incorrectCode && styles.inputWarning}
        onSubmit={handleSubmit(confirmEmail)}
      >
        <Field
          name={CODE_FIELD}
          disabled={confirmEmailProcessing}
          label={t('signUp.verificationCode')}
          component={TextInputField}
          validate={required}
          warn={required}
          onChange={verificationCodeHandler}
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
          disabled={confirmEmailProcessing || incorrectCode}
          type="submit"
        >
          {t('signUp.verify')}
        </button>
      </form>
    </div>
  );
};

export default reduxForm<any, any>({
  form: CONFIRM_EMAIL_FORM,
})(ConfirmEmailForm);
