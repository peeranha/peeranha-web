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

const ConfirmEmailForm = ({
  handleSubmit,
  confirmOldEmail,
  confirmOldEmailProcessing,
  sendAnotherCode,
  closeModal,
  emailAddress,
  verificationCodeError,
  verificationCode,
}) => {
  const [encorrectCode, setEncorrectCode] = useState(verificationCodeError);
  const { t } = useTranslation();

  useEffect(() => {
    if (verificationCodeError) {
      setEncorrectCode(true);
    }
  }, [verificationCodeError]);
  return (
    <div>
      <H4 className="text-center pb-3">{t('common.confirmNewEmail')}</H4>

      <div className="text-center pb-3">
        <img
          css={{ maxWidth: '170px' }}
          src={letterImg}
          alt="check your email"
        />
        <P className="text-center py-2" css={{ color: TEXT_SECONDARY }}>
          {t('profile.verificationCodeText')}
        </P>

        <div className="semi-bold mb-3">{emailAddress}</div>
        <TransparentButton
          onClick={closeModal}
          className="db mb-3"
          css={{ margin: 'auto' }}
        >
          {t('profile.changeEmail')}
        </TransparentButton>
        <div
          css={{ height: '1px', background: '#C2C6D8', marginTop: '25px' }}
        ></div>
      </div>

      <form
        css={
          encorrectCode && {
            input: {
              border: '1px solid #F76F60',
              boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.40)',
            },
          }
        }
        onSubmit={handleSubmit(confirmOldEmail)}
      >
        <Field
          name={CODE_FIELD}
          disabled={confirmOldEmailProcessing}
          label={t('signUp.verificationCode')}
          component={TextInputField}
          validate={required}
          warn={required}
          onChange={(e) =>
            setEncorrectCode(verificationCode !== e.target.value ? false : true)
          }
        />
        {encorrectCode && (
          <div
            className="mb-2 fz14"
            css={{ color: '#F76F60', fontStyle: 'italic' }}
          >
            {t('common.incorrectCode')}
          </div>
        )}

        <TransparentButton
          className="mb-3"
          onClick={sendAnotherCode}
          type="button"
        >
          {t('common.sendAnotherCode')}
        </TransparentButton>

        <Button
          disabled={confirmOldEmailProcessing || encorrectCode}
          className="w-100 mb-3"
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
};

export default reduxForm({
  form: CONFIRM_EMAIL_FORM,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(ConfirmEmailForm);
