/*
 * UserIsAbsentInSystem Messages
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.Login.header',
    defaultMessage: 'No Peerania account exists for selected identity.',
  },
  selectAnotherIdentity: {
    id: 'app.containers.Login.selectAnotherIdentity',
    defaultMessage: 'Select another identity',
  },
  requirementToSignUp: {
    id: 'app.containers.Login.requirementToSignUp',
    defaultMessage: 'Sign Up for Peerania account',
  },
  loginWithScatter: {
    id: 'app.containers.Login.loginWithScatter',
    defaultMessage: 'Log in with Scatter',
  },
  doNotHaveAcc: {
    id: 'app.containers.Login.doNotHaveAcc',
    defaultMessage: 'Do not have an account?',
  },
  signUp: {
    id: 'app.containers.Login.signUp',
    defaultMessage: 'Sign up',
  },
});
