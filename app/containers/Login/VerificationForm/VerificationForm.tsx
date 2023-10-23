import React, { FormEventHandler } from 'react';
import { reduxForm } from 'redux-form/immutable';

import { scrollToErrorField } from 'utils/animation';
import Header from 'containers/Login/VerificationForm/Header';
import Content from 'containers/Login/VerificationForm/Content';
import { SubmitHandler } from 'redux-form';

export interface VerificationFormProps {
  verifyEmail: (
    email: string,
    formValues: any,
    resolve: (value: unknown) => void,
    reject: (value: unknown) => void,
  ) => void;
  handleSubmit: (handler: SubmitHandler<{ email: string }>) => FormEventHandler<HTMLFormElement>;
  signInWithEmail: (email: string) => void;
  hideModal: () => void;
  email: string;
  verifyEmailProcessing: boolean;
}

const VerificationForm = ({
  email,
  verifyEmail,
  handleSubmit,
  signInWithEmail,
  hideModal,
  verifyEmailProcessing,
}: VerificationFormProps) => (
  <>
    <Header />
    <Content
      email={email}
      verifyEmail={verifyEmail}
      handleSubmit={handleSubmit}
      signInWithEmail={signInWithEmail}
      hideModal={hideModal}
      verifyEmailProcessing={verifyEmailProcessing}
    />
  </>
);

export default reduxForm<any, any>({
  form: 'VerificationForm',
  touchOnBlur: false,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(VerificationForm);
