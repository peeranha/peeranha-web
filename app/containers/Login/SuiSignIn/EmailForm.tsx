import React, { FormEventHandler, memo } from 'react';
import { connect } from 'react-redux';
import { SubmitHandler } from 'redux-form';
import { reduxForm } from 'redux-form/immutable';
import { Map } from 'immutable';

import { scrollToErrorField } from 'utils/animation';
import Content from 'containers/Login/SuiSignIn/Content';

import Header from './Header';

export interface EmailFormProps {
  loginWithWallet: () => void;
  setIsWalletLogin: (isWalletLogin: boolean) => void;
  signInWithEmailDispatch: (email: string) => void;
  handleSubmit: (handler: SubmitHandler<{ email: string }>) => FormEventHandler<HTMLFormElement>;
  setEmail: (email: string) => void;
  formValues: { email: string };
  signInWithEmailProcessing: boolean;
}

const EmailForm = ({
  loginWithWallet,
  setIsWalletLogin,
  signInWithEmailDispatch,
  handleSubmit,
  setEmail,
  formValues,
  signInWithEmailProcessing,
}: EmailFormProps) => (
  <>
    <Header />
    <Content
      loginWithWallet={loginWithWallet}
      setIsWalletLogin={setIsWalletLogin}
      signInWithEmailDispatch={signInWithEmailDispatch}
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      formValues={formValues}
      signInWithEmailProcessing={signInWithEmailProcessing}
    />
  </>
);

export default memo(
  connect((state: Map<any, any>) => ({
    formValues: state.toJS().form.EmailForm?.values ?? {},
  }))(
    reduxForm<any, any>({
      form: 'EmailForm',
      onSubmitFail: (errors) => scrollToErrorField(errors),
    })(EmailForm),
  ),
);
