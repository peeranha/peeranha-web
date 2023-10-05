import React from 'react';
import { Field, SubmissionError } from 'redux-form/immutable';
import { VERIFICATION_CODE_FIELD } from 'containers/Login/constants';
import TextInputField from 'components/FormFields/TextInputField';
import { required, validateEmail } from 'components/FormFields/validate';
import { useTranslation } from 'react-i18next';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import { VerificationFormProps } from 'containers/Login/VerificationForm/VerificationForm';
const Content = ({
  email,
  verifyEmail,
  handleSubmit,
  signInWithEmail,
  hideModal,
  verifyEmailProcessing,
}: VerificationFormProps) => {
  const { t } = useTranslation();

  return (
    <>
      <form
        onSubmit={handleSubmit(async (formValues: any) =>
          new Promise((resolve, reject) => {
            verifyEmail(email, formValues, resolve, reject);
          }).catch(() => {
            throw new SubmissionError({
              verificationCode: t('login.incorrectCode'),
              _error: t('login.incorrectCode'),
            });
          }),
        )}
        css={{
          paddingTop: '24px',
        }}
      >
        <Field
          name={VERIFICATION_CODE_FIELD}
          component={TextInputField}
          validate={[required]}
          warn={[required]}
          placeholder={t('login.enterCode')}
        />
        <div
          css={{
            paddingBottom: '32px',
          }}
        >
          {t('login.didntGetACode')}
          <a
            onClick={() => {
              signInWithEmail(email);
            }}
            css={{ textDecoration: 'underline !important' }}
          >
            {t('login.clickToResend')}
          </a>
        </div>

        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: '12px',
            '@media (min-width: 576px)': {
              flexDirection: 'row',
            },
          }}
        >
          <OutlinedButton onClick={hideModal} css={{ minHeight: '40px' }}>
            {t('common.cancel')}
          </OutlinedButton>
          <ContainedButton
            type={'submit'}
            css={{ minHeight: '40px' }}
            disabled={verifyEmailProcessing}
          >
            {t('login.confirm')}
          </ContainedButton>
        </div>
      </form>
    </>
  );
};

export default Content;
