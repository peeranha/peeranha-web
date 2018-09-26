/*
 * Sign Messages
 *
 * This contains all the text for the Sign component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  eosAccount: {
    id: 'app.containers.Sign.eosAccount',
    defaultMessage: 'EOS Account',
  },
  displayName: {
    id: 'app.containers.Sign.displayName',
    defaultMessage: 'Display Name',
  },
  signUp: {
    id: 'app.containers.Sign.signUp',
    defaultMessage: 'Sign Up',
  },
  requiredField: {
    id: 'app.containers.Sign.requiredField',
    defaultMessage: 'Required field',
  },
  displayNameLength: {
    id: 'app.containers.Sign.displayNameLength',
    defaultMessage: 'Display name length must be between 3 and 20',
  },
  serverMessage: {
    id: 'app.containers.Sign.serverMessage',
    defaultMessage: 'Error',
  },
});
