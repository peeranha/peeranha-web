import React from 'react';
import Button from 'containers/Button';

import Wrapper from './Wrapper';
import { COMPLETE_SIGNUP } from './constants';

const RequirementToSignUp = () => (
  <Wrapper>
    <p>You signed in Scatter account</p>
    <p>Now You need to sign up in our App!</p>
    <Button
      complete={COMPLETE_SIGNUP}
      buttonClass="btn btn-link form-control"
      buttonContent="Sign Up"
    />
  </Wrapper>
);

export default RequirementToSignUp;
