/*
 * UserIsAbsentInSystem Messages
 */

import { defineMessages } from 'react-intl';

import { USER_IS_NOT_REGISTERED, USER_IS_NOT_SELECTED } from './constants';

const messages = defineMessages({
  authUserHasMore: {
    id: 'app.containers.Login.authUserHasMore',
  },
  staySignedIn: {
    id: 'app.containers.Login.staySignedIn',
  },
  yourUsernameIsHow: {
    id: 'app.containers.Login.yourUsernameIsHow',
  },
  [USER_IS_NOT_REGISTERED]: {
    id: 'app.containers.Login.userIsNotRegistered',
  },
  [USER_IS_NOT_SELECTED]: {
    id: 'app.containers.Login.userIsNotSelected',
  },
  accountNotCreatedName: {
    id: 'app.containers.Login.accountNotCreatedName',
  },
});
export default messages;
