import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { scrollToErrorField } from 'utils/animation';

import { required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import H4 from 'components/H4';

import { FB_VERIFICATION_CODE_FIELD, VERIFY_FB_ACTION_FORM } from './constants';

const FbVerificationCodeForm = ({
  handleSubmit,
  verifyEmail,
  verifyEmailLoading,
  sendAnotherCode,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">{t('common.verifyFacebookAccount')}</H4>

      <form onSubmit={handleSubmit(verifyEmail)}>
        <Field
          name={FB_VERIFICATION_CODE_FIELD}
          disabled={verifyEmailLoading}
          label={t('sign-up.checkYourEmail')}
          component={TextInputField}
          validate={[required]}
          warn={[required]}
        />

        <Button disabled={verifyEmailLoading} className="w-100" type="submit">
          {t('sign-up.continue')}
        </Button>

        <TransparentButton
          className="mt-3"
          onClick={sendAnotherCode}
          type="button"
          disabled={verifyEmailLoading}
        >
          {t('common.sendAnotherCode')}
        </TransparentButton>
      </form>
    </div>
  );
};

FbVerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  verifyEmail: PropTypes.func,
  locale: PropTypes.string,
  verifyEmailLoading: PropTypes.bool,
};

export default reduxForm({
  form: VERIFY_FB_ACTION_FORM,
  onSubmitFail: errors => scrollToErrorField(errors),
})(FbVerificationCodeForm);
