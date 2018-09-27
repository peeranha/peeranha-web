/*
 * SignUp Messages
 *
 * This contains all the text for the Sign component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  eosAccount: {
    id: 'app.containers.SignUp.eosAccount',
    defaultMessage: 'EOS Account',
  },
  displayName: {
    id: 'app.containers.SignUp.displayName',
    defaultMessage: 'Display Name',
  },
  signUp: {
    id: 'app.containers.SignUp.signUp',
    defaultMessage: 'Sign Up',
  },
  requiredField: {
    id: 'app.containers.SignUp.requiredField',
    defaultMessage: 'Required field',
  },
  displayNameLength: {
    id: 'app.containers.SignUp.displayNameLength',
    defaultMessage: 'Display name length must be between 3 and 20',
  },
  serverMessage: {
    id: 'app.containers.SignUp.serverMessage',
    defaultMessage: 'Error',
  },
});
