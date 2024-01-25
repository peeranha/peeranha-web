import React, { memo } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Map } from 'immutable';

import { scrollToErrorField } from 'utils/animation';
import Content from 'containers/Login/EthereumSignIn/Content';

import Header from 'containers/Login/SuiSignIn/Header';

export interface EmailFormProps {
  signInWithEmailProcessing: boolean;
  loginWithEthereumDispatch: () => void;
  hideSignInModalDispatch: () => void;
}

const EthereumLogin = ({
  signInWithEmailProcessing,
  loginWithEthereumDispatch,
  hideSignInModalDispatch,
}: EmailFormProps) => (
  <>
    <Header />
    <Content
      signInWithEmailProcessing={signInWithEmailProcessing}
      loginWithEthereumDispatch={loginWithEthereumDispatch}
      hideSignInModalDispatch={hideSignInModalDispatch}
    />
  </>
);

export default memo(
  connect((state: Map<any, any>) => ({
    formValues: state.toJS().form.EmailForm?.values ?? {},
  }))(
    reduxForm<any, any>({
      form: 'EthereumLogin',
      onSubmitFail: (errors) => scrollToErrorField(errors),
    })(EthereumLogin),
  ),
);
