import React from 'react';
import { Field } from 'redux-form/immutable';
import { EMAIL_FIELD } from 'containers/Login/constants';
import TextInputField from 'components/FormFields/TextInputField';
import { required, validateEmail } from 'components/FormFields/validate';
import Button from 'components/Button/Contained/InfoLarge';
import { useTranslation } from 'react-i18next';
import { styles } from 'containers/Login/Login.styled';
import { Wallet } from 'icons/index';
import SuiConnectModals from 'components/SuiConnectModals';
import { EmailFormProps } from 'containers/Login/SignIn/EmailForm';

const Content = ({
  loginWithWallet,
  setIsWalletLogin,
  signInWithEmailDispatch,
  handleSubmit,
  setEmail,
  formValues,
}: EmailFormProps) => {
  const { t } = useTranslation();

  const WalletLoginButton = () => (
    <Button css={styles.walletButton}>
      <Wallet />
      {t('login.connectWithWallet')}
    </Button>
  );

  const loginWithWalletWrapper = (...args: any[]) => {
    setIsWalletLogin(true);
    loginWithWallet(...args);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(() => {
          setEmail(formValues.email);
          signInWithEmailDispatch(formValues.email);
        })}
        css={{
          paddingTop: '24px',
        }}
      >
        <Field
          name={EMAIL_FIELD}
          component={TextInputField}
          validate={[validateEmail, required]}
          warn={[validateEmail, required]}
          placeholder={t('login.emailForm')}
        />

        <Button css={{ width: '100%' }} type="submit">
          {t('login.getStarted')}
        </Button>
      </form>

      <div css={styles.divider}>
        <hr css={styles.dividerLine} />
        <span css={styles.dividerText}>OR</span>
        <hr css={styles.dividerLine} />
      </div>

      <SuiConnectModals
        loginWithWallet={loginWithWalletWrapper}
        actionButtonWithLogin={WalletLoginButton}
      />
    </>
  );
};

export default Content;
